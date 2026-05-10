// Унифицированный слой карточек поверх hiragana + katakana + kanji + readings.
// Review-фаза работает только с этим типом, не зная про конкретные источники.

import { HIRAGANA, pickDistractors } from "./hiragana";
import { KATAKANA, pickKatakanaDistractors } from "./katakana";
import { KANJI, KANJI_WITH_ONYOMI, KANJI_WITH_KUNYOMI, pickKanjiDistractors, pickOnyomiDistractors, pickKunyomiDistractors } from "./kanji";
import { VOCAB, pickVocabDistractors } from "./vocab";

export type CardKind = "hiragana" | "katakana" | "kanji" | "kanji-on" | "kanji-kun" | "vocab";

export type ReviewCard = {
  id: string;             // "hiragana:あ" / "katakana:ア" / "kanji:一" / "kanji-on:一" / "kanji-kun:一"
  kind: CardKind;
  prompt: string;         // что показать большим: "あ" / "ア" / "一"
  question: string;       // подсказка для пользователя
  answer: string;         // главный правильный ответ
  acceptedAnswers: string[]; // все варианты, считающиеся верными (для кандзи с несколькими чтениями)
  choices: string[];      // 4 варианта (включая правильный), уже перемешаны
  hint: string;           // мнемоника
  promptLabel: string;    // подпись над промптом
};

const HIRAGANA_BY_ID: Record<string, ReviewCard> = {};
for (const k of HIRAGANA) {
  const id = `hiragana:${k.char}`;
  HIRAGANA_BY_ID[id] = {
    id, kind: "hiragana", prompt: k.char,
    promptLabel: "Хирагана",
    question: "Какое чтение?",
    answer: k.romaji,
    acceptedAnswers: [k.romaji],
    choices: [],
    hint: k.mnemonic,
  };
}

const KATAKANA_BY_ID: Record<string, ReviewCard> = {};
for (const k of KATAKANA) {
  const id = `katakana:${k.char}`;
  KATAKANA_BY_ID[id] = {
    id, kind: "katakana", prompt: k.char,
    promptLabel: "Катакана",
    question: "Какое чтение?",
    answer: k.romaji,
    acceptedAnswers: [k.romaji],
    choices: [],
    hint: k.mnemonic,
  };
}

const KANJI_BY_ID: Record<string, ReviewCard> = {};
for (const k of KANJI) {
  const id = `kanji:${k.char}`;
  KANJI_BY_ID[id] = {
    id, kind: "kanji", prompt: k.char,
    promptLabel: "Кандзи",
    question: "Что значит?",
    answer: k.meaning,
    acceptedAnswers: k.meanings,
    choices: [],
    hint: k.mnemonic,
  };
}

const KANJI_ON_BY_ID: Record<string, ReviewCard> = {};
for (const k of KANJI_WITH_ONYOMI) {
  const id = `kanji-on:${k.char}`;
  KANJI_ON_BY_ID[id] = {
    id, kind: "kanji-on", prompt: k.char,
    promptLabel: "Он-чтение (китайское)",
    question: "Как читается? (катакана)",
    answer: k.onyomi[0],
    acceptedAnswers: k.onyomi,
    choices: [],
    hint: `${k.mnemonic} · значение: ${k.meaning}`,
  };
}

const KANJI_KUN_BY_ID: Record<string, ReviewCard> = {};
for (const k of KANJI_WITH_KUNYOMI) {
  const id = `kanji-kun:${k.char}`;
  KANJI_KUN_BY_ID[id] = {
    id, kind: "kanji-kun", prompt: k.char,
    promptLabel: "Кун-чтение (японское)",
    question: "Как читается? (хирагана)",
    answer: k.kunyomi[0],
    acceptedAnswers: k.kunyomi,
    choices: [],
    hint: `${k.mnemonic} · значение: ${k.meaning}`,
  };
}

const VOCAB_BY_ID: Record<string, ReviewCard> = {};
for (const v of VOCAB) {
  const id = v.id;
  // Промпт: основная форма (хирагана/катакана), плюс кандзи-форма мелким (если есть)
  const promptText = v.kanji ? `${v.word}\n${v.kanji}` : v.word;
  VOCAB_BY_ID[id] = {
    id, kind: "vocab", prompt: promptText,
    promptLabel: "Слово",
    question: "Что значит?",
    answer: v.ru,
    acceptedAnswers: [v.ru, ...(v.meanings ?? [])],
    choices: [],
    hint: v.mnemonic ?? `${v.romaji} · ${v.partOfSpeech}`,
  };
}

export const HIRAGANA_IDS = Object.keys(HIRAGANA_BY_ID);
export const KATAKANA_IDS = Object.keys(KATAKANA_BY_ID);
export const KANJI_IDS = Object.keys(KANJI_BY_ID);
export const KANJI_ON_IDS = Object.keys(KANJI_ON_BY_ID);
export const KANJI_KUN_IDS = Object.keys(KANJI_KUN_BY_ID);
export const VOCAB_IDS = Object.keys(VOCAB_BY_ID);

export const ALL_CARD_IDS = [
  ...HIRAGANA_IDS,
  ...KATAKANA_IDS,
  ...VOCAB_IDS,
  ...KANJI_IDS,
  ...KANJI_ON_IDS,
  ...KANJI_KUN_IDS,
];

const ALL_BY_ID: Record<string, ReviewCard> = {
  ...HIRAGANA_BY_ID,
  ...KATAKANA_BY_ID,
  ...VOCAB_BY_ID,
  ...KANJI_BY_ID,
  ...KANJI_ON_BY_ID,
  ...KANJI_KUN_BY_ID,
};

export function getCard(id: string): ReviewCard | null {
  const base = ALL_BY_ID[id];
  if (!base) return null;
  // генерируем варианты заново при каждом получении (рандом)
  let distractors: string[];
  switch (base.kind) {
    case "hiragana":  distractors = pickDistractors(base.answer, HIRAGANA, 3); break;
    case "katakana":  distractors = pickKatakanaDistractors(base.answer, KATAKANA, 3); break;
    case "kanji":     distractors = pickKanjiDistractors(base.answer, 3); break;
    case "kanji-on":  distractors = pickOnyomiDistractors(base.answer, 3); break;
    case "kanji-kun": distractors = pickKunyomiDistractors(base.answer, 3); break;
    case "vocab":     distractors = pickVocabDistractors(base.answer, 3); break;
  }
  const choices = [...distractors, base.answer].sort(() => Math.random() - 0.5);
  return { ...base, choices };
}

/** Проверка ответа: учитывает все принимаемые варианты (для кандзи с несколькими чтениями/значениями) */
export function isCorrectAnswer(card: ReviewCard, answer: string): boolean {
  return card.acceptedAnswers.some(a => a === answer);
}

/**
 * Подбирает варианты для listen-режима: 4 «промпта» карточек того же типа
 * (3 distractor + правильный). В listen-режиме ученик слышит аудио и
 * выбирает правильный визуальный знак/слово.
 */
export function getListenChoices(card: ReviewCard): string[] {
  const pool = ALL_CARD_IDS
    .filter(id => id !== card.id)
    .filter(id => ALL_BY_ID[id].kind === card.kind);
  const distractors = new Set<string>();
  while (distractors.size < 3 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    const otherCard = ALL_BY_ID[pool[idx]];
    pool.splice(idx, 1);
    // Берём именно `prompt` — то, что показывается в визуальном режиме
    distractors.add(otherCard.prompt);
  }
  const choices = [card.prompt, ...distractors];
  return choices.sort(() => Math.random() - 0.5);
}

/**
 * Путь к аудио-файлу для карточки (если есть). Файлы генерятся
 * scripts/generate-audio.mjs голосом Yui.
 *
 * Ключи файлов:
 * - hiragana / katakana: romaji ("a.mp3", "ka.mp3")
 * - vocab: romaji слова без не-букв ("hajimemashite.mp3")
 * - kanji-on / kanji-kun: URL-encoded char ("%E4%B8%80.mp3" для 一)
 */
export function audioFor(card: ReviewCard): string | null {
  switch (card.kind) {
    case "hiragana":  return `/audio/hiragana/${card.answer}.mp3`;
    case "katakana":  return `/audio/katakana/${card.answer}.mp3`;
    case "vocab": {
      // У vocab `answer` = русский перевод; нужен romaji слова → берём из VOCAB.
      const v = VOCAB.find(x => x.id === card.id);
      if (!v) return null;
      const safe = v.romaji.replace(/[^a-z0-9]/gi, "");
      return `/audio/vocab/${safe}.mp3`;
    }
    case "kanji-on":  return `/audio/kanji-on/${encodeURIComponent(card.prompt)}.mp3`;
    case "kanji-kun": return `/audio/kanji-kun/${encodeURIComponent(card.prompt)}.mp3`;
    case "kanji":     return null; // у meaning-карточки нет аудио
  }
}
