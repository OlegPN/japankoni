"use client";
// Хаб Anime Loop: список всех сцен с прогрессом понимания.
// Сцены — главная фишка KONI: каждая = ~15 сек диалога, тапаешь слова → в SRS.

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import { Deck, loadDeck } from "@/lib/srs";
import { Scene, SCENES, sceneVocab } from "@/lib/scenes";
import { getCurrentPhase } from "@/lib/learning-phase";
import { loadCompletedLessons } from "@/lib/progress";

// Сцены, которые ещё не сделаны — показываем как «coming soon»
const COMING_SOON: Array<{ title: string; subtitle: string; image: string }> = [
  { title: "Идзакая",       subtitle: "Вежливый отказ среди друзей", image: "/scenes/izakaya.png" },
  { title: "Рамэн-бар",     subtitle: "Все темы вместе: は・を・です", image: "/scenes/ramen-bar.png" },
];

export default function AnimeHubPage() {
  const router = useRouter();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const d = loadDeck();
    const phase = getCurrentPhase(d, loadCompletedLessons());
    setDeck(d);
    setUnlocked(phase.kind !== "kana-starter");
  }, []);

  if (!deck) {
    return <PhoneFrame><div className="h-full flex items-center justify-center text-muted text-sm">Загрузка…</div></PhoneFrame>;
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col gap-3 fade-in">
        <div className="flex items-center gap-3 py-2">
          <button onClick={() => router.push("/")} className="w-8 h-8 rounded-full grid place-items-center text-base flex-shrink-0" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>←</button>
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-widest text-muted font-bold">Anime Loop</div>
            <div className="text-lg font-extrabold leading-tight">Сцены</div>
          </div>
        </div>

        <div className="text-sm text-muted -mt-1 mb-2">
          {unlocked
            ? "Тапай по словам в субтитрах — добавляй в свою колоду. Чем больше слов знаешь, тем больше понимаешь сцену."
            : "Сцены откроются, как только закончишь хирагану."}
        </div>

        {SCENES.map(scene => (
          <SceneCard key={scene.id} scene={scene} deck={deck} locked={!unlocked} />
        ))}

        <div className="text-[11px] uppercase tracking-widest text-muted font-bold mt-3 mb-1">Скоро</div>
        {COMING_SOON.map((s, i) => (
          <div key={i} className="rounded-2xl p-3 flex items-center gap-3 opacity-50" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
              <Image src={s.image} width={56} height={56} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 grid place-items-center" style={{ background: "rgba(26,17,21,0.6)" }}>
                <span style={{ fontSize: 20 }}>🔒</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">{s.title}</div>
              <div className="text-xs text-muted">{s.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function SceneCard({ scene, deck, locked }: { scene: Scene; deck: Deck; locked: boolean }) {
  const total = sceneVocab(scene).length;
  const known = sceneVocab(scene).filter(v => deck.byId[v.id]).length;
  const pct = total > 0 ? Math.round((known / total) * 100) : 0;

  return (
    <Link
      href={locked ? "#" : `/scene/${scene.id}`}
      className="rounded-2xl p-3 flex items-center gap-3"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", pointerEvents: locked ? "none" : "auto" }}
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
        <Image src={scene.image} width={64} height={64} alt="" className="w-full h-full object-cover" />
        {locked && (
          <div className="absolute inset-0 grid place-items-center" style={{ background: "rgba(26,17,21,0.6)" }}>
            <span style={{ fontSize: 22 }}>🔒</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold truncate">{scene.title}</div>
        <div className="text-xs text-muted mb-1.5">{scene.subtitle}</div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--primary-soft)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--primary)" }} />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-muted font-bold mt-1">
          {locked ? "Заблокировано" : `Понимаешь ${known}/${total}`}
        </div>
      </div>
      <div className="text-xl">{locked ? "🔒" : "▶"}</div>
    </Link>
  );
}
