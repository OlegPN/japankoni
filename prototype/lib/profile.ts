// Профиль ученика в localStorage: имя, цель, стрик, шаг онбординга.

export type Goal = "anime" | "work" | "travel" | "fun";

export type Profile = {
  name: string;
  goal: Goal;
  onboardedAt: number | null;
  streakDays: number;
  lastSessionDate: string | null; // YYYY-MM-DD
};

const KEY = "koni:profile:v1";

export const DEFAULT_PROFILE: Profile = {
  name: "",
  goal: "anime",
  onboardedAt: null,
  streakDays: 0,
  lastSessionDate: null,
};

export function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return DEFAULT_PROFILE;
  try {
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(p: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

export function isOnboarded(p: Profile): boolean {
  return p.onboardedAt !== null && p.name.length > 0;
}

export function bumpStreak(p: Profile, now = new Date()): Profile {
  const today = now.toISOString().slice(0, 10);
  if (p.lastSessionDate === today) return p;
  // Если последний день был вчера — продолжаем стрик; иначе начинаем заново
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
  const yest = yesterday.toISOString().slice(0, 10);
  const next: Profile = { ...p, lastSessionDate: today };
  next.streakDays = p.lastSessionDate === yest ? p.streakDays + 1 : 1;
  return next;
}

export const GOAL_OPTIONS: Array<{ id: Goal; emoji: string; title: string; sub: string }> = [
  { id: "anime",  emoji: "🎌", title: "Аниме и манга",   sub: "Понимать без субтитров" },
  { id: "work",   emoji: "💼", title: "Работа в Японии", sub: "JLPT N3 за год" },
  { id: "travel", emoji: "✈️", title: "Путешествие",     sub: "Базовый разговор" },
  { id: "fun",    emoji: "🌸", title: "Просто интересно", sub: "Без целей и стресса" },
];
