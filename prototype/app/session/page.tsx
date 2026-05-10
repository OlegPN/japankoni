"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import { audioFor, getCard, getListenChoices, ReviewCard } from "@/lib/cards";
import { aiTurn, buildSystemPrompt, ChatMessage, isAiAvailable } from "@/lib/talk";
import { Deck, dueIds, ensureCard, loadDeck, review, saveDeck } from "@/lib/srs";
import { bumpStreak, loadProfile, saveProfile } from "@/lib/profile";
import { Lesson, LESSONS } from "@/lib/lessons";
import { loadCompletedLessons, markLessonComplete } from "@/lib/progress";
import { getCurrentPhase, KANA_PER_DAY, LearningPhase } from "@/lib/learning-phase";

type Phase = "review" | "lesson" | "talk" | "done";

const REVIEW_SIZE = 6;
const KANA_STARTER_SIZE = 8; // в кана-стартере: 5 новых + 3 повтора предыдущих

export default function Session() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("review");
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [learningPhase, setLearningPhase] = useState<LearningPhase | null>(null);

  // Определяем фазу обучения и следующий урок при входе
  useEffect(() => {
    const deck = loadDeck();
    const completed = loadCompletedLessons();
    const lp = getCurrentPhase(deck, completed);
    setLearningPhase(lp);
    if (lp.kind === "kana-starter") {
      // в кана-стартере уроков нет
      setLesson(null);
    } else {
      const next = LESSONS.find(l => !completed.includes(l.id)) ?? LESSONS[0];
      setLesson(next);
    }
    // Dev-флаг: ?phase=talk пропускает Review и Lesson, идёт сразу к AI Talk.
    // Полезно для отладки. В production не используется (но и не мешает).
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search).get("phase");
      if (sp === "talk" || sp === "lesson" || sp === "done") setPhase(sp as Phase);
    }
  }, []);

  if (!learningPhase) {
    return <PhoneFrame><div className="h-full flex items-center justify-center text-muted text-sm">Загрузка…</div></PhoneFrame>;
  }

  // Кана-стартер: только Review хираганы, без Lesson и Talk
  if (learningPhase.kind === "kana-starter") {
    return (
      <PhoneFrame>
        {phase === "review" && (
          <ReviewPhase
            phaseInfo={learningPhase}
            onDone={() => { saveProfile(bumpStreak(loadProfile())); setPhase("done"); }}
          />
        )}
        {phase === "done" && <KanaDoneScreen phase={learningPhase} onAgain={() => router.push("/session")} />}
      </PhoneFrame>
    );
  }

  // Lessons / advanced — полный 3-фазный цикл
  return (
    <PhoneFrame>
      {phase === "review" && <ReviewPhase phaseInfo={learningPhase} onDone={() => setPhase(lesson ? "lesson" : "talk")} />}
      {phase === "lesson" && lesson && <LessonPhase lesson={lesson} onDone={() => { markLessonComplete(lesson.id); setPhase("talk"); }} />}
      {phase === "talk"   && lesson && <TalkPhase lesson={lesson} onDone={() => { saveProfile(bumpStreak(loadProfile())); setPhase("done"); }} />}
      {phase === "done"   && lesson && <DoneScreen lesson={lesson} onAgain={() => router.push("/session")} />}
    </PhoneFrame>
  );
}

// ============== HEADER ==============
function PhaseHeader({ phaseIdx, label, progress }: { phaseIdx: 0 | 1 | 2; label: string; progress: number }) {
  return (
    <>
      <div className="flex items-center gap-3 py-2">
        <Link href="/" className="w-8 h-8 rounded-full grid place-items-center text-base flex-shrink-0" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>✕</Link>
        <div className="flex gap-1.5 flex-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--primary-soft)" }}>
              <div className="h-full rounded-full transition-all" style={{
                width: i < phaseIdx ? "100%" : i === phaseIdx ? `${progress}%` : "0%",
                background: "var(--primary)"
              }} />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-1 mb-3">
        <span className="text-[11px] uppercase tracking-widest text-muted font-bold">{label}</span>
      </div>
    </>
  );
}

// ============== REVIEW PHASE ==============
type AnswerState = "idle" | "correct" | "wrong";
type Stage = "learn" | "test"; // знакомимся с новым символом → тест
type CardMode = "visual" | "listen"; // визуальная карточка или listen-quiz

// Шанс попасть в listen-режим (если у карточки есть аудио и она не новая)
const LISTEN_PROBABILITY = 0.4;

function ReviewPhase({ phaseInfo, onDone }: { phaseInfo: LearningPhase; onDone: () => void }) {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [queue, setQueue] = useState<ReviewCard[]>([]);
  const [newSet, setNewSet] = useState<Set<string>>(new Set());
  const [idx, setIdx] = useState(0);
  const [stage, setStage] = useState<Stage>("test");
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [cardMode, setCardMode] = useState<CardMode>("visual");
  // Кэшируем listen-варианты на текущей карточке (чтобы не пересчитывались на каждый рендер)
  const [listenChoices, setListenChoices] = useState<string[]>([]);

  useEffect(() => {
    const d = loadDeck();
    setDeck(d);
    const allIds = phaseInfo.ids;

    let pool: string[];
    if (phaseInfo.kind === "kana-starter") {
      // 5 новых знаков сегодняшнего дня (строго по порядку)
      const newToday = phaseInfo.todayChars.map(c => `hiragana:${c}`);
      // повтор — ТОЛЬКО из уже-виденных карточек (есть в FSRS-колоде и due ≤ now)
      const now = Date.now();
      const dueExisting = allIds.filter(id => {
        const c = d.byId[id];
        return c && new Date(c.card.due).getTime() <= now;
      }).filter(id => !newToday.includes(id));
      const reviewCount = Math.max(0, KANA_STARTER_SIZE - newToday.length);
      pool = [...newToday, ...dueExisting.slice(0, reviewCount)];
    } else {
      // обычный режим: due-приоритет, добиваем новыми если мало
      const due = dueIds(d, allIds);
      pool = due.length >= REVIEW_SIZE ? due.slice(0, REVIEW_SIZE) : [
        ...due,
        ...allIds.filter(id => !due.includes(id)).slice(0, REVIEW_SIZE - due.length),
      ];
    }

    const fresh = new Set(pool.filter(id => !d.byId[id]));
    setNewSet(fresh);

    // в кана-стартере НЕ перемешиваем — новые знаки идут по порядку あいうえお…
    const cards = pool.map(id => getCard(id)!).filter(Boolean);
    if (phaseInfo.kind !== "kana-starter") cards.sort(() => Math.random() - 0.5);
    setQueue(cards);
    if (cards[0] && fresh.has(cards[0].id)) setStage("learn");
  }, [phaseInfo]);

  const current = queue[idx];

  // Решаем режим (visual/listen) при смене карточки или перехода learn→test.
  // Listen-режим: только если у карты есть аудио И она НЕ новая (на новых сначала визуал).
  useEffect(() => {
    if (!current) return;
    const hasAudio = !!audioFor(current);
    const eligible = hasAudio && !newSet.has(current.id) && stage === "test";
    if (eligible && Math.random() < LISTEN_PROBABILITY) {
      setCardMode("listen");
      setListenChoices(getListenChoices(current));
    } else {
      setCardMode("visual");
      setListenChoices([]);
    }
  }, [current, stage, newSet]);

  if (!current || !deck) {
    return <div className="h-full flex items-center justify-center text-muted text-sm">Загрузка…</div>;
  }

  const progressPct = ((idx + (answerState !== "idle" ? 1 : 0)) / queue.length) * 100;
  const isNew = newSet.has(current.id);

  function handleAnswer(choice: string) {
    if (answerState !== "idle") return;
    // В listen-режиме сравниваем с prompt (символом), в visual — с answer (текстом)
    const expected = cardMode === "listen" ? current.prompt : current.answer;
    const correct = choice === expected;
    setAnswer(choice);
    setAnswerState(correct ? "correct" : "wrong");
    const updated = { ...deck! };
    ensureCard(updated, current.id);
    review(updated, current.id, correct ? "good" : "again");
    saveDeck(updated);
    setDeck(updated);
  }

  function next() {
    setShowHint(false); setAnswer(null); setAnswerState("idle");
    if (idx + 1 >= queue.length) { onDone(); return; }
    const nextIdx = idx + 1;
    setIdx(nextIdx);
    // следующая карточка тоже может быть новой
    const nextCard = queue[nextIdx];
    setStage(nextCard && newSet.has(nextCard.id) ? "learn" : "test");
  }

  // Этап «знакомство»: показываем символ + ответ + мнемонику
  if (stage === "learn") {
    const isHiragana = current.kind === "hiragana";
    return (
      <div className="flex flex-col h-full">
        <PhaseHeader phaseIdx={0} label={`Фаза 1 · Знакомство · ${idx + 1}/${queue.length}`} progress={progressPct} />

        <div className="text-center mb-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ background: "var(--primary)", color: "#fff" }}>
            ✨ Новый символ
          </span>
        </div>

        <div key={current.id} className="rounded-3xl p-7 text-center my-2 fade-in relative" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 4px 12px rgba(232,93,117,0.08)" }}>
          <div className="text-[11px] uppercase tracking-widest text-muted font-bold mb-2">{current.promptLabel}</div>
          <div className="text-[110px] font-semibold leading-none py-2" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>{current.prompt}</div>
          <div className="mt-3">
            <div className="text-[11px] uppercase tracking-widest text-muted font-bold">{isHiragana ? "Читается как" : "Значит"}</div>
            <div className="text-3xl font-extrabold mt-1" style={{ color: "var(--primary)" }}>{current.answer}</div>
          </div>
          <div className="absolute top-3 right-3"><AudioButton src={audioFor(current)} autoPlay /></div>
        </div>

        <div className="rounded-xl p-3.5 text-sm leading-relaxed flex gap-3 items-start" style={{ background: "var(--success-soft)", borderLeft: "3px solid var(--success)" }}>
          <Image src="/koni/koni-thinking.png" width={40} height={40} alt="" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--success)" }}>Чтобы запомнить</div>
            {current.hint}
          </div>
        </div>

        <div className="flex-1 min-h-3" />

        <button onClick={() => setStage("test")} className="rounded-xl py-3.5 font-bold text-white mt-3" style={{ background: "var(--primary)" }}>
          Запомнил, проверь меня →
        </button>
      </div>
    );
  }

  // Этап «тест»: 4 варианта ответа
  const isListen = cardMode === "listen";
  const choices = isListen ? listenChoices : current.choices;
  const expected = isListen ? current.prompt : current.answer;
  const questionText = isListen ? "Какой это знак / слово?" : current.question;
  const correctText = isListen ? "Правильно: " + current.prompt : "Правильно: " + current.answer;
  const isJapaneseChoices = isListen; // в listen-режиме варианты — иероглифы/кана, нужен JP-шрифт

  return (
    <div className="flex flex-col h-full">
      <PhaseHeader phaseIdx={0} label={`Фаза 1 · ${isNew ? "Проверка" : "Повтор"} · ${idx + 1}/${queue.length}${isListen ? " · 🎧" : ""}`} progress={progressPct} />

      <div key={current.id + (isListen ? ":L" : ":V")} className="rounded-3xl p-8 text-center my-3 fade-in relative" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 4px 12px rgba(232,93,117,0.08)" }}>
        <div className="text-[11px] uppercase tracking-widest text-muted font-bold mb-3">
          {isListen ? "На слух · " + current.promptLabel : current.promptLabel}
        </div>
        {isListen ? (
          // В listen-режиме показываем БОЛЬШУЮ кнопку 🔊 вместо знака.
          // Знак раскрывается только после ответа.
          <div className="py-2">
            {answerState === "idle" ? (
              <div className="grid place-items-center" style={{ height: 130 }}>
                <AudioButton src={audioFor(current)} autoPlay big />
              </div>
            ) : (
              <div className="text-[110px] font-semibold leading-none py-2" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>{current.prompt}</div>
            )}
          </div>
        ) : (
          <div className="text-[110px] font-semibold leading-none py-2" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>{current.prompt}</div>
        )}
        {/* После ответа разрешаем услышать ещё раз */}
        {answerState !== "idle" && !isListen && (
          <div className="absolute top-3 right-3"><AudioButton src={audioFor(current)} autoPlay /></div>
        )}
      </div>

      <div className="text-[11px] uppercase tracking-widest text-muted font-bold text-center mb-3">
        {answerState === "idle" ? questionText : answerState === "correct" ? "Верно!" : correctText}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {choices.map(c => {
          const isCorrect = c === expected;
          const isPicked = c === answer;
          let bg = "var(--surface)", border = "2px solid var(--border)", color = "var(--text)";
          if (answerState !== "idle") {
            if (isCorrect) { bg = "#E8EDD8"; border = "2px solid var(--success)"; color = "#3a5224"; }
            else if (isPicked) { bg = "#FFE4DC"; border = "2px solid var(--primary)"; color = "var(--primary-soft-text)"; }
          }
          return (
            <button key={c} onClick={() => handleAnswer(c)} disabled={answerState !== "idle"}
              className={isJapaneseChoices ? "rounded-2xl py-5 text-3xl font-semibold transition-all" : "rounded-2xl py-4 text-base font-bold transition-all"}
              style={{ background: bg, border, color, fontFamily: isJapaneseChoices ? '"Noto Sans JP", system-ui' : undefined }}>{c}</button>
          );
        })}
      </div>

      {(showHint || answerState === "wrong") && (
        <div className="mt-3 rounded-xl p-3 text-sm leading-relaxed flex gap-3 items-start fade-in" style={{ background: "var(--success-soft)", borderLeft: "3px solid var(--success)" }}>
          <Image src="/koni/koni-thinking.png" width={36} height={36} alt="" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--success)" }}>Мнемоника</div>
            {current.hint}
          </div>
        </div>
      )}

      <div className="flex-1" />

      {answerState === "idle" ? (
        isNew ? (
          <button onClick={() => setStage("learn")} className="rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
            style={{ background: "var(--primary-soft)", color: "var(--primary-soft-text)" }}>
            <Image src="/koni/koni-surprised.png" width={22} height={22} alt="" />
            Покажи ещё раз
          </button>
        ) : (
          <button onClick={() => setShowHint(s => !s)} className="rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
            style={{ background: "var(--primary-soft)", color: "var(--primary-soft-text)" }}>
            <Image src="/koni/koni-thinking.png" width={22} height={22} alt="" />
            {showHint ? "Скрыть подсказку" : "Подсказка от Кони"}
          </button>
        )
      ) : (
        <button onClick={next} className="rounded-xl py-3.5 font-bold text-white" style={{ background: "var(--primary)" }}>
          {idx + 1 >= queue.length
            ? (phaseInfo.kind === "kana-starter" ? "Завершить день →" : "Дальше: новый урок →")
            : "Следующая →"}
        </button>
      )}
    </div>
  );
}

// ============== AUDIO BUTTON ==============
function AudioButton({ src, autoPlay = false, big = false }: { src: string | null; autoPlay?: boolean; big?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!src || !autoPlay) return;
    const a = new Audio(src);
    audioRef.current = a;
    a.onplay = () => setPlaying(true);
    a.onended = () => setPlaying(false);
    a.onerror = () => setPlaying(false);
    a.play().catch(() => {/* autoplay blocked, ignore */});
    return () => { a.pause(); audioRef.current = null; };
  }, [src, autoPlay]);

  if (!src) return null;
  const play = () => {
    if (audioRef.current) audioRef.current.pause();
    const a = new Audio(src);
    audioRef.current = a;
    a.onplay = () => setPlaying(true);
    a.onended = () => setPlaying(false);
    a.onerror = () => setPlaying(false);
    a.play().catch(() => setPlaying(false));
  };
  const size = big ? 110 : 40;
  const iconSize = big ? 48 : 16;
  return (
    <button
      onClick={play}
      className="inline-flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: playing ? "var(--primary)" : "var(--primary-soft)",
        color: playing ? "#fff" : "var(--primary)",
        border: "1px solid var(--primary-soft)",
        boxShadow: big ? "0 4px 16px rgba(232,93,117,0.25)" : undefined,
      }}
      aria-label="Произнести"
    >
      <span style={{ fontSize: iconSize }}>🔊</span>
    </button>
  );
}

// ============== KANA STARTER DONE SCREEN ==============
function KanaDoneScreen({ phase, onAgain }: { phase: LearningPhase; onAgain: () => void }) {
  if (phase.kind !== "kana-starter") return null;
  const dayJustFinished = phase.day;
  const allDone = phase.hiraganaSeen + KANA_PER_DAY >= 46;
  return (
    <div className="h-full flex flex-col items-center justify-center text-center fade-in">
      <Image src="/koni/koni-happy.png" width={220} height={220} alt="" />
      <h1 className="text-3xl font-extrabold mt-2">День {dayJustFinished} закрыт!</h1>
      {allDone ? (
        <>
          <p className="text-muted mt-2 mb-2 max-w-xs">Ты выучил(а) всю хирагану 🎉. Завтра откроется первый урок грамматики.</p>
          <p className="text-xs text-muted mb-8 max-w-xs">FSRS будет приносить старые знаки на повтор сам — забывания не будет.</p>
        </>
      ) : (
        <>
          <p className="text-muted mt-2 mb-2 max-w-xs">+5 новых знаков. Завтра — следующий ряд хираганы и повторение пройденного.</p>
          <p className="text-xs text-muted mb-8 max-w-xs">До конца хираганы: {phase.totalDays - dayJustFinished} {phase.totalDays - dayJustFinished === 1 ? "день" : "дней"}.</p>
        </>
      )}
      <Link href="/" className="rounded-xl py-3.5 px-10 font-bold text-white" style={{ background: "var(--primary)" }}>
        На главный
      </Link>
      <button onClick={onAgain} className="text-sm text-muted underline mt-3">
        Ещё одну сессию
      </button>
    </div>
  );
}

// ============== LESSON PHASE ==============
type StepType = "intro" | "explain" | "examples" | "check";

const MASCOT_TO_FILE: Record<string, string> = {
  default: "/koni/koni-default.png",
  happy: "/koni/koni-happy.png",
  thinking: "/koni/koni-thinking.png",
  surprised: "/koni/koni-surprised.png",
};

function LessonPhase({ lesson, onDone }: { lesson: Lesson; onDone: () => void }) {
  const steps: StepType[] = ["intro", "explain", "examples", "check"];
  const [stepIdx, setStepIdx] = useState(0);
  const [checkAnswer, setCheckAnswer] = useState<string | null>(null);
  const step = steps[stepIdx];
  const progressPct = ((stepIdx + 1) / steps.length) * 100;

  function next() {
    if (stepIdx + 1 >= steps.length) onDone();
    else setStepIdx(stepIdx + 1);
  }

  // Sentence with placeholder rendering for check exercise
  function renderSentence(template: string, picked: string | null, correct: string) {
    const parts = template.split("{?}");
    const isCorrect = picked === correct;
    const fillColor = !picked
      ? "var(--text-muted)"
      : isCorrect
      ? "var(--success)"
      : "var(--primary)";
    return (
      <span style={{ fontFamily: '"Noto Sans JP", system-ui' }}>
        {parts[0]}
        <span style={{
          color: fillColor,
          background: picked ? "transparent" : "var(--primary-soft)",
          padding: "2px 10px", margin: "0 2px", borderRadius: 8,
          fontWeight: picked ? 700 : 400,
        }}>{picked ?? "?"}</span>
        {parts[1]}
      </span>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PhaseHeader phaseIdx={1} label={`Фаза 2 · Урок · ${stepIdx + 1}/${steps.length}`} progress={progressPct} />

      <div className="text-2xl font-extrabold">{lesson.title}</div>
      <div className="text-sm text-muted mb-3">{lesson.subtitle}</div>

      {step === "intro" && (
        <div className="fade-in flex flex-col items-center text-center mt-2">
          <Image src={MASCOT_TO_FILE[lesson.intro.mascot]} width={140} height={140} alt="" />
          <p className="text-base leading-relaxed mt-2">{lesson.intro.text}</p>
        </div>
      )}

      {step === "explain" && (
        <div className="fade-in">
          <div className="rounded-2xl p-4 mb-3" style={{ background: "var(--primary-soft)" }}>
            <div className="text-2xl font-bold text-center py-2" style={{ color: "var(--primary-soft-text)", fontFamily: '"Noto Sans JP", system-ui' }}>
              {lesson.pattern}
            </div>
            <div className="font-mono text-xs text-center text-muted">{lesson.formula}</div>
          </div>
          <div className="rounded-xl p-3.5 text-sm leading-relaxed flex gap-3 items-start" style={{ background: "var(--success-soft)", borderLeft: "3px solid var(--success)" }}>
            <Image src="/koni/koni-thinking.png" width={36} height={36} alt="" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--success)" }}>Объяснение</div>
              {lesson.explanation}
            </div>
          </div>
        </div>
      )}

      {step === "examples" && (
        <div className="fade-in flex flex-col gap-2.5">
          <div className="text-xs text-muted mb-1">Послушай, как это работает:</div>
          {lesson.examples.map((ex, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="text-lg font-semibold" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>{ex.jp}</div>
              <div className="text-xs text-muted italic">{ex.romaji}</div>
              <div className="text-sm mt-1">{ex.ru}</div>
            </div>
          ))}
        </div>
      )}

      {step === "check" && (
        <div className="fade-in">
          <div className="text-sm mb-3">Заполни пропуск:</div>
          <div className="rounded-2xl p-5 text-center mb-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="text-2xl font-semibold leading-relaxed">
              {renderSentence(lesson.check.sentence, checkAnswer, lesson.check.correct)}
            </div>
            <div className="text-xs text-muted mt-2">{lesson.check.ru}</div>
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${lesson.check.options.length}, 1fr)` }}>
            {lesson.check.options.map(p => {
              const isPicked = checkAnswer === p;
              const isCorrect = p === lesson.check.correct;
              let bg = "var(--surface)", border = "2px solid var(--border)", color = "var(--text)";
              if (isPicked && isCorrect) { bg = "#E8EDD8"; border = "2px solid var(--success)"; color = "#3a5224"; }
              else if (isPicked && !isCorrect) { bg = "#FFE4DC"; border = "2px solid var(--primary)"; color = "var(--primary-soft-text)"; }
              return (
                <button key={p} onClick={() => setCheckAnswer(p)} disabled={!!checkAnswer}
                  className="rounded-2xl py-3.5 font-bold" style={{ background: bg, border, color, fontFamily: '"Noto Sans JP", system-ui', fontSize: p.length <= 2 ? 22 : 14 }}>
                  {p}
                </button>
              );
            })}
          </div>
          {checkAnswer && checkAnswer !== lesson.check.correct && (
            <div className="mt-3 text-xs leading-relaxed text-muted">
              Правильно — <span className="font-bold" style={{ color: "var(--success)" }}>{lesson.check.correct}</span>. {lesson.check.explanation}
            </div>
          )}
          {checkAnswer === lesson.check.correct && (
            <div className="mt-3 text-xs leading-relaxed text-muted">
              Точно! {lesson.check.explanation}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 min-h-4" />

      <div style={{
        position: "sticky", bottom: -8, marginLeft: -20, marginRight: -20, marginBottom: -36,
        padding: "12px 20px 24px",
        background: "linear-gradient(to top, var(--bg) 65%, transparent)",
      }}>
        <button onClick={next} disabled={step === "check" && !checkAnswer}
          className="rounded-xl py-3.5 font-bold text-white disabled:opacity-40 w-full" style={{ background: "var(--primary)" }}>
          {stepIdx + 1 >= steps.length ? "К разговору с Кони →" : "Понятно, дальше →"}
        </button>
      </div>
    </div>
  );
}

// ============== TALK PHASE ==============
type Msg =
  | { from: "bot"; jp: string; ru: string }
  | { from: "user"; text: string };


// Минимум реплик прежде чем разрешить выйти
const MIN_TALK_TURNS = 4;

// Стартовая реплика Кони — статичная по теме урока, чтобы не тратить токены и
// гарантировать, что разговор начнётся в нужном русле.
function greetingFor(lessonId: string): { jp: string; ru: string } {
  switch (lessonId) {
    case "wa-desu":
      return { jp: "こんにちは！わたしはコニです。あなたは？", ru: "Привет! Я — Кони. А ты?" };
    case "wo-direct-object":
      return { jp: "おなかすいた？なにをたべますか？", ru: "Проголодался(ась)? Что будешь есть?" };
    case "masen-negation":
      return { jp: "おちゃをのみますか？", ru: "Будешь чай?" };
    default:
      return { jp: "こんにちは！はなしましょう。", ru: "Привет! Давай поговорим." };
  }
}

function TalkPhase({ lesson, onDone }: { lesson: Lesson; onDone: () => void }) {
  const [systemPrompt, setSystemPrompt] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Строим системный промпт на маунте (один раз)
  useEffect(() => {
    const profile = loadProfile();
    const deck = loadDeck();
    const sp = buildSystemPrompt(profile, deck, lesson);
    setSystemPrompt(sp);

    // Стартовая реплика — статичная (без OpenAI), чтоб не тратить токены на старте.
    // Кони сам инициирует диалог по теме урока.
    setMessages([{
      from: "bot",
      jp: greetingFor(lesson.id).jp,
      ru: greetingFor(lesson.id).ru,
    }]);
  }, [lesson.id]);

  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [messages, waiting]);

  async function send() {
    const text = input.trim();
    if (!text || waiting || !systemPrompt) return;
    setInput("");
    setError(null);

    const userMsg: Msg = { from: "user", text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setWaiting(true);

    try {
      // Преобразуем историю в формат OpenAI
      const chatHistory: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        ...newMessages.map((m): ChatMessage =>
          m.from === "bot"
            ? { role: "assistant", content: JSON.stringify({ jp: m.jp, ru: m.ru }) }
            : { role: "user", content: m.text }
        ),
      ];
      const reply = await aiTurn(chatHistory);
      setMessages(m => [...m, { from: "bot", jp: reply.jp, ru: reply.ru }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setWaiting(false);
    }
  }

  // Прогресс — по количеству реплик пользователя
  const userTurns = messages.filter(m => m.from === "user").length;
  const progressPct = Math.min(100, (userTurns / MIN_TALK_TURNS) * 100);
  const canFinish = userTurns >= MIN_TALK_TURNS;
  const aiAvailable = isAiAvailable();

  return (
    <div className="flex flex-col h-full">
      <PhaseHeader phaseIdx={2} label={`Фаза 3 · Разговор · ${userTurns}/${MIN_TALK_TURNS}`} progress={progressPct} />

      <div className="flex flex-col items-center pb-3 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2" style={{ borderColor: "var(--primary)" }}>
          <Image src="/koni/koni-happy.png" alt="Кони" fill className="object-cover" />
        </div>
        <div className="font-bold text-sm mt-1.5">Кони-сэнсэй</div>
        <div className="text-[11px] font-semibold flex items-center gap-1" style={{ color: "var(--success)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block" }}></span>
          Тема: {lesson.title}
        </div>
      </div>

      <div ref={scrollerRef} className="flex-1 flex flex-col gap-2.5 py-3 overflow-y-auto">
        {messages.map((m, i) => <Message key={i} msg={m} />)}
        {waiting && (
          <div className="self-start rounded-2xl py-2 px-3.5 fade-in" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderBottomLeftRadius: 4 }}>
            <span className="inline-block animate-pulse">…</span>
          </div>
        )}
        {error && (
          <div className="self-stretch rounded-xl py-2 px-3 text-xs" style={{ background: "#FFE4DC", color: "var(--primary-soft-text)" }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      {!aiAvailable && (
        <div className="rounded-xl p-2 mb-2 text-[11px] text-muted text-center" style={{ background: "var(--surface)" }}>
          AI Talk не настроен. Добавь NEXT_PUBLIC_OPENAI_API_KEY в .env.local.
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={aiAvailable ? "Напиши Кони (RU или JP)…" : "AI недоступен"}
          disabled={!aiAvailable || waiting}
          className="flex-1 rounded-xl px-3 py-2.5 text-sm outline-none disabled:opacity-50"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <button
          onClick={send}
          disabled={!input.trim() || waiting || !aiAvailable}
          className="rounded-xl px-4 font-bold text-white disabled:opacity-40"
          style={{ background: "var(--primary)" }}
        >
          →
        </button>
      </div>

      {canFinish && (
        <button onClick={onDone} className="rounded-xl py-3 font-bold text-white mt-2 text-sm" style={{ background: "var(--success)" }}>
          ✓ Завершить разговор
        </button>
      )}
    </div>
  );
}

function Message({ msg }: { msg: Msg }) {
  if (msg.from === "bot") {
    return (
      <div className="self-start max-w-[85%] rounded-2xl py-2 px-3.5 fade-in" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderBottomLeftRadius: 4 }}>
        <div className="text-sm font-semibold" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>{msg.jp}</div>
        <div className="text-[11px] text-muted mt-0.5">{msg.ru}</div>
      </div>
    );
  }
  // user-сообщение — текст любого языка (что напечатал)
  return (
    <div className="self-end max-w-[85%] rounded-2xl py-2 px-3.5 fade-in" style={{ background: "var(--primary)", color: "#fff", borderBottomRightRadius: 4 }}>
      <div className="text-sm font-semibold" style={{ fontFamily: '"Noto Sans JP", system-ui' }}>{msg.text}</div>
    </div>
  );
}

// ============== DONE SCREEN ==============
function DoneScreen({ lesson, onAgain }: { lesson: Lesson; onAgain: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center fade-in">
      <Image src="/koni/koni-happy.png" width={220} height={220} alt="" />
      <h1 className="text-3xl font-extrabold mt-2">Готово!</h1>
      <p className="text-muted mt-2 mb-2 max-w-xs">Сессия закончена: повторил карточки, выучил <span className="font-bold" style={{ color: "var(--primary)" }}>{lesson.title}</span>, поговорил с Кони.</p>
      <p className="text-xs text-muted mb-8 max-w-xs">Стрик +1. Завтра Кони напомнит то, что начинаешь забывать (FSRS-алгоритм).</p>
      <Link href="/" className="rounded-xl py-3.5 px-10 font-bold text-white" style={{ background: "var(--primary)" }}>
        На главный
      </Link>
      <button onClick={onAgain} className="text-sm text-muted underline mt-3">
        Ещё одну сессию
      </button>
    </div>
  );
}
