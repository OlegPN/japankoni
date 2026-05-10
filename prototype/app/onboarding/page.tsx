"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import { Goal, GOAL_OPTIONS, loadProfile, saveProfile } from "@/lib/profile";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState<Goal>("anime");

  const finish = () => {
    const p = loadProfile();
    saveProfile({ ...p, name: name.trim() || "друг", goal, onboardedAt: Date.now() });
    router.push("/");
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full fade-in">
        <div className="flex justify-center mt-2 mb-1">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-1 w-10 mx-1 rounded-full" style={{ background: i <= step ? "var(--primary)" : "var(--primary-soft)" }} />
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-col flex-1 items-center text-center px-2">
            {/* Маскот занимает всё свободное пространство сверху */}
            <div className="flex-1 flex items-center justify-center w-full max-h-[60vh]">
              <div className="relative w-52 h-52 max-w-[55vw] max-h-[55vw]">
                <Image src="/koni/koni-default.png" alt="Кони" fill className="object-contain" priority />
              </div>
            </div>
            {/* Текст и кнопка — всегда внизу */}
            <h1 className="text-2xl font-extrabold">Привет! Я Кони.</h1>
            <p className="text-muted mt-2 mb-6 text-sm leading-relaxed">
              Я помогу тебе выучить японский — от первой каны до первого аниме без субтитров. Поехали?
            </p>
            <button onClick={() => setStep(1)} className="w-full rounded-xl py-3.5 font-bold text-white" style={{ background: "var(--primary)" }}>
              Начнём →
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col flex-1 px-1">
            <h2 className="text-2xl font-extrabold mt-4">Как тебя зовут?</h2>
            <p className="text-muted mt-1 mb-6 text-sm">Так я смогу обращаться к тебе по имени.</p>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Аки, Денис, Маша…"
              className="rounded-xl px-4 py-3 text-base outline-none"
              style={{ background: "var(--surface)", border: "2px solid var(--border)", color: "var(--text)" }}
              onKeyDown={e => { if (e.key === "Enter" && name.trim()) setStep(2); }}
            />
            <div className="flex-1" />
            <button
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              className="w-full rounded-xl py-3.5 font-bold text-white disabled:opacity-40"
              style={{ background: "var(--primary)" }}
            >
              Дальше →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col flex-1 px-1">
            <h2 className="text-2xl font-extrabold mt-4">Зачем учишь японский?</h2>
            <p className="text-muted mt-1 mb-4 text-sm">Это поможет мне подобрать тебе путь.</p>
            <div className="flex flex-col gap-2.5">
              {GOAL_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setGoal(opt.id)}
                  className="rounded-2xl p-3.5 text-left flex items-center gap-3 transition-all"
                  style={{
                    background: goal === opt.id ? "var(--primary-soft)" : "var(--surface)",
                    border: goal === opt.id ? "2px solid var(--primary)" : "2px solid var(--border)",
                    color: "var(--text)",
                  }}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <span>
                    <span className="block font-semibold text-sm">{opt.title}</span>
                    <span className="block text-xs text-muted">{opt.sub}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <button onClick={() => setStep(3)} className="w-full rounded-xl py-3.5 font-bold text-white mt-4" style={{ background: "var(--primary)" }}>
              Дальше →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col flex-1 px-1 fade-in">
            <h2 className="text-2xl font-extrabold mt-3">Пара слов про японский</h2>
            <p className="text-muted mt-1 mb-3 text-sm">Чтобы было понятнее с чего начинаем.</p>

            <div className="rounded-2xl p-3 mb-2 flex gap-3 items-start" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="text-3xl flex-shrink-0" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>あ</div>
              <div>
                <div className="text-sm font-bold">Хирагана</div>
                <div className="text-xs text-muted leading-relaxed">Слоговая азбука, 46 знаков. <span className="font-semibold" style={{ color: "var(--primary)" }}>Начнём с неё</span> — это фундамент.</div>
              </div>
            </div>

            <div className="rounded-2xl p-3 mb-2 flex gap-3 items-start" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="text-3xl flex-shrink-0" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>カ</div>
              <div>
                <div className="text-sm font-bold">Катакана</div>
                <div className="text-xs text-muted leading-relaxed">Тоже азбука, 46 знаков, для иностранных слов (рамэн, кофе, аниме). Позже.</div>
              </div>
            </div>

            <div className="rounded-2xl p-3 mb-2 flex gap-3 items-start" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="text-3xl flex-shrink-0" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>漢</div>
              <div>
                <div className="text-sm font-bold">Кандзи</div>
                <div className="text-xs text-muted leading-relaxed">Иероглифы из китайского, ~2000 в обиходе. Откроем после первой грамматики, не сразу.</div>
              </div>
            </div>

            <div className="rounded-xl p-3 text-xs leading-relaxed flex gap-2 items-start mt-1" style={{ background: "var(--success-soft)", borderLeft: "3px solid var(--success)" }}>
              <Image src="/koni/koni-thinking.png" width={32} height={32} alt="" />
              <div>Первые ~10 дней учим только хирагану — по 5 знаков в день. Никакой грамматики или иероглифов. Спокойно.</div>
            </div>

            <div className="flex-1 min-h-2" />
            <button onClick={finish} className="w-full rounded-xl py-3.5 font-bold text-white mt-3" style={{ background: "var(--primary)" }}>
              Поехали! →
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
