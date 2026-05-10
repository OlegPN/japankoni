// Централизованная логика «фазы обучения». Решает что показывать ученику
// в зависимости от его прогресса.
//
// Дизайн-решение для M1:
// 1) "kana-starter" — нулевик учит ТОЛЬКО хирагану, 5 знаков в день.
// 2) "open" — после хираганы открыты сразу: катакана, vocab из сцены, кандзи.
//    Anime Loop = главный мотиватор: ученик слушает сцену → тапает слова → учит.
//    Чтения кандзи (on/kun) пока в SRS не включаем — добавим в M2 после катаканы.

import { HIRAGANA } from "./hiragana";
import { KATAKANA } from "./katakana";
import { KANJI } from "./kanji";
import { VOCAB_IDS } from "./vocab"; // тип-карты подтягиваем оттуда
import { Deck } from "./srs";

export const KANA_PER_DAY = 5;
export const HIRAGANA_TOTAL = HIRAGANA.length; // 46
export const KATAKANA_TOTAL = KATAKANA.length; // 46
export const KANA_DAYS_TOTAL = Math.ceil(HIRAGANA_TOTAL / KANA_PER_DAY); // 10

const HIRAGANA_IDS = HIRAGANA.map(k => `hiragana:${k.char}`);
const KATAKANA_IDS = KATAKANA.map(k => `katakana:${k.char}`);
const KANJI_IDS = KANJI.map(k => `kanji:${k.char}`);

export type LearningPhase =
  | {
      kind: "kana-starter";
      /** Сколько символов хираганы уже видел ученик (0..46) */
      hiraganaSeen: number;
      /** Какой это день (1..10) */
      day: number;
      totalDays: number;
      /** 5 знаков сегодняшнего дня */
      todayChars: string[];
      /** Все ID карт хираганы — пул для Review */
      ids: string[];
    }
  | {
      kind: "open";
      /** Все доступные карты: хирагана + катакана + vocab + кандзи */
      ids: string[];
      /** Прогресс по трекам — для дашборда и решения о новых картах */
      progress: {
        hiragana: { seen: number; total: number };
        katakana: { seen: number; total: number };
        vocab:    { seen: number; total: number };
        kanji:    { seen: number; total: number };
      };
      /** Очередь новых карт для постепенного введения (5/день target) */
      newQueue: string[];
    };

/**
 * Сколько хираганы ученик уже «видел» (карта появлялась хотя бы раз — есть в FSRS-колоде).
 */
export function countHiraganaSeen(deck: Deck): number {
  return HIRAGANA_IDS.filter(id => deck.byId[id]).length;
}

/**
 * Главная функция: определяет текущую фазу обучения.
 */
export function getCurrentPhase(deck: Deck, completedLessons: string[]): LearningPhase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = completedLessons; // зарезервировано для будущих фаз ("advanced" в M2)
  const hiraganaSeen = countHiraganaSeen(deck);

  if (hiraganaSeen < HIRAGANA_TOTAL) {
    const day = Math.min(KANA_DAYS_TOTAL, Math.floor(hiraganaSeen / KANA_PER_DAY) + 1);
    const todayChars = HIRAGANA.slice(hiraganaSeen, hiraganaSeen + KANA_PER_DAY).map(k => k.char);
    return {
      kind: "kana-starter",
      hiraganaSeen,
      day,
      totalDays: KANA_DAYS_TOTAL,
      todayChars,
      ids: HIRAGANA_IDS,
    };
  }

  // Open phase: всё открыто
  const katakanaSeen = KATAKANA_IDS.filter(id => deck.byId[id]).length;
  const vocabSeen    = VOCAB_IDS.filter(id => deck.byId[id]).length;
  const kanjiSeen    = KANJI_IDS.filter(id => deck.byId[id]).length;

  // Очередь новых: сначала катакана (5/день), потом vocab из сцены, потом кандзи.
  // Такой порядок: ученик быстро дочитывает катакану (она нужна для сцены — アキ),
  // дальше осваивает vocab, дальше — кандзи как бонус.
  const newKatakana = KATAKANA_IDS.filter(id => !deck.byId[id]);
  const newVocab    = VOCAB_IDS.filter(id => !deck.byId[id]);
  const newKanji    = KANJI_IDS.filter(id => !deck.byId[id]);
  const newQueue    = [...newKatakana, ...newVocab, ...newKanji];

  return {
    kind: "open",
    ids: [...HIRAGANA_IDS, ...KATAKANA_IDS, ...VOCAB_IDS, ...KANJI_IDS],
    progress: {
      hiragana: { seen: HIRAGANA_TOTAL,    total: HIRAGANA_TOTAL },
      katakana: { seen: katakanaSeen,      total: KATAKANA_TOTAL },
      vocab:    { seen: vocabSeen,         total: VOCAB_IDS.length },
      kanji:    { seen: kanjiSeen,         total: KANJI_IDS.length },
    },
    newQueue,
  };
}

/**
 * Сколько новых карт «должен» учить сегодня.
 * В кана-стартере = KANA_PER_DAY (5).
 * В open = тоже 5 (катакана быстро, потом vocab/kanji мягче).
 */
export function newCardsTargetToday(phase: LearningPhase): number {
  if (phase.kind === "kana-starter") return KANA_PER_DAY;
  return KANA_PER_DAY;
}
