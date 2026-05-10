"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import { HIRAGANA_IDS, KATAKANA_IDS, VOCAB_IDS, KANJI_IDS } from "@/lib/cards";
import { Deck, dueIds, loadDeck, masteredRatio } from "@/lib/srs";
import { isOnboarded, loadProfile, Profile } from "@/lib/profile";
import { LESSONS } from "@/lib/lessons";
import { loadCompletedLessons } from "@/lib/progress";
import { getCurrentPhase, KANA_PER_DAY } from "@/lib/learning-phase";
import { isMilestoneSeen } from "@/lib/milestones";
import { findScene, sceneVocab } from "@/lib/scenes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const p = loadProfile();
    if (!isOnboarded(p)) { router.push("/onboarding"); return; }
    const d = loadDeck();
    const completed = loadCompletedLessons();
    const phase = getCurrentPhase(d, completed);

    // Если хирагана только что выучена и milestone ещё не показан — направляем на празднование
    if (phase.kind !== "kana-starter" && !isMilestoneSeen("hiragana-complete")) {
      router.push("/milestone/hiragana");
      return;
    }

    setProfile(p);
    setDeck(d);
    setCompletedLessons(completed);
  }, [router]);

  if (!profile || !deck) {
    return <PhoneFrame><div className="h-full flex items-center justify-center text-muted text-sm">Загрузка…</div></PhoneFrame>;
  }

  const learningPhase = getCurrentPhase(deck, completedLessons);
  const allIds = [...HIRAGANA_IDS, ...KATAKANA_IDS, ...VOCAB_IDS, ...KANJI_IDS];
  const due = dueIds(deck, learningPhase.ids);

  const hSeen = HIRAGANA_IDS.filter(id => deck.byId[id]).length;
  const kataSeen = KATAKANA_IDS.filter(id => deck.byId[id]).length;
  const vSeen = VOCAB_IDS.filter(id => deck.byId[id]).length;
  const kSeen = KANJI_IDS.filter(id => deck.byId[id]).length;
  const overallMastered = Math.round(masteredRatio(deck, allIds) * 100);
  const lessonsDone = completedLessons.length;

  const nextLesson = LESSONS.find(l => !completedLessons.includes(l.id));
  const isKanaStarter = learningPhase.kind === "kana-starter";

  return (
    <PhoneFrame>
      <div className="flex flex-col gap-3 fade-in">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 font-extrabold">
            <Image src="/koni/koni-icon.png" width={32} height={32} alt="" className="rounded-lg" />
            <span>KONI</span>
          </div>
          <div className="text-xs text-muted font-semibold">🔥 {profile.streakDays} {profile.streakDays === 1 ? "день" : "дней"}</div>
        </div>

        <div className="text-2xl font-extrabold">Привет, {profile.name}!</div>
        <div className="text-sm text-muted -mt-2 mb-2">
          {isKanaStarter
            ? (due.length > 0 ? `Сегодня: ${KANA_PER_DAY} новых + ${Math.max(0, due.length - KANA_PER_DAY)} на повтор` : `Сегодня: ${KANA_PER_DAY} новых знаков`)
            : (due.length > 0 ? `Сегодня: ${due.length} карточек на повтор` : "Все карточки на повторе. Можно учить новое!")}
        </div>

        <div className="rounded-3xl p-5 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--primary), #FF8AA0)" }}>
          <div className="absolute -right-5 -top-5 w-32 h-32 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="text-[11px] uppercase tracking-widest opacity-85">Сегодня</div>
          <div className="text-xl font-extrabold mt-1">
            {isKanaStarter
              ? `Хирагана · день ${learningPhase.day}/${learningPhase.totalDays}`
              : (nextLesson ? nextLesson.title : "Все уроки пройдены 🎉")}
          </div>
          <div className="text-sm opacity-90 mt-1 mb-3">
            {isKanaStarter
              ? `Знаки сегодня: ${learningPhase.todayChars.join(" ")}`
              : (nextLesson ? `Повтор + новый урок + разговор с Кони` : `Повтор того, что уже выучил`)}
          </div>
          <Link href="/session" className="inline-block bg-white text-[color:var(--primary)] font-bold rounded-xl px-4 py-2 text-sm">
            Начать →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Stat emoji="あ" num={`${hSeen}/${HIRAGANA_IDS.length}`} label="Хирагана" pct={(hSeen / HIRAGANA_IDS.length) * 100} />
          {isKanaStarter ? (
            <Stat emoji="🔒" num="—" label="Катакана (после хираганы)" pct={0} dim />
          ) : (
            <Stat emoji="ア" num={`${kataSeen}/${KATAKANA_IDS.length}`} label="Катакана" pct={(kataSeen / KATAKANA_IDS.length) * 100} />
          )}
          {isKanaStarter ? (
            <Stat emoji="🔒" num="—" label="Слова (после хираганы)" pct={0} dim />
          ) : (
            <Stat emoji="📝" num={`${vSeen}/${VOCAB_IDS.length}`} label="Слова" pct={(vSeen / VOCAB_IDS.length) * 100} />
          )}
          {isKanaStarter ? (
            <Stat emoji="🔒" num="—" label="Кандзи (после хираганы)" pct={0} dim />
          ) : (
            <Stat emoji="漢" num={`${kSeen}/${KANJI_IDS.length}`} label="Кандзи" pct={(kSeen / KANJI_IDS.length) * 100} />
          )}
          {isKanaStarter ? (
            <Stat emoji="🔒" num="—" label="Грамматика (после хираганы)" pct={0} dim />
          ) : (
            <Stat emoji="📖" num={`${lessonsDone}/${LESSONS.length}`} label="Грамматика N5" pct={(lessonsDone / LESSONS.length) * 100} />
          )}
          <Stat emoji="🧠" num={`${overallMastered}%`} label="В долгой памяти" pct={overallMastered} />
        </div>

        <div className="flex items-center justify-between mt-3 mb-2">
          <div className="text-[11px] uppercase tracking-widest text-muted font-bold">Anime Loop</div>
          <Link href="/anime" className="text-[11px] uppercase tracking-widest font-bold" style={{ color: "var(--primary)" }}>Все сцены →</Link>
        </div>
        {(() => {
          const scene = findScene("school-yard");
          if (!scene) return null;
          const total = sceneVocab(scene).length;
          const known = sceneVocab(scene).filter(v => deck.byId[v.id]).length;
          const sceneUnlocked = !isKanaStarter; // открывается после хираганы
          return (
            <Link
              href={sceneUnlocked ? "/scene/school-yard" : "/"}
              className="rounded-2xl p-3 flex items-center gap-3"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", pointerEvents: sceneUnlocked ? "auto" : "none" }}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                <Image src={scene.image} width={56} height={56} alt="" className="w-full h-full object-cover" />
                {!sceneUnlocked && (
                  <div className="absolute inset-0 grid place-items-center" style={{ background: "rgba(26,17,21,0.55)" }}>
                    <span style={{ fontSize: 22 }}>🔒</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold">{scene.title}</div>
                <div className="text-xs text-muted">
                  {sceneUnlocked
                    ? `Понимаешь ${known}/${total} слов · нажми чтобы послушать`
                    : `Закончи хирагану — откроется`}
                </div>
              </div>
              <div className="text-xl">{sceneUnlocked ? "▶" : "→"}</div>
            </Link>
          );
        })()}

        <button
          onClick={() => { window.localStorage.clear(); window.location.reload(); }}
          className="text-xs text-muted underline mt-6 self-center"
        >
          сбросить прогресс (для теста)
        </button>
      </div>
    </PhoneFrame>
  );
}

function Stat({ emoji, num, label, pct, dim }: { emoji: string; num: string; label: string; pct: number; dim?: boolean }) {
  return (
    <div className="rounded-2xl p-3" style={{ background: "var(--surface)", border: "1px solid var(--border)", opacity: dim ? 0.55 : 1 }}>
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="font-extrabold text-base leading-tight">{num}</div>
      <div className="text-[11px] text-muted">{label}</div>
      <div className="h-1 mt-1.5 rounded-full overflow-hidden" style={{ background: "var(--primary-soft)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--primary)" }} />
      </div>
    </div>
  );
}
