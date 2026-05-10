"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Scene, SubtitleLine, sceneVocab } from "@/lib/scenes";
import { Vocab, VOCAB_BY_ID } from "@/lib/vocab";
import { Deck, ensureCard, loadDeck, saveDeck } from "@/lib/srs";

type Props = {
  scene: Scene;
  onExit: () => void;
};

type Mode = "idle" | "playing" | "paused" | "ended";

// Длительность одной строки в mock-режиме (без аудио)
const MOCK_LINE_MS = 2800;

export default function ScenePlayer({ scene, onExit }: Props) {
  const [mode, setMode] = useState<Mode>("idle");
  const [lineIdx, setLineIdx] = useState(0);
  const [tappedWord, setTappedWord] = useState<Vocab | null>(null);
  const [hideSubs, setHideSubs] = useState(false);
  const [hideTranslation, setHideTranslation] = useState(false);
  const [deck, setDeck] = useState<Deck>(() => ({ byId: {} }));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mockTimerRef = useRef<number | null>(null);

  // Loading deck on mount (client only)
  useEffect(() => { setDeck(loadDeck()); }, []);

  // Сбрасываем плеер при смене сцены (например, переход cafe → school-yard в client-navigation)
  useEffect(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (mockTimerRef.current) { clearTimeout(mockTimerRef.current); mockTimerRef.current = null; }
    setMode("idle");
    setLineIdx(0);
    setTappedWord(null);
  }, [scene.id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (mockTimerRef.current) clearTimeout(mockTimerRef.current);
    };
  }, []);

  const stopAll = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (mockTimerRef.current) { clearTimeout(mockTimerRef.current); mockTimerRef.current = null; }
  }, []);

  const playLine = useCallback((idx: number) => {
    stopAll();
    if (idx >= scene.lines.length) {
      setMode("ended");
      return;
    }
    setLineIdx(idx);
    const line = scene.lines[idx];

    if (line.audio) {
      // Реальный режим: проигрываем MP3, по окончании — следующая строка
      const audio = new Audio(line.audio);
      audioRef.current = audio;
      audio.onended = () => playLine(idx + 1);
      audio.onerror = () => {
        // Если аудио не загрузилось — переключаемся на mock-таймер
        mockTimerRef.current = window.setTimeout(() => playLine(idx + 1), MOCK_LINE_MS);
      };
      audio.play().catch(() => {
        mockTimerRef.current = window.setTimeout(() => playLine(idx + 1), MOCK_LINE_MS);
      });
    } else {
      // Mock-режим: фиксированный таймер
      mockTimerRef.current = window.setTimeout(() => playLine(idx + 1), MOCK_LINE_MS);
    }
  }, [scene.lines, stopAll]);

  const play = useCallback(() => {
    setMode("playing");
    playLine(0);
  }, [playLine]);

  const replay = useCallback(() => {
    setMode("playing");
    playLine(0);
  }, [playLine]);

  const pause = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    if (mockTimerRef.current) { clearTimeout(mockTimerRef.current); mockTimerRef.current = null; }
    setMode("paused");
  }, []);

  const resume = useCallback(() => {
    setMode("playing");
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => playLine(lineIdx + 1));
    } else {
      // если аудио уже сбито — играем со следующей строки
      playLine(lineIdx);
    }
  }, [lineIdx, playLine]);

  const activeLine: SubtitleLine | null =
    mode === "playing" || mode === "paused" ? scene.lines[lineIdx] ?? null : null;

  const hasAnyAudio = scene.lines.some(l => !!l.audio);

  // Add vocab to deck
  const addVocabToDeck = (v: Vocab) => {
    const next: Deck = { byId: { ...deck.byId } };
    ensureCard(next, v.id);
    saveDeck(next);
    setDeck(next);
  };

  const knownVocab = sceneVocab(scene).filter(v => deck.byId[v.id]);
  const totalSceneVocab = sceneVocab(scene).length;
  const progressPct = ((lineIdx + (mode === "ended" ? 1 : 0)) / scene.lines.length) * 100;

  return (
    <div className="relative h-full flex flex-col" style={{ background: "#000" }}>
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 flex items-center gap-3" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6), transparent)" }}>
        <button onClick={() => { stopAll(); onExit(); }} className="w-8 h-8 rounded-full grid place-items-center text-white" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>✕</button>
        <div className="flex-1 text-white">
          <div className="text-[11px] uppercase tracking-widest opacity-80">Сцена</div>
          <div className="text-sm font-bold">{scene.title}</div>
        </div>
        <div className="text-xs text-white font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
          🧠 {knownVocab.length}/{totalSceneVocab}
        </div>
      </div>

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image src={scene.image} alt={scene.title} fill className="object-cover" priority />
      </div>

      {/* Bottom subtitle area */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)" }}>
        {/* Mode-specific UI */}
        {mode === "idle" && (
          <div className="p-6 pb-8 flex flex-col items-center gap-3">
            <div className="text-white text-center text-sm opacity-90 max-w-[260px]">
              {scene.subtitle}
            </div>
            <button onClick={play} className="bg-white text-[color:var(--primary)] font-bold rounded-full px-6 py-3 text-sm flex items-center gap-2">
              ▶ Слушать сцену
            </button>
            {!hasAnyAudio && <div className="text-white/60 text-[11px]">Аудио пока не сгенерировано — играем в mock-режиме</div>}
          </div>
        )}

        {(mode === "playing" || mode === "paused") && activeLine && !hideSubs && (
          <div className="p-5 pb-7" onClick={() => mode === "playing" ? pause() : resume()}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-white/60 text-[11px] uppercase tracking-widest">
                {activeLine.speaker === "A" ? "Школьник" : "Аки"} · {lineIdx + 1}/{scene.lines.length}
              </div>
              <div className="text-white/60 text-[11px]">
                {mode === "paused" ? "▶ продолжить" : "❚❚ пауза"}
              </div>
            </div>
            <div className="text-white text-2xl font-bold leading-snug" style={{ fontFamily: "'Noto Sans JP', system-ui, sans-serif" }}>
              {activeLine.tokens.map((t, i) => {
                if (t.kind === "text") return <span key={i}>{t.text}</span>;
                const v = VOCAB_BY_ID[t.vocabId];
                const isKnown = !!deck.byId[t.vocabId];
                return (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); pause(); setTappedWord(v); }}
                    className="inline-block underline decoration-2 underline-offset-4"
                    style={{
                      textDecorationColor: isKnown ? "rgba(255,255,255,0.5)" : "var(--primary)",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {t.text}
                  </button>
                );
              })}
            </div>
            {!hideTranslation && (
              <>
                <div className="text-white/70 text-sm mt-2">{activeLine.romaji}</div>
                <div className="text-white/85 text-sm mt-1">{activeLine.ru}</div>
              </>
            )}
            <div className="flex gap-2 mt-3">
              <button onClick={(e) => { e.stopPropagation(); setHideSubs(s => !s); }} className="text-[10px] uppercase tracking-widest text-white/70 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                {hideSubs ? "Показать субтитры" : "Скрыть субтитры"}
              </button>
              <button onClick={(e) => { e.stopPropagation(); setHideTranslation(t => !t); }} className="text-[10px] uppercase tracking-widest text-white/70 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                {hideTranslation ? "Показать перевод" : "Скрыть перевод"}
              </button>
            </div>
          </div>
        )}

        {(mode === "playing" || mode === "paused") && hideSubs && (
          <div className="p-6 text-center">
            <button onClick={() => setHideSubs(false)} className="text-xs text-white/70 underline">показать субтитры</button>
          </div>
        )}

        {mode === "ended" && (
          <div className="p-6 pb-8 flex flex-col items-center gap-3">
            <div className="text-white text-center">
              <div className="text-2xl font-extrabold mb-1">Готово!</div>
              <div className="text-sm opacity-80">Понимаешь {knownVocab.length} из {totalSceneVocab} слов сцены</div>
            </div>
            <div className="flex gap-2 w-full justify-center">
              <button onClick={replay} className="bg-white text-[color:var(--primary)] font-bold rounded-xl px-4 py-2 text-sm">↻ Повторить</button>
              <button onClick={onExit} className="text-white font-semibold rounded-xl px-4 py-2 text-sm" style={{ background: "rgba(255,255,255,0.15)" }}>Выйти</button>
            </div>
          </div>
        )}

        {/* Timeline */}
        {mode !== "idle" && (
          <div className="h-1 w-full" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div className="h-full" style={{ width: `${progressPct}%`, background: "var(--primary)", transition: "width 0.3s linear" }} />
          </div>
        )}
      </div>

      {/* Tapped-word popup */}
      {tappedWord && (
        <div className="absolute inset-0 z-40 flex items-end" onClick={() => setTappedWord(null)} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full p-5 pb-7 rounded-t-3xl" style={{ background: "var(--bg)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1">
                <div className="text-3xl font-extrabold" style={{ fontFamily: "'Noto Sans JP', system-ui, sans-serif" }}>
                  {tappedWord.word}
                  {tappedWord.kanji && <span className="text-base text-muted ml-2">{tappedWord.kanji}</span>}
                </div>
                <div className="text-sm text-muted mt-1">{tappedWord.romaji} · {posLabel(tappedWord.partOfSpeech)}</div>
              </div>
              <button onClick={() => setTappedWord(null)} className="w-8 h-8 rounded-full grid place-items-center text-base" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>✕</button>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-base font-semibold flex-1">{tappedWord.ru}</div>
              <button
                onClick={() => {
                  const safe = tappedWord.romaji.replace(/[^a-z0-9]/gi, "");
                  const a = new Audio(`/audio/vocab/${safe}.mp3`);
                  a.play().catch(() => {});
                }}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
                aria-label="Произнести"
              >🔊</button>
            </div>
            {tappedWord.mnemonic && <div className="text-sm text-muted mb-3">💡 {tappedWord.mnemonic}</div>}
            {deck.byId[tappedWord.id] ? (
              <div className="text-sm text-muted text-center py-3 rounded-xl" style={{ background: "var(--surface)" }}>✓ Слово уже в твоей колоде</div>
            ) : (
              <button
                onClick={() => { addVocabToDeck(tappedWord); setTappedWord(null); }}
                className="w-full font-bold rounded-xl py-3 text-sm text-white"
                style={{ background: "var(--primary)" }}
              >
                + Добавить в колоду
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function posLabel(p: Vocab["partOfSpeech"]): string {
  switch (p) {
    case "noun": return "сущ.";
    case "verb": return "гл.";
    case "adj": return "прил.";
    case "particle": return "част.";
    case "expression": return "выраж.";
    case "pronoun": return "мест.";
    case "suffix": return "суфф.";
    case "interjection": return "межд.";
  }
}
