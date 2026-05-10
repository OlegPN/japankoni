// Трекинг пройденных уроков. Простое множество id → localStorage.

const KEY = "koni:lessons:v1";

export function loadCompletedLessons(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function markLessonComplete(id: string) {
  if (typeof window === "undefined") return;
  const set = new Set(loadCompletedLessons());
  set.add(id);
  window.localStorage.setItem(KEY, JSON.stringify([...set]));
}

export function isLessonComplete(id: string): boolean {
  return loadCompletedLessons().includes(id);
}
