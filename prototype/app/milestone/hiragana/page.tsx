"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import { HIRAGANA } from "@/lib/hiragana";
import { markMilestoneSeen } from "@/lib/milestones";
import { loadProfile } from "@/lib/profile";

export default function HiraganaMilestone() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const p = loadProfile();
    setName(p.name || "друг");
    markMilestoneSeen("hiragana-complete");
  }, []);

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full overflow-hidden">
        {/* лёгкий фон-конфетти из лепестков */}
        <Confetti />

        <div className="relative flex flex-col items-center text-center pt-1 pb-2 fade-in">
          <div className="relative w-44 h-44 my-1">
            <Image src="/koni/koni-happy.png" alt="" fill className="object-contain" />
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-2" style={{ background: "var(--primary)", color: "#fff" }}>
            ✨ Достижение
          </span>
          <h1 className="text-3xl font-extrabold leading-tight">Хирагана выучена!</h1>
          <p className="text-sm text-muted mt-1.5 max-w-xs">{name}, ты прошёл(ла) все 46 знаков. Это уже больше, чем умеют 80% начинающих.</p>
        </div>

        {/* сетка всех 46 знаков как «трофей» */}
        <div className="rounded-2xl p-3 mt-2 mb-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-2 text-center">46 знаков, которые теперь твои</div>
          <div className="grid grid-cols-10 gap-y-1.5 gap-x-1 text-center" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>
            {HIRAGANA.map(k => (
              <div key={k.char} className="text-base font-semibold" title={k.romaji}>{k.char}</div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-3 text-sm leading-relaxed flex gap-3 items-start mb-3" style={{ background: "var(--success-soft)", borderLeft: "3px solid var(--success)" }}>
          <Image src="/koni/koni-thinking.png" width={36} height={36} alt="" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--success)" }}>Что дальше</div>
            Открываем грамматику. Первый урок: <span className="font-semibold">частицы は и です</span> — научишься говорить «я — студент». Всё ещё хираганой, без иероглифов.
          </div>
        </div>

        <div className="flex-1 min-h-2" />

        <div style={{
          position: "sticky", bottom: -8, marginLeft: -20, marginRight: -20, marginBottom: -36,
          padding: "12px 20px 24px",
          background: "linear-gradient(to top, var(--bg) 65%, transparent)",
        }}>
          <button onClick={() => router.push("/session")} className="rounded-xl py-3.5 font-bold text-white w-full" style={{ background: "var(--primary)" }}>
            К первому уроку →
          </button>
          <button onClick={() => router.push("/")} className="text-xs text-muted underline mt-3 w-full">
            Сначала на главный
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// падающие лепестки, как в anime-сцене
function Confetti() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i * 8.3) % 100}%`,
    delay: `${(i % 5) * 0.4}s`,
    size: 12 + (i % 3) * 4,
  }));
  return (
    <>
      <style>{`
        @keyframes mscFall {
          0% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(720px) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        {petals.map((p, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, left: p.left,
            fontSize: p.size,
            animation: `mscFall 6s ${p.delay} infinite linear`,
          }}>🌸</div>
        ))}
      </div>
    </>
  );
}
