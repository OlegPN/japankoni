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
  // M2.3.1 финал — добавляются ниже
  | "business"       // встречи, контракты
  | "dishes"         // конкретные блюда
  | "cooking"        // кулинарные действия
  | "internet"       // соц.сети, веб
  | "culture"        // традиции, искусство
  // (старые ниже)
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
  | "places"         // места города
  // M2.3 расширение
  | "body"           // части тела
  | "colors"         // цвета
  | "clothes"        // одежда
  | "weather"        // погода
  | "months"         // месяцы
  | "counters"       // счётные суффиксы
  | "adj-i"          // い-прилагательные
  | "adj-na"         // な-прилагательные
  | "transport"      // транспорт
  | "nature"         // природа и животные
  | "emotions"       // эмоции, состояния
  | "work"           // работа и учёба
  | "shopping"       // магазины, деньги
  | "directions"     // направления
  | "actions"        // глаголы действия (расширение)
  | "frequency"      // наречия частоты, времени
  | "questions"      // вопросительные слова
  | "hobbies"        // хобби
  | "travel"         // путешествия
  | "tech"           // телефон, компьютер
  | "health"         // здоровье, врач
  | "people"         // люди (роли, описания)
  | "animals"        // животные
  | "fruits-veg"     // фрукты и овощи
  | "drinks"         // напитки
  | "school-subj"    // школьные предметы
  | "sports"         // спорт
  | "art-music"      // искусство, музыка
  | "country"        // страны, национальности
  | "office"         // офис
  | "money"          // деньги
  | "dates";         // дни месяца, время суток

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

  // === Block 14: тело (15 слов) ===
  { id: "vocab:あたま", word: "あたま", kanji: "頭", romaji: "atama", ru: "голова", partOfSpeech: "noun", category: "body" },
  { id: "vocab:かお", word: "かお", kanji: "顔", romaji: "kao", ru: "лицо", partOfSpeech: "noun", category: "body" },
  { id: "vocab:かみ", word: "かみ", kanji: "髪", romaji: "kami", ru: "волосы", partOfSpeech: "noun", category: "body" },
  { id: "vocab:はな", word: "はな", kanji: "鼻", romaji: "hana", ru: "нос", partOfSpeech: "noun", category: "body" },
  { id: "vocab:みみ", word: "みみ", kanji: "耳", romaji: "mimi", ru: "ухо", partOfSpeech: "noun", category: "body" },
  { id: "vocab:は", word: "は", kanji: "歯", romaji: "ha", ru: "зуб", partOfSpeech: "noun", category: "body", mnemonic: "Не путай с частицей は (произносится «wa»)." },
  { id: "vocab:した_body", word: "した", kanji: "舌", romaji: "shitaT", ru: "язык", meanings: ["язык (орган)"], partOfSpeech: "noun", category: "body", mnemonic: "Омофон с した (низ)." },
  { id: "vocab:のど", word: "のど", romaji: "nodo", ru: "горло", partOfSpeech: "noun", category: "body" },
  { id: "vocab:くび", word: "くび", kanji: "首", romaji: "kubi", ru: "шея", partOfSpeech: "noun", category: "body" },
  { id: "vocab:せ", word: "せ", kanji: "背", romaji: "se", ru: "спина", meanings: ["рост"], partOfSpeech: "noun", category: "body" },
  { id: "vocab:おなか", word: "おなか", romaji: "onaka", ru: "живот", partOfSpeech: "noun", category: "body" },
  { id: "vocab:あし", word: "あし", kanji: "足", romaji: "ashi", ru: "нога", meanings: ["стопа"], partOfSpeech: "noun", category: "body" },
  { id: "vocab:ゆび", word: "ゆび", kanji: "指", romaji: "yubi", ru: "палец", partOfSpeech: "noun", category: "body" },
  { id: "vocab:こえ", word: "こえ", kanji: "声", romaji: "koe", ru: "голос", partOfSpeech: "noun", category: "body" },
  { id: "vocab:からだ", word: "からだ", kanji: "体", romaji: "karada", ru: "тело", partOfSpeech: "noun", category: "body" },

  // === Block 15: цвета (12 слов) ===
  { id: "vocab:あか", word: "あか", kanji: "赤", romaji: "aka", ru: "красный", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:あお", word: "あお", kanji: "青", romaji: "ao", ru: "синий", meanings: ["голубой"], partOfSpeech: "noun", category: "colors" },
  { id: "vocab:きいろ", word: "きいろ", kanji: "黄色", romaji: "kiiro", ru: "жёлтый", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:みどり", word: "みどり", kanji: "緑", romaji: "midori", ru: "зелёный", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:くろ", word: "くろ", kanji: "黒", romaji: "kuro", ru: "чёрный", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:しろ", word: "しろ", kanji: "白", romaji: "shiro", ru: "белый", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:ちゃいろ", word: "ちゃいろ", kanji: "茶色", romaji: "chairo", ru: "коричневый", partOfSpeech: "noun", category: "colors", mnemonic: "茶 = чай → цвет чая." },
  { id: "vocab:むらさき", word: "むらさき", kanji: "紫", romaji: "murasaki", ru: "фиолетовый", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:ピンク", word: "ピンク", romaji: "pinku", ru: "розовый", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:オレンジ", word: "オレンジ", romaji: "orenji", ru: "оранжевый", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:グレー", word: "グレー", romaji: "guree", ru: "серый", partOfSpeech: "noun", category: "colors" },
  { id: "vocab:いろ", word: "いろ", kanji: "色", romaji: "iro", ru: "цвет", partOfSpeech: "noun", category: "colors" },

  // === Block 16: одежда (15 слов) ===
  { id: "vocab:ふく", word: "ふく", kanji: "服", romaji: "fuku", ru: "одежда", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:シャツ", word: "シャツ", romaji: "shatsu", ru: "рубашка", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:ティーシャツ", word: "ティーシャツ", romaji: "tiishatsu", ru: "футболка", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:ズボン", word: "ズボン", romaji: "zubon", ru: "штаны", meanings: ["брюки"], partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:スカート", word: "スカート", romaji: "sukaato", ru: "юбка", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:ぼうし", word: "ぼうし", kanji: "帽子", romaji: "boushi", ru: "шляпа", meanings: ["шапка"], partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:くつ", word: "くつ", kanji: "靴", romaji: "kutsu", ru: "обувь", meanings: ["туфли", "ботинки"], partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:くつした", word: "くつした", kanji: "靴下", romaji: "kutsushita", ru: "носки", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:ジャケット", word: "ジャケット", romaji: "jaketto", ru: "куртка", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:コート", word: "コート", romaji: "kooto", ru: "пальто", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:セーター", word: "セーター", romaji: "seetaa", ru: "свитер", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:めがね", word: "めがね", kanji: "眼鏡", romaji: "megane", ru: "очки", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:とけい_clothes", word: "とけい", kanji: "時計", romaji: "tokei2", ru: "наручные часы", partOfSpeech: "noun", category: "clothes", mnemonic: "Дубль с домашней категорией — то же 時計, и стенные, и наручные." },
  { id: "vocab:かさ", word: "かさ", kanji: "傘", romaji: "kasa", ru: "зонт", partOfSpeech: "noun", category: "clothes" },
  { id: "vocab:ハンカチ", word: "ハンカチ", romaji: "hankachi", ru: "платок", meanings: ["носовой платок"], partOfSpeech: "noun", category: "clothes" },

  // === Block 17: погода и сезоны (12 слов) ===
  { id: "vocab:てんき", word: "てんき", kanji: "天気", romaji: "tenki", ru: "погода", partOfSpeech: "noun", category: "weather" },
  { id: "vocab:あめ_weather", word: "あめ", kanji: "雨", romaji: "ame", ru: "дождь", partOfSpeech: "noun", category: "weather" },
  { id: "vocab:ゆき", word: "ゆき", kanji: "雪", romaji: "yuki", ru: "снег", partOfSpeech: "noun", category: "weather" },
  { id: "vocab:かぜ", word: "かぜ", kanji: "風", romaji: "kaze", ru: "ветер", partOfSpeech: "noun", category: "weather" },
  { id: "vocab:はれ", word: "はれ", kanji: "晴れ", romaji: "hare", ru: "ясно", partOfSpeech: "noun", category: "weather" },
  { id: "vocab:くもり", word: "くもり", kanji: "曇り", romaji: "kumori", ru: "облачно", partOfSpeech: "noun", category: "weather" },
  { id: "vocab:あつい_weather", word: "あつい", kanji: "暑い", romaji: "atsuiW", ru: "жарко", meanings: ["жаркий"], partOfSpeech: "adj", category: "weather" },
  { id: "vocab:さむい", word: "さむい", kanji: "寒い", romaji: "samui", ru: "холодно", meanings: ["холодный (о погоде)"], partOfSpeech: "adj", category: "weather" },
  { id: "vocab:はる", word: "はる", kanji: "春", romaji: "haru", ru: "весна", partOfSpeech: "noun", category: "weather" },
  { id: "vocab:なつ", word: "なつ", kanji: "夏", romaji: "natsu", ru: "лето", partOfSpeech: "noun", category: "weather" },
  { id: "vocab:あき", word: "あき", kanji: "秋", romaji: "akiF", ru: "осень", partOfSpeech: "noun", category: "weather", mnemonic: "Не путай с именем アキ." },
  { id: "vocab:ふゆ", word: "ふゆ", kanji: "冬", romaji: "fuyu", ru: "зима", partOfSpeech: "noun", category: "weather" },

  // === Block 18: месяцы (12 слов) ===
  // Все месяцы строятся по схеме: число + 月 (gatsu).
  { id: "vocab:いちがつ", word: "いちがつ", kanji: "一月", romaji: "ichigatsu", ru: "январь", partOfSpeech: "noun", category: "months" },
  { id: "vocab:にがつ", word: "にがつ", kanji: "二月", romaji: "nigatsu", ru: "февраль", partOfSpeech: "noun", category: "months" },
  { id: "vocab:さんがつ", word: "さんがつ", kanji: "三月", romaji: "sangatsu", ru: "март", partOfSpeech: "noun", category: "months" },
  { id: "vocab:しがつ", word: "しがつ", kanji: "四月", romaji: "shigatsu", ru: "апрель", partOfSpeech: "noun", category: "months", mnemonic: "Только для месяца — し, не よん." },
  { id: "vocab:ごがつ", word: "ごがつ", kanji: "五月", romaji: "gogatsu", ru: "май", partOfSpeech: "noun", category: "months" },
  { id: "vocab:ろくがつ", word: "ろくがつ", kanji: "六月", romaji: "rokugatsu", ru: "июнь", partOfSpeech: "noun", category: "months" },
  { id: "vocab:しちがつ", word: "しちがつ", kanji: "七月", romaji: "shichigatsu", ru: "июль", partOfSpeech: "noun", category: "months", mnemonic: "Месяц — しち (не なな)." },
  { id: "vocab:はちがつ", word: "はちがつ", kanji: "八月", romaji: "hachigatsu", ru: "август", partOfSpeech: "noun", category: "months" },
  { id: "vocab:くがつ", word: "くがつ", kanji: "九月", romaji: "kugatsu", ru: "сентябрь", partOfSpeech: "noun", category: "months", mnemonic: "Месяц — く (не きゅう)." },
  { id: "vocab:じゅうがつ", word: "じゅうがつ", kanji: "十月", romaji: "juugatsu", ru: "октябрь", partOfSpeech: "noun", category: "months" },
  { id: "vocab:じゅういちがつ", word: "じゅういちがつ", kanji: "十一月", romaji: "juuichigatsu", ru: "ноябрь", partOfSpeech: "noun", category: "months" },
  { id: "vocab:じゅうにがつ", word: "じゅうにがつ", kanji: "十二月", romaji: "juunigatsu", ru: "декабрь", partOfSpeech: "noun", category: "months" },

  // === Block 19: счётные суффиксы (15 слов) ===
  // Эти суффиксы цепляются к числу: 一つ, 二人, 三本, и т.д.
  { id: "vocab:つ", word: "〜つ", romaji: "tsuC", ru: "штук (универсальный счётчик 1-9)", partOfSpeech: "suffix", category: "counters", mnemonic: "ひとつ, ふたつ, みっつ… до ここのつ." },
  { id: "vocab:にん", word: "〜にん", kanji: "〜人", romaji: "ninC", ru: "человек (счётчик)", partOfSpeech: "suffix", category: "counters", mnemonic: "ひとり, ふたり, さんにん..." },
  { id: "vocab:ほんC", word: "〜ほん", kanji: "〜本", romaji: "honC", ru: "длинных предметов (бутылок, ручек)", partOfSpeech: "suffix", category: "counters", mnemonic: "Меняется: いっぽん, にほん, さんぼん..." },
  { id: "vocab:まい", word: "〜まい", kanji: "〜枚", romaji: "mai", ru: "плоских предметов (листы, билеты)", partOfSpeech: "suffix", category: "counters" },
  { id: "vocab:ひき", word: "〜ひき", kanji: "〜匹", romaji: "hiki", ru: "мелких животных", partOfSpeech: "suffix", category: "counters" },
  { id: "vocab:だい", word: "〜だい", kanji: "〜台", romaji: "dai", ru: "техники, машин", partOfSpeech: "suffix", category: "counters" },
  { id: "vocab:さつ", word: "〜さつ", kanji: "〜冊", romaji: "satsu", ru: "книг, журналов", partOfSpeech: "suffix", category: "counters" },
  { id: "vocab:かい", word: "〜かい", kanji: "〜回", romaji: "kaiC", ru: "раз (повторений)", partOfSpeech: "suffix", category: "counters", mnemonic: "いっかい, にかい..." },
  { id: "vocab:じ", word: "〜じ", kanji: "〜時", romaji: "jiC", ru: "часов (время)", partOfSpeech: "suffix", category: "counters", mnemonic: "いちじ, にじ, さんじ..." },
  { id: "vocab:ふん", word: "〜ふん", kanji: "〜分", romaji: "funC", ru: "минут", partOfSpeech: "suffix", category: "counters", mnemonic: "Меняется: いっぷん, にふん, さんぷん..." },
  { id: "vocab:にち_counter", word: "〜にち", kanji: "〜日", romaji: "nichiC", ru: "день месяца / дней", partOfSpeech: "suffix", category: "counters", mnemonic: "Особые: ついたち (1-е), ふつか (2), みっか (3)..." },
  { id: "vocab:げつ", word: "〜げつ", kanji: "〜月", romaji: "getsuC", ru: "месяцев (длительность)", partOfSpeech: "suffix", category: "counters", mnemonic: "いっかげつ = 1 месяц." },
  { id: "vocab:ねん", word: "〜ねん", kanji: "〜年", romaji: "nen", ru: "лет (длительность)", partOfSpeech: "suffix", category: "counters" },
  { id: "vocab:しゅうかん", word: "〜しゅうかん", kanji: "〜週間", romaji: "shuukan", ru: "недель", partOfSpeech: "suffix", category: "counters" },
  { id: "vocab:こ", word: "〜こ", kanji: "〜個", romaji: "koC", ru: "штук (универсальный)", partOfSpeech: "suffix", category: "counters" },

  // === Block 20: い-прилагательные (35 слов) ===
  { id: "vocab:おおきい", word: "おおきい", kanji: "大きい", romaji: "ookii", ru: "большой", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:ちいさい", word: "ちいさい", kanji: "小さい", romaji: "chiisai", ru: "маленький", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:あたらしい", word: "あたらしい", kanji: "新しい", romaji: "atarashii", ru: "новый", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:ふるい", word: "ふるい", kanji: "古い", romaji: "furui", ru: "старый (о вещах)", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:いい", word: "いい", romaji: "ii", ru: "хороший", meanings: ["хорошо"], partOfSpeech: "adj", category: "adj-i", mnemonic: "Неправильный: отрицание よくない (не いくない)." },
  { id: "vocab:わるい", word: "わるい", kanji: "悪い", romaji: "warui", ru: "плохой", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:たかい", word: "たかい", kanji: "高い", romaji: "takai", ru: "высокий", meanings: ["дорогой"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:ひくい", word: "ひくい", kanji: "低い", romaji: "hikui", ru: "низкий", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:やすい", word: "やすい", kanji: "安い", romaji: "yasui", ru: "дешёвый", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:ながい", word: "ながい", kanji: "長い", romaji: "nagai", ru: "длинный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:みじかい", word: "みじかい", kanji: "短い", romaji: "mijikai", ru: "короткий", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:ひろい", word: "ひろい", kanji: "広い", romaji: "hiroi", ru: "просторный", meanings: ["широкий"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:せまい", word: "せまい", kanji: "狭い", romaji: "semai", ru: "тесный", meanings: ["узкий"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:はやい", word: "はやい", kanji: "早い", romaji: "hayai", ru: "ранний", meanings: ["быстрый"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:おそい", word: "おそい", kanji: "遅い", romaji: "osoi", ru: "медленный", meanings: ["поздний"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:あつい_hot", word: "あつい", kanji: "熱い", romaji: "atsuiH", ru: "горячий", partOfSpeech: "adj", category: "adj-i", mnemonic: "Омофон с 暑い (жарко)." },
  { id: "vocab:つめたい", word: "つめたい", kanji: "冷たい", romaji: "tsumetai", ru: "холодный (на ощупь)", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:あまい", word: "あまい", kanji: "甘い", romaji: "amai", ru: "сладкий", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:からい", word: "からい", kanji: "辛い", romaji: "karai", ru: "острый", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:しおからい", word: "しおからい", romaji: "shiokarai", ru: "солёный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:おいしい", word: "おいしい", romaji: "oishii", ru: "вкусный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:まずい", word: "まずい", romaji: "mazui", ru: "невкусный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:おもしろい", word: "おもしろい", kanji: "面白い", romaji: "omoshiroi", ru: "интересный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:つまらない", word: "つまらない", romaji: "tsumaranai", ru: "скучный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:たのしい", word: "たのしい", kanji: "楽しい", romaji: "tanoshii", ru: "весёлый", meanings: ["приятный"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:うれしい", word: "うれしい", kanji: "嬉しい", romaji: "ureshii", ru: "радостный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:かなしい", word: "かなしい", kanji: "悲しい", romaji: "kanashii", ru: "грустный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:いそがしい", word: "いそがしい", kanji: "忙しい", romaji: "isogashii", ru: "занятой", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:つかれた", word: "つかれた", romaji: "tsukareta", ru: "уставший", partOfSpeech: "adj", category: "adj-i", mnemonic: "От глагола 疲れる (уставать), past tense." },
  { id: "vocab:いたい", word: "いたい", kanji: "痛い", romaji: "itai", ru: "больно", meanings: ["болезненный"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:あぶない", word: "あぶない", kanji: "危ない", romaji: "abunai", ru: "опасный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:むずかしい", word: "むずかしい", kanji: "難しい", romaji: "muzukashii", ru: "сложный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:やさしい", word: "やさしい", kanji: "易しい", romaji: "yasashii", ru: "лёгкий", meanings: ["добрый"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:つよい", word: "つよい", kanji: "強い", romaji: "tsuyoi", ru: "сильный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:よわい", word: "よわい", kanji: "弱い", romaji: "yowai", ru: "слабый", partOfSpeech: "adj", category: "adj-i" },

  // === Block 21: な-прилагательные (20 слов) ===
  { id: "vocab:しずか", word: "しずか", kanji: "静か", romaji: "shizuka", ru: "тихий", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:にぎやか", word: "にぎやか", romaji: "nigiyaka", ru: "оживлённый", meanings: ["шумный"], partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:きれい", word: "きれい", romaji: "kirei", ru: "красивый", meanings: ["чистый"], partOfSpeech: "adj", category: "adj-na", mnemonic: "Выглядит как い-прил., но это な-прил.: きれいな まち." },
  { id: "vocab:ゆうめい", word: "ゆうめい", kanji: "有名", romaji: "yuumei", ru: "знаменитый", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:しんせつ", word: "しんせつ", kanji: "親切", romaji: "shinsetsu", ru: "добрый (любезный)", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:べんり", word: "べんり", kanji: "便利", romaji: "benri", ru: "удобный", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:ふべん", word: "ふべん", kanji: "不便", romaji: "fuben", ru: "неудобный", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:げんき", word: "げんき", kanji: "元気", romaji: "genki", ru: "бодрый", meanings: ["здоровый", "энергичный"], partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:ひま", word: "ひま", kanji: "暇", romaji: "hima", ru: "свободный (по времени)", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:すき", word: "すき", kanji: "好き", romaji: "sukiA", ru: "любимый", meanings: ["нравится"], partOfSpeech: "adj", category: "adj-na", mnemonic: "Xがすきです = «Х нравится мне»." },
  { id: "vocab:きらい", word: "きらい", kanji: "嫌い", romaji: "kirai", ru: "ненавистный", meanings: ["не нравится"], partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:じょうず", word: "じょうず", kanji: "上手", romaji: "jouzu", ru: "умелый", meanings: ["хорош в (об умении)"], partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:へた", word: "へた", kanji: "下手", romaji: "heta", ru: "неумелый", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:たいせつ", word: "たいせつ", kanji: "大切", romaji: "taisetsu", ru: "важный", meanings: ["дорогой (близкий)"], partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:だいじょうぶ", word: "だいじょうぶ", kanji: "大丈夫", romaji: "daijoubu", ru: "всё в порядке", meanings: ["нормально"], partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:だめ", word: "だめ", romaji: "dame", ru: "нельзя", meanings: ["не годится"], partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:かんたん", word: "かんたん", kanji: "簡単", romaji: "kantan", ru: "простой", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:たいへん", word: "たいへん", kanji: "大変", romaji: "taihen", ru: "тяжело", meanings: ["ужасный", "очень"], partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:ほんとう", word: "ほんとう", kanji: "本当", romaji: "hontou", ru: "правда", partOfSpeech: "adj", category: "adj-na" },
  { id: "vocab:いろいろ", word: "いろいろ", romaji: "iroiro", ru: "разный", meanings: ["разнообразный"], partOfSpeech: "adj", category: "adj-na" },

  // === Block 22: транспорт (12 слов) ===
  { id: "vocab:でんしゃ", word: "でんしゃ", kanji: "電車", romaji: "densha", ru: "электричка", meanings: ["поезд"], partOfSpeech: "noun", category: "transport" },
  { id: "vocab:バス", word: "バス", romaji: "basu", ru: "автобус", partOfSpeech: "noun", category: "transport" },
  { id: "vocab:タクシー", word: "タクシー", romaji: "takushii", ru: "такси", partOfSpeech: "noun", category: "transport" },
  { id: "vocab:じてんしゃ", word: "じてんしゃ", kanji: "自転車", romaji: "jitensha", ru: "велосипед", partOfSpeech: "noun", category: "transport" },
  { id: "vocab:ちかてつ", word: "ちかてつ", kanji: "地下鉄", romaji: "chikatetsu", ru: "метро", partOfSpeech: "noun", category: "transport" },
  { id: "vocab:しんかんせん", word: "しんかんせん", kanji: "新幹線", romaji: "shinkansen", ru: "синкансэн (скоростной поезд)", partOfSpeech: "noun", category: "transport" },
  { id: "vocab:ひこうき", word: "ひこうき", kanji: "飛行機", romaji: "hikouki", ru: "самолёт", partOfSpeech: "noun", category: "transport" },
  { id: "vocab:ふね", word: "ふね", kanji: "船", romaji: "fune", ru: "корабль", meanings: ["лодка"], partOfSpeech: "noun", category: "transport" },
  { id: "vocab:バイク", word: "バイク", romaji: "baiku", ru: "мотоцикл", partOfSpeech: "noun", category: "transport" },
  { id: "vocab:みち", word: "みち", kanji: "道", romaji: "michi", ru: "дорога", meanings: ["путь"], partOfSpeech: "noun", category: "transport" },
  { id: "vocab:こうさてん", word: "こうさてん", kanji: "交差点", romaji: "kousaten", ru: "перекрёсток", partOfSpeech: "noun", category: "transport" },
  { id: "vocab:しんごう", word: "しんごう", kanji: "信号", romaji: "shingou", ru: "светофор", partOfSpeech: "noun", category: "transport" },

  // === Block 23: природа и животные (20 слов) ===
  { id: "vocab:うみ", word: "うみ", kanji: "海", romaji: "umi", ru: "море", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:そら", word: "そら", kanji: "空", romaji: "sora", ru: "небо", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:つき_nature", word: "つき", kanji: "月", romaji: "tsukiN", ru: "луна", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:ほし", word: "ほし", kanji: "星", romaji: "hoshi", ru: "звезда", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:はな_flower", word: "はな", kanji: "花", romaji: "hanaFl", ru: "цветок", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:さくら", word: "さくら", kanji: "桜", romaji: "sakura", ru: "сакура", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:いし", word: "いし", kanji: "石", romaji: "ishi", ru: "камень", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:つち", word: "つち", kanji: "土", romaji: "tsuchi", ru: "земля", meanings: ["почва"], partOfSpeech: "noun", category: "nature" },
  { id: "vocab:もり", word: "もり", kanji: "森", romaji: "mori", ru: "лес", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:はやし", word: "はやし", kanji: "林", romaji: "hayashi", ru: "роща", partOfSpeech: "noun", category: "nature" },
  { id: "vocab:いぬ", word: "いぬ", kanji: "犬", romaji: "inu", ru: "собака", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:ねこ", word: "ねこ", kanji: "猫", romaji: "neko", ru: "кошка", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:とり", word: "とり", kanji: "鳥", romaji: "tori", ru: "птица", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:さかな", word: "さかな", kanji: "魚", romaji: "sakana", ru: "рыба", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:うま", word: "うま", kanji: "馬", romaji: "uma", ru: "лошадь", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:うし", word: "うし", kanji: "牛", romaji: "ushi", ru: "корова", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:ぶた", word: "ぶた", kanji: "豚", romaji: "buta", ru: "свинья", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:くま", word: "くま", kanji: "熊", romaji: "kuma", ru: "медведь", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:むし", word: "むし", kanji: "虫", romaji: "mushi", ru: "насекомое", partOfSpeech: "noun", category: "animals" },
  { id: "vocab:どうぶつ", word: "どうぶつ", kanji: "動物", romaji: "doubutsu", ru: "животное", partOfSpeech: "noun", category: "animals" },

  // === Block 24: эмоции и состояния (15 слов) ===
  { id: "vocab:あいする", word: "あいする", kanji: "愛する", romaji: "aisuru", ru: "любить", partOfSpeech: "verb", category: "emotions" },
  { id: "vocab:きもち", word: "きもち", kanji: "気持ち", romaji: "kimochi", ru: "чувство", meanings: ["настроение"], partOfSpeech: "noun", category: "emotions" },
  { id: "vocab:こころ", word: "こころ", kanji: "心", romaji: "kokoro", ru: "сердце", meanings: ["душа"], partOfSpeech: "noun", category: "emotions" },
  { id: "vocab:しあわせ", word: "しあわせ", kanji: "幸せ", romaji: "shiawase", ru: "счастье", partOfSpeech: "adj", category: "emotions" },
  { id: "vocab:さびしい", word: "さびしい", kanji: "寂しい", romaji: "sabishii", ru: "одинокий", meanings: ["скучаю"], partOfSpeech: "adj", category: "emotions" },
  { id: "vocab:こわい", word: "こわい", kanji: "怖い", romaji: "kowai", ru: "страшный", meanings: ["боюсь"], partOfSpeech: "adj", category: "emotions" },
  { id: "vocab:はずかしい", word: "はずかしい", kanji: "恥ずかしい", romaji: "hazukashii", ru: "стыдно", partOfSpeech: "adj", category: "emotions" },
  { id: "vocab:びっくり", word: "びっくり", romaji: "bikkuri", ru: "удивление", meanings: ["вздрогнуть"], partOfSpeech: "expression", category: "emotions" },
  { id: "vocab:ねむい", word: "ねむい", kanji: "眠い", romaji: "nemui", ru: "сонный", partOfSpeech: "adj", category: "emotions" },
  { id: "vocab:つかれる", word: "つかれる", kanji: "疲れる", romaji: "tsukareru", ru: "уставать", partOfSpeech: "verb", category: "emotions" },
  { id: "vocab:わらう", word: "わらう", kanji: "笑う", romaji: "warau", ru: "смеяться", partOfSpeech: "verb", category: "emotions" },
  { id: "vocab:なく", word: "なく", kanji: "泣く", romaji: "naku", ru: "плакать", partOfSpeech: "verb", category: "emotions" },
  { id: "vocab:おこる", word: "おこる", kanji: "怒る", romaji: "okoru", ru: "сердиться", partOfSpeech: "verb", category: "emotions" },
  { id: "vocab:ほしい", word: "ほしい", kanji: "欲しい", romaji: "hoshii", ru: "хочется (иметь)", partOfSpeech: "adj", category: "emotions", mnemonic: "Xがほしい = «хочу X»." },
  { id: "vocab:すごい", word: "すごい", romaji: "sugoi", ru: "круто", meanings: ["потрясающий"], partOfSpeech: "adj", category: "emotions" },

  // === Block 25: работа и учёба (25 слов) ===
  { id: "vocab:しごと", word: "しごと", kanji: "仕事", romaji: "shigoto", ru: "работа", partOfSpeech: "noun", category: "work" },
  { id: "vocab:かいしゃ", word: "かいしゃ", kanji: "会社", romaji: "kaisha", ru: "компания", partOfSpeech: "noun", category: "work" },
  { id: "vocab:かいしゃいん", word: "かいしゃいん", kanji: "会社員", romaji: "kaishain", ru: "офисный работник", partOfSpeech: "noun", category: "work" },
  { id: "vocab:しゃちょう", word: "しゃちょう", kanji: "社長", romaji: "shachou", ru: "директор", partOfSpeech: "noun", category: "work" },
  { id: "vocab:いしゃ", word: "いしゃ", kanji: "医者", romaji: "isha", ru: "врач", partOfSpeech: "noun", category: "work" },
  { id: "vocab:けいさつ", word: "けいさつ", kanji: "警察", romaji: "keisatsu", ru: "полиция", partOfSpeech: "noun", category: "work" },
  { id: "vocab:エンジニア", word: "エンジニア", romaji: "enjinia", ru: "инженер", partOfSpeech: "noun", category: "work" },
  { id: "vocab:べんきょう", word: "べんきょう", kanji: "勉強", romaji: "benkyou", ru: "учёба", meanings: ["учиться"], partOfSpeech: "noun", category: "work", mnemonic: "勉強する = заниматься." },
  { id: "vocab:しゅくだい", word: "しゅくだい", kanji: "宿題", romaji: "shukudai", ru: "домашнее задание", partOfSpeech: "noun", category: "work" },
  { id: "vocab:テスト", word: "テスト", romaji: "tesuto", ru: "тест", meanings: ["экзамен"], partOfSpeech: "noun", category: "work" },
  { id: "vocab:しけん", word: "しけん", kanji: "試験", romaji: "shiken", ru: "экзамен", partOfSpeech: "noun", category: "work" },
  { id: "vocab:だいがく", word: "だいがく", kanji: "大学", romaji: "daigaku", ru: "университет", partOfSpeech: "noun", category: "work" },
  { id: "vocab:しょうがっこう", word: "しょうがっこう", kanji: "小学校", romaji: "shougakkou", ru: "начальная школа", partOfSpeech: "noun", category: "work" },
  { id: "vocab:ちゅうがっこう", word: "ちゅうがっこう", kanji: "中学校", romaji: "chuugakkou", ru: "средняя школа", partOfSpeech: "noun", category: "work" },
  { id: "vocab:こうこう", word: "こうこう", kanji: "高校", romaji: "koukou", ru: "старшая школа", partOfSpeech: "noun", category: "work" },
  { id: "vocab:じゅぎょう", word: "じゅぎょう", kanji: "授業", romaji: "jugyou", ru: "урок", meanings: ["занятие"], partOfSpeech: "noun", category: "work" },
  { id: "vocab:せんもん", word: "せんもん", kanji: "専門", romaji: "senmon", ru: "специальность", partOfSpeech: "noun", category: "work" },
  { id: "vocab:けんきゅう", word: "けんきゅう", kanji: "研究", romaji: "kenkyuu", ru: "исследование", partOfSpeech: "noun", category: "work" },
  { id: "vocab:しつもん", word: "しつもん", kanji: "質問", romaji: "shitsumon", ru: "вопрос", partOfSpeech: "noun", category: "work" },
  { id: "vocab:こたえ", word: "こたえ", kanji: "答え", romaji: "kotae", ru: "ответ", partOfSpeech: "noun", category: "work" },
  { id: "vocab:じしょ", word: "じしょ", kanji: "辞書", romaji: "jisho", ru: "словарь", partOfSpeech: "noun", category: "work" },
  { id: "vocab:きょうかしょ", word: "きょうかしょ", kanji: "教科書", romaji: "kyoukasho", ru: "учебник", partOfSpeech: "noun", category: "work" },
  { id: "vocab:ホワイトボード", word: "ホワイトボード", romaji: "howaitoboodo", ru: "доска", meanings: ["белая доска"], partOfSpeech: "noun", category: "work" },
  { id: "vocab:オフィス", word: "オフィス", romaji: "ofisu", ru: "офис", partOfSpeech: "noun", category: "office" },
  { id: "vocab:メール", word: "メール", romaji: "meeru", ru: "письмо", meanings: ["email"], partOfSpeech: "noun", category: "office" },

  // === Block 26: магазины и покупки (15 слов) ===
  { id: "vocab:かいもの", word: "かいもの", kanji: "買い物", romaji: "kaimono", ru: "покупки", partOfSpeech: "noun", category: "shopping" },
  { id: "vocab:スーパー", word: "スーパー", romaji: "suupaa", ru: "супермаркет", partOfSpeech: "noun", category: "shopping" },
  { id: "vocab:コンビニ", word: "コンビニ", romaji: "konbini", ru: "комбини", meanings: ["мини-маркет"], partOfSpeech: "noun", category: "shopping", mnemonic: "Сокращение от «convenience store»." },
  { id: "vocab:デパート", word: "デパート", romaji: "depaato", ru: "универмаг", partOfSpeech: "noun", category: "shopping" },
  { id: "vocab:いくら", word: "いくら", romaji: "ikura", ru: "сколько (стоит)", partOfSpeech: "pronoun", category: "shopping" },
  { id: "vocab:おかね", word: "おかね", kanji: "お金", romaji: "okane", ru: "деньги", partOfSpeech: "noun", category: "money" },
  { id: "vocab:えん", word: "えん", kanji: "円", romaji: "en", ru: "иена", partOfSpeech: "noun", category: "money" },
  { id: "vocab:カード", word: "カード", romaji: "kaado", ru: "карта (банковская)", partOfSpeech: "noun", category: "money" },
  { id: "vocab:げんきん", word: "げんきん", kanji: "現金", romaji: "genkin", ru: "наличные", partOfSpeech: "noun", category: "money" },
  { id: "vocab:レシート", word: "レシート", romaji: "reshiito", ru: "чек", partOfSpeech: "noun", category: "money" },
  { id: "vocab:はらう", word: "はらう", kanji: "払う", romaji: "harau", ru: "платить", partOfSpeech: "verb", category: "shopping" },
  { id: "vocab:うる", word: "うる", kanji: "売る", romaji: "uru", ru: "продавать", partOfSpeech: "verb", category: "shopping" },
  { id: "vocab:プレゼント", word: "プレゼント", romaji: "purezento", ru: "подарок", partOfSpeech: "noun", category: "shopping" },
  { id: "vocab:はな_gift", word: "はな", romaji: "hanaG", ru: "цветы (букет)", partOfSpeech: "noun", category: "shopping", mnemonic: "Тот же 花, контекст подарка." },
  { id: "vocab:しょっぴんぐ", word: "ショッピング", romaji: "shoppingu", ru: "шопинг", partOfSpeech: "noun", category: "shopping" },

  // === Block 27: направления (10 слов) ===
  { id: "vocab:みぎ", word: "みぎ", kanji: "右", romaji: "migi", ru: "правый", meanings: ["направо"], partOfSpeech: "noun", category: "directions" },
  { id: "vocab:ひだり", word: "ひだり", kanji: "左", romaji: "hidari", ru: "левый", meanings: ["налево"], partOfSpeech: "noun", category: "directions" },
  { id: "vocab:まえ", word: "まえ", kanji: "前", romaji: "mae", ru: "перед", meanings: ["раньше"], partOfSpeech: "noun", category: "directions" },
  { id: "vocab:うしろ", word: "うしろ", kanji: "後ろ", romaji: "ushiro", ru: "сзади", partOfSpeech: "noun", category: "directions" },
  { id: "vocab:よこ", word: "よこ", kanji: "横", romaji: "yoko", ru: "сбоку", meanings: ["рядом"], partOfSpeech: "noun", category: "directions" },
  { id: "vocab:となり", word: "となり", kanji: "隣", romaji: "tonari", ru: "соседний", partOfSpeech: "noun", category: "directions" },
  { id: "vocab:なか", word: "なか", kanji: "中", romaji: "naka", ru: "внутри", meanings: ["среди"], partOfSpeech: "noun", category: "directions" },
  { id: "vocab:そと", word: "そと", kanji: "外", romaji: "soto", ru: "снаружи", meanings: ["вне"], partOfSpeech: "noun", category: "directions" },
  { id: "vocab:きた", word: "きた", kanji: "北", romaji: "kita", ru: "север", partOfSpeech: "noun", category: "directions" },
  { id: "vocab:みなみ", word: "みなみ", kanji: "南", romaji: "minami", ru: "юг", partOfSpeech: "noun", category: "directions" },

  // === Block 28: глаголы действия (расширение, 40 слов) ===
  { id: "vocab:あう", word: "あう", kanji: "会う", romaji: "au", ru: "встречаться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:はなす", word: "はなす", kanji: "話す", romaji: "hanasu", ru: "говорить", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:いう", word: "いう", kanji: "言う", romaji: "iu", ru: "сказать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:しる", word: "しる", kanji: "知る", romaji: "shiru", ru: "знать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:わかる", word: "わかる", romaji: "wakaru", ru: "понимать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:おもう", word: "おもう", kanji: "思う", romaji: "omou", ru: "думать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:おぼえる", word: "おぼえる", kanji: "覚える", romaji: "oboeru", ru: "запоминать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:わすれる", word: "わすれる", kanji: "忘れる", romaji: "wasureru", ru: "забывать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:ねる", word: "ねる", kanji: "寝る", romaji: "neru", ru: "спать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:おきる", word: "おきる", kanji: "起きる", romaji: "okiru", ru: "вставать", meanings: ["проснуться"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:あらう", word: "あらう", kanji: "洗う", romaji: "arau", ru: "мыть", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:あびる", word: "あびる", kanji: "浴びる", romaji: "abiru", ru: "принимать (душ)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:はたらく", word: "はたらく", kanji: "働く", romaji: "hataraku", ru: "работать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:やすむ", word: "やすむ", kanji: "休む", romaji: "yasumu", ru: "отдыхать", meanings: ["отсутствовать"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:あそぶ", word: "あそぶ", kanji: "遊ぶ", romaji: "asobu", ru: "играть", meanings: ["развлекаться"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:はじまる", word: "はじまる", kanji: "始まる", romaji: "hajimaru", ru: "начинаться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:おわる", word: "おわる", kanji: "終わる", romaji: "owaru", ru: "заканчиваться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:はしる", word: "はしる", kanji: "走る", romaji: "hashiru", ru: "бежать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:あるく", word: "あるく", kanji: "歩く", romaji: "aruku", ru: "ходить (пешком)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:およぐ", word: "およぐ", kanji: "泳ぐ", romaji: "oyogu", ru: "плавать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:のる", word: "のる", kanji: "乗る", romaji: "noru", ru: "садиться (в транспорт)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:おりる", word: "おりる", kanji: "降りる", romaji: "oriru", ru: "выходить (из транспорта)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:かえる", word: "かえる", kanji: "帰る", romaji: "kaeru", ru: "возвращаться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:はいる", word: "はいる", kanji: "入る", romaji: "hairu", ru: "входить", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:でる", word: "でる", kanji: "出る", romaji: "deru", ru: "выходить", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:あける", word: "あける", kanji: "開ける", romaji: "akeru", ru: "открывать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:しめる", word: "しめる", kanji: "閉める", romaji: "shimeru", ru: "закрывать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:つかう", word: "つかう", kanji: "使う", romaji: "tsukau", ru: "использовать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:つくる", word: "つくる", kanji: "作る", romaji: "tsukuru", ru: "делать (создавать)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:もつ", word: "もつ", kanji: "持つ", romaji: "motsu", ru: "иметь", meanings: ["держать"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:あげる", word: "あげる", romaji: "ageru", ru: "давать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:もらう", word: "もらう", romaji: "morau", ru: "получать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:かす", word: "かす", kanji: "貸す", romaji: "kasu", ru: "одалживать (давать)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:かりる", word: "かりる", kanji: "借りる", romaji: "kariru", ru: "одалживать (брать)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:まつ", word: "まつ", kanji: "待つ", romaji: "matsu", ru: "ждать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:てつだう", word: "てつだう", kanji: "手伝う", romaji: "tetsudau", ru: "помогать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:すわる", word: "すわる", kanji: "座る", romaji: "suwaru", ru: "садиться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:たつ", word: "たつ", kanji: "立つ", romaji: "tatsu", ru: "стоять", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:うたう", word: "うたう", kanji: "歌う", romaji: "utau", ru: "петь", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:おどる", word: "おどる", kanji: "踊る", romaji: "odoru", ru: "танцевать", partOfSpeech: "verb", category: "actions" },

  // === Block 29: наречия частоты и времени (15 слов) ===
  { id: "vocab:いつも", word: "いつも", romaji: "itsumo", ru: "всегда", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:よく", word: "よく", romaji: "yoku", ru: "часто", meanings: ["хорошо"], partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:ときどき", word: "ときどき", kanji: "時々", romaji: "tokidoki", ru: "иногда", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:あまり", word: "あまり", romaji: "amari", ru: "не очень (с отриц.)", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:ぜんぜん", word: "ぜんぜん", kanji: "全然", romaji: "zenzen", ru: "совсем не (с отриц.)", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:すぐ", word: "すぐ", romaji: "sugu", ru: "сразу", meanings: ["тут же"], partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:まだ", word: "まだ", romaji: "mada", ru: "ещё", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:もう", word: "もう", romaji: "mou", ru: "уже", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:はやく", word: "はやく", romaji: "hayaku", ru: "быстро", meanings: ["рано"], partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:ゆっくり", word: "ゆっくり", romaji: "yukkuri", ru: "медленно", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:ちょっと", word: "ちょっと", romaji: "chotto", ru: "немного", meanings: ["чуть-чуть"], partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:すこし", word: "すこし", kanji: "少し", romaji: "sukoshi", ru: "немного (формально)", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:たくさん", word: "たくさん", romaji: "takusan", ru: "много", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:とても", word: "とても", romaji: "totemo", ru: "очень", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:あとで", word: "あとで", kanji: "後で", romaji: "atode", ru: "потом", meanings: ["позже"], partOfSpeech: "expression", category: "frequency" },

  // === Block 30: вопросительные слова (10 слов) ===
  { id: "vocab:どこ", word: "どこ", romaji: "doko", ru: "где", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:いつ", word: "いつ", romaji: "itsu", ru: "когда", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:なぜ", word: "なぜ", romaji: "naze", ru: "почему", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:どうして", word: "どうして", romaji: "doushite", ru: "почему (разг.)", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:どう", word: "どう", romaji: "dou", ru: "как", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:どんな", word: "どんな", romaji: "donna", ru: "какой", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:どちら", word: "どちら", romaji: "dochira", ru: "который (из двух)", meanings: ["где (вежл.)"], partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:どれ", word: "どれ", romaji: "dore", ru: "который (из многих)", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:いくつ", word: "いくつ", romaji: "ikutsu", ru: "сколько", meanings: ["сколько лет"], partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:なに", word: "なに", kanji: "何", romaji: "nani", ru: "что", partOfSpeech: "pronoun", category: "questions" },

  // === Block 31: хобби (15 слов) ===
  { id: "vocab:しゅみ", word: "しゅみ", kanji: "趣味", romaji: "shumi", ru: "хобби", partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:アニメ", word: "アニメ", romaji: "anime", ru: "аниме", partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:マンガ", word: "マンガ", romaji: "manga", ru: "манга", partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:ゲーム", word: "ゲーム", romaji: "geemu", ru: "игра", meanings: ["видеоигра"], partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:えいが", word: "えいが", kanji: "映画", romaji: "eiga", ru: "фильм", partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:おんがく", word: "おんがく", kanji: "音楽", romaji: "ongaku", ru: "музыка", partOfSpeech: "noun", category: "art-music" },
  { id: "vocab:うた", word: "うた", kanji: "歌", romaji: "uta", ru: "песня", partOfSpeech: "noun", category: "art-music" },
  { id: "vocab:ピアノ", word: "ピアノ", romaji: "piano", ru: "пианино", partOfSpeech: "noun", category: "art-music" },
  { id: "vocab:ギター", word: "ギター", romaji: "gitaa", ru: "гитара", partOfSpeech: "noun", category: "art-music" },
  { id: "vocab:カラオケ", word: "カラオケ", romaji: "karaoke", ru: "караоке", partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:しゃしん", word: "しゃしん", kanji: "写真", romaji: "shashin", ru: "фотография", partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:カメラ", word: "カメラ", romaji: "kamera", ru: "камера", partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:え", word: "え", kanji: "絵", romaji: "e", ru: "картина", meanings: ["рисунок"], partOfSpeech: "noun", category: "art-music" },
  { id: "vocab:ダンス", word: "ダンス", romaji: "dansu", ru: "танцы", partOfSpeech: "noun", category: "hobbies" },
  { id: "vocab:りょこう", word: "りょこう", kanji: "旅行", romaji: "ryokou", ru: "путешествие", partOfSpeech: "noun", category: "travel" },

  // === Block 32: путешествия (15 слов) ===
  { id: "vocab:くうこう", word: "くうこう", kanji: "空港", romaji: "kuukou", ru: "аэропорт", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:パスポート", word: "パスポート", romaji: "pasupooto", ru: "паспорт", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:きっぷ", word: "きっぷ", kanji: "切符", romaji: "kippu", ru: "билет (на транспорт)", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:チケット", word: "チケット", romaji: "chiketto", ru: "билет (на мероприятие)", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:にもつ", word: "にもつ", kanji: "荷物", romaji: "nimotsu", ru: "багаж", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:カバン_travel", word: "カバン", romaji: "kabanT", ru: "сумка/чемодан", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:ちず", word: "ちず", kanji: "地図", romaji: "chizu", ru: "карта", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:けしき", word: "けしき", kanji: "景色", romaji: "keshiki", ru: "пейзаж", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:おみやげ", word: "おみやげ", kanji: "お土産", romaji: "omiyage", ru: "сувенир", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:てら", word: "てら", kanji: "寺", romaji: "tera", ru: "буддийский храм", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:じんじゃ", word: "じんじゃ", kanji: "神社", romaji: "jinja", ru: "синтоистский храм", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:しろ", word: "しろ", kanji: "城", romaji: "shiroT", ru: "замок", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:なつやすみ", word: "なつやすみ", kanji: "夏休み", romaji: "natsuyasumi", ru: "летние каникулы", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:ふゆやすみ", word: "ふゆやすみ", kanji: "冬休み", romaji: "fuyuyasumi", ru: "зимние каникулы", partOfSpeech: "noun", category: "travel" },
  { id: "vocab:ホームステイ", word: "ホームステイ", romaji: "hoomusutei", ru: "хоумстей", partOfSpeech: "noun", category: "travel" },

  // === Block 33: технологии (15 слов) ===
  { id: "vocab:けいたい", word: "けいたい", kanji: "携帯", romaji: "keitai", ru: "мобильник", meanings: ["сотовый"], partOfSpeech: "noun", category: "tech" },
  { id: "vocab:スマホ", word: "スマホ", romaji: "sumaho", ru: "смартфон", partOfSpeech: "noun", category: "tech", mnemonic: "Сокр. от «smartphone»." },
  { id: "vocab:パソコン", word: "パソコン", romaji: "pasokon", ru: "компьютер", partOfSpeech: "noun", category: "tech", mnemonic: "Сокр. от «personal computer»." },
  { id: "vocab:インターネット", word: "インターネット", romaji: "intaanetto", ru: "интернет", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:ウェブ", word: "ウェブ", romaji: "webu", ru: "веб", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:サイト", word: "サイト", romaji: "saito", ru: "сайт", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:アプリ", word: "アプリ", romaji: "apuri", ru: "приложение", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:ファイル", word: "ファイル", romaji: "fairu", ru: "файл", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:データ", word: "データ", romaji: "deeta", ru: "данные", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:でんごん", word: "でんごん", kanji: "伝言", romaji: "dengon", ru: "сообщение", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:ボタン", word: "ボタン", romaji: "botan", ru: "кнопка", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:キー", word: "キー", romaji: "kii", ru: "клавиша", meanings: ["ключ"], partOfSpeech: "noun", category: "tech" },
  { id: "vocab:マウス", word: "マウス", romaji: "mausu", ru: "мышка", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:プリンター", word: "プリンター", romaji: "purintaa", ru: "принтер", partOfSpeech: "noun", category: "tech" },
  { id: "vocab:イヤホン", word: "イヤホン", romaji: "iyahon", ru: "наушники", partOfSpeech: "noun", category: "tech" },

  // === Block 34: здоровье и врач (15 слов) ===
  { id: "vocab:びょうき", word: "びょうき", kanji: "病気", romaji: "byouki", ru: "болезнь", partOfSpeech: "noun", category: "health" },
  { id: "vocab:かぜ_cold", word: "かぜ", kanji: "風邪", romaji: "kazeC", ru: "простуда", partOfSpeech: "noun", category: "health", mnemonic: "Омофон с 風 (ветер)." },
  { id: "vocab:ねつ", word: "ねつ", kanji: "熱", romaji: "netsu", ru: "температура", partOfSpeech: "noun", category: "health" },
  { id: "vocab:せき", word: "せき", romaji: "seki", ru: "кашель", partOfSpeech: "noun", category: "health" },
  { id: "vocab:あたまがいたい", word: "あたまがいたい", romaji: "atamagaitai", ru: "болит голова", partOfSpeech: "expression", category: "health" },
  { id: "vocab:おなかがいたい", word: "おなかがいたい", romaji: "onakagaitai", ru: "болит живот", partOfSpeech: "expression", category: "health" },
  { id: "vocab:くすり", word: "くすり", kanji: "薬", romaji: "kusuri", ru: "лекарство", partOfSpeech: "noun", category: "health" },
  { id: "vocab:びょういん_h", word: "びょういん", kanji: "病院", romaji: "byouinH", ru: "больница (визит)", partOfSpeech: "noun", category: "health" },
  { id: "vocab:けんさ", word: "けんさ", kanji: "検査", romaji: "kensa", ru: "обследование", partOfSpeech: "noun", category: "health" },
  { id: "vocab:けが", word: "けが", romaji: "kega", ru: "травма", partOfSpeech: "noun", category: "health" },
  { id: "vocab:じこ", word: "じこ", kanji: "事故", romaji: "jiko", ru: "авария", meanings: ["происшествие"], partOfSpeech: "noun", category: "health" },
  { id: "vocab:あんぜん", word: "あんぜん", kanji: "安全", romaji: "anzen", ru: "безопасный", partOfSpeech: "adj", category: "health" },
  { id: "vocab:げんかん", word: "げんかん", kanji: "玄関", romaji: "genkan", ru: "прихожая", partOfSpeech: "noun", category: "home" },
  { id: "vocab:ふろ", word: "ふろ", kanji: "風呂", romaji: "furo", ru: "ванная", partOfSpeech: "noun", category: "home" },
  { id: "vocab:トイレ", word: "トイレ", romaji: "toire", ru: "туалет", partOfSpeech: "noun", category: "home" },

  // === Block 35: люди (роли, описания) (15 слов) ===
  { id: "vocab:ひと", word: "ひと", kanji: "人", romaji: "hito", ru: "человек", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おとこ", word: "おとこ", kanji: "男", romaji: "otoko", ru: "мужчина", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おんな", word: "おんな", kanji: "女", romaji: "onna", ru: "женщина", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おとこのこ", word: "おとこのこ", kanji: "男の子", romaji: "otokonoko", ru: "мальчик", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おんなのこ", word: "おんなのこ", kanji: "女の子", romaji: "onnanoko", ru: "девочка", partOfSpeech: "noun", category: "people" },
  { id: "vocab:あかちゃん", word: "あかちゃん", kanji: "赤ちゃん", romaji: "akachan", ru: "младенец", partOfSpeech: "noun", category: "people" },
  { id: "vocab:わかい", word: "わかい", kanji: "若い", romaji: "wakai", ru: "молодой", partOfSpeech: "adj", category: "people" },
  { id: "vocab:としより", word: "としより", kanji: "年寄り", romaji: "toshiyori", ru: "пожилой", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おかあさん", word: "おかあさん", kanji: "お母さん", romaji: "okaasan", ru: "мама (вежл.)", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おとうさん", word: "おとうさん", kanji: "お父さん", romaji: "otousan", ru: "папа (вежл.)", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おにいさん", word: "おにいさん", kanji: "お兄さん", romaji: "oniisan", ru: "старший брат (вежл.)", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おねえさん", word: "おねえさん", kanji: "お姉さん", romaji: "oneesan", ru: "старшая сестра (вежл.)", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おじいさん", word: "おじいさん", romaji: "ojiisan", ru: "дедушка", partOfSpeech: "noun", category: "people" },
  { id: "vocab:おばあさん", word: "おばあさん", romaji: "obaasan", ru: "бабушка", partOfSpeech: "noun", category: "people" },
  { id: "vocab:かのじょ", word: "かのじょ", kanji: "彼女", romaji: "kanojo", ru: "она", meanings: ["девушка (партнёр)"], partOfSpeech: "pronoun", category: "people" },
  { id: "vocab:かれ", word: "かれ", kanji: "彼", romaji: "kare", ru: "он", meanings: ["парень (партнёр)"], partOfSpeech: "pronoun", category: "people" },

  // === Block 36: фрукты и овощи (20 слов) ===
  { id: "vocab:くだもの", word: "くだもの", kanji: "果物", romaji: "kudamono", ru: "фрукты", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:やさい", word: "やさい", kanji: "野菜", romaji: "yasai", ru: "овощи", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:りんご", word: "りんご", romaji: "ringo", ru: "яблоко", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:バナナ", word: "バナナ", romaji: "banana", ru: "банан", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:オレンジ_fruit", word: "オレンジ", romaji: "orenjiF", ru: "апельсин", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:いちご", word: "いちご", romaji: "ichigo", ru: "клубника", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:みかん", word: "みかん", romaji: "mikan", ru: "мандарин", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:ぶどう", word: "ぶどう", romaji: "budou", ru: "виноград", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:すいか", word: "すいか", romaji: "suika", ru: "арбуз", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:メロン", word: "メロン", romaji: "meron", ru: "дыня", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:トマト", word: "トマト", romaji: "tomato", ru: "помидор", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:にんじん", word: "にんじん", romaji: "ninjin", ru: "морковь", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:きゅうり", word: "きゅうり", romaji: "kyuuri", ru: "огурец", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:キャベツ", word: "キャベツ", romaji: "kyabetsu", ru: "капуста", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:じゃがいも", word: "じゃがいも", romaji: "jagaimo", ru: "картофель", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:たまねぎ", word: "たまねぎ", romaji: "tamanegi", ru: "лук", partOfSpeech: "noun", category: "fruits-veg" },
  { id: "vocab:にく", word: "にく", kanji: "肉", romaji: "niku", ru: "мясо", partOfSpeech: "noun", category: "food" },
  { id: "vocab:たまご", word: "たまご", kanji: "卵", romaji: "tamago", ru: "яйцо", partOfSpeech: "noun", category: "food" },
  { id: "vocab:ごはん", word: "ごはん", kanji: "ご飯", romaji: "gohan", ru: "рис", meanings: ["еда"], partOfSpeech: "noun", category: "food" },
  { id: "vocab:あさごはん", word: "あさごはん", kanji: "朝ご飯", romaji: "asagohan", ru: "завтрак", partOfSpeech: "noun", category: "food" },

  // === Block 37: напитки (10 слов) ===
  { id: "vocab:のみもの", word: "のみもの", kanji: "飲み物", romaji: "nomimono", ru: "напиток", partOfSpeech: "noun", category: "drinks" },
  { id: "vocab:ジュース", word: "ジュース", romaji: "juusu", ru: "сок", partOfSpeech: "noun", category: "drinks" },
  { id: "vocab:ぎゅうにゅう", word: "ぎゅうにゅう", kanji: "牛乳", romaji: "gyuunyuu", ru: "молоко", partOfSpeech: "noun", category: "drinks" },
  { id: "vocab:ミルク", word: "ミルク", romaji: "miruku", ru: "молоко (заим.)", partOfSpeech: "noun", category: "drinks" },
  { id: "vocab:ビール", word: "ビール", romaji: "biiru", ru: "пиво", partOfSpeech: "noun", category: "drinks" },
  { id: "vocab:ワイン", word: "ワイン", romaji: "wain", ru: "вино", partOfSpeech: "noun", category: "drinks" },
  { id: "vocab:アイス", word: "アイス", romaji: "aisu", ru: "мороженое", meanings: ["лёд"], partOfSpeech: "noun", category: "food" },
  { id: "vocab:ケーキ", word: "ケーキ", romaji: "keeki", ru: "торт", partOfSpeech: "noun", category: "food" },
  { id: "vocab:チョコレート", word: "チョコレート", romaji: "chokoreeto", ru: "шоколад", partOfSpeech: "noun", category: "food" },
  { id: "vocab:あめ_candy", word: "あめ", kanji: "飴", romaji: "ameC", ru: "конфета", partOfSpeech: "noun", category: "food", mnemonic: "Омофон с 雨 (дождь)." },

  // === Block 38: спорт (12 слов) ===
  { id: "vocab:スポーツ", word: "スポーツ", romaji: "supootsu", ru: "спорт", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:サッカー", word: "サッカー", romaji: "sakkaa", ru: "футбол", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:やきゅう", word: "やきゅう", kanji: "野球", romaji: "yakyuu", ru: "бейсбол", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:テニス", word: "テニス", romaji: "tenisu", ru: "теннис", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:バスケットボール", word: "バスケットボール", romaji: "basukettobooru", ru: "баскетбол", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:じゅうどう", word: "じゅうどう", kanji: "柔道", romaji: "juudou", ru: "дзюдо", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:からて", word: "からて", kanji: "空手", romaji: "karateS", ru: "карате", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:すいえい", word: "すいえい", kanji: "水泳", romaji: "suiei", ru: "плавание", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:スキー", word: "スキー", romaji: "sukii", ru: "лыжи", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:ヨガ", word: "ヨガ", romaji: "yoga", ru: "йога", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:ジム", word: "ジム", romaji: "jimu", ru: "спортзал", partOfSpeech: "noun", category: "sports" },
  { id: "vocab:しあい", word: "しあい", kanji: "試合", romaji: "shiai", ru: "матч", meanings: ["соревнование"], partOfSpeech: "noun", category: "sports" },

  // === Block 39: страны и национальности (15 слов) ===
  { id: "vocab:にほん", word: "にほん", kanji: "日本", romaji: "nihon", ru: "Япония", partOfSpeech: "noun", category: "country" },
  { id: "vocab:にほんじん", word: "にほんじん", kanji: "日本人", romaji: "nihonjin", ru: "японец", partOfSpeech: "noun", category: "country" },
  { id: "vocab:ロシア", word: "ロシア", romaji: "roshia", ru: "Россия", partOfSpeech: "noun", category: "country" },
  { id: "vocab:ロシアじん", word: "ロシアじん", kanji: "ロシア人", romaji: "roshiajin", ru: "русский", partOfSpeech: "noun", category: "country" },
  { id: "vocab:アメリカ", word: "アメリカ", romaji: "amerika", ru: "Америка (США)", partOfSpeech: "noun", category: "country" },
  { id: "vocab:イギリス", word: "イギリス", romaji: "igirisu", ru: "Англия", partOfSpeech: "noun", category: "country" },
  { id: "vocab:フランス", word: "フランス", romaji: "furansu", ru: "Франция", partOfSpeech: "noun", category: "country" },
  { id: "vocab:ドイツ", word: "ドイツ", romaji: "doitsu", ru: "Германия", partOfSpeech: "noun", category: "country" },
  { id: "vocab:イタリア", word: "イタリア", romaji: "itaria", ru: "Италия", partOfSpeech: "noun", category: "country" },
  { id: "vocab:ちゅうごく", word: "ちゅうごく", kanji: "中国", romaji: "chuugoku", ru: "Китай", partOfSpeech: "noun", category: "country" },
  { id: "vocab:かんこく", word: "かんこく", kanji: "韓国", romaji: "kankoku", ru: "Корея", partOfSpeech: "noun", category: "country" },
  { id: "vocab:タイ", word: "タイ", romaji: "tai", ru: "Таиланд", partOfSpeech: "noun", category: "country" },
  { id: "vocab:インド", word: "インド", romaji: "indo", ru: "Индия", partOfSpeech: "noun", category: "country" },
  { id: "vocab:オーストラリア", word: "オーストラリア", romaji: "oosutoraria", ru: "Австралия", partOfSpeech: "noun", category: "country" },
  { id: "vocab:カナダ", word: "カナダ", romaji: "kanada", ru: "Канада", partOfSpeech: "noun", category: "country" },

  // === Block 40: школьные предметы и языки (10 слов) ===
  { id: "vocab:にほんごJ", word: "にほんご", kanji: "日本語", romaji: "nihongoJ", ru: "японский язык (предмет)", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:えいご", word: "えいご", kanji: "英語", romaji: "eigo", ru: "английский язык", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:ロシアご", word: "ロシアご", kanji: "ロシア語", romaji: "roshiago", ru: "русский язык", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:すうがく", word: "すうがく", kanji: "数学", romaji: "suugaku", ru: "математика", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:れきし", word: "れきし", kanji: "歴史", romaji: "rekishi", ru: "история", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:ちり", word: "ちり", kanji: "地理", romaji: "chiri", ru: "география", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:かがく", word: "かがく", kanji: "科学", romaji: "kagaku", ru: "наука", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:ぶつり", word: "ぶつり", kanji: "物理", romaji: "butsuri", ru: "физика", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:びじゅつ", word: "びじゅつ", kanji: "美術", romaji: "bijutsu", ru: "ИЗО", partOfSpeech: "noun", category: "school-subj" },
  { id: "vocab:たいいく", word: "たいいく", kanji: "体育", romaji: "taiiku", ru: "физкультура", partOfSpeech: "noun", category: "school-subj" },

  // === Block 41: дни месяца и время суток (15 слов) ===
  { id: "vocab:ついたち", word: "ついたち", kanji: "一日", romaji: "tsuitachi", ru: "1-е число", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:ふつか", word: "ふつか", kanji: "二日", romaji: "futsuka", ru: "2-е (число / два дня)", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:みっか", word: "みっか", kanji: "三日", romaji: "mikka", ru: "3-е (число / три дня)", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:よっか", word: "よっか", kanji: "四日", romaji: "yokka", ru: "4-е (число / четыре дня)", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:いつか", word: "いつか", kanji: "五日", romaji: "itsuka", ru: "5-е (число / пять дней)", partOfSpeech: "noun", category: "dates", mnemonic: "Омофон с いつか «когда-нибудь»." },
  { id: "vocab:ごぜん", word: "ごぜん", kanji: "午前", romaji: "gozen", ru: "утро (до полудня)", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:ごご", word: "ごご", kanji: "午後", romaji: "gogo", ru: "после полудня", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:ばん", word: "ばん", kanji: "晩", romaji: "ban", ru: "вечер", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:ゆうがた", word: "ゆうがた", kanji: "夕方", romaji: "yuugata", ru: "вечер (ранний)", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:こんしゅう", word: "こんしゅう", kanji: "今週", romaji: "konshuu", ru: "эта неделя", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:らいしゅう", word: "らいしゅう", kanji: "来週", romaji: "raishuu", ru: "следующая неделя", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:せんしゅう", word: "せんしゅう", kanji: "先週", romaji: "senshuu", ru: "прошлая неделя", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:こんげつ", word: "こんげつ", kanji: "今月", romaji: "kongetsu", ru: "этот месяц", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:らいねん", word: "らいねん", kanji: "来年", romaji: "rainen", ru: "следующий год", partOfSpeech: "noun", category: "dates" },
  { id: "vocab:きょねん", word: "きょねん", kanji: "去年", romaji: "kyonen", ru: "прошлый год", partOfSpeech: "noun", category: "dates" },

  // === Block 42: остальные дни недели + полезное (10 слов) ===
  { id: "vocab:すいようび", word: "すいようび", kanji: "水曜日", romaji: "suiyoubi", ru: "среда", partOfSpeech: "noun", category: "time" },
  { id: "vocab:もくようび", word: "もくようび", kanji: "木曜日", romaji: "mokuyoubi", ru: "четверг", partOfSpeech: "noun", category: "time" },
  { id: "vocab:きんようび", word: "きんようび", kanji: "金曜日", romaji: "kinyoubi", ru: "пятница", partOfSpeech: "noun", category: "time" },
  { id: "vocab:どようび", word: "どようび", kanji: "土曜日", romaji: "doyoubi", ru: "суббота", partOfSpeech: "noun", category: "time" },
  { id: "vocab:しゅうまつ", word: "しゅうまつ", kanji: "週末", romaji: "shuumatsu", ru: "выходные", partOfSpeech: "noun", category: "time" },
  { id: "vocab:やすみ", word: "やすみ", kanji: "休み", romaji: "yasumi", ru: "выходной", meanings: ["каникулы"], partOfSpeech: "noun", category: "time" },
  { id: "vocab:じかん", word: "じかん", kanji: "時間", romaji: "jikan", ru: "время", meanings: ["час"], partOfSpeech: "noun", category: "time" },
  { id: "vocab:はん", word: "はん", kanji: "半", romaji: "han", ru: "половина", partOfSpeech: "noun", category: "time", mnemonic: "じはん = «полпервого»." },
  { id: "vocab:まいにち", word: "まいにち", kanji: "毎日", romaji: "mainichi", ru: "каждый день", partOfSpeech: "noun", category: "frequency" },
  { id: "vocab:まいあさ", word: "まいあさ", kanji: "毎朝", romaji: "maiasa", ru: "каждое утро", partOfSpeech: "noun", category: "frequency" },

  // === Block 43: расширенные числа (15 слов) ===
  { id: "vocab:じゅういち", word: "じゅういち", kanji: "十一", romaji: "juuichi", ru: "одиннадцать (11)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:じゅうに", word: "じゅうに", kanji: "十二", romaji: "juuni", ru: "двенадцать (12)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:じゅうご", word: "じゅうご", kanji: "十五", romaji: "juugo", ru: "пятнадцать (15)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:にじゅう", word: "にじゅう", kanji: "二十", romaji: "nijuu", ru: "двадцать (20)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:さんじゅう", word: "さんじゅう", kanji: "三十", romaji: "sanjuu", ru: "тридцать (30)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:ごじゅう", word: "ごじゅう", kanji: "五十", romaji: "gojuu", ru: "пятьдесят (50)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:ひゃく", word: "ひゃく", kanji: "百", romaji: "hyaku", ru: "сто (100)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:にひゃく", word: "にひゃく", kanji: "二百", romaji: "nihyaku", ru: "двести (200)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:せん", word: "せん", kanji: "千", romaji: "senN", ru: "тысяча (1000)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:いちまん", word: "いちまん", kanji: "一万", romaji: "ichiman", ru: "десять тысяч (10000)", partOfSpeech: "noun", category: "numbers", mnemonic: "Японцы считают тысячами иены десятками тысяч." },
  { id: "vocab:はんぶん", word: "はんぶん", kanji: "半分", romaji: "hanbun", ru: "половина (часть)", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:ぜんぶ", word: "ぜんぶ", kanji: "全部", romaji: "zenbu", ru: "всё", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:いちばん", word: "いちばん", kanji: "一番", romaji: "ichiban", ru: "номер 1 / самый", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:すうじ", word: "すうじ", kanji: "数字", romaji: "suuji", ru: "цифра", partOfSpeech: "noun", category: "numbers" },
  { id: "vocab:ばんごう", word: "ばんごう", kanji: "番号", romaji: "bangou", ru: "номер", partOfSpeech: "noun", category: "numbers" },

  // === Block 44: ещё глаголы (30 слов) ===
  { id: "vocab:かんがえる", word: "かんがえる", kanji: "考える", romaji: "kangaeru", ru: "думать (обдумывать)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:いる", word: "いる", romaji: "iruA", ru: "быть (живые)", partOfSpeech: "verb", category: "actions", mnemonic: "Для людей и животных." },
  { id: "vocab:ある", word: "ある", romaji: "aruA", ru: "быть (предметы)", partOfSpeech: "verb", category: "actions", mnemonic: "Для неживого." },
  { id: "vocab:なる", word: "なる", romaji: "naru", ru: "становиться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:できる", word: "できる", romaji: "dekiru", ru: "мочь", meanings: ["уметь"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:ひく", word: "ひく", kanji: "弾く", romaji: "hiku", ru: "играть (на инструменте)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:のぼる", word: "のぼる", kanji: "登る", romaji: "noboru", ru: "подниматься", meanings: ["взбираться"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:くだる", word: "くだる", kanji: "下る", romaji: "kudaru", ru: "спускаться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:とぶ", word: "とぶ", kanji: "飛ぶ", romaji: "tobu", ru: "летать", meanings: ["прыгать"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:なくす", word: "なくす", romaji: "nakusu", ru: "терять", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:さがす", word: "さがす", kanji: "探す", romaji: "sagasu", ru: "искать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:みつける", word: "みつける", kanji: "見つける", romaji: "mitsukeru", ru: "находить", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:あげる_lift", word: "あげる", kanji: "上げる", romaji: "ageruL", ru: "поднимать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:おく", word: "おく", kanji: "置く", romaji: "oku", ru: "класть", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:とる", word: "とる", kanji: "取る", romaji: "toru", ru: "брать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:すてる", word: "すてる", kanji: "捨てる", romaji: "suteru", ru: "выбрасывать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:けす", word: "けす", kanji: "消す", romaji: "kesu", ru: "выключать", meanings: ["стирать"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:つける", word: "つける", romaji: "tsukeru", ru: "включать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:のぼる_sun", word: "のぼる", kanji: "昇る", romaji: "noboruS", ru: "восходить (о солнце)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:しまう", word: "しまう", romaji: "shimau", ru: "убирать (на место)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:なおす", word: "なおす", kanji: "直す", romaji: "naosu", ru: "чинить", meanings: ["исправлять"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:こわす", word: "こわす", kanji: "壊す", romaji: "kowasu", ru: "ломать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:とまる", word: "とまる", kanji: "止まる", romaji: "tomaru", ru: "останавливаться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:はじめる", word: "はじめる", kanji: "始める", romaji: "hajimeru", ru: "начинать (что-то)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:おしえる", word: "おしえる", kanji: "教える", romaji: "oshieru", ru: "учить (кого-то)", meanings: ["рассказывать"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:ならう", word: "ならう", kanji: "習う", romaji: "narau", ru: "учиться (у кого-то)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:つたえる", word: "つたえる", kanji: "伝える", romaji: "tsutaeru", ru: "передавать (сообщение)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:あう_meet", word: "あう", kanji: "合う", romaji: "auMatch", ru: "подходить (соответствовать)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:きこえる", word: "きこえる", kanji: "聞こえる", romaji: "kikoeru", ru: "слышаться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:みえる", word: "みえる", kanji: "見える", romaji: "mieru", ru: "виднеться", partOfSpeech: "verb", category: "actions" },

  // === Block 45: повседневная жизнь и быт (25 слов) ===
  { id: "vocab:あさごはん2", word: "ばんごはん", kanji: "晩ご飯", romaji: "bangohan", ru: "ужин", partOfSpeech: "noun", category: "food" },
  { id: "vocab:ひるごはん", word: "ひるごはん", kanji: "昼ご飯", romaji: "hirugohan", ru: "обед", partOfSpeech: "noun", category: "food" },
  { id: "vocab:おべんとう", word: "おべんとう", kanji: "お弁当", romaji: "obentou", ru: "бенто (ланч-бокс)", partOfSpeech: "noun", category: "food" },
  { id: "vocab:はし", word: "はし", kanji: "箸", romaji: "hashiC", ru: "палочки (для еды)", partOfSpeech: "noun", category: "food" },
  { id: "vocab:フォーク", word: "フォーク", romaji: "fooku", ru: "вилка", partOfSpeech: "noun", category: "food" },
  { id: "vocab:スプーン", word: "スプーン", romaji: "supuun", ru: "ложка", partOfSpeech: "noun", category: "food" },
  { id: "vocab:ナイフ", word: "ナイフ", romaji: "naifu", ru: "нож", partOfSpeech: "noun", category: "food" },
  { id: "vocab:さら", word: "さら", kanji: "皿", romaji: "sara", ru: "тарелка", partOfSpeech: "noun", category: "food" },
  { id: "vocab:コップ", word: "コップ", romaji: "koppu", ru: "стакан", partOfSpeech: "noun", category: "food" },
  { id: "vocab:かみ_paper", word: "かみ", kanji: "紙", romaji: "kamiP", ru: "бумага", partOfSpeech: "noun", category: "office" },
  { id: "vocab:てがみ", word: "てがみ", kanji: "手紙", romaji: "tegami", ru: "письмо", partOfSpeech: "noun", category: "office" },
  { id: "vocab:しんぶん", word: "しんぶん", kanji: "新聞", romaji: "shinbun", ru: "газета", partOfSpeech: "noun", category: "office" },
  { id: "vocab:ざっし", word: "ざっし", kanji: "雑誌", romaji: "zasshi", ru: "журнал", partOfSpeech: "noun", category: "office" },
  { id: "vocab:にわ", word: "にわ", kanji: "庭", romaji: "niwa", ru: "сад", partOfSpeech: "noun", category: "home" },
  { id: "vocab:だいどころ", word: "だいどころ", kanji: "台所", romaji: "daidokoro", ru: "кухня", partOfSpeech: "noun", category: "home" },
  { id: "vocab:しょくどう", word: "しょくどう", kanji: "食堂", romaji: "shokudou", ru: "столовая", partOfSpeech: "noun", category: "places" },
  { id: "vocab:としょかん", word: "としょかん", kanji: "図書館", romaji: "toshokan", ru: "библиотека", partOfSpeech: "noun", category: "places" },
  { id: "vocab:びじゅつかん", word: "びじゅつかん", kanji: "美術館", romaji: "bijutsukan", ru: "музей искусства", partOfSpeech: "noun", category: "places" },
  { id: "vocab:はくぶつかん", word: "はくぶつかん", kanji: "博物館", romaji: "hakubutsukan", ru: "музей", partOfSpeech: "noun", category: "places" },
  { id: "vocab:プール", word: "プール", romaji: "puuru", ru: "бассейн", partOfSpeech: "noun", category: "places" },
  { id: "vocab:こうじょう", word: "こうじょう", kanji: "工場", romaji: "koujou", ru: "завод", partOfSpeech: "noun", category: "places" },
  { id: "vocab:ゆうびんきょく", word: "ゆうびんきょく", kanji: "郵便局", romaji: "yuubinkyoku", ru: "почта", partOfSpeech: "noun", category: "places" },
  { id: "vocab:こうばん", word: "こうばん", kanji: "交番", romaji: "kouban", ru: "полицейская будка", partOfSpeech: "noun", category: "places" },
  { id: "vocab:たいしかん", word: "たいしかん", kanji: "大使館", romaji: "taishikan", ru: "посольство", partOfSpeech: "noun", category: "places" },
  { id: "vocab:アパート", word: "アパート", romaji: "apaato", ru: "квартира", partOfSpeech: "noun", category: "home" },

  // === Block 46: выражения и фразы (15 слов) ===
  { id: "vocab:すみませんでした", word: "すみませんでした", romaji: "sumimasendeshita", ru: "извините (за прошлое)", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:ごめんなさい", word: "ごめんなさい", romaji: "gomennasai", ru: "простите", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:いただきます", word: "いただきます", romaji: "itadakimasu", ru: "приятного аппетита", meanings: ["принимаю с благодарностью"], partOfSpeech: "expression", category: "food", mnemonic: "Говорят перед едой." },
  { id: "vocab:ごちそうさま", word: "ごちそうさま", romaji: "gochisousama", ru: "спасибо за угощение", partOfSpeech: "expression", category: "food", mnemonic: "Говорят после еды." },
  { id: "vocab:おやすみ", word: "おやすみ", kanji: "お休み", romaji: "oyasumi", ru: "спокойной ночи", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:いってきます", word: "いってきます", romaji: "ittekimasu", ru: "ухожу (увидимся)", partOfSpeech: "expression", category: "greetings", mnemonic: "Говорят выходя из дома." },
  { id: "vocab:ただいま", word: "ただいま", romaji: "tadaima", ru: "я дома", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:おかえり", word: "おかえり", romaji: "okaeri", ru: "с возвращением", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:おつかれさま", word: "おつかれさま", kanji: "お疲れ様", romaji: "otsukaresama", ru: "спасибо за труд", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:がんばって", word: "がんばって", romaji: "ganbatte", ru: "удачи / держись", partOfSpeech: "expression", category: "greetings" },
  { id: "vocab:もちろん", word: "もちろん", romaji: "mochiron", ru: "конечно", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:たぶん", word: "たぶん", romaji: "tabun", ru: "наверное", partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:ぜひ", word: "ぜひ", romaji: "zehi", ru: "обязательно", meanings: ["непременно"], partOfSpeech: "expression", category: "frequency" },
  { id: "vocab:あのう", word: "あのう", romaji: "anou", ru: "эээ... (заминка)", partOfSpeech: "interjection", category: "greetings" },
  { id: "vocab:そう", word: "そう", romaji: "sou", ru: "так / да", partOfSpeech: "expression", category: "greetings" },

  // === Block 47: связки и частицы (10 слов) ===
  { id: "vocab:そして", word: "そして", romaji: "soshite", ru: "и (потом)", partOfSpeech: "expression", category: "particles" },
  { id: "vocab:でも", word: "でも", romaji: "demo", ru: "но", partOfSpeech: "expression", category: "particles" },
  { id: "vocab:しかし", word: "しかし", romaji: "shikashi", ru: "однако (формально)", partOfSpeech: "expression", category: "particles" },
  { id: "vocab:だから", word: "だから", romaji: "dakara", ru: "поэтому", partOfSpeech: "expression", category: "particles" },
  { id: "vocab:それから", word: "それから", romaji: "sorekara", ru: "затем", partOfSpeech: "expression", category: "particles" },
  { id: "vocab:または", word: "または", romaji: "matawa", ru: "или (формально)", partOfSpeech: "expression", category: "particles" },
  { id: "vocab:と", word: "と", romaji: "toP", ru: "и (между сущ.)", partOfSpeech: "particle", category: "particles", mnemonic: "Соединяет существительные: パンとミルク." },
  { id: "vocab:や", word: "や", romaji: "yaP", ru: "и (среди прочего)", partOfSpeech: "particle", category: "particles" },
  { id: "vocab:が_subj", word: "が", romaji: "gaP", ru: "субъектная частица", partOfSpeech: "particle", category: "particles", mnemonic: "Указывает подлежащее: あめがふる." },
  { id: "vocab:から_from", word: "から", romaji: "karaFrom", ru: "от / с (откуда)", partOfSpeech: "particle", category: "particles" },

  // === Block 48: прочие частотные слова (15 слов) ===
  { id: "vocab:ところ", word: "ところ", kanji: "所", romaji: "tokoro", ru: "место", partOfSpeech: "noun", category: "places" },
  { id: "vocab:もの", word: "もの", kanji: "物", romaji: "mono", ru: "вещь (предмет)", partOfSpeech: "noun", category: "people" },
  { id: "vocab:こと", word: "こと", kanji: "事", romaji: "koto", ru: "вещь (абстракция)", meanings: ["дело"], partOfSpeech: "noun", category: "people" },
  { id: "vocab:わけ", word: "わけ", romaji: "wake", ru: "причина", partOfSpeech: "noun", category: "people" },
  { id: "vocab:ばあい", word: "ばあい", kanji: "場合", romaji: "baai", ru: "случай (ситуация)", partOfSpeech: "noun", category: "people" },
  { id: "vocab:つぎ", word: "つぎ", kanji: "次", romaji: "tsugi", ru: "следующий", partOfSpeech: "noun", category: "directions" },
  { id: "vocab:さいご", word: "さいご", kanji: "最後", romaji: "saigo", ru: "последний", partOfSpeech: "noun", category: "directions" },
  { id: "vocab:さいしょ", word: "さいしょ", kanji: "最初", romaji: "saisho", ru: "первый (начало)", partOfSpeech: "noun", category: "directions" },
  { id: "vocab:べつ", word: "べつ", kanji: "別", romaji: "betsu", ru: "другой", partOfSpeech: "adj", category: "people" },
  { id: "vocab:おなじ", word: "おなじ", kanji: "同じ", romaji: "onaji", ru: "одинаковый", partOfSpeech: "adj", category: "people" },
  { id: "vocab:みんな", word: "みんな", romaji: "minna", ru: "все", partOfSpeech: "pronoun", category: "people" },
  { id: "vocab:なにか", word: "なにか", romaji: "nanika", ru: "что-то", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:だれか", word: "だれか", romaji: "dareka", ru: "кто-то", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:どこか", word: "どこか", romaji: "dokoka", ru: "где-то", partOfSpeech: "pronoun", category: "questions" },
  { id: "vocab:いつか_some", word: "いつか", romaji: "itsukaS", ru: "когда-нибудь", partOfSpeech: "pronoun", category: "questions" },

  // === Block 49: бизнес и встречи (15) ===
  { id: "vocab:かいぎ", word: "かいぎ", kanji: "会議", romaji: "kaigi", ru: "встреча", meanings: ["совещание"], partOfSpeech: "noun", category: "business" },
  { id: "vocab:でんわばんごう", word: "でんわばんごう", kanji: "電話番号", romaji: "denwabangou", ru: "номер телефона", partOfSpeech: "noun", category: "business" },
  { id: "vocab:じゅうしょ", word: "じゅうしょ", kanji: "住所", romaji: "juusho", ru: "адрес", partOfSpeech: "noun", category: "business" },
  { id: "vocab:しょるい", word: "しょるい", kanji: "書類", romaji: "shorui", ru: "документ", partOfSpeech: "noun", category: "business" },
  { id: "vocab:けいやく", word: "けいやく", kanji: "契約", romaji: "keiyaku", ru: "контракт", partOfSpeech: "noun", category: "business" },
  { id: "vocab:きゅうりょう", word: "きゅうりょう", kanji: "給料", romaji: "kyuuryou", ru: "зарплата", partOfSpeech: "noun", category: "business" },
  { id: "vocab:ボーナス", word: "ボーナス", romaji: "boonasu", ru: "премия", partOfSpeech: "noun", category: "business" },
  { id: "vocab:やくそく", word: "やくそく", kanji: "約束", romaji: "yakusoku", ru: "обещание", meanings: ["договорённость"], partOfSpeech: "noun", category: "business" },
  { id: "vocab:けいかく", word: "けいかく", kanji: "計画", romaji: "keikaku", ru: "план", partOfSpeech: "noun", category: "business" },
  { id: "vocab:もくひょう", word: "もくひょう", kanji: "目標", romaji: "mokuhyou", ru: "цель", partOfSpeech: "noun", category: "business" },
  { id: "vocab:レポート", word: "レポート", romaji: "repooto", ru: "отчёт", partOfSpeech: "noun", category: "business" },
  { id: "vocab:スケジュール", word: "スケジュール", romaji: "sukejuuru", ru: "расписание", partOfSpeech: "noun", category: "business" },
  { id: "vocab:プロジェクト", word: "プロジェクト", romaji: "purojekuto", ru: "проект", partOfSpeech: "noun", category: "business" },
  { id: "vocab:ミーティング", word: "ミーティング", romaji: "miitingu", ru: "митинг", partOfSpeech: "noun", category: "business" },
  { id: "vocab:めいし", word: "めいし", kanji: "名刺", romaji: "meishi", ru: "визитка", partOfSpeech: "noun", category: "business" },

  // === Block 50: блюда (15) ===
  { id: "vocab:ラーメン", word: "ラーメン", romaji: "raamen", ru: "рамен", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:うどん", word: "うどん", romaji: "udon", ru: "удон", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:そば", word: "そば", romaji: "soba", ru: "соба", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:カレー", word: "カレー", romaji: "karee", ru: "карри", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:ぎゅうどん", word: "ぎゅうどん", kanji: "牛丼", romaji: "gyuudon", ru: "гюдон (рис с говядиной)", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:やきとり", word: "やきとり", kanji: "焼き鳥", romaji: "yakitori", ru: "якитори (курица на шпажках)", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:ぎょうざ", word: "ぎょうざ", kanji: "餃子", romaji: "gyouza", ru: "гёдза", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:みそしる", word: "みそしる", kanji: "味噌汁", romaji: "misoshiru", ru: "мисо-суп", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:さしみ", word: "さしみ", kanji: "刺身", romaji: "sashimi", ru: "сашими", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:てんぷら", word: "てんぷら", kanji: "天ぷら", romaji: "tenpura", ru: "темпура", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:しょうゆ", word: "しょうゆ", kanji: "醤油", romaji: "shouyu", ru: "соевый соус", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:しお", word: "しお", kanji: "塩", romaji: "shio", ru: "соль", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:さとう", word: "さとう", kanji: "砂糖", romaji: "satou", ru: "сахар", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:こしょう", word: "こしょう", romaji: "koshou", ru: "перец", partOfSpeech: "noun", category: "dishes" },
  { id: "vocab:バター", word: "バター", romaji: "bataa", ru: "масло (сливочное)", partOfSpeech: "noun", category: "dishes" },

  // === Block 51: кулинарные действия (10) ===
  { id: "vocab:やく", word: "やく", kanji: "焼く", romaji: "yaku", ru: "жарить", meanings: ["печь"], partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:にる", word: "にる", kanji: "煮る", romaji: "niru", ru: "варить", partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:きる_cook", word: "きる", kanji: "切る", romaji: "kiruC", ru: "резать", partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:まぜる", word: "まぜる", kanji: "混ぜる", romaji: "mazeru", ru: "смешивать", partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:いれる", word: "いれる", kanji: "入れる", romaji: "ireru", ru: "класть (внутрь)", partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:だす", word: "だす", kanji: "出す", romaji: "dasu", ru: "доставать (наружу)", partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:ひやす", word: "ひやす", kanji: "冷やす", romaji: "hiyasu", ru: "охлаждать", partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:あたためる", word: "あたためる", kanji: "温める", romaji: "atatameru", ru: "разогревать", partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:りょうりする", word: "りょうりする", kanji: "料理する", romaji: "ryourisuru", ru: "готовить", partOfSpeech: "verb", category: "cooking" },
  { id: "vocab:あじみする", word: "あじみする", kanji: "味見する", romaji: "ajimisuru", ru: "пробовать на вкус", partOfSpeech: "verb", category: "cooking" },

  // === Block 52: ещё прилагательные (10) ===
  { id: "vocab:かるい", word: "かるい", kanji: "軽い", romaji: "karui", ru: "лёгкий (по весу)", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:おもい", word: "おもい", kanji: "重い", romaji: "omoi", ru: "тяжёлый", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:うるさい", word: "うるさい", romaji: "urusai", ru: "шумный", meanings: ["надоедливый"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:かわいい", word: "かわいい", romaji: "kawaii", ru: "милый", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:かっこいい", word: "かっこいい", romaji: "kakkoii", ru: "крутой", meanings: ["красивый (о парне)"], partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:すばらしい", word: "すばらしい", kanji: "素晴らしい", romaji: "subarashii", ru: "великолепный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:ひどい", word: "ひどい", romaji: "hidoi", ru: "ужасный", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:やわらかい", word: "やわらかい", kanji: "柔らかい", romaji: "yawarakai", ru: "мягкий", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:かたい", word: "かたい", kanji: "硬い", romaji: "katai", ru: "твёрдый", partOfSpeech: "adj", category: "adj-i" },
  { id: "vocab:まるい", word: "まるい", kanji: "丸い", romaji: "marui", ru: "круглый", partOfSpeech: "adj", category: "adj-i" },

  // === Block 53: интернет и соц.сети (10) ===
  { id: "vocab:ライン", word: "ライン", romaji: "rain", ru: "LINE (мессенджер)", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:インスタ", word: "インスタ", romaji: "insuta", ru: "Instagram", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:ツイッター", word: "ツイッター", romaji: "tsuittaa", ru: "Twitter (X)", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:ユーチューブ", word: "ユーチューブ", romaji: "yuuchuubu", ru: "YouTube", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:メッセージ", word: "メッセージ", romaji: "messeeji", ru: "сообщение", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:ダウンロード", word: "ダウンロード", romaji: "daunroodo", ru: "скачать", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:アップロード", word: "アップロード", romaji: "appuroodo", ru: "загрузить", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:ログイン", word: "ログイン", romaji: "roguin", ru: "вход (в аккаунт)", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:パスワード", word: "パスワード", romaji: "pasuwaado", ru: "пароль", partOfSpeech: "noun", category: "internet" },
  { id: "vocab:アカウント", word: "アカウント", romaji: "akaunto", ru: "аккаунт", partOfSpeech: "noun", category: "internet" },

  // === Block 54: дом расширение (10) ===
  { id: "vocab:おしいれ", word: "おしいれ", kanji: "押入れ", romaji: "oshiire", ru: "встроенный шкаф", partOfSpeech: "noun", category: "home" },
  { id: "vocab:ふとん", word: "ふとん", kanji: "布団", romaji: "futon", ru: "футон", partOfSpeech: "noun", category: "home" },
  { id: "vocab:たな", word: "たな", kanji: "棚", romaji: "tana", ru: "полка", partOfSpeech: "noun", category: "home" },
  { id: "vocab:ほんだな", word: "ほんだな", kanji: "本棚", romaji: "hondana", ru: "книжная полка", partOfSpeech: "noun", category: "home" },
  { id: "vocab:カーテン", word: "カーテン", romaji: "kaaten", ru: "занавеска", partOfSpeech: "noun", category: "home" },
  { id: "vocab:ソファ", word: "ソファ", romaji: "sofa", ru: "диван", partOfSpeech: "noun", category: "home" },
  { id: "vocab:かべ", word: "かべ", kanji: "壁", romaji: "kabe", ru: "стена", partOfSpeech: "noun", category: "home" },
  { id: "vocab:ゆか", word: "ゆか", kanji: "床", romaji: "yuka", ru: "пол", partOfSpeech: "noun", category: "home" },
  { id: "vocab:てんじょう", word: "てんじょう", kanji: "天井", romaji: "tenjou", ru: "потолок", partOfSpeech: "noun", category: "home" },
  { id: "vocab:かいだん", word: "かいだん", kanji: "階段", romaji: "kaidan", ru: "лестница", partOfSpeech: "noun", category: "home" },

  // === Block 55: семья расширение (8) ===
  { id: "vocab:おば", word: "おば", romaji: "obaA", ru: "тётя", partOfSpeech: "noun", category: "family" },
  { id: "vocab:おじ", word: "おじ", romaji: "ojiA", ru: "дядя", partOfSpeech: "noun", category: "family" },
  { id: "vocab:おばさん_aunt", word: "おばさん", romaji: "obasanA", ru: "тётя (вежл.)", partOfSpeech: "noun", category: "family" },
  { id: "vocab:おじさん", word: "おじさん", romaji: "ojisan", ru: "дядя (вежл.)", partOfSpeech: "noun", category: "family" },
  { id: "vocab:いとこ", word: "いとこ", romaji: "itoko", ru: "двоюродный брат/сестра", partOfSpeech: "noun", category: "family" },
  { id: "vocab:まご", word: "まご", kanji: "孫", romaji: "mago", ru: "внук", meanings: ["внучка"], partOfSpeech: "noun", category: "family" },
  { id: "vocab:こいびと", word: "こいびと", kanji: "恋人", romaji: "koibito", ru: "возлюбленный", partOfSpeech: "noun", category: "family" },
  { id: "vocab:しんゆう", word: "しんゆう", kanji: "親友", romaji: "shinyuu", ru: "лучший друг", partOfSpeech: "noun", category: "family" },

  // === Block 56: культура и традиции (15) ===
  { id: "vocab:まつり", word: "まつり", kanji: "祭り", romaji: "matsuri", ru: "праздник", meanings: ["фестиваль"], partOfSpeech: "noun", category: "culture" },
  { id: "vocab:はなび", word: "はなび", kanji: "花火", romaji: "hanabi", ru: "фейерверк", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:きもの", word: "きもの", kanji: "着物", romaji: "kimono", ru: "кимоно", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:ゆかた", word: "ゆかた", kanji: "浴衣", romaji: "yukata", ru: "юката (летнее кимоно)", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:すもう", word: "すもう", kanji: "相撲", romaji: "sumou", ru: "сумо", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:いけばな", word: "いけばな", kanji: "生け花", romaji: "ikebana", ru: "икебана", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:しょどう", word: "しょどう", kanji: "書道", romaji: "shodou", ru: "каллиграфия", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:ちゃどう", word: "ちゃどう", kanji: "茶道", romaji: "chadou", ru: "чайная церемония", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:でんとう", word: "でんとう", kanji: "伝統", romaji: "dentou", ru: "традиция", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:ぶんか", word: "ぶんか", kanji: "文化", romaji: "bunka", ru: "культура", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:しゅうきょう", word: "しゅうきょう", kanji: "宗教", romaji: "shuukyou", ru: "религия", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:かみさま", word: "かみさま", kanji: "神様", romaji: "kamisama", ru: "бог", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:おしょうがつ", word: "おしょうがつ", kanji: "お正月", romaji: "oshougatsu", ru: "Новый год (япон.)", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:はなみ", word: "はなみ", kanji: "花見", romaji: "hanami", ru: "ханами (любование сакурой)", partOfSpeech: "noun", category: "culture" },
  { id: "vocab:せっぷく", word: "せっぷく", kanji: "切腹", romaji: "seppuku", ru: "сэппуку (ритуальное самоубийство)", partOfSpeech: "noun", category: "culture", mnemonic: "Историческая лексика — встречается в фильмах/аниме." },

  // === Block 57: ещё повседневные глаголы (15) ===
  { id: "vocab:うけとる", word: "うけとる", kanji: "受け取る", romaji: "uketoru", ru: "получать (вещь)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:しらべる", word: "しらべる", kanji: "調べる", romaji: "shiraberu", ru: "проверять", meanings: ["искать инфо"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:ためす", word: "ためす", kanji: "試す", romaji: "tamesu", ru: "пробовать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:えらぶ", word: "えらぶ", kanji: "選ぶ", romaji: "erabu", ru: "выбирать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:すすめる", word: "すすめる", kanji: "勧める", romaji: "susumeru", ru: "рекомендовать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:きめる", word: "きめる", kanji: "決める", romaji: "kimeru", ru: "решать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:かぞえる", word: "かぞえる", kanji: "数える", romaji: "kazoeru", ru: "считать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:はかる", word: "はかる", kanji: "測る", romaji: "hakaru", ru: "измерять", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:うごく", word: "うごく", kanji: "動く", romaji: "ugoku", ru: "двигаться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:すむ", word: "すむ", kanji: "住む", romaji: "sumu", ru: "жить (проживать)", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:そだてる", word: "そだてる", kanji: "育てる", romaji: "sodateru", ru: "растить", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:なくなる", word: "なくなる", romaji: "nakunaru", ru: "исчезать", meanings: ["умирать (вежл.)"], partOfSpeech: "verb", category: "actions" },
  { id: "vocab:うまれる", word: "うまれる", kanji: "生まれる", romaji: "umareru", ru: "родиться", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:しぬ", word: "しぬ", kanji: "死ぬ", romaji: "shinu", ru: "умирать", partOfSpeech: "verb", category: "actions" },
  { id: "vocab:いきる", word: "いきる", kanji: "生きる", romaji: "ikiru", ru: "жить (быть живым)", partOfSpeech: "verb", category: "actions" },

  // === Block 58: тело и анатомия + расширения (12) ===
  { id: "vocab:なみだ", word: "なみだ", kanji: "涙", romaji: "namida", ru: "слеза", partOfSpeech: "noun", category: "body" },
  { id: "vocab:ち_blood", word: "ち", kanji: "血", romaji: "chiB", ru: "кровь", partOfSpeech: "noun", category: "body" },
  { id: "vocab:ほね", word: "ほね", kanji: "骨", romaji: "hone", ru: "кость", partOfSpeech: "noun", category: "body" },
  { id: "vocab:ひざ", word: "ひざ", kanji: "膝", romaji: "hiza", ru: "колено", partOfSpeech: "noun", category: "body" },
  { id: "vocab:ひじ", word: "ひじ", kanji: "肘", romaji: "hiji", ru: "локоть", partOfSpeech: "noun", category: "body" },
  { id: "vocab:こし", word: "こし", kanji: "腰", romaji: "koshi", ru: "поясница", partOfSpeech: "noun", category: "body" },
  { id: "vocab:かた_shoulder", word: "かた", kanji: "肩", romaji: "kataS", ru: "плечо", partOfSpeech: "noun", category: "body" },
  { id: "vocab:むね", word: "むね", kanji: "胸", romaji: "mune", ru: "грудь", partOfSpeech: "noun", category: "body" },
  { id: "vocab:せなか", word: "せなか", kanji: "背中", romaji: "senaka", ru: "спина (полнее)", partOfSpeech: "noun", category: "body" },
  { id: "vocab:しんぞう", word: "しんぞう", kanji: "心臓", romaji: "shinzou", ru: "сердце (орган)", partOfSpeech: "noun", category: "body" },
  { id: "vocab:のうみそ", word: "のうみそ", kanji: "脳味噌", romaji: "noumiso", ru: "мозг", partOfSpeech: "noun", category: "body" },
  { id: "vocab:はだ", word: "はだ", kanji: "肌", romaji: "hada", ru: "кожа", partOfSpeech: "noun", category: "body" },
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
