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
  inScene?: "school-yard" | "cafe";
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
  | "food";          // еда и напитки

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
