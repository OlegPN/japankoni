// Скачивает SVG порядка черт из KanjiVG для всех знаков нашей колоды.
// KanjiVG: https://github.com/KanjiVG/kanjivg, лицензия CC BY-SA 3.0.
// Имена файлов KanjiVG: zero-padded 5-hex Unicode codepoint, например 0304b.svg для か.
//
// Использование:  node scripts/fetch-strokes.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public/strokes");

const KANJIVG_BASE = "https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji";

async function parseChars(file, regex) {
  const src = await fs.readFile(path.join(ROOT, "lib", file), "utf8");
  const chars = [];
  let m;
  while ((m = regex.exec(src)) !== null) chars.push(m[1]);
  return chars;
}

function codepointFile(char) {
  // Берём первый кодпойнт (важно для surrogate-пар, нам не актуально для CJK)
  const cp = char.codePointAt(0);
  return cp.toString(16).padStart(5, "0") + ".svg";
}

async function fetchOne(char, attempt = 1) {
  const file = codepointFile(char);
  const url = `${KANJIVG_BASE}/${file}`;
  const outPath = path.join(OUT, `${char}.svg`); // имя на диске = сам символ

  // Skip если уже скачали
  try {
    const stat = await fs.stat(outPath);
    if (stat.size > 0) return { char, status: "skip" };
  } catch {}

  try {
    const res = await fetch(url);
    if (!res.ok) return { char, status: `error ${res.status}` };
    const svg = await res.text();
    await fs.writeFile(outPath, svg);
    return { char, status: `ok ${(svg.length / 1024).toFixed(1)}KB` };
  } catch (e) {
    if (attempt < 3) {
      const delay = attempt * 1000;
      await new Promise(r => setTimeout(r, delay));
      return fetchOne(char, attempt + 1);
    }
    return { char, status: `fail after 3 attempts: ${e.message || e}` };
  }
}

// === main ===
const hiragana = await parseChars("hiragana.ts", /\{\s*char:\s*"([^"]+)"/g);
const katakana = await parseChars("katakana.ts", /\{\s*char:\s*"([^"]+)"/g);
const kanji = await parseChars("kanji.ts", /\{\s*char:\s*"([^"]+)"/g);
const all = [...new Set([...hiragana, ...katakana, ...kanji])];

await fs.mkdir(OUT, { recursive: true });
console.log(`Скачиваю ${all.length} знаков (${hiragana.length} хираганы + ${katakana.length} катаканы + ${kanji.length} кандзи) → public/strokes/\n`);

let ok = 0, skip = 0, err = 0;
for (let i = 0; i < all.length; i++) {
  const char = all[i];
  process.stdout.write(`  [${i + 1}/${all.length}] ${char} (${codepointFile(char)}) ... `);
  const res = await fetchOne(char);
  console.log(res.status);
  if (res.status.startsWith("ok")) ok++;
  else if (res.status === "skip") skip++;
  else err++;
  // Маленькая пауза, чтобы не захлёбываться лимитом GitHub
  await new Promise(r => setTimeout(r, 100));
}
console.log(`\n✓ Готово. Скачано: ${ok}, пропущено: ${skip}, ошибок: ${err}`);
