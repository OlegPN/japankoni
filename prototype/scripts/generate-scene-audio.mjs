// Генератор аудио для сцен Anime Loop через ElevenLabs API.
//
// Использование:
//   1) Положи API key и voice IDs в .env.local (см. .env.local в корне prototype/)
//   2) Запусти: node scripts/generate-scene-audio.mjs <sceneId>
//      Пример: node scripts/generate-scene-audio.mjs school-yard
//
// Скрипт берёт сцену из lib/scenes.ts, для каждой строки генерит MP3 голосом A или B
// и кладёт в public/scenes/audio/<sceneId>-<idx>.mp3

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// --- читаем .env.local руками (без зависимостей) ---
async function loadEnv() {
  const env = { ...process.env };
  try {
    const raw = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const k = trimmed.slice(0, eq).trim();
      const v = trimmed.slice(eq + 1).trim();
      env[k] = v;
    }
  } catch {
    // нет .env.local — только process.env
  }
  return env;
}

// --- читаем сцены из lib/scenes.ts через простой парсинг (без TS-загрузчика) ---
// Скрипт зависит только от ttsText/audio/speaker, поэтому парсим как JSON-фрагменты.
async function loadSceneLines(sceneId) {
  const src = await fs.readFile(path.join(ROOT, "lib/scenes.ts"), "utf8");
  // Ищем блок сцены по id.
  const sceneStart = src.indexOf(`id: "${sceneId}"`);
  if (sceneStart === -1) throw new Error(`Сцена "${sceneId}" не найдена в lib/scenes.ts`);
  const linesStart = src.indexOf("lines: [", sceneStart);
  if (linesStart === -1) throw new Error("Не нашёл блок lines в сцене");
  // Находим конец массива lines
  let depth = 0, i = linesStart + "lines: ".length;
  let arrStart = -1, arrEnd = -1;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === "[") { if (arrStart === -1) arrStart = i; depth++; }
    else if (ch === "]") { depth--; if (depth === 0) { arrEnd = i; break; } }
  }
  if (arrStart === -1 || arrEnd === -1) throw new Error("Не нашёл границы lines");
  const arrSrc = src.slice(arrStart + 1, arrEnd);

  // Достаём speaker + ttsText из каждого объекта
  const lines = [];
  const re = /speaker:\s*"([AB])"[\s\S]*?ttsText:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(arrSrc)) !== null) {
    lines.push({ speaker: m[1], ttsText: m[2] });
  }
  return lines;
}

// --- ElevenLabs TTS ---
async function ttsToMp3({ apiKey, voiceId, text }) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
    }),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`ElevenLabs ${res.status}: ${errBody.slice(0, 300)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

// --- main ---
const sceneId = process.argv[2];
if (!sceneId) {
  console.error("Использование: node scripts/generate-scene-audio.mjs <sceneId>");
  process.exit(1);
}

const env = await loadEnv();
const apiKey = env.ELEVENLABS_API_KEY;
const voiceA = env.ELEVENLABS_VOICE_A;
const voiceB = env.ELEVENLABS_VOICE_B;
if (!apiKey) { console.error("✗ Нет ELEVENLABS_API_KEY в .env.local"); process.exit(1); }
if (!voiceA || !voiceB) {
  console.error("✗ Нет ELEVENLABS_VOICE_A или ELEVENLABS_VOICE_B в .env.local");
  console.error("  Возьми voice IDs из https://elevenlabs.io/app/voice-library");
  console.error("  (фильтр Language=Japanese — выбирай мужской и женский голос)");
  process.exit(1);
}

const lines = await loadSceneLines(sceneId);
if (lines.length === 0) { console.error("✗ Не нашёл строки в сцене"); process.exit(1); }

const outDir = path.join(ROOT, "public/scenes/audio");
await fs.mkdir(outDir, { recursive: true });

console.log(`Сцена ${sceneId}: ${lines.length} реплик`);
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const voiceId = line.speaker === "A" ? voiceA : voiceB;
  const outPath = path.join(outDir, `${sceneId}-${i}.mp3`);
  process.stdout.write(`  [${i + 1}/${lines.length}] ${line.speaker} · ${line.ttsText.slice(0, 30)}... `);
  try {
    const mp3 = await ttsToMp3({ apiKey, voiceId, text: line.ttsText });
    await fs.writeFile(outPath, mp3);
    console.log(`✓ ${(mp3.length / 1024).toFixed(1)} KB`);
  } catch (e) {
    console.log(`✗ ${e.message}`);
    process.exit(1);
  }
}
console.log(`\n✓ Готово. Файлы: public/scenes/audio/${sceneId}-*.mp3`);
