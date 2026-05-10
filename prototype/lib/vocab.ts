// 30 слов N5 вокруг темы «знакомство в школе».
// Привязаны к первой сцене Anime Loop (school-yard).
// Тема выбрана так, чтобы 8 слов попадали прямо в диалог,
// а остальные 22 строили смысловое поле вокруг.

export type Vocab = {
  id: string;            // "vocab:はじめまして"
  word: string;          // основная форма (хирагана/катакана/смешанно)
  kanji?: string;        // запись с кандзи, если есть
  romaji: string;
  ru: string;            // основное значение
  meanings?: string[];   // дополнительные значения, тоже считаются верными
  partOfSpeech: PoS;
  category: Category;
  /** Появляется ли слово в указанной сцене */
  inScene?: "school-yard" | "cafe" | "izakaya";
  mnemonic?: string;     // только для слов, требующих особой мнемоники
};

export type PoS =
  | "noun"
  | "verb"
  | "adj"
  | "particle"
  | "expression"
  | "pronoun"
  | "suffix"
  | "interjection";

export type Category =
  | "introduction"   // представление
  | "people-school"  // люди в школе
  | "classroom"      // что в классе
  | "greetings"      // приветствия и базовые вопросы
  | "particles"      // частицы из сцены
  | "cafe"           // кафе и заказы
  | "food"           // еда и напитки
  | "family"         // семья
  | "time"           // время и дни недели
  | "numbers"        // числа
  | "home"           // дом, комната, мебель
  | "verbs"          // базовые глаголы
  | "places";        // места города

export const VOCAB: Vocab[] = [
  // === Block 1: представление (8 слов, 6 из сцены) ===
  { id: "vocab:はじめまして", word: "はじめまして", romaji: "hajimemashite", ru: "приятно познакомиться", partOfSpeech: "expression", category: "introduction", inScene: "school-yard" },
  { id: "vocab:よろしく", word: "よろしく", romaji: "yoroshiku", ru: "прошу любить и жаловать", meanings: ["прошу о расположении"], partOfSpeech: "expression", category: "introduction" },
  { id: "vocab:なまえ", word: "なまえ", kanji: "名前", romaji: "namae", ru: "имя", partOfSpeech: "noun", category: "introduction" },
  { id: "vocab:わたし", word: "わたし", kanji: "私", romaji: "watashi", ru: "я", partOfSpeech: "pronoun", category: "introduction", inScene: "school-yard" },
  { id: "vocab:あなた", word: "あなた", romaji: "anata", ru: "ты", meanings: ["вы"], partOfSpeech: "pronoun", category: "introduction" },
  { id: "vocab:さん", word: "さん", romaji: "san", ru: "-сан (вежливый суффикс к имени)", partOfSpeech: "suffix", category: "introduction", inScene: "school-yard" },
  { id: "vocab:はい", word: "はい", romaji: "hai", ru: "да", partOfSpeech: "interjection", category: "introduction", inScene: "school-yard" },
  { id: "vocab:いいえ", word: "いいえ", romaji: "iie", ru: "нет", partOfSpeech: "interjection", category: "introduction" },

  // === Block 2: люди в школе (7 слов, 1 из сцены) ===
  { id: "vocab:がくせい", word: "がくせい", kanji: "学生", romaji: "gakusei", ru: "студент(ка)", partOfSpeech: "noun", category: "people-school", inScene: "school-yard" },
  { id: "vocab:せんせい", word: "せんせい", kanji: "先生", romaji: "sensei", ru: "учитель", partOfSpeech: "noun", category: "people-school" },
  { id: "vocab:ともだち", word: "ともだち", kanji: "友達", romaji: "tomodachi", ru: "друг", partOfSpeech: "noun", category: "people-school" },
  { id: "vocab:クラス", word: "クラス", romaji: "kurasu", ru: "класс (группа)", partOfSpeech: "noun", category: "people-school", mnemonic: "Заимствование: «class»." },
  { id: "vocab:クラスメート", word: "クラスメート", romaji: "kurasumeeto", ru: "одноклассник", partOfSpeech: "noun", category: "people-school", mnemonic: "Заимствование: «classmate»." },
  { id: "vocab:がっこう", word: "がっこう", kanji: "学校", romaji: "gakkou", ru: "школа", partOfSpeech: "noun", category: "people-school" },
  { id: "vocab:きょうしつ", word: "きょうしつ", kanji: "教室", romaji: "kyoushitsu", ru: "класс (комната)", meanings: ["аудитория"], partOfSpeech: "noun", category: "people-school" },

  // === Block 3: что в классе (8 слов) ===
  { id: "vocab:ほん", word: "ほん", kanji: "本", romaji: "hon", ru: "книга", partOfSpeech: "noun", category: "classroom" },
  { id: "vocab:ノート", word: "ノート", romaji: "nooto", ru: "тетрадь", partOfSpeech: "noun", category: "classroom", mnemonic: "Заимствование: «notebook»." },
  { id: "vocab:ペン", word: "ペン", romaji: "pen", ru: "ручка", partOfSpeech: "noun", category: "classroom", mnemonic: "Заимствование: «pen»." },
  { id: "vocab:えんぴつ", word: "えんぴつ", kanji: "鉛筆", romaji: "enpitsu", ru: "карандаш", partOfSpeech: "noun", category: "classroom" },
  { id: "vocab:つくえ", word: "つくえ", kanji: "机", romaji: "tsukue", ru: "стол", meanings: ["парта"], partOfSpeech: "noun", category: "classroom" },
  { id: "vocab:いす", word: "いす", kanji: "椅子", romaji: "isu", ru: "стул", partOfSpeech: "noun", category: "classroom" },
  { id: "vocab:かばん", word: "かばん", romaji: "kaban", ru: "сумка", meanings: ["портфель"], partOfSpeech: "noun", category: "classroom" },
  { id: "vocab:にほんご", word: "にほんご", kanji: "日本語", romaji: "nihongo", ru: "японский язык", partOfSpeech: "noun", category: "classroom" },

  // === Block 4: приветствия + базовые вопросы (7 слов) ===
  { id: "vocab:おはよう", word: "おはよう", romaji: "ohayou", ru: "доброе утро", meanings: ["привет (утром)"], partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:こんにちは", word: "こんにちは", romaji: "konnichiwa", ru: "здравствуйте", meanings: ["добрый день"], partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:こんばんは", word: "こんばんは", romaji: "konbanwa", ru: "добрый вечер", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:さようなら", word: "さようなら", romaji: "sayounara", ru: "до свидания", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:ありがとう", word: "ありがとう", romaji: "arigatou", ru: "спасибо", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:なん", word: "なん", kanji: "何", romaji: "nan", ru: "что", meanings: ["какой"], partOfSpeech: "pronoun", category: "greetings" },
  { id: "vocab:だれ", word: "だれ", kanji: "誰", romaji: "dare", ru: "кто", partOfSpeech: "pronoun", category: "greetings" },

  // === Block 5: кафе и заказы (5 слов, все из сцены cafe) ===
  { id: "vocab:いらっしゃいませ", word: "いらっしゃいませ", romaji: "irasshaimase", ru: "добро пожаловать", meanings: ["добро пожаловать (в магазин)"], partOfSpeech: "expression", category: "cafe", inScene: "cafe", mnemonic: "Стандартное приветствие в магазинах и кафе." },
  { id: "vocab:すみません", word: "すみません", romaji: "sumimasen", ru: "извините", meanings: ["простите", "спасибо (за беспокойство)"], partOfSpeech: "expression", category: "cafe", inScene: "cafe" },
  { id: "vocab:ください", word: "ください", romaji: "kudasai", ru: "пожалуйста (дайте)", meanings: ["дайте, пожалуйста"], partOfSpeech: "expression", category: "cafe", inScene: "cafe", mnemonic: "X を ください = «дайте X, пожалуйста»." },
  { id: "vocab:どうぞ", word: "どうぞ", romaji: "douzo", ru: "пожалуйста (вот)", meanings: ["пожалуйста, прошу"], partOfSpeech: "expression", category: "cafe", inScene: "cafe", mnemonic: "Когда что-то предлагают или дают." },
  { id: "vocab:メニュー", word: "メニュー", romaji: "menyuu", ru: "меню", partOfSpeech: "noun", category: "cafe", mnemonic: "Заимствование: «menu»." },

  // === Block 6: еда и напитки (5 слов, 1 в сцене cafe) ===
  { id: "vocab:おちゃ", word: "おちゃ", kanji: "お茶", romaji: "ocha", ru: "чай", partOfSpeech: "noun", category: "food", inScene: "cafe" },
  { id: "vocab:コーヒー", word: "コーヒー", romaji: "koohii", ru: "кофе", partOfSpeech: "noun", category: "food", mnemonic: "Заимствование: «coffee»." },
  { id: "vocab:みず", word: "みず", kanji: "水", romaji: "mizu", ru: "вода", partOfSpeech: "noun", category: "food" },
  { id: "vocab:パン", word: "パン", romaji: "pan", ru: "хлеб", partOfSpeech: "noun", category: "food", mnemonic: "Заимствование из португальского «pão»." },
  { id: "vocab:すし", word: "すし", kanji: "寿司", romaji: "sushi", ru: "суши", partOfSpeech: "noun", category: "food" },

  // === Block 7: семья (10 слов) ===
  // Используем humble-формы (для разговора О СВОЕЙ семье). Чужую семью называют お父さん и т.д. — добавим в N4.
  { id: "vocab:かぞく", word: "かぞく", kanji: "家族", romaji: "kazoku", ru: "семья", partOfSpeech: "noun", category: "family" },
  { id: "vocab:ちち", word: "ちち", kanji: "父", romaji: "chichi", ru: "отец", meanings: ["папа (о своём)"], partOfSpeech: "noun", category: "family" },
  { id: "vocab:はは", word: "はは", kanji: "母", romaji: "haha", ru: "мать", meanings: ["мама (о своей)"], partOfSpeech: "noun", category: "family" },
  { id: "vocab:あに", word: "あに", kanji: "兄", romaji: "ani", ru: "старший брат", partOfSpeech: "noun", category: "family" },
  { id: "vocab:あね", word: "あね", kanji: "姉", romaji: "ane", ru: "старшая сестра", partOfSpeech: "noun", category: "family" },
  { id: "vocab:おとうと", word: "おとうと", kanji: "弟", romaji: "otouto", ru: "младший брат", partOfSpeech: "noun", category: "family" },
  { id: "vocab:いもうと", word: "いもうと", kanji: "妹", romaji: "imouto", ru: "младшая сестра", partOfSpeech: "noun", category: "family" },
  { id: "vocab:こども", word: "こども", kanji: "子供", romaji: "kodomo", ru: "ребёнок", partOfSpeech: "noun", category: "family" },
  { id: "vocab:おっと", word: "おっと", kanji: "夫", romaji: "otto", ru: "муж", partOfSpeech: "noun", category: "family" },
  { id: "vocab:つま", word: "つま", kanji: "妻", romaji: "tsuma", ru: "жена", partOfSpeech: "noun", category: "family" },

  // === Block 8: время и дни недели (10 слов) ===
  { id: "vocab:いま", word: "いま", kanji: "今", romaji: "ima", ru: "сейчас", partOfSpeech: "noun", category: "time" },
  { id: "vocab:きょう", word: "きょう", kanji: "今日", romaji: "kyou", ru: "сегодня", partOfSpeech: "noun", category: "time" },
  { id: "vocab:あした", word: "あした", kanji: "明日", romaji: "ashita", ru: "завтра", partOfSpeech: "noun", category: "time" },
  { id: "vocab:きのう", word: "きのう", kanji: "昨日", romaji: "kinou", ru: "вчера", partOfSpeech: "noun", category: "time" },
  { id: "vocab:あさ", word: "あさ", kanji: "朝", romaji: "asa", ru: "утро", partOfSpeech: "noun", category: "time" },
  { id: "vocab:ひる", word: "ひる", kanji: "昼", romaji: "hiru", ru: "день", meanings: ["полдень"], partOfSpeech: "noun", category: "time" },
  { id: "vocab:よる", word: "よる", kanji: "夜", romaji: "yoru", ru: "ночь", partOfSpeech: "noun", category: "time" },
  { id: "vocab:げつようび", word: "げつようび", kanji: "月曜日", romaji: "getsuyoubi", ru: "понедельник", partOfSpeech: "noun", category: "time", mnemonic: "月 = луна → день луны (Monday = Moonday)." },
  { id: "vocab:かようび", word: "かようび", kanji: "火曜日", romaji: "kayoubi", ru: "вторник", partOfSpeech: "noun", category: "time", mnemonic: "火 = огонь → день Марса (火星)." },
  { id: "vocab:にちようび", word: "にちようび", kanji: "日曜日", romaji: "nichiyoubi", ru: "воскресенье", partOfSpeech: "noun", category: "time", mnemonic: "日 = солнце → Sunday." },

  // === Block 9: числа 1-10 (10 слов) ===
  // Слова — звуковая форма чисел (повтор он-чтений кандзи 一-十).
  { id: "vocab:いち", word: "いち", kanji: "一", romaji: "ichi", ru: "один (1)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:にN", word: "に", kanji: "二", romaji: "niNum", ru: "два (2)", partOfSpeech: "noun", category: "numbers", mnemonic: "Не путать с частицей に." },
  { id: "vocab:さんN", word: "さん", kanji: "三", romaji: "sanNum", ru: "три (3)", partOfSpeech: "noun", category: "numbers", mnemonic: "Не путать с суффиксом さん." },
  { id: "vocab:よん", word: "よん", kanji: "四", romaji: "yon", ru: "четыре (4)", meanings: ["し"], partOfSpeech: "noun", category: "numbers", mnemonic: "Альтернатива し избегается из-за созвучия со «смерть» (死)." },
  { id: "vocab:ご", word: "ご", kanji: "五", romaji: "go", ru: "пять (5)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:ろく", word: "ろく", kanji: "六", romaji: "roku", ru: "шесть (6)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:なな", word: "なな", kanji: "七", romaji: "nana", ru: "семь (7)", meanings: ["しち"], partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:はち", word: "はち", kanji: "八", romaji: "hachi", ru: "восемь (8)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:きゅう", word: "きゅう", kanji: "九", romaji: "kyuu", ru: "девять (9)", meanings: ["く"], partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:じゅう", word: "じゅう", kanji: "十", romaji: "juu", ru: "десять (10)", partOfSpeech: "noun", category: "numbers" },

  // === Block 10: дом, комната, мебель (10 слов) ===
  { id: "vocab:いえ", word: "いえ", kanji: "家", romaji: "ie", ru: "дом", meanings: ["здание"], partOfSpeech: "noun", category: "home" },
  { id: "vocab:へや", word: "へや", kanji: "部屋", romaji: "heya", ru: "комната", partOfSpeech: "noun", category: "home" },
  { id: "vocab:まど", word: "まど", kanji: "窓", romaji: "mado", ru: "окно", partOfSpeech: "noun", category: "home" },
  { id: "vocab:ドア", word: "ドア", romaji: "doa", ru: "дверь", partOfSpeech: "noun", category: "home", mnemonic: "Заимствование: «door»." },
  { id: "vocab:ベッド", word: "ベッド", romaji: "beddo", ru: "кровать", partOfSpeech: "noun", category: "home", mnemonic: "Заимствование: «bed»." },
  { id: "vocab:でんわ", word: "でんわ", kanji: "電話", romaji: "denwa", ru: "телефон", partOfSpeech: "noun", category: "home" },
  { id: "vocab:テレビ", word: "テレビ", romaji: "terebi", ru: "телевизор", partOfSpeech: "noun", category: "home", mnemonic: "Заимствование: «television» (сокращение)." },
  { id: "vocab:とけい", word: "とけい", kanji: "時計", romaji: "tokei", ru: "часы", partOfSpeech: "noun", category: "home" },
  { id: "vocab:かぎ", word: "かぎ", kanji: "鍵", romaji: "kagi", ru: "ключ", partOfSpeech: "noun", category: "home" },
  { id: "vocab:でんき", word: "でんき", kanji: "電気", romaji: "denki", ru: "свет", meanings: ["электричество"], partOfSpeech: "noun", category: "home" },

  // === Block 11: базовые глаголы (10 слов, dict-форма) ===
  { id: "vocab:たべる", word: "たべる", kanji: "食べる", romaji: "taberu", ru: "есть (кушать)", partOfSpeech: "verb", category: "verbs" },
  { id: "vocab:のむ", word: "のむ", kanji: "飲む", romaji: "nomu", ru: "пить", partOfSpeech: "verb", category: "verbs" },
  { id: "vocab:みる", word: "みる", kanji: "見る", romaji: "miru", ru: "смотреть", meanings: ["видеть"], partOfSpeech: "verb", category: "verbs" },
  { id: "vocab:いく", word: "いく", kanji: "行く", romaji: "iku", ru: "идти", meanings: ["ехать"], partOfSpeech: "verb", category: "verbs" },
  { id: "vocab:くる", word: "くる", kanji: "来る", romaji: "kuru", ru: "приходить", meanings: ["приезжать"], partOfSpeech: "verb", category: "verbs", mnemonic: "Неправильный глагол." },
  { id: "vocab:する", word: "する", romaji: "suru", ru: "делать", partOfSpeech: "verb", category: "verbs", mnemonic: "Неправильный глагол. Сочетается с многими сущ.: べんきょうする = учиться." },
  { id: "vocab:かう", word: "かう", kanji: "買う", romaji: "kau", ru: "покупать", partOfSpeech: "verb", category: "verbs" },
  { id: "vocab:よむ", word: "よむ", kanji: "読む", romaji: "yomu", ru: "читать", partOfSpeech: "verb", category: "verbs" },
  { id: "vocab:かく", word: "かく", kanji: "書く", romaji: "kaku", ru: "писать", partOfSpeech: "verb", category: "verbs" },
  { id: "vocab:きく", word: "きく", kanji: "聞く", romaji: "kiku", ru: "слушать", meanings: ["спрашивать"], partOfSpeech: "verb", category: "verbs" },

  // === Block 12: места города (10 слов) ===
  { id: "vocab:えき", word: "えき", kanji: "駅", romaji: "eki", ru: "станция", meanings: ["вокзал"], partOfSpeech: "noun", category: "places" },
  { id: "vocab:みせ", word: "みせ", kanji: "店", romaji: "mise", ru: "магазин", partOfSpeech: "noun", category: "places" },
  { id: "vocab:レストラン", word: "レストラン", romaji: "resutoran", ru: "ресторан", partOfSpeech: "noun", category: "places", mnemonic: "Заимствование: «restaurant»." },
  { id: "vocab:ぎんこう", word: "ぎんこう", kanji: "銀行", romaji: "ginkou", ru: "банк", partOfSpeech: "noun", category: "places" },
  { id: "vocab:びょういん", word: "びょういん", kanji: "病院", romaji: "byouin", ru: "больница", partOfSpeech: "noun", category: "places" },
  { id: "vocab:ホテル", word: "ホテル", romaji: "hoteru", ru: "отель", meanings: ["гостиница"], partOfSpeech: "noun", category: "places", mnemonic: "Заимствование: «hotel»." },
  { id: "vocab:こうえん", word: "こうえん", kanji: "公園", romaji: "kouen", ru: "парк", partOfSpeech: "noun", category: "places" },
  { id: "vocab:まち", word: "まち", kanji: "町", romaji: "machi", ru: "город", meanings: ["район"], partOfSpeech: "noun", category: "places" },
  { id: "vocab:くに", word: "くに", kanji: "国", romaji: "kuni", ru: "страна", partOfSpeech: "noun", category: "places" },
  { id: "vocab:くるま", word: "くるま", kanji: "車", romaji: "kuruma", ru: "машина", partOfSpeech: "noun", category: "places" },

  // === Block 13: для сцены идзакая (5 слов) ===
  { id: "vocab:おさけ", word: "おさけ", kanji: "お酒", romaji: "osake", ru: "сакэ", meanings: ["алкоголь"], partOfSpeech: "noun", category: "food", inScene: "izakaya" },
  { id: "vocab:そうですか", word: "そうですか", romaji: "soudesuka", ru: "вот как", meanings: ["неужели?", "понятно"], partOfSpeech: "expression", category: "cafe", inScene: "izakaya", mnemonic: "Реакция на услышанное." },
  { id: "vocab:じゃ", word: "じゃ", romaji: "ja", ru: "тогда", meanings: ["ну тогда"], partOfSpeech: "expression", category: "cafe", inScene: "izakaya", mnemonic: "Сокращение от では." },
  { id: "vocab:おねがいします", word: "おねがいします", kanji: "お願いします", romaji: "onegaishimasu", ru: "прошу", meanings: ["пожалуйста"], partOfSpeech: "expression", category: "cafe", inScene: "izakaya" },
  { id: "vocab:わかりました", word: "わかりました", romaji: "wakarimashita", ru: "понял", meanings: ["понятно"], partOfSpeech: "expression", category: "cafe", inScene: "izakaya" },
];

export const VOCAB_BY_ID: Record<string, Vocab> = Object.fromEntries(VOCAB.map(v => [v.id, v]));
export const VOCAB_IDS = VOCAB.map(v => v.id);

/** Слова, которые встречаются в указанной сцене */
export function vocabInScene(sceneId: string): Vocab[] {
  return VOCAB.filter(v => v.inScene === sceneId);
}

/** Подбор отвлечений (других значений) для теста с 4 вариантами */
export function pickVocabDistractors(answer: string, n = 3): string[] {
  const pool = VOCAB.map(v => v.ru).filter(r => r !== answer);
  const result: string[] = [];
  while (result.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}
