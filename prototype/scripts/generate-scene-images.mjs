// Генератор картинок-фонов для сцен Anime Loop через OpenAI Images API.
// Стиль матчится с существующими сценами: мягкая анимэ-акварель, тёплая палитра, сакура.
//
// Использование:  node scripts/generate-scene-images.mjs [sceneId]
//   (без аргумента — генерит все из SCENES; с id — только указанную)
//
// Файлы: public/scenes/<id>.png (1024×1792, портретная ориентация)
// Стоимость: ~$0.04 / картинку (DALL-E 3 standard)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const STYLE_BASE = "Soft anime watercolor illustration in Studio Ghibli + Makoto Shinkai style. " +
  "Warm pastel colors with sakura pink and cream tones. Cherry blossom petals subtly in the air. " +
  "Cinematic composition with empty foreground (bottom 40% should be calm so subtitles can overlay). " +
  "No text, no people in the immediate foreground (background figures OK), " +
  "soft natural lighting, dreamy atmosphere, vertical 9:16 framing.";

const SCENES = [
  {
    id: "ramen-bar",
    title: "Рамен-бар",
    prompt: "Cozy traditional Japanese ramen-ya restaurant at night. Wooden counter and stools, steam rising from a bowl of ramen with chopsticks resting beside it. Warm lantern light, paper noren curtain in the entrance. View from a customer's seat. Empty stool in front. Wooden interior, traditional but modern feel.",
  },
  {
    id: "train",
    title: "Электричка",
    prompt: "Inside a Japanese commuter train (densha) during golden hour, looking down the empty aisle. Long row of fabric seats on both sides, hand-loops swaying. Window views show passing suburbs with cherry trees. Warm afternoon light streams through windows. A few faint background passenger silhouettes far down the car.",
  },
  {
    id: "hanami",
    title: "Ханами",
    prompt: "Cherry blossom viewing party in a Japanese park. Picnic blanket spread on grass under a massive blooming sakura tree. Bento boxes, tea thermos, takoyaki on a small plate. Falling pink petals in soft light. Distant silhouettes of other groups celebrating. Lantern strings between trees in background.",
  },
  {
    id: "family-dinner",
    title: "Ужин с семьёй",
    prompt: "Cozy Japanese family kotatsu dining table at evening. Multiple dishes laid out: rice bowls, miso soup, grilled fish, vegetables, chopsticks on stands. Warm orange light from a paper lamp overhead. Tatami mat floor, sliding shoji doors slightly open showing a small garden. Empty cushion in foreground (viewer's spot).",
  },
  {
    id: "konbini",
    title: "Конбини",
    prompt: "Brightly lit Japanese convenience store interior at night. Aisles stocked with onigiri, bento boxes, magazines, drinks in glass coolers. View from the customer side towards the register counter. Soft fluorescent light, clean modern shelves with Japanese product packaging (no readable text). Empty space in the foreground for visual breathing room.",
  },
];

// --- env ---
async function loadEnv() {
  const env = { ...process.env };
  try {
    const raw = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
    }
  } catch {}
  return env;
}

// --- OpenAI Images API ---
async function generateImage({ apiKey, prompt }) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      size: "1024x1792",
      quality: "standard",
      n: 1,
      response_format: "b64_json",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI Images ${res.status}: ${err.slice(0, 300)}`);
  }
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image data in response");
  return Buffer.from(b64, "base64");
}

// --- main ---
const targetId = process.argv[2];
const env = await loadEnv();
const apiKey = env.NEXT_PUBLIC_OPENAI_API_KEY || env.OPENAI_API_KEY;
if (!apiKey) { console.error("✗ Нет OPENAI_API_KEY в .env.local"); process.exit(1); }

const scenes = targetId ? SCENES.filter(s => s.id === targetId) : SCENES;
if (scenes.length === 0) { console.error(`✗ Сцена "${targetId}" не найдена`); process.exit(1); }

const outDir = path.join(ROOT, "public/scenes");
await fs.mkdir(outDir, { recursive: true });

console.log(`Генерирую ${scenes.length} ${scenes.length === 1 ? "картинку" : "картинки"} (DALL-E 3, 1024×1792)...\n`);
for (let i = 0; i < scenes.length; i++) {
  const s = scenes[i];
  const outPath = path.join(outDir, `${s.id}.png`);
  // Skip если уже есть и непустой
  try {
    const stat = await fs.stat(outPath);
    if (stat.size > 0) {
      console.log(`  [${i + 1}/${scenes.length}] ${s.id} ↻ skip (уже есть, ${(stat.size / 1024).toFixed(0)} KB)`);
      continue;
    }
  } catch {}

  process.stdout.write(`  [${i + 1}/${scenes.length}] ${s.id} (${s.title})... `);
  try {
    const fullPrompt = `${s.prompt}\n\nStyle: ${STYLE_BASE}`;
    const buf = await generateImage({ apiKey, prompt: fullPrompt });
    await fs.writeFile(outPath, buf);
    console.log(`✓ ${(buf.length / 1024).toFixed(0)} KB`);
  } catch (e) {
    console.log(`✗ ${e.message}`);
  }
}
console.log(`\n✓ Готово. Файлы: public/scenes/<id>.png`);
