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

  {
    id: "ramen-bar",
    title: "Рамен-бар",
    subtitle: "Финал: は・を・です вместе",
    image: "/scenes/ramen-bar.png",
    unlockAfter: "kana-complete",
    lines: [
      {
        speaker: "A",
        ttsText: "いらっしゃいませ！",
        audio: "/scenes/audio/ramen-bar-0.mp3",
        romaji: "irasshaimase!",
        ru: "Добро пожаловать!",
        tokens: [
          { kind: "word", text: "いらっしゃいませ", vocabId: "vocab:いらっしゃいませ" },
          { kind: "text", text: "！" },
        ],
      },
      {
        speaker: "B",
        ttsText: "ラーメンをひとつください。",
        audio: "/scenes/audio/ramen-bar-1.mp3",
        romaji: "raamen wo hitotsu kudasai.",
        ru: "Один рамен, пожалуйста.",
        tokens: [
          { kind: "word", text: "ラーメン", vocabId: "vocab:ラーメン" },
          { kind: "text", text: "を" },
          { kind: "text", text: "ひとつ" },
          { kind: "word", text: "ください", vocabId: "vocab:ください" },
          { kind: "text", text: "。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "ラーメンですね。",
        audio: "/scenes/audio/ramen-bar-2.mp3",
        romaji: "raamen desu ne.",
        ru: "Рамен, верно.",
        tokens: [
          { kind: "word", text: "ラーメン", vocabId: "vocab:ラーメン" },
          { kind: "text", text: "ですね。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "どうぞ。あついですよ。",
        audio: "/scenes/audio/ramen-bar-3.mp3",
        romaji: "douzo. atsui desu yo.",
        ru: "Прошу. Горячее.",
        tokens: [
          { kind: "word", text: "どうぞ", vocabId: "vocab:どうぞ" },
          { kind: "text", text: "。" },
          { kind: "word", text: "あつい", vocabId: "vocab:あつい_hot" },
          { kind: "text", text: "ですよ。" },
        ],
      },
      {
        speaker: "B",
        ttsText: "いただきます！おいしい！",
        audio: "/scenes/audio/ramen-bar-4.mp3",
        romaji: "itadakimasu! oishii!",
        ru: "Приятного аппетита! Вкусно!",
        tokens: [
          { kind: "word", text: "いただきます", vocabId: "vocab:いただきます" },
          { kind: "text", text: "！" },
          { kind: "word", text: "おいしい", vocabId: "vocab:おいしい" },
          { kind: "text", text: "！" },
        ],
      },
    ],
  },

  {
    id: "train",
    title: "Электричка",
    subtitle: "Спрашиваем дорогу",
    image: "/scenes/train.png",
    unlockAfter: "kana-complete",
    lines: [
      {
        speaker: "A",
        ttsText: "すみません、しんじゅくえきはここですか？",
        audio: "/scenes/audio/train-0.mp3",
        romaji: "sumimasen, shinjuku eki wa koko desu ka?",
        ru: "Извините, станция Синдзюку — это здесь?",
        tokens: [
          { kind: "word", text: "すみません", vocabId: "vocab:すみません" },
          { kind: "text", text: "、しんじゅく" },
          { kind: "word", text: "えき", vocabId: "vocab:えき" },
          { kind: "text", text: "は" },
          { kind: "text", text: "ここ" },
          { kind: "text", text: "ですか？" },
        ],
      },
      {
        speaker: "B",
        ttsText: "いいえ、つぎのえきですよ。",
        audio: "/scenes/audio/train-1.mp3",
        romaji: "iie, tsugi no eki desu yo.",
        ru: "Нет, это следующая станция.",
        tokens: [
          { kind: "word", text: "いいえ", vocabId: "vocab:いいえ" },
          { kind: "text", text: "、" },
          { kind: "word", text: "つぎ", vocabId: "vocab:つぎ" },
          { kind: "text", text: "の" },
          { kind: "word", text: "えき", vocabId: "vocab:えき" },
          { kind: "text", text: "ですよ。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "あ、そうですか。ありがとうございます！",
        audio: "/scenes/audio/train-2.mp3",
        romaji: "a, sou desu ka. arigatou gozaimasu!",
        ru: "А, вот как. Большое спасибо!",
        tokens: [
          { kind: "text", text: "あ、" },
          { kind: "word", text: "そうですか", vocabId: "vocab:そうですか" },
          { kind: "text", text: "。" },
          { kind: "word", text: "ありがとう", vocabId: "vocab:ありがとう" },
          { kind: "text", text: "ございます！" },
        ],
      },
    ],
  },

  {
    id: "hanami",
    title: "Ханами",
    subtitle: "Любование сакурой",
    image: "/scenes/hanami.png",
    unlockAfter: "kana-complete",
    lines: [
      {
        speaker: "A",
        ttsText: "さくらがきれいですね。",
        audio: "/scenes/audio/hanami-0.mp3",
        romaji: "sakura ga kirei desu ne.",
        ru: "Сакура красивая, правда?",
        tokens: [
          { kind: "word", text: "さくら", vocabId: "vocab:さくら" },
          { kind: "text", text: "が" },
          { kind: "word", text: "きれい", vocabId: "vocab:きれい" },
          { kind: "text", text: "ですね。" },
        ],
      },
      {
        speaker: "B",
        ttsText: "はい、ほんとうにきれいです。",
        audio: "/scenes/audio/hanami-1.mp3",
        romaji: "hai, hontou ni kirei desu.",
        ru: "Да, действительно красивая.",
        tokens: [
          { kind: "word", text: "はい", vocabId: "vocab:はい" },
          { kind: "text", text: "、" },
          { kind: "word", text: "ほんとう", vocabId: "vocab:ほんとう" },
          { kind: "text", text: "に" },
          { kind: "word", text: "きれい", vocabId: "vocab:きれい" },
          { kind: "text", text: "です。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "おべんとうをたべましょう。",
        audio: "/scenes/audio/hanami-2.mp3",
        romaji: "obentou wo tabemashou.",
        ru: "Давай поедим бенто.",
        tokens: [
          { kind: "word", text: "おべんとう", vocabId: "vocab:おべんとう" },
          { kind: "text", text: "を" },
          { kind: "word", text: "たべる", vocabId: "vocab:たべる" },
          { kind: "text", text: "ましょう。" },
        ],
      },
      {
        speaker: "B",
        ttsText: "いただきます！",
        audio: "/scenes/audio/hanami-3.mp3",
        romaji: "itadakimasu!",
        ru: "Приятного аппетита!",
        tokens: [
          { kind: "word", text: "いただきます", vocabId: "vocab:いただきます" },
          { kind: "text", text: "！" },
        ],
      },
    ],
  },

  {
    id: "family-dinner",
    title: "Ужин с семьёй",
    subtitle: "Дома за общим столом",
    image: "/scenes/family-dinner.png",
    unlockAfter: "kana-complete",
    lines: [
      {
        speaker: "A",
        ttsText: "みんな、ごはんですよ！",
        audio: "/scenes/audio/family-dinner-0.mp3",
        romaji: "minna, gohan desu yo!",
        ru: "Все, еда готова!",
        tokens: [
          { kind: "word", text: "みんな", vocabId: "vocab:みんな" },
          { kind: "text", text: "、" },
          { kind: "word", text: "ごはん", vocabId: "vocab:ごはん" },
          { kind: "text", text: "ですよ！" },
        ],
      },
      {
        speaker: "B",
        ttsText: "わあ、おいしそうですね。",
        audio: "/scenes/audio/family-dinner-1.mp3",
        romaji: "waa, oishisou desu ne.",
        ru: "Ва, выглядит вкусно!",
        tokens: [
          { kind: "text", text: "わあ、" },
          { kind: "word", text: "おいしい", vocabId: "vocab:おいしい" },
          { kind: "text", text: "そうですね。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "たくさんたべてください。",
        audio: "/scenes/audio/family-dinner-2.mp3",
        romaji: "takusan tabete kudasai.",
        ru: "Ешьте много.",
        tokens: [
          { kind: "word", text: "たくさん", vocabId: "vocab:たくさん" },
          { kind: "word", text: "たべる", vocabId: "vocab:たべる" },
          { kind: "text", text: "て" },
          { kind: "word", text: "ください", vocabId: "vocab:ください" },
          { kind: "text", text: "。" },
        ],
      },
      {
        speaker: "B",
        ttsText: "いただきます！",
        audio: "/scenes/audio/family-dinner-3.mp3",
        romaji: "itadakimasu!",
        ru: "Приятного аппетита!",
        tokens: [
          { kind: "word", text: "いただきます", vocabId: "vocab:いただきます" },
          { kind: "text", text: "！" },
        ],
      },
    ],
  },

  {
    id: "konbini",
    title: "Конбини",
    subtitle: "В круглосуточном магазине",
    image: "/scenes/konbini.png",
    unlockAfter: "kana-complete",
    lines: [
      {
        speaker: "A",
        ttsText: "すみません、コーヒーはどこですか？",
        audio: "/scenes/audio/konbini-0.mp3",
        romaji: "sumimasen, koohii wa doko desu ka?",
        ru: "Извините, где кофе?",
        tokens: [
          { kind: "word", text: "すみません", vocabId: "vocab:すみません" },
          { kind: "text", text: "、" },
          { kind: "word", text: "コーヒー", vocabId: "vocab:コーヒー" },
          { kind: "text", text: "は" },
          { kind: "word", text: "どこ", vocabId: "vocab:どこ" },
          { kind: "text", text: "ですか？" },
        ],
      },
      {
        speaker: "B",
        ttsText: "あそこですよ。",
        audio: "/scenes/audio/konbini-1.mp3",
        romaji: "asoko desu yo.",
        ru: "Вон там.",
        tokens: [
          { kind: "text", text: "あそこ" },
          { kind: "text", text: "ですよ。" },
        ],
      },
      {
        speaker: "A",
        ttsText: "ありがとう。これをください。",
        audio: "/scenes/audio/konbini-2.mp3",
        romaji: "arigatou. kore wo kudasai.",
        ru: "Спасибо. Это, пожалуйста.",
        tokens: [
          { kind: "word", text: "ありがとう", vocabId: "vocab:ありがとう" },
          { kind: "text", text: "。これを" },
          { kind: "word", text: "ください", vocabId: "vocab:ください" },
          { kind: "text", text: "。" },
        ],
      },
      {
        speaker: "B",
        ttsText: "200えんです。",
        audio: "/scenes/audio/konbini-3.mp3",
        romaji: "nihyaku en desu.",
        ru: "200 иен.",
        tokens: [
          { kind: "text", text: "200" },
          { kind: "word", text: "えん", vocabId: "vocab:えん" },
          { kind: "text", text: "です。" },
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
