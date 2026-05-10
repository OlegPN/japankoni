// Достижения-вехи в обучении. Хранятся в localStorage чтобы не показывать дважды.

const KEY = "koni:milestones:v1";

export type MilestoneId =
  | "hiragana-complete"  // выучена вся хирагана (46/46)
  | "first-lesson"       // первый урок грамматики пройден (откр. кандзи)
  | "all-lessons-done";  // все 3 урока MVP пройдены

export function loadSeenMilestones(): MilestoneId[] {
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

export function markMilestoneSeen(id: MilestoneId) {
  if (typeof window === "undefined") return;
  const set = new Set(loadSeenMilestones());
  set.add(id);
  window.localStorage.setItem(KEY, JSON.stringify([...set]));
}

export function isMilestoneSeen(id: MilestoneId): boolean {
  return loadSeenMilestones().includes(id);
}
