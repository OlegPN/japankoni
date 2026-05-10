// 20 базовых кандзи N5 с русскими мнемониками.
// На прототипе ученик угадывает значение по виду; чтения добавим в v1.1.

export type Kanji = {
  char: string;
  meaning: string;     // одно главное значение (для теста)
  meanings: string[];  // запасные значения, тоже считаются верными
  onyomi: string[];    // китайские чтения (для урока)
  kunyomi: string[];   // японские чтения
  mnemonic: string;
};

export const KANJI: Kanji[] = [
  { char: "一", meaning: "один",   meanings: ["один","1"],            onyomi:["イチ"], kunyomi:["ひと"],   mnemonic: "Одна горизонтальная линия = один." },
  { char: "二", meaning: "два",    meanings: ["два","2"],             onyomi:["ニ"],   kunyomi:["ふた"],   mnemonic: "Две линии = два." },
  { char: "三", meaning: "три",    meanings: ["три","3"],             onyomi:["サン"], kunyomi:["みっ"],   mnemonic: "Три линии = три." },
  { char: "人", meaning: "человек",meanings: ["человек","персона"],   onyomi:["ジン","ニン"], kunyomi:["ひと"], mnemonic: "Человечек на двух ногах." },
  { char: "日", meaning: "день",   meanings: ["день","солнце"],       onyomi:["ニチ","ジツ"], kunyomi:["ひ"],  mnemonic: "Окошко с черточкой — солнце за окном." },
  { char: "月", meaning: "месяц",  meanings: ["месяц","луна"],        onyomi:["ゲツ","ガツ"], kunyomi:["つき"],mnemonic: "Серп луны." },
  { char: "火", meaning: "огонь",  meanings: ["огонь"],               onyomi:["カ"],   kunyomi:["ひ"],     mnemonic: "Костёр с летящими искрами." },
  { char: "水", meaning: "вода",   meanings: ["вода"],                onyomi:["スイ"], kunyomi:["みず"],   mnemonic: "Капли стекают по сторонам." },
  { char: "木", meaning: "дерево", meanings: ["дерево"],              onyomi:["モク","ボク"], kunyomi:["き"], mnemonic: "Ствол + ветви + корни." },
  { char: "山", meaning: "гора",   meanings: ["гора"],                onyomi:["サン"], kunyomi:["やま"],   mnemonic: "Три пика горной гряды." },
  { char: "川", meaning: "река",   meanings: ["река"],                onyomi:["セン"], kunyomi:["かわ"],   mnemonic: "Три потока воды бегут вниз." },
  { char: "口", meaning: "рот",    meanings: ["рот","отверстие"],     onyomi:["コウ"], kunyomi:["くち"],   mnemonic: "Открытый рот квадратиком." },
  { char: "目", meaning: "глаз",   meanings: ["глаз"],                onyomi:["モク"], kunyomi:["め"],     mnemonic: "Зрачок + ресницы — глаз вертикально." },
  { char: "手", meaning: "рука",   meanings: ["рука"],                onyomi:["シュ"], kunyomi:["て"],     mnemonic: "Ладонь с тремя пальцами и предплечьем." },
  { char: "大", meaning: "большой",meanings: ["большой","великий"],   onyomi:["ダイ","タイ"], kunyomi:["おお"], mnemonic: "Человек с разведёнными руками — «во-о-от такой большой!»." },
  { char: "小", meaning: "маленький",meanings: ["маленький","малый"], onyomi:["ショウ"], kunyomi:["ちい","こ"], mnemonic: "Три маленькие точки/штриха." },
  { char: "中", meaning: "середина",meanings: ["середина","внутри","центр"], onyomi:["チュウ"], kunyomi:["なか"], mnemonic: "Стрела пронзает мишень посередине." },
  { char: "上", meaning: "верх",   meanings: ["верх","сверху","над"], onyomi:["ジョウ"], kunyomi:["うえ","かみ"], mnemonic: "Стрелка указывает вверх от земли." },
  { char: "下", meaning: "низ",    meanings: ["низ","снизу","под"],   onyomi:["カ","ゲ"], kunyomi:["した","しも"], mnemonic: "Стрелка указывает вниз от потолка." },
  { char: "本", meaning: "книга",  meanings: ["книга","основа","корень"], onyomi:["ホン"], kunyomi:["もと"], mnemonic: "Дерево (木) с корнем — «книга от корней знания»." },
];

// Подбор отвлечений (других значений) для теста с 4 вариантами
export function pickKanjiDistractors(answer: string, n = 3): string[] {
  return pickFromPool(KANJI.map(k => k.meaning).filter(m => m !== answer), n);
}

/** Кандзи, у которых есть он-чтение (китайское) */
export const KANJI_WITH_ONYOMI = KANJI.filter(k => k.onyomi.length > 0);
/** Кандзи, у которых есть кун-чтение (японское) */
export const KANJI_WITH_KUNYOMI = KANJI.filter(k => k.kunyomi.length > 0);

/** Distractors для теста на он-чтение: берём он-чтения других кандзи. */
export function pickOnyomiDistractors(answer: string, n = 3): string[] {
  const all = KANJI.flatMap(k => k.onyomi);
  return pickFromPool(all.filter(r => r !== answer), n);
}

/** Distractors для теста на кун-чтение: берём кун-чтения других кандзи. */
export function pickKunyomiDistractors(answer: string, n = 3): string[] {
  const all = KANJI.flatMap(k => k.kunyomi);
  return pickFromPool(all.filter(r => r !== answer), n);
}

function pickFromPool(pool: string[], n: number): string[] {
  const result: string[] = [];
  const seen = new Set<string>();
  while (result.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    const pick = pool.splice(idx, 1)[0];
    if (!seen.has(pick)) { seen.add(pick); result.push(pick); }
  }
  return result;
}
