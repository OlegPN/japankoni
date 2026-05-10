// Все 46 базовых знаков хираганы с русскими мнемониками.
// Мнемоники — рабочие черновики, могут шлифоваться редактором-японистом.

export type Kana = {
  char: string;
  romaji: string;
  ru: string;        // как читается русскими буквами
  mnemonic: string;  // короткая русская мнемоника
};

export const HIRAGANA: Kana[] = [
  // А-ряд
  { char: "あ", romaji: "a",  ru: "а",  mnemonic: "Похоже на яблоко (apple) с веточкой — открой рот: А!" },
  { char: "い", romaji: "i",  ru: "и",  mnemonic: "Две вертикальные палочки — как «И» в палочках для еды." },
  { char: "う", romaji: "u",  ru: "у",  mnemonic: "Открытый рот сбоку: «У-у-у»." },
  { char: "え", romaji: "e",  ru: "э",  mnemonic: "Птица с гребешком кричит: «Э!»." },
  { char: "お", romaji: "o",  ru: "о",  mnemonic: "Снеговик из двух кружков: «О!»." },
  // К-ряд
  { char: "か", romaji: "ka", ru: "ка", mnemonic: "Карате-удар сверху: «Ка!»" },
  { char: "き", romaji: "ki", ru: "ки", mnemonic: "Ключ с двумя зубцами — Ki." },
  { char: "く", romaji: "ku", ru: "ку", mnemonic: "Клюв птицы — «Ку-ку»." },
  { char: "け", romaji: "ke", ru: "кэ", mnemonic: "Кегля — «Ке!»." },
  { char: "こ", romaji: "ko", ru: "ко", mnemonic: "Две запятые — кошачьи усы. «Ко-ко»." },
  // С-ряд
  { char: "さ", romaji: "sa", ru: "са", mnemonic: "Крест и крюк — «Сачок»." },
  { char: "し", romaji: "shi", ru: "си", mnemonic: "Крюк, на котором висит «щи». ШИ!" },
  { char: "す", romaji: "su", ru: "су", mnemonic: "Спираль вниз — «Суп закручивается»." },
  { char: "せ", romaji: "se", ru: "сэ", mnemonic: "Семёрка с хвостом — «Се!»." },
  { char: "そ", romaji: "so", ru: "со", mnemonic: "Зигзаг как «соль» в баночке." },
  // Т-ряд
  { char: "た", romaji: "ta", ru: "та", mnemonic: "Та-та-та! Барабан и палочки." },
  { char: "ち", romaji: "chi", ru: "ти", mnemonic: "«Чи» — похоже на цифру 5 наоборот." },
  { char: "つ", romaji: "tsu", ru: "цу", mnemonic: "Цунами — волна слева направо." },
  { char: "て", romaji: "te", ru: "тэ", mnemonic: "Телеграмма с галочкой." },
  { char: "と", romaji: "to", ru: "то", mnemonic: "Топор с рукояткой." },
  // Н-ряд
  { char: "な", romaji: "na", ru: "на", mnemonic: "На крючке висит петелька." },
  { char: "に", romaji: "ni", ru: "ни", mnemonic: "Нитка через игольное ушко." },
  { char: "ぬ", romaji: "nu", ru: "ну", mnemonic: "Лапша (nudle) с петлёй." },
  { char: "ね", romaji: "ne", ru: "нэ", mnemonic: "Кот с хвостом — «нэ?» (правда?)" },
  { char: "の", romaji: "no", ru: "но", mnemonic: "«No way» — закручивающаяся петля." },
  // Х-ряд
  { char: "は", romaji: "ha", ru: "ха", mnemonic: "Хрюшка стоит, две ножки и пятачок." },
  { char: "ひ", romaji: "hi", ru: "хи", mnemonic: "Хи-хи — улыбка с ямочкой." },
  { char: "ふ", romaji: "fu", ru: "фу", mnemonic: "Фудзи — гора с облачком." },
  { char: "へ", romaji: "he", ru: "хэ", mnemonic: "Хет — крыша одной чертой." },
  { char: "ほ", romaji: "ho", ru: "хо", mnemonic: "Хо-хо-хо! Санта с двумя пуговицами." },
  // М-ряд
  { char: "ま", romaji: "ma", ru: "ма", mnemonic: "Мама с волосами и серёжками." },
  { char: "み", romaji: "mi", ru: "ми", mnemonic: "Цифра 21 — миллиметры." },
  { char: "む", romaji: "mu", ru: "му", mnemonic: "Му! Корова с рогом и хвостом." },
  { char: "め", romaji: "me", ru: "мэ", mnemonic: "Глаз (мэ) — узел и петелька." },
  { char: "も", romaji: "mo", ru: "мо", mnemonic: "Море с двумя волнами и крючком." },
  // Я-ряд
  { char: "や", romaji: "ya", ru: "я",  mnemonic: "Якорь с верёвкой." },
  { char: "ゆ", romaji: "yu", ru: "ю",  mnemonic: "Юла с ручкой." },
  { char: "よ", romaji: "yo", ru: "ё",  mnemonic: "Йо-йо на верёвочке." },
  // Р-ряд (Л/Р в японском не различают)
  { char: "ら", romaji: "ra", ru: "ра", mnemonic: "Рамэн в миске с палочками." },
  { char: "り", romaji: "ri", ru: "ри", mnemonic: "Рис в двух мешках." },
  { char: "る", romaji: "ru", ru: "ру", mnemonic: "Рулет с завитком." },
  { char: "れ", romaji: "re", ru: "рэ", mnemonic: "Река делает поворот." },
  { char: "ろ", romaji: "ro", ru: "ро", mnemonic: "Робот с угловатым телом." },
  // В-ряд (только wa/wo) и н
  { char: "わ", romaji: "wa", ru: "ва", mnemonic: "Вагон с трубой." },
  { char: "を", romaji: "wo", ru: "о",  mnemonic: "Грамматическая частица — «о»." },
  { char: "ん", romaji: "n",  ru: "н",  mnemonic: "Закорючка — буква Н в конце слов." },
];

export type Distractor = string;

// Для теста с 4 вариантами: подбираем 3 случайных похожих ромадзи
export function pickDistractors(answer: string, all: Kana[], n = 3): Distractor[] {
  const pool = all.map(k => k.romaji).filter(r => r !== answer);
  const result: string[] = [];
  while (result.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}
