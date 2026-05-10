// Anime Loop сцены. Каждая сцена = иллюстрация + аудио + субтитры с тапаемыми словами.
// Привязана к лексике (vocab.ts).

import { VOCAB, Vocab } from "./vocab";

export type SubtitleToken =
  | { kind: "word"; text: string; vocabId: string }   // тапаемое слово, привязано к vocab
  | { kind: "text"; text: string };                   // неперевариваемые куски (частицы из урока, пунктуация)

export type SubtitleLine = {
  /** Кто говорит (для отображения «A:» / «B:») */
  speaker: "A" | "B";
  /** Реплика, разбитая на токены: тапаемые слова + связки */
  tokens: SubtitleToken[];
  /** Ромадзи (для подсказки) */
  romaji: string;
  /** Русский перевод */
  ru: string;
  /** Путь к MP3 этой реплики (генерируется ElevenLabs). Если нет — mock-режим. */
  audio?: string;
  /** Текст для TTS-генерации (если отличается от собранных tokens) — может пригодиться для плавности */
  ttsText?: string;
};

export type Scene = {
  id: string;
  title: string;
  subtitle: string;
  /** Картинка-фон в /public/scenes/ */
  image: string;
  /** Субтитры */
  lines: SubtitleLine[];
  /** ID урока, после которого сцена разблокируется (или "kana-complete" — после хираганы) */
  unlockAfter: string;
};

export const SCENES: Scene[] = [
  {
    id: "school-yard",
    title: "Школьный двор",
    subtitle: "Знакомство одноклассников весной",
    image: "/scenes/school-yard.png",
    unlockAfter: "kana-complete",
    lines: [
      {
        speaker: "A",
        ttsText: "あ、はじめまして！",
        audio: "/scenes/audio/school-yard-0.mp3",
        romaji: "a, hajimemashite!",
        ru: "А, приятно познакомиться!",
        tokens: [
          { kind: "text", text: "あ、" },
          { kind: "word", text: "はじめまして", vocabId: "vocab:はじめまして" },
          { kind: "text", text: "！" },
        ],
      },
      {
        speaker: "B",
        ttsText: "はじめまして。わたしはアキです。",
        audio: "/scenes/audio/school-yard-1.mp3",
        romaji: "hajimemashite. watashi wa Aki desu.",
        ru: "Приятно познакомиться. Я — Аки.",
        tokens: [
          { kind: "word", text: "はじめまして", vocabId: "vocab:はじめまして" },
          { kind: "text", text: "。" },
          { kind: "word", text: "わたし", vocabId: "vocab:わたし" },
          { kind: "text", text: "は" },
          { kind: "text", text: "アキ" },
          { kind: "text", text: "です。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "アキさんはがくせいですか？",
        audio: "/scenes/audio/school-yard-2.mp3",
        romaji: "Aki-san wa gakusei desu ka?",
        ru: "Аки, ты студентка?",
        tokens: [
          { kind: "text", text: "アキ" },
          { kind: "word", text: "さん", vocabId: "vocab:さん" },
          { kind: "text", text: "は" },
          { kind: "word", text: "がくせい", vocabId: "vocab:がくせい" },
          { kind: "text", text: "ですか？" },
        ],
      },
      {
        speaker: "B",
        ttsText: "はい、わたしもがくせいです。",
        audio: "/scenes/audio/school-yard-3.mp3",
        romaji: "hai, watashi mo gakusei desu.",
        ru: "Да, я тоже студентка.",
        tokens: [
          { kind: "word", text: "はい", vocabId: "vocab:はい" },
          { kind: "text", text: "、" },
          { kind: "word", text: "わたし", vocabId: "vocab:わたし" },
          { kind: "text", text: "も" },
          { kind: "word", text: "がくせい", vocabId: "vocab:がくせい" },
          { kind: "text", text: "です。" },
        ],
      },
    ],
  },
  {
    id: "cafe",
    title: "Дождливое кафе",
    subtitle: "Заказ напитка под зонтом",
    image: "/scenes/cafe.png",
    unlockAfter: "kana-complete",
    lines: [
      {
        speaker: "A",
        ttsText: "いらっしゃいませ。",
        audio: "/scenes/audio/cafe-0.mp3",
        romaji: "irasshaimase.",
        ru: "Добро пожаловать.",
        tokens: [
          { kind: "word", text: "いらっしゃいませ", vocabId: "vocab:いらっしゃいませ" },
          { kind: "text", text: "。" },
        ],
      },
      {
        speaker: "B",
        ttsText: "すみません、おちゃをください。",
        audio: "/scenes/audio/cafe-1.mp3",
        romaji: "sumimasen, ocha wo kudasai.",
        ru: "Извините, чай, пожалуйста.",
        tokens: [
          { kind: "word", text: "すみません", vocabId: "vocab:すみません" },
          { kind: "text", text: "、" },
          { kind: "word", text: "おちゃ", vocabId: "vocab:おちゃ" },
          { kind: "text", text: "を" },
          { kind: "word", text: "ください", vocabId: "vocab:ください" },
          { kind: "text", text: "。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "はい、おちゃですね。",
        audio: "/scenes/audio/cafe-2.mp3",
        romaji: "hai, ocha desu ne.",
        ru: "Да, чай, верно.",
        tokens: [
          { kind: "word", text: "はい", vocabId: "vocab:はい" },
          { kind: "text", text: "、" },
          { kind: "word", text: "おちゃ", vocabId: "vocab:おちゃ" },
          { kind: "text", text: "ですね。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "どうぞ。",
        audio: "/scenes/audio/cafe-3.mp3",
        romaji: "douzo.",
        ru: "Пожалуйста.",
        tokens: [
          { kind: "word", text: "どうぞ", vocabId: "vocab:どうぞ" },
          { kind: "text", text: "。" },
        ],
      },
      {
        speaker: "B",
        ttsText: "ありがとうございます。",
        audio: "/scenes/audio/cafe-4.mp3",
        romaji: "arigatou gozaimasu.",
        ru: "Большое спасибо.",
        tokens: [
          { kind: "word", text: "ありがとう", vocabId: "vocab:ありがとう" },
          { kind: "text", text: "ございます。" },
        ],
      },
    ],
  },
  {
    id: "izakaya",
    title: "Идзакая",
    subtitle: "Вежливый отказ среди друзей",
    image: "/scenes/izakaya.png",
    unlockAfter: "kana-complete",
    lines: [
      {
        speaker: "A",
        ttsText: "アキさん、おさけをのみますか？",
        audio: "/scenes/audio/izakaya-0.mp3",
        romaji: "Aki-san, osake wo nomimasu ka?",
        ru: "Аки, будешь сакэ?",
        tokens: [
          { kind: "text", text: "アキ" },
          { kind: "word", text: "さん", vocabId: "vocab:さん" },
          { kind: "text", text: "、" },
          { kind: "word", text: "おさけ", vocabId: "vocab:おさけ" },
          { kind: "text", text: "を" },
          { kind: "word", text: "のむ", vocabId: "vocab:のむ" },
          { kind: "text", text: "ますか？" },
        ],
      },
      {
        speaker: "B",
        ttsText: "いいえ、わたしはのみません。",
        audio: "/scenes/audio/izakaya-1.mp3",
        romaji: "iie, watashi wa nomimasen.",
        ru: "Нет, я не пью.",
        tokens: [
          { kind: "word", text: "いいえ", vocabId: "vocab:いいえ" },
          { kind: "text", text: "、" },
          { kind: "word", text: "わたし", vocabId: "vocab:わたし" },
          { kind: "text", text: "は" },
          { kind: "word", text: "のむ", vocabId: "vocab:のむ" },
          { kind: "text", text: "ません。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "そうですか。じゃ、おちゃは？",
        audio: "/scenes/audio/izakaya-2.mp3",
        romaji: "sou desu ka. ja, ocha wa?",
        ru: "Вот как. А чай?",
        tokens: [
          { kind: "word", text: "そうですか", vocabId: "vocab:そうですか" },
          { kind: "text", text: "。" },
          { kind: "word", text: "じゃ", vocabId: "vocab:じゃ" },
          { kind: "text", text: "、" },
          { kind: "word", text: "おちゃ", vocabId: "vocab:おちゃ" },
          { kind: "text", text: "は？" },
        ],
      },
      {
        speaker: "B",
        ttsText: "はい、おちゃをおねがいします。",
        audio: "/scenes/audio/izakaya-3.mp3",
        romaji: "hai, ocha wo onegaishimasu.",
        ru: "Да, чай, прошу.",
        tokens: [
          { kind: "word", text: "はい", vocabId: "vocab:はい" },
          { kind: "text", text: "、" },
          { kind: "word", text: "おちゃ", vocabId: "vocab:おちゃ" },
          { kind: "text", text: "を" },
          { kind: "word", text: "おねがいします", vocabId: "vocab:おねがいします" },
          { kind: "text", text: "。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "わかりました！",
        audio: "/scenes/audio/izakaya-4.mp3",
        romaji: "wakarimashita!",
        ru: "Понял!",
        tokens: [
          { kind: "word", text: "わかりました", vocabId: "vocab:わかりました" },
          { kind: "text", text: "！" },
        ],
      },
    ],
  },
];

/** Все vocab-ID, появляющиеся в сцене */
export function sceneVocab(scene: Scene): Vocab[] {
  const ids = new Set<string>();
  for (const line of scene.lines) {
    for (const t of line.tokens) {
      if (t.kind === "word") ids.add(t.vocabId);
    }
  }
  return VOCAB.filter(v => ids.has(v.id));
}

export function findScene(id: string): Scene | undefined {
  return SCENES.find(s => s.id === id);
}
