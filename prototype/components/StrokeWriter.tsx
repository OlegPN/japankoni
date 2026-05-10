"use client";
// Тренажёр начертания: показывает порядок черт + canvas для практики.
// Stroke-данные берутся из KanjiVG (CC BY-SA 3.0) — заранее скачанных в /public/strokes/.
//
// 2 режима внутри:
//   1) "view"  — анимация порядка черт на SVG
//   2) "trace" — то же SVG как полупрозрачная подложка, поверх — canvas, ученик обводит.

import { useCallback, useEffect, useRef, useState } from "react";

type Mode = "view" | "trace";
type Pt = { x: number; y: number };

export default function StrokeWriter({ char, onClose }: { char: string; onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("view");
  const [paths, setPaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0); // увеличиваем чтобы перезапустить CSS-анимацию

  // Загружаем SVG и достаём path d-атрибуты (порядок = порядок черт)
  useEffect(() => {
    let cancelled = false;
    fetch(`/strokes/${encodeURIComponent(char)}.svg`)
      .then(r => {
        if (!r.ok) throw new Error(`SVG not found (${r.status})`);
        return r.text();
      })
      .then(txt => {
        if (cancelled) return;
        // Простой regex: тянем все d-атрибуты у <path>, в порядке появления
        const ds: string[] = [];
        const re = /<path[^>]*\sd="([^"]+)"/g;
        let m;
        while ((m = re.exec(txt)) !== null) ds.push(m[1]);
        setPaths(ds);
      })
      .catch(e => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [char]);

  return (
    <div className="absolute inset-0 z-50 flex items-end" onClick={onClose} style={{ background: "rgba(0,0,0,0.5)" }}>
      <div
        className="w-full rounded-t-3xl flex flex-col"
        style={{ background: "var(--bg)", maxHeight: "90%" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted font-bold">Начертание</div>
            <div className="text-2xl font-extrabold" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>{char}</div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full grid place-items-center text-base"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >✕</button>
        </div>

        {/* Mode toggle */}
        <div className="px-5 mb-2 flex gap-2">
          <button
            onClick={() => { setMode("view"); setAnimKey(k => k + 1); }}
            className="flex-1 rounded-xl py-2 text-xs font-bold"
            style={{
              background: mode === "view" ? "var(--primary)" : "var(--surface)",
              color: mode === "view" ? "#fff" : "var(--text)",
              border: "1px solid var(--border)",
            }}
          >👁 Посмотреть порядок</button>
          <button
            onClick={() => setMode("trace")}
            className="flex-1 rounded-xl py-2 text-xs font-bold"
            style={{
              background: mode === "trace" ? "var(--primary)" : "var(--surface)",
              color: mode === "trace" ? "#fff" : "var(--text)",
              border: "1px solid var(--border)",
            }}
          >✍️ Прописать самому</button>
        </div>

        {/* Body */}
        <div className="px-5 pb-6 flex flex-col items-center gap-3">
          {error && (
            <div className="text-sm text-muted py-8">⚠️ {error}</div>
          )}
          {!error && paths.length === 0 && (
            <div className="text-sm text-muted py-8">Загрузка SVG…</div>
          )}
          {!error && paths.length > 0 && mode === "view" && (
            <>
              <StrokeAnimation key={animKey} paths={paths} />
              <div className="text-xs text-muted">
                {paths.length} {paths.length === 1 ? "черта" : paths.length < 5 ? "черты" : "черт"} · ~{paths.length} {paths.length === 1 ? "сек" : "сек"}
              </div>
              <button
                onClick={() => setAnimKey(k => k + 1)}
                className="rounded-xl px-4 py-2 text-xs font-bold"
                style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
              >↻ Повторить</button>
            </>
          )}
          {!error && paths.length > 0 && mode === "trace" && (
            <TracePad paths={paths} />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// StrokeAnimation — анимирует path-ы по порядку через CSS
// ============================================================
function StrokeAnimation({ paths }: { paths: string[] }) {
  const STROKE_DURATION_S = 0.8; // сколько рисуется одна черта
  const STROKE_DELAY_S = 0.2;    // пауза между чертами

  return (
    <div className="rounded-2xl p-2" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <svg viewBox="0 0 109 109" width="240" height="240" style={{ display: "block" }}>
        {/* Лёгкая сетка-направляющая */}
        <line x1="54.5" y1="0" x2="54.5" y2="109" stroke="var(--border)" strokeWidth="0.4" strokeDasharray="2,2" />
        <line x1="0" y1="54.5" x2="109" y2="54.5" stroke="var(--border)" strokeWidth="0.4" strokeDasharray="2,2" />
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--text)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: `koni-stroke-draw ${STROKE_DURATION_S}s linear forwards`,
              animationDelay: `${i * (STROKE_DURATION_S + STROKE_DELAY_S)}s`,
            }}
          />
        ))}
        {/* Номера черт — появляются параллельно */}
        {paths.map((d, i) => {
          // Берём первую mx,y координату из d-атрибута для подсказки порядка
          const start = parseStartPoint(d);
          if (!start) return null;
          return (
            <g
              key={`num-${i}`}
              style={{
                opacity: 0,
                animation: `koni-stroke-fade-in 0.3s linear forwards`,
                animationDelay: `${i * (STROKE_DURATION_S + STROKE_DELAY_S)}s`,
              }}
            >
              <circle cx={start.x} cy={start.y} r="6" fill="var(--primary)" />
              <text x={start.x} y={start.y + 2.6} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <style jsx>{`
        @keyframes koni-stroke-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes koni-stroke-fade-in {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function parseStartPoint(d: string): Pt | null {
  // d="M31.01,33c0.88,..." — первое число после M
  const m = /^M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)/.exec(d.trim());
  if (!m) return null;
  return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
}

// ============================================================
// TracePad — холст для практики с подложкой-shadow
// ============================================================
function TracePad({ paths }: { paths: string[] }) {
  const SIZE = 280; // сторона canvas в css px
  const VIEW = 109; // viewBox размер KanjiVG
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPt = useRef<Pt | null>(null);
  const [strokesDrawn, setStrokesDrawn] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const getCtx = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return null;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "var(--primary)";
    return ctx;
  }, []);

  const eventToCanvas = (e: React.PointerEvent): Pt => {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * c.width;
    const y = ((e.clientY - rect.top) / rect.height) * c.height;
    return { x, y };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    canvasRef.current?.setPointerCapture(e.pointerId);
    drawing.current = true;
    lastPt.current = eventToCanvas(e);
    const ctx = getCtx();
    if (!ctx || !lastPt.current) return;
    ctx.beginPath();
    ctx.moveTo(lastPt.current.x, lastPt.current.y);
    ctx.lineTo(lastPt.current.x + 0.1, lastPt.current.y + 0.1); // дот при точечном тапе
    // Set strokeStyle к актуальному значению CSS-переменной
    const cs = getComputedStyle(canvasRef.current!).getPropertyValue("--primary").trim() || "#E85D75";
    ctx.strokeStyle = cs;
    ctx.stroke();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const pt = eventToCanvas(e);
    const ctx = getCtx();
    if (!ctx || !lastPt.current) return;
    ctx.beginPath();
    ctx.moveTo(lastPt.current.x, lastPt.current.y);
    ctx.lineTo(pt.x, pt.y);
    const cs = getComputedStyle(canvasRef.current!).getPropertyValue("--primary").trim() || "#E85D75";
    ctx.strokeStyle = cs;
    ctx.stroke();
    lastPt.current = pt;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    drawing.current = false;
    canvasRef.current?.releasePointerCapture(e.pointerId);
    lastPt.current = null;
    setStrokesDrawn(n => n + 1);
  };

  const clear = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx?.clearRect(0, 0, c.width, c.height);
    setStrokesDrawn(0);
  };

  // Высокое разрешение canvas
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = SIZE * dpr;
    c.height = SIZE * dpr;
    const ctx = c.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative rounded-2xl"
        style={{ width: SIZE, height: SIZE, background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {/* Подложка-shadow со SVG-чертами */}
        {showHint && (
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            width={SIZE}
            height={SIZE}
            style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18 }}
          >
            <line x1={VIEW/2} y1="0" x2={VIEW/2} y2={VIEW} stroke="var(--text)" strokeWidth="0.4" strokeDasharray="2,2" />
            <line x1="0" y1={VIEW/2} x2={VIEW} y2={VIEW/2} stroke="var(--text)" strokeWidth="0.4" strokeDasharray="2,2" />
            {paths.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="var(--text)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>
        )}
        {/* Канвас для рисования поверх */}
        <canvas
          ref={canvasRef}
          style={{
            width: SIZE, height: SIZE,
            position: "absolute", inset: 0,
            touchAction: "none",
            cursor: "crosshair",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>
      <div className="text-xs text-muted">
        Нарисовано {strokesDrawn}/{paths.length} {strokesDrawn >= paths.length ? "🎉" : ""}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setShowHint(s => !s)}
          className="rounded-xl px-3 py-2 text-xs font-bold"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >{showHint ? "Скрыть подсказку" : "Показать подсказку"}</button>
        <button
          onClick={clear}
          className="rounded-xl px-3 py-2 text-xs font-bold"
          style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
        >↻ Очистить</button>
      </div>
    </div>
  );
}
