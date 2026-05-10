// Обёртка над ts-fsrs + localStorage. Хранит карточки ученика и расписание.
import { fsrs, generatorParameters, Rating, createEmptyCard, Card, FSRS } from "ts-fsrs";

export type CardState = {
  id: string;        // уникальный ключ (например, "hiragana:あ")
  card: Card;        // состояние FSRS
  lastSeen?: number; // ms timestamp
};

export type Deck = {
  byId: Record<string, CardState>;
};

const STORAGE_KEY = "koni:deck:v1";

const params = generatorParameters({
  enable_fuzz: true,
  enable_short_term: true,
});

let _engine: FSRS | null = null;
function engine(): FSRS {
  if (!_engine) _engine = fsrs(params);
  return _engine;
}

export function loadDeck(): Deck {
  if (typeof window === "undefined") return { byId: {} };
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { byId: {} };
  try {
    const parsed = JSON.parse(raw);
    // даты восстанавливаем
    for (const id in parsed.byId) {
      const c = parsed.byId[id].card;
      if (c.due) c.due = new Date(c.due);
      if (c.last_review) c.last_review = new Date(c.last_review);
    }
    return parsed;
  } catch {
    return { byId: {} };
  }
}

export function saveDeck(deck: Deck) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
}

export function ensureCard(deck: Deck, id: string): CardState {
  if (!deck.byId[id]) {
    deck.byId[id] = { id, card: createEmptyCard() };
  }
  return deck.byId[id];
}

export function dueIds(deck: Deck, allIds: string[], now = Date.now()): string[] {
  // Карточка считается "due" если её нет в колоде (новая) или due <= now.
  return allIds.filter(id => {
    const c = deck.byId[id];
    if (!c) return true;
    return new Date(c.card.due).getTime() <= now;
  });
}

export type Grade = "again" | "hard" | "good" | "easy";

export function review(deck: Deck, id: string, grade: Grade, now = new Date()): CardState {
  const state = ensureCard(deck, id);
  const ratingMap: Record<Grade, Rating> = {
    again: Rating.Again,
    hard: Rating.Hard,
    good: Rating.Good,
    easy: Rating.Easy,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out = engine().next(state.card, now, ratingMap[grade] as any);
  state.card = out.card;
  state.lastSeen = now.getTime();
  return state;
}

// Простой счётчик прогресса для UI: % карточек, у которых state >= Review
export function masteredRatio(deck: Deck, allIds: string[]): number {
  if (!allIds.length) return 0;
  let mastered = 0;
  for (const id of allIds) {
    const c = deck.byId[id];
    if (c && c.card.state >= 2) mastered++; // Review or Relearning
  }
  return mastered / allIds.length;
}

export function newRatio(deck: Deck, allIds: string[]): number {
  if (!allIds.length) return 0;
  let unseen = 0;
  for (const id of allIds) if (!deck.byId[id]) unseen++;
  return 1 - unseen / allIds.length;
}
