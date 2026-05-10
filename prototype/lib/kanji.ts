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

  // === Расширение M2.2: ещё 20 кандзи N5 ===
  { char: "学", meaning: "учиться", meanings: ["учиться","наука","изучать"], onyomi:["ガク"], kunyomi:["まな"], mnemonic: "Сверху «крыша знаний», снизу «ребёнок» (子) — учится." },
  { char: "校", meaning: "школа",  meanings: ["школа"],                onyomi:["コウ"], kunyomi:["こう"], mnemonic: "Дерево (木) + перекрест — школьный двор с деревьями." },
  { char: "先", meaning: "впереди",meanings: ["впереди","ранее","перед"], onyomi:["セン"], kunyomi:["さき"], mnemonic: "Тот, кто идёт впереди — учитель (先生)." },
  { char: "生", meaning: "жизнь",  meanings: ["жизнь","родиться","сырой"], onyomi:["セイ","ショウ"], kunyomi:["い","う","は"], mnemonic: "Росток на земле — жизнь начинается." },
  { char: "私", meaning: "я",      meanings: ["я","частный"],          onyomi:["シ"],   kunyomi:["わたし"], mnemonic: "Колосок (左) + я (厶) — «моё зерно»." },
  { char: "食", meaning: "еда",    meanings: ["еда","есть"],            onyomi:["ショク"], kunyomi:["た","く"], mnemonic: "Крышка над миской с едой." },
  { char: "飲", meaning: "пить",   meanings: ["пить"],                  onyomi:["イン"], kunyomi:["の"], mnemonic: "Слева 食 (еда), справа человек с открытым ртом — пьёт." },
  { char: "見", meaning: "видеть", meanings: ["видеть","смотреть"],     onyomi:["ケン"], kunyomi:["み"], mnemonic: "Глаз (目) на ножках — ходит и смотрит." },
  { char: "行", meaning: "идти",   meanings: ["идти","ехать"],          onyomi:["コウ","ギョウ"], kunyomi:["い","おこな"], mnemonic: "Перекрёсток дорог — идём куда-то." },
  { char: "来", meaning: "приходить", meanings: ["приходить","приезжать"], onyomi:["ライ"], kunyomi:["く","き"], mnemonic: "Дерево с плодами — урожай пришёл." },
  { char: "言", meaning: "слово",  meanings: ["говорить","слово"],      onyomi:["ゲン","ゴン"], kunyomi:["い","こと"], mnemonic: "Звуки выходят изо рта — слова." },
  { char: "話", meaning: "разговор", meanings: ["разговор","говорить"], onyomi:["ワ"],   kunyomi:["はな","はなし"], mnemonic: "Слова (言) + язык (舌) — разговариваем." },
  { char: "読", meaning: "читать", meanings: ["читать"],                onyomi:["ドク"], kunyomi:["よ"], mnemonic: "Слова (言) продаются (売) — это книга, читаем." },
  { char: "書", meaning: "писать", meanings: ["писать","книга"],        onyomi:["ショ"], kunyomi:["か"], mnemonic: "Кисть (筆) пишет в тетради." },
  { char: "車", meaning: "машина", meanings: ["машина","повозка"],      onyomi:["シャ"], kunyomi:["くるま"], mnemonic: "Вид сверху на повозку с осью." },
  { char: "駅", meaning: "станция",meanings: ["станция","вокзал"],      onyomi:["エキ"], kunyomi:["えき"], mnemonic: "Лошадь (馬) + размер (尺) — старая станция почтовой связи." },
  { char: "店", meaning: "магазин",meanings: ["магазин","лавка"],       onyomi:["テン"], kunyomi:["みせ"], mnemonic: "Под крышей (广) гадает (占) — лавка." },
  { char: "今", meaning: "сейчас", meanings: ["сейчас","теперь"],       onyomi:["コン"], kunyomi:["いま"], mnemonic: "Крышка прячет момент — «вот сейчас»." },
  { char: "天", meaning: "небо",   meanings: ["небо"],                  onyomi:["テン"], kunyomi:["あま","あめ"], mnemonic: "Большой (大) с горизонтом сверху — небо." },
  { char: "気", meaning: "дух",    meanings: ["дух","настроение","воздух"], onyomi:["キ"], kunyomi:["き"], mnemonic: "Пар над паровым рисом — энергия." },
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
