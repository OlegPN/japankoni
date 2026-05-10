// Все 46 базовых знаков катаканы с русскими мнемониками.
// Структура зеркальна hiragana.ts, чтобы переиспользовать логику кана-стартера.
// Мнемоники — рабочие черновики, могут шлифоваться редактором-японистом.

export type Katakana = {
  char: string;
  romaji: string;
  ru: string;        // как читается русскими буквами
  mnemonic: string;  // короткая русская мнемоника
};

export const KATAKANA: Katakana[] = [
  // А-ряд
  { char: "ア", romaji: "a",  ru: "а",  mnemonic: "Антенна с растяжкой — «А-а-а, ловит сигнал!»." },
  { char: "イ", romaji: "i",  ru: "и",  mnemonic: "Иголка с ниткой сбоку." },
  { char: "ウ", romaji: "u",  ru: "у",  mnemonic: "Уголок крыши с дымоходом." },
  { char: "エ", romaji: "e",  ru: "э",  mnemonic: "Эскалатор: верх, середина, низ — «Э!»." },
  { char: "オ", romaji: "o",  ru: "о",  mnemonic: "Ось с крючком — «О!»." },
  // К-ряд
  { char: "カ", romaji: "ka", ru: "ка", mnemonic: "Катана с гардой — «Ка!»." },
  { char: "キ", romaji: "ki", ru: "ки", mnemonic: "Ключ с двумя бородками." },
  { char: "ク", romaji: "ku", ru: "ку", mnemonic: "Клюв птицы — «Ку-ку»." },
  { char: "ケ", romaji: "ke", ru: "кэ", mnemonic: "Кепка набекрень." },
  { char: "コ", romaji: "ko", ru: "ко", mnemonic: "Коробка без крышки — «Ко-ко»." },
  // С-ряд
  { char: "サ", romaji: "sa", ru: "са", mnemonic: "Сачок: ручка и сетка." },
  { char: "シ", romaji: "shi", ru: "си", mnemonic: "Шипы: три коротких штриха слева, смотрят вверх." },
  { char: "ス", romaji: "su", ru: "су", mnemonic: "Спуск с горки — крюк сверху, скат вниз." },
  { char: "セ", romaji: "se", ru: "сэ", mnemonic: "Семёрка по-японски — «Сэ!»." },
  { char: "ソ", romaji: "so", ru: "со", mnemonic: "Соль: две капли вниз. (Не путать с シ — у ソ штрихи сверху вниз)." },
  // Т-ряд
  { char: "タ", romaji: "ta", ru: "та", mnemonic: "Та-та-та! Барабанная палочка с точкой." },
  { char: "チ", romaji: "chi", ru: "ти", mnemonic: "Похоже на цифру 7 с черточкой — «Чи!»." },
  { char: "ツ", romaji: "tsu", ru: "цу", mnemonic: "Цунами: три брызга вверху. (Не путать с シ — у ツ штрихи сверху, направлены вниз)." },
  { char: "テ", romaji: "te", ru: "тэ", mnemonic: "Телеграмма с печатью — две линии и крюк." },
  { char: "ト", romaji: "to", ru: "то", mnemonic: "Топор: рукоять и лезвие." },
  // Н-ряд
  { char: "ナ", romaji: "na", ru: "на", mnemonic: "Нить через крестик." },
  { char: "ニ", romaji: "ni", ru: "ни", mnemonic: "Две полки — «Ни-ни-ни»." },
  { char: "ヌ", romaji: "nu", ru: "ну", mnemonic: "Нунчаки скрестились." },
  { char: "ネ", romaji: "ne", ru: "нэ", mnemonic: "Нэко (кошка) с лапками — «нэ?» (правда?)." },
  { char: "ノ", romaji: "no", ru: "но", mnemonic: "Нос — одна линия по диагонали." },
  // Х-ряд
  { char: "ハ", romaji: "ha", ru: "ха", mnemonic: "Ха! Две черточки разъехались веером." },
  { char: "ヒ", romaji: "hi", ru: "хи", mnemonic: "Хи-хи: ухмылка с зубом." },
  { char: "フ", romaji: "fu", ru: "фу", mnemonic: "Фу — флажок с верхним углом." },
  { char: "ヘ", romaji: "he", ru: "хэ", mnemonic: "Хэт — крыша одной чертой (как и в хирагане!)." },
  { char: "ホ", romaji: "ho", ru: "хо", mnemonic: "Ёлочка-Хо-Хо: ствол + ветки." },
  // М-ряд
  { char: "マ", romaji: "ma", ru: "ма", mnemonic: "Мама с большой сумкой через плечо." },
  { char: "ミ", romaji: "mi", ru: "ми", mnemonic: "Ми — три ноты на нотном стане." },
  { char: "ム", romaji: "mu", ru: "му", mnemonic: "Му! Морда коровы с открытым ртом." },
  { char: "メ", romaji: "me", ru: "мэ", mnemonic: "Мэ (глаз) — крестик из двух диагоналей." },
  { char: "モ", romaji: "mo", ru: "мо", mnemonic: "Море — крюк-волна на горизонте." },
  // Я-ряд
  { char: "ヤ", romaji: "ya", ru: "я",  mnemonic: "Якорь, наклонённый набок." },
  { char: "ユ", romaji: "yu", ru: "ю",  mnemonic: "Юла, лежащая на боку." },
  { char: "ヨ", romaji: "yo", ru: "ё",  mnemonic: "Йо-йо — три уровня сложенной верёвки." },
  // Р-ряд
  { char: "ラ", romaji: "ra", ru: "ра", mnemonic: "Рамэн с палочками сверху." },
  { char: "リ", romaji: "ri", ru: "ри", mnemonic: "Рис в двух чашках (похоже на хирагана り)." },
  { char: "ル", romaji: "ru", ru: "ру", mnemonic: "Рулон ткани с крюком." },
  { char: "レ", romaji: "re", ru: "рэ", mnemonic: "Река делает поворот — галочка." },
  { char: "ロ", romaji: "ro", ru: "ро", mnemonic: "Робот: квадратная голова." },
  // В-ряд (только wa/wo) и н
  { char: "ワ", romaji: "wa", ru: "ва", mnemonic: "Ваза с двумя ручками. (Не путать с ウ — у ワ нет шапочки)." },
  { char: "ヲ", romaji: "wo", ru: "о",  mnemonic: "Грамматическая частица — пишется, но не говорится. (В катакане встречается крайне редко)." },
  { char: "ン", romaji: "n",  ru: "н",  mnemonic: "Эн — закорючка с точкой слева. (Не путать с ソ — у ン штрих идёт снизу вверх)." },
];

export type Distractor = string;

// Для теста с 4 вариантами: подбираем 3 случайных похожих ромадзи
export function pickKatakanaDistractors(answer: string, all: Katakana[], n = 3): Distractor[] {
  const pool = all.map(k => k.romaji).filter(r => r !== answer);
  const result: string[] = [];
  while (result.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}
