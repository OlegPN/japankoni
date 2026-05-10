// AI-Кони — текстовый чат через OpenAI.
// Системный промпт строится из прогресса ученика (vocab/grammar/kana),
// чтобы Кони отвечал ТОЛЬКО уже выученной лексикой и грамматикой.

import OpenAI from "openai";
import { HIRAGANA } from "./hiragana";
import { KATAKANA } from "./katakana";
import { VOCAB } from "./vocab";
import { Lesson } from "./lessons";
import { Profile } from "./profile";
import { Deck } from "./srs";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AiTurn = {
  jp: string;       // японская реплика Кони
  ru: string;       // русский перевод (или подсказка)
};

const MODEL = process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-4o-mini";

let _client: OpenAI | null = null;
function getClient(): OpenAI | null {
  if (typeof window === "undefined") return null;
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) return null;
  if (!_client) {
    _client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // OK для прототипа; для production нужен бэкенд-прокси
    });
  }
  return _client;
}

/**
 * Строит системный промпт. Включает:
 * - роль (Кони, начинающий ученик, RU объяснения)
 * - известный vocab (хирагана/катакана/слова — что ученик "видел" в SRS)
 * - тему урока
 * - формат ответа (JSON для парсинга)
 */
export function buildSystemPrompt(profile: Profile, deck: Deck, lesson: Lesson): string {
  const knownHiragana = HIRAGANA.filter(k => deck.byId[`hiragana:${k.char}`]).map(k => k.char);
  const knownKatakana = KATAKANA.filter(k => deck.byId[`katakana:${k.char}`]).map(k => k.char);
  const knownVocab = VOCAB.filter(v => deck.byId[v.id]).map(v => `${v.word} (${v.romaji}) = ${v.ru}`);

  return `Ты — Кони, чиби-конь в кимоно, AI-сэнсэй для русскоязычного ученика японского.
Ученик: ${profile.name}, цель — ${goalLabel(profile.goal)}, уровень — самое начало (N5).

ТВОЙ СТИЛЬ:
- Дружелюбный, поддерживающий, без сюсюканья.
- Реплики КОРОТКИЕ: 1-2 простых предложения по-японски.
- ОБЯЗАТЕЛЬНО используй ТОЛЬКО лексику и знаки, которые ученик уже знает (см. ниже).
- Если хочешь сказать слово, которого ученик не знает — используй другое или объясни на русском.

ИЗВЕСТНЫЕ ЗНАКИ:
- Хирагана: ${knownHiragana.length > 0 ? knownHiragana.join(" ") : "(пока ничего)"}
- Катакана: ${knownKatakana.length > 0 ? knownKatakana.join(" ") : "(пока ничего)"}

ИЗВЕСТНЫЕ СЛОВА:
${knownVocab.length > 0 ? knownVocab.map(s => `  • ${s}`).join("\n") : "  (пока ничего)"}

ТЕМА УРОКА: ${lesson.title} — ${lesson.subtitle}
Грамматика урока: ${lesson.pattern} (${lesson.formula}).
${lesson.explanation}

ПРАВИЛА:
1. Веди диалог по теме урока, провоцируя ученика использовать ${lesson.formula}.
2. Если ученик пишет на русском — отвечай по-японски (используя только известную лексику), затем поясни на русском.
3. Если ученик пишет на японском — мягко поправь ошибки (на русском), похвали правильное.
4. Если хочешь использовать слово, которого нет в списке — объясни смысл по-русски в скобках.
5. После каждой реплики проси ученика что-то сказать — поддерживай диалог.

ФОРМАТ ОТВЕТА (СТРОГО JSON):
{"jp": "<японская реплика>", "ru": "<перевод/подсказка по-русски>"}

Не добавляй ничего вне JSON. Не используй markdown. Никаких объяснений до или после JSON.`;
}

function goalLabel(g: Profile["goal"]): string {
  switch (g) {
    case "anime": return "понимать аниме без субтитров";
    case "work": return "работать в Японии (JLPT N3)";
    case "travel": return "путешествовать по Японии";
    case "fun": return "просто интересно";
  }
}

/**
 * Запрос к OpenAI. Возвращает структурированный AiTurn.
 * Бросает ошибку если API key не настроен или ответ невалиден.
 */
export async function aiTurn(messages: ChatMessage[]): Promise<AiTurn> {
  const client = getClient();
  if (!client) {
    throw new Error("OpenAI API key не настроен. Добавь NEXT_PUBLIC_OPENAI_API_KEY в .env.local.");
  }

  const res = await client.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.7,
    response_format: { type: "json_object" },
    max_tokens: 300,
  });

  const text = res.choices[0]?.message?.content;
  if (!text) throw new Error("Пустой ответ от OpenAI");

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Ответ не JSON: ${text.slice(0, 100)}`);
  }

  const obj = parsed as { jp?: string; ru?: string };
  if (typeof obj.jp !== "string" || typeof obj.ru !== "string") {
    throw new Error(`Ответ без полей jp/ru: ${text.slice(0, 100)}`);
  }
  return { jp: obj.jp, ru: obj.ru };
}

export function isAiAvailable(): boolean {
  return !!process.env.NEXT_PUBLIC_OPENAI_API_KEY;
}
