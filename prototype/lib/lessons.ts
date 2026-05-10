// 3 урока грамматики уровня N5. Структура единая → один компонент LessonPhase.

export type Mascot = "default" | "happy" | "thinking" | "surprised";

export type Example = { jp: string; romaji: string; ru: string };

export type CheckExercise = {
  /** Предложение с маркером {?} в месте пропуска */
  sentence: string;
  /** Перевод предложения (для подсказки контекста) */
  ru: string;
  /** Варианты для выбора */
  options: string[];
  /** Правильный вариант */
  correct: string;
  /** Разбор ошибки */
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  /** Шаг 1 — мотивационная вступление */
  intro: { mascot: Mascot; text: string };
  /** Шаг 2 — формула + объяснение */
  pattern: string;
  formula: string;
  explanation: string;
  /** Шаг 3 — примеры */
  examples: Example[];
  /** Шаг 4 — упражнение */
  check: CheckExercise;
  /** Anime Moment, разблокируемый сразу после урока */
  scene: { id: string; image: string; title: string; subtitle: string };
};

export const LESSONS: Lesson[] = [
  {
    id: "wa-desu",
    title: "Частицы は и です",
    subtitle: "Как сказать «X — это Y»",
    intro: {
      mascot: "default",
      text: "Это самые первые слова в любом учебнике. С ними ты сможешь представляться, рассказывать кто ты, и говорить о ком/чём угодно. Всё пишем хираганой — её ты только что выучил(а).",
    },
    pattern: "[Тема] は [Кто/что] です",
    formula: "X WA Y DESU",
    explanation: "は — частица темы (произносится как «wa», хотя пишется «ха»). Она ставится после того, о ком/чём речь. です — глагол-связка «есть/является». Вместе получается «X — это Y». Маленькие ゙ и ゚ делают звонкие/глухие варианты: か→が, は→ば.",
    examples: [
      { jp: "わたしはがくせいです。", romaji: "watashi wa gakusei desu", ru: "Я — студент." },
      { jp: "かれはせんせいです。",   romaji: "kare wa sensei desu",    ru: "Он — учитель." },
      { jp: "これはほんです。",       romaji: "kore wa hon desu",       ru: "Это — книга." },
    ],
    check: {
      sentence: "わたし{?}がくせいです。",
      ru: "«Я — студент»",
      options: ["を", "は", "が"],
      correct: "は",
      explanation: "は отмечает тему: «обо мне (а не о других) скажу следующее».",
    },
    scene: {
      id: "school-yard",
      image: "/scenes/school-yard.png",
      title: "Сцена в школьном дворе",
      subtitle: "Знакомство одноклассников весной",
    },
  },
  {
    id: "wo-direct-object",
    title: "Частица を",
    subtitle: "Указывает на прямое дополнение",
    intro: {
      mascot: "surprised",
      text: "Самая частая частица в японском после は. С ней ты сможешь говорить «я ем X», «я пью X», «я смотрю X» — то есть про любые свои действия с объектами.",
    },
    pattern: "[Объект] を [Глагол]",
    formula: "что-то WO делать",
    explanation: "を — маркер прямого дополнения. То, что в русском было бы в винительном падеже («кого? что?»), в японском маркируется частицей を после слова. Произносится как «о» (несмотря на написание).",
    examples: [
      { jp: "すしをたべます。", romaji: "sushi wo tabemasu", ru: "Я ем суши." },
      { jp: "みずをのみます。", romaji: "mizu wo nomimasu", ru: "Я пью воду." },
      { jp: "ほんをよみます。", romaji: "hon wo yomimasu",  ru: "Я читаю книгу." },
    ],
    check: {
      sentence: "みず{?}のみます。",
      ru: "«Я пью воду»",
      options: ["は", "を", "が"],
      correct: "を",
      explanation: "«Воду» — то, что я пью (винительный падеж). Прямое дополнение маркируется частицей を.",
    },
    scene: {
      id: "cafe",
      image: "/scenes/cafe.png",
      title: "Сцена в дождливом кафе",
      subtitle: "Заказ напитка под зонтом",
    },
  },
  {
    id: "masen-negation",
    title: "Отрицание: ません",
    subtitle: "«Не делать X»",
    intro: {
      mascot: "thinking",
      text: "Чтобы превратить любой глагол в отрицание, замени окончание -ます на -ません. Это вежливая форма «не делаю», которой можно отвечать в любой ситуации.",
    },
    pattern: "[…] -ます → -ません",
    formula: "tabe-MASU → tabe-MASEN",
    explanation: "Все глаголы в вежливой форме оканчиваются на -ます (positive) или -ません (negative). Замена окончания превращает утверждение в отрицание. Никаких отдельных «не», как в русском, не нужно.",
    examples: [
      { jp: "にくをたべません。",   romaji: "niku wo tabemasen", ru: "Я не ем мясо." },
      { jp: "おちゃをのみません。", romaji: "ocha wo nomimasen", ru: "Я не пью чай." },
      { jp: "ほんをよみません。",   romaji: "hon wo yomimasen",  ru: "Я не читаю книгу." },
    ],
    check: {
      sentence: "わたしはにくを{?}。",
      ru: "«Я не ем мясо»",
      options: ["たべます", "たべません", "たべました"],
      correct: "たべません",
      explanation: "Чтобы сказать «не ем», берём たべます (ем) и заменяем -ます на -ません.",
    },
    scene: {
      id: "izakaya",
      image: "/scenes/izakaya.png",
      title: "Сцена в идзакая",
      subtitle: "Вежливый отказ среди друзей",
    },
  },
];

// Финальная «капстоун» сцена, разблокируется после всех 3 уроков
export const FINAL_SCENE = {
  id: "ramen-bar",
  image: "/scenes/ramen-bar.png",
  title: "Сцена в рамэн-баре",
  subtitle: "Все 3 темы вместе: は・を・です",
};

export function findLesson(id: string): Lesson | undefined {
  return LESSONS.find(l => l.id === id);
}
