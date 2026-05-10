// Генератор аудио для карточек обучения через ElevenLabs.
// Один голос Yui для всего: хирагана, катакана, vocab, чтения кандзи.
//
// Использование:
//   node scripts/generate-audio.mjs <kind>
//   kind = hiragana | katakana | vocab | kanji-on | kanji-kun | all
//
// Результаты: public/audio/<kind>/<filename>.mp3

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

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

// --- ElevenLabs TTS ---
async function ttsToMp3({ apiKey, voiceId, text }) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json", "Accept": "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return Buffer.from(await res.arrayBuffer());
}

// --- парсинг исходников lib/*.ts через regex (без TS-loader) ---
async function parseHiraganaOrKatakana(file) {
  const src = await fs.readFile(path.join(ROOT, "lib", file), "utf8");
  const items = [];
  const re = /\{\s*char:\s*"([^"]+)",\s*romaji:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) items.push({ char: m[1], romaji: m[2] });
  return items;
}

async function parseVocab() {
  const src = await fs.readFile(path.join(ROOT, "lib/vocab.ts"), "utf8");
  const items = [];
  // word + romaji из объектов { id: "vocab:...", word: "...", ..., romaji: "..." }
  const re = /\{\s*id:\s*"(vocab:[^"]+)",\s*word:\s*"([^"]+)",[^}]*romaji:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) items.push({ id: m[1], word: m[2], romaji: m[3] });
  return items;
}

async function parseKanji() {
  const src = await fs.readFile(path.join(ROOT, "lib/kanji.ts"), "utf8");
  const items = [];
  // char + onyomi массив + kunyomi массив
  const re = /\{\s*char:\s*"([^"]+)",[^}]*onyomi:\s*\[([^\]]*)\][^}]*kunyomi:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const parseArr = (s) => [...s.matchAll(/"([^"]+)"/g)].map(x => x[1]);
    items.push({ char: m[1], onyomi: parseArr(m[2]), kunyomi: parseArr(m[3]) });
  }
  return items;
}

// --- сборщики заданий: что озвучивать, как назвать файл ---
async function buildJobs(kind) {
  switch (kind) {
    case "hiragana": {
      const items = await parseHiraganaOrKatakana("hiragana.ts");
      return items.map(k => ({ text: k.char, file: `${k.romaji}.mp3` }));
    }
    case "katakana": {
      const items = await parseHiraganaOrKatakana("katakana.ts");
      return items.map(k => ({ text: k.char, file: `${k.romaji}.mp3` }));
    }
    case "vocab": {
      const items = await parseVocab();
      return items.map(v => ({ text: v.word, file: `${v.romaji.replace(/[^a-z0-9]/gi, "")}.mp3` }));
    }
    case "kanji-on": {
      const items = (await parseKanji()).filter(k => k.onyomi.length > 0);
      // Имя файла = сам кандзи. URL-кодирование делает браузер, веб-сервер декодирует обратно.
      return items.map(k => ({ text: k.onyomi[0], file: `${k.char}.mp3` }));
    }
    case "kanji-kun": {
      const items = (await parseKanji()).filter(k => k.kunyomi.length > 0);
      return items.map(k => ({ text: k.kunyomi[0], file: `${k.char}.mp3` }));
    }
    default:
      throw new Error(`Неизвестный kind: ${kind}`);
  }
}

// --- main ---
const arg = process.argv[2];
if (!arg) {
  console.error("Использование: node scripts/generate-audio.mjs <kind>");
  console.error("  kind = hiragana | katakana | vocab | kanji-on | kanji-kun | all");
  process.exit(1);
}

const env = await loadEnv();
const apiKey = env.ELEVENLABS_API_KEY;
const voiceYui = env.ELEVENLABS_VOICE_B || env.ELEVENLABS_VOICE_LEARN; // Yui — голос B
if (!apiKey) { console.error("✗ Нет ELEVENLABS_API_KEY в .env.local"); process.exit(1); }
if (!voiceYui) { console.error("✗ Нет ELEVENLABS_VOICE_B (Yui) в .env.local"); process.exit(1); }

const kinds = arg === "all" ? ["hiragana", "katakana", "vocab", "kanji-on", "kanji-kun"] : [arg];

let totalChars = 0;
for (const kind of kinds) {
  const jobs = await buildJobs(kind);
  const outDir = path.join(ROOT, "public/audio", kind);
  await fs.mkdir(outDir, { recursive: true });
  console.log(`\n=== ${kind}: ${jobs.length} файлов → public/audio/${kind}/ ===`);
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const outPath = path.join(outDir, job.file);
    // skip если файл уже есть и непустой (для повторных запусков)
    try {
      const stat = await fs.stat(outPath);
      if (stat.size > 0) {
        process.stdout.write(`  [${i + 1}/${jobs.length}] ${job.text} → ${job.file} ↻ skip\n`);
        continue;
      }
    } catch {}
    process.stdout.write(`  [${i + 1}/${jobs.length}] ${job.text} → ${job.file} ... `);
    try {
      const mp3 = await ttsToMp3({ apiKey, voiceId: voiceYui, text: job.text });
      await fs.writeFile(outPath, mp3);
      console.log(`✓ ${(mp3.length / 1024).toFixed(1)} KB`);
      totalChars += job.text.length;
    } catch (e) {
      console.log(`✗ ${e.message}`);
      process.exit(1);
    }
  }
}
console.log(`\n✓ Готово. Сгенерировано символов: ${totalChars}`);
