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

  // === Расширение M2.2: +12 паттернов до 15 (полные базы N5) ===

  {
    id: "kore-sore-are",
    title: "これ・それ・あれ",
    subtitle: "Это, то, то (вон) — указательные местоимения",
    intro: { mascot: "default", text: "В японском три слова для «это/то» — зависит от расстояния: рядом со мной, рядом с тобой, далеко от обоих." },
    pattern: "[これ/それ/あれ] は [Y] です",
    formula: "KORE/SORE/ARE WA Y DESU",
    explanation: "これ — то, что у меня в руках или рядом. それ — то, что у собеседника. あれ — то, что далеко от обоих. Все три — местоимения, ставятся в начало предложения.",
    examples: [
      { jp: "これはほんです。",   romaji: "kore wa hon desu",   ru: "Это книга." },
      { jp: "それはペンです。",   romaji: "sore wa pen desu",   ru: "Это (у тебя) ручка." },
      { jp: "あれはがっこうです。", romaji: "are wa gakkou desu", ru: "То (вон там) школа." },
    ],
    check: {
      sentence: "(у меня в руках) {?}はおちゃです。",
      ru: "«Это (у меня) чай»",
      options: ["これ", "それ", "あれ"],
      correct: "これ",
      explanation: "Объект у меня в руках — これ. У тебя — それ. Далеко — あれ.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Указываем на предметы" },
  },

  {
    id: "koko-soko-asoko",
    title: "ここ・そこ・あそこ",
    subtitle: "Здесь, там, вон там — указатели мест",
    intro: { mascot: "default", text: "Параллельно これ/それ/あれ есть набор для МЕСТ — где находится что-то." },
    pattern: "[ここ/そこ/あそこ] は [место] です",
    formula: "KOKO/SOKO/ASOKO WA X DESU",
    explanation: "ここ — здесь (где я). そこ — там (где ты). あそこ — вон там (далеко от обоих). Также вопрос: どこ — где?",
    examples: [
      { jp: "ここはがっこうです。",   romaji: "koko wa gakkou desu",   ru: "Здесь школа." },
      { jp: "そこはレストランです。", romaji: "soko wa resutoran desu", ru: "Там ресторан." },
      { jp: "えきはどこですか？",     romaji: "eki wa doko desu ka",   ru: "Где станция?" },
    ],
    check: {
      sentence: "ぎんこうは{?}ですか？",
      ru: "«Где банк?»",
      options: ["ここ", "どこ", "あそこ"],
      correct: "どこ",
      explanation: "Вопрос «где?» — どこ.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Ориентируемся в школе" },
  },

  {
    id: "possessive-no",
    title: "Частица の (притяжательная)",
    subtitle: "«Мой», «твой», «X-ный» — связка двух существительных",
    intro: { mascot: "thinking", text: "Частица の соединяет два существительных: первое описывает второе. わたしのほん = «моя книга» (буквально «я-ная книга»)." },
    pattern: "[A] の [B]",
    formula: "A NO B = «B принадлежащее/относящееся к A»",
    explanation: "の — самая многозначная частица. В базовом случае: A の B = «B, принадлежащий A» или «B типа A». わたしのなまえ = моё имя. にほんごのほん = книга по японскому. せんせいのくるま = машина учителя.",
    examples: [
      { jp: "わたしのなまえはアキです。", romaji: "watashi no namae wa Aki desu", ru: "Моё имя — Аки." },
      { jp: "これはせんせいのほんです。", romaji: "kore wa sensei no hon desu", ru: "Это книга учителя." },
      { jp: "にほんごのがくせいです。",   romaji: "nihongo no gakusei desu",     ru: "Я студент японского." },
    ],
    check: {
      sentence: "わたし{?}くるまです。",
      ru: "«Моя машина»",
      options: ["は", "の", "を"],
      correct: "の",
      explanation: "の связывает «я» и «машина» — «моя машина».",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Знакомимся с вещами друг друга" },
  },

  {
    id: "past-mashita",
    title: "Прошедшее время: ました",
    subtitle: "«Делал X» — заменяем -ます на -ました",
    intro: { mascot: "happy", text: "Чтобы сказать о прошлом — меняем окончание -ます на -ました. Отрицание прошлого: -ませんでした («не делал»)." },
    pattern: "[…] -ます → -ました",
    formula: "tabe-MASU → tabe-MASHITA → tabe-MASEN-DESHITA",
    explanation: "Все вежливые глаголы спрягаются по 4 формам: -ます (наст. утв.), -ません (наст. отр.), -ました (прош. утв.), -ませんでした (прош. отр.). Окончание просто меняется.",
    examples: [
      { jp: "きのうほんをよみました。", romaji: "kinou hon wo yomimashita", ru: "Вчера я читал книгу." },
      { jp: "あさごはんをたべました。", romaji: "asagohan wo tabemashita", ru: "Я ел завтрак." },
      { jp: "のみませんでした。",       romaji: "nomimasen deshita",      ru: "Не пил." },
    ],
    check: {
      sentence: "きのうおちゃを{?}。",
      ru: "«Вчера я пил чай»",
      options: ["のみます", "のみました", "のみません"],
      correct: "のみました",
      explanation: "Действие в прошлом → -ました.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Вспоминаем заказ" },
  },

  {
    id: "i-adjectives",
    title: "い-прилагательные",
    subtitle: "Большой, маленький, вкусный — оканчиваются на い",
    intro: { mascot: "surprised", text: "Прилагательные в японском бывают двух типов. Первый — те, что заканчиваются на い (おおきい, ちいさい, おいしい). Они спрягаются сами, без です-связки в простой форме." },
    pattern: "[い-прил.] [сущ.] · [сущ.] は [い-прил.] です",
    formula: "ookii inu (большая собака) · inu wa ookii desu (собака большая)",
    explanation: "い-прилагательные стоят перед существительным БЕЗ связки: おおきいいえ. В роли сказуемого добавляется です: いえはおおきいです. Отрицание: い → くない (おおきい → おおきくない).",
    examples: [
      { jp: "おおきいくるまです。", romaji: "ookii kuruma desu",   ru: "Это большая машина." },
      { jp: "このほんはおもしろいです。", romaji: "kono hon wa omoshiroi desu", ru: "Эта книга интересная." },
      { jp: "あさはさむいです。",   romaji: "asa wa samui desu",   ru: "Утром холодно." },
    ],
    check: {
      sentence: "{?}いえです。 (= большой дом)",
      ru: "«Большой дом»",
      options: ["おおきい", "おおきい です", "おおきく"],
      correct: "おおきい",
      explanation: "Перед существительным い-прил. стоит в полной форме (без です).",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Описываем что вокруг" },
  },

  {
    id: "na-adjectives",
    title: "な-прилагательные",
    subtitle: "Тихий, удобный, любимый — добавляют な перед сущ.",
    intro: { mascot: "thinking", text: "Второй тип прилагательных — な-прилагательные (часто заимствованные или сино-японские). Перед существительным к ним добавляется な: しずかな まち = тихий город." },
    pattern: "[な-прил.]-な [сущ.] · [сущ.] は [な-прил.] です",
    formula: "shizuka-NA machi · machi wa shizuka desu",
    explanation: "な-прилагательные ВСЕГДА используют です в роли сказуемого: まちはしずかです. Перед сущ. — добавляется な: しずかなまち. Отрицание: ではありません (まちはしずかではありません).",
    examples: [
      { jp: "しずかなへやです。",   romaji: "shizuka na heya desu",   ru: "Это тихая комната." },
      { jp: "アキさんはきれいです。", romaji: "Aki-san wa kirei desu",  ru: "Аки красивая." },
      { jp: "ゆうめいなレストランです。", romaji: "yuumei na resutoran desu", ru: "Это знаменитый ресторан." },
    ],
    check: {
      sentence: "しずか{?}まちです。",
      ru: "«Тихий город»",
      options: ["な", "い", "の"],
      correct: "な",
      explanation: "な-прил. перед сущ. требует な-связки.",
    },
    scene: { id: "izakaya", image: "/scenes/izakaya.png", title: "Идзакая", subtitle: "Описываем атмосферу" },
  },

  {
    id: "ni-place",
    title: "Частица に (место/время/получатель)",
    subtitle: "«В X», «к X», «X-у»",
    intro: { mascot: "default", text: "に — одна из самых частых частиц. Указывает: куда идём, где находимся, кому что-то даём, во сколько." },
    pattern: "[место/время/получатель] に [глагол]",
    formula: "X NI iku/iru/ageru",
    explanation: "に используется в нескольких смыслах: 1) направление (がっこうにいきます = иду в школу), 2) место «нахождения» (うちにいます = я дома), 3) время (7じにきます = приду в 7), 4) получатель (アキにあげます = дам Аки).",
    examples: [
      { jp: "がっこうにいきます。", romaji: "gakkou ni ikimasu", ru: "Я иду в школу." },
      { jp: "うちにいます。",       romaji: "uchi ni imasu",   ru: "Я дома." },
      { jp: "ともだちにてがみをかきました。", romaji: "tomodachi ni tegami wo kakimashita", ru: "Я написал письмо другу." },
    ],
    check: {
      sentence: "えき{?}いきます。",
      ru: "«Иду на станцию»",
      options: ["で", "に", "を"],
      correct: "に",
      explanation: "Направление движения — частица に.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Куда идём?" },
  },

  {
    id: "de-place",
    title: "Частица で (место действия)",
    subtitle: "«Где совершается действие»",
    intro: { mascot: "thinking", text: "Не путай с に! で = ГДЕ происходит действие, на = КУДА движение. レストランでたべます = ем в ресторане. レストランにいきます = иду в ресторан." },
    pattern: "[место] で [глагол действия]",
    formula: "PLACE DE VERB",
    explanation: "で показывает место, в котором происходит действие. Также — средство (バスでいきます = ехать на автобусе). Запомни различие: いえにいきます (иду домой) vs いえでよみます (читаю дома).",
    examples: [
      { jp: "がっこうでべんきょうします。", romaji: "gakkou de benkyou shimasu", ru: "Учусь в школе." },
      { jp: "レストランでたべます。",       romaji: "resutoran de tabemasu",     ru: "Ем в ресторане." },
      { jp: "くるまでいきます。",           romaji: "kuruma de ikimasu",         ru: "Еду на машине." },
    ],
    check: {
      sentence: "こうえん{?}あそびます。",
      ru: "«Играю в парке»",
      options: ["に", "で", "を"],
      correct: "で",
      explanation: "«Играть в парке» — действие на месте → で. («идти в парк» было бы に).",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Делаем что-то в кафе" },
  },

  {
    id: "te-kudasai",
    title: "Просьба: ~てください",
    subtitle: "«Сделай X, пожалуйста»",
    intro: { mascot: "happy", text: "Это самый частый способ что-то попросить. Берём глагол в て-форме и добавляем ください. みてください = «посмотрите, пожалуйста»." },
    pattern: "[Verb-て] ください",
    formula: "VERB-TE KUDASAI",
    explanation: "て-форма — это «соединительная» форма глагола. У каждого глагола своя (たべる→たべて, のむ→のんで, いく→いって). Полное правило て-формы — отдельная большая тема. Главное: ~てください = вежливая просьба.",
    examples: [
      { jp: "みてください。",     romaji: "mite kudasai",     ru: "Посмотрите, пожалуйста." },
      { jp: "きいてください。",   romaji: "kiite kudasai",    ru: "Послушайте, пожалуйста." },
      { jp: "ちょっとまってください。", romaji: "chotto matte kudasai", ru: "Подождите немного." },
    ],
    check: {
      sentence: "もういちど{?}ください。",
      ru: "«Скажи ещё раз, пожалуйста»",
      options: ["いって", "いきます", "いきません"],
      correct: "いって",
      explanation: "言って (いって) = «скажи» (て-форма от 言う). Не путать с 行って — другая омофоническая.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Просим у бариста" },
  },

  {
    id: "tai-form",
    title: "Желание: ~たい",
    subtitle: "«Хочу делать X»",
    intro: { mascot: "happy", text: "Заменяем -ます у глагола на -たい — получается «хочу сделать X». たべたい = хочу есть. のみたい = хочу пить." },
    pattern: "[Verb-stem] たい です",
    formula: "tabe-TAI desu",
    explanation: "Берём глагол в форме -ます, отбрасываем -ます, добавляем -たい. Можно ставить ですвежливо. Отрицание: -たくない (たべたくない = не хочу есть).",
    examples: [
      { jp: "すしをたべたいです。", romaji: "sushi wo tabetai desu", ru: "Я хочу есть суши." },
      { jp: "にほんへいきたいです。", romaji: "nihon e ikitai desu", ru: "Я хочу поехать в Японию." },
      { jp: "なにもしたくない。",   romaji: "nani mo shitakunai",   ru: "Ничего не хочу делать." },
    ],
    check: {
      sentence: "おちゃを{?}です。",
      ru: "«Хочу пить чай»",
      options: ["のみます", "のみたい", "のみません"],
      correct: "のみたい",
      explanation: "«Хочу X» = -たい. のみます → のみたい.",
    },
    scene: { id: "izakaya", image: "/scenes/izakaya.png", title: "Идзакая", subtitle: "Что хочется заказать" },
  },

  {
    id: "kara-because",
    title: "Причина: から",
    subtitle: "«Потому что X»",
    intro: { mascot: "thinking", text: "Чтобы объяснить ПРИЧИНУ, добавляем から в конец предложения-причины: «X. так что Y» = «X. から Y»." },
    pattern: "[причина] から、[следствие]",
    formula: "PRICHINA KARA, SLEDSTVIE",
    explanation: "から ставится после полного предложения с です/ます-формой. «Холодно, потому что зима» = «ふゆですから、さむいです». Часто причина идёт первой, следствие — после.",
    examples: [
      { jp: "つかれましたから、ねます。", romaji: "tsukaremashita kara, nemasu", ru: "Я устал, так что иду спать." },
      { jp: "あついですから、みずをのみます。", romaji: "atsui desu kara, mizu wo nomimasu", ru: "Жарко, поэтому пью воду." },
      { jp: "じかんがありませんから、いきません。", romaji: "jikan ga arimasen kara, ikimasen", ru: "У меня нет времени, поэтому не пойду." },
    ],
    check: {
      sentence: "あめです{?}、いえにいます。",
      ru: "«Дождь, поэтому я дома»",
      options: ["から", "の", "に"],
      correct: "から",
      explanation: "«потому что» = から.",
    },
    scene: { id: "izakaya", image: "/scenes/izakaya.png", title: "Идзакая", subtitle: "Объясняем отказ" },
  },

  // === M2.3.3: расширение до 50 паттернов ===

  {
    id: "arimasu-imasu",
    title: "Существование: あります・います",
    subtitle: "«Есть X» — для предметов и для живых",
    intro: { mascot: "default", text: "В японском «есть X» делится по живости: あります для предметов, います для людей и животных. Запутаешься — шутки в духе «у меня кошка あります» режут ухо." },
    pattern: "[место] に [объект] が あります／います",
    formula: "PLACE NI X GA ARIMASU/IMASU",
    explanation: "Глагол «быть/находиться» имеет две формы. あります — для неживого (книга, ресторан, время). います — для живых (люди, животные, иногда насекомые). Перед глаголом — частица が (новая информация), а место отмечается に.",
    examples: [
      { jp: "つくえのうえにほんがあります。", romaji: "tsukue no ue ni hon ga arimasu", ru: "На столе есть книга." },
      { jp: "へやにねこがいます。",         romaji: "heya ni neko ga imasu",       ru: "В комнате есть кошка." },
      { jp: "じかんがありません。",         romaji: "jikan ga arimasen",           ru: "Нет времени." },
    ],
    check: {
      sentence: "そこにせんせいが{?}。",
      ru: "«Там есть учитель»",
      options: ["あります", "います", "です"],
      correct: "います",
      explanation: "Учитель живой → います. Если бы был стол — あります.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Кто и что вокруг" },
  },

  {
    id: "mo-also",
    title: "Частица も (тоже)",
    subtitle: "«X тоже» — заменяет は или を",
    intro: { mascot: "happy", text: "も = «тоже». Используется ВМЕСТО частицы は или を, не вместе. わたしもがくせい = «я тоже студент»." },
    pattern: "[A] も [Y] です",
    formula: "X MO Y DESU",
    explanation: "も заменяет は (тематическую) или を (винительный). Не «watashi wa mo» — это ошибка. Часто идёт парой: «А も B» = «и А, и B». Может означать удивление: «онигири も тоже!» = «о, и онигири тоже есть!».",
    examples: [
      { jp: "わたしもにほんごをべんきょうします。", romaji: "watashi mo nihongo wo benkyou shimasu", ru: "Я тоже учу японский." },
      { jp: "コーヒーもおちゃもあります。",       romaji: "koohii mo ocha mo arimasu",            ru: "Есть и кофе, и чай." },
      { jp: "なにもしません。",                   romaji: "nani mo shimasen",                     ru: "Ничего не делаю." },
    ],
    check: {
      sentence: "アキ{?}がくせいです。",
      ru: "«Аки тоже студентка»",
      options: ["は", "も", "を"],
      correct: "も",
      explanation: "«Тоже» — частица も, заменяет は.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Все одинаковые?" },
  },

  {
    id: "ka-question",
    title: "Вопрос: частица か",
    subtitle: "«? » в конце предложения",
    intro: { mascot: "thinking", text: "В японском вместо знака «?» — частица か в конце. Интонация может остаться спокойной — か уже всё сказала." },
    pattern: "[…] です／ます か？",
    formula: "DESU/MASU KA",
    explanation: "か добавляется в самый конец вопросительного предложения после です/ます-формы. Не нужен знак «?» (но в современном тексте часто пишут). Также есть выбор «X か Y» = «X или Y».",
    examples: [
      { jp: "アキさんはがくせいですか？",       romaji: "Aki-san wa gakusei desu ka", ru: "Аки — студентка?" },
      { jp: "コーヒーかおちゃ、どちらがいいですか？", romaji: "koohii ka ocha, dochira ga ii desu ka", ru: "Кофе или чай — что лучше?" },
      { jp: "なにをたべますか？",               romaji: "nani wo tabemasu ka",      ru: "Что будешь есть?" },
    ],
    check: {
      sentence: "あした、いきます{?}",
      ru: "«Завтра пойдёшь?»",
      options: ["か", "ね", "よ"],
      correct: "か",
      explanation: "Вопрос → か в конце.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Заказывая, спрашиваем" },
  },

  {
    id: "counting-natural",
    title: "Счёт: ひとつ・ふたつ",
    subtitle: "Натуральные числительные 1-10",
    intro: { mascot: "surprised", text: "Когда говоришь «дай две штуки» — используешь не いち、に, а ひとつ、ふたつ. Это «универсальный счётчик» — работает почти для всего." },
    pattern: "[Объект] を [ひとつ／ふたつ／…] ください",
    formula: "X WO HITOTSU/FUTATSU/... KUDASAI",
    explanation: "Натуральный счёт: ひとつ(1) ふたつ(2) みっつ(3) よっつ(4) いつつ(5) むっつ(6) ななつ(7) やっつ(8) ここのつ(9) とお(10). Дальше — じゅういち без つ. Используются для штучных предметов в кафе, магазинах, дома.",
    examples: [
      { jp: "ケーキをふたつください。",     romaji: "keeki wo futatsu kudasai", ru: "Два торта, пожалуйста." },
      { jp: "りんごはいくつありますか？",   romaji: "ringo wa ikutsu arimasu ka", ru: "Сколько яблок?" },
      { jp: "ひとつだけください。",         romaji: "hitotsu dake kudasai",     ru: "Только один, пожалуйста." },
    ],
    check: {
      sentence: "おちゃを{?}ください。 (= 3 чая)",
      ru: "«Три чая, пожалуйста»",
      options: ["みっつ", "さん", "さんつ"],
      correct: "みっつ",
      explanation: "Натуральный счёт 3 — みっつ (не さん).",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Считаем заказ" },
  },

  {
    id: "counting-people",
    title: "Счёт людей: ひとり・ふたり・〜にん",
    subtitle: "Сколько человек?",
    intro: { mascot: "happy", text: "Для людей особый счётчик 〜人(にん). Но 1 и 2 — особые: ひとり (1 человек), ふたり (2 человека). С 3-х — さんにん, よにん, ごにん…" },
    pattern: "[Число]人(にん) · ひとり (1) · ふたり (2)",
    formula: "HITORI / FUTARI / SAN-NIN / YO-NIN ...",
    explanation: "Особенности: 1 = ひとり, 2 = ふたり, 4 = よにん (не よんにん), 7 = しちにん или ななにん. Остальные — число + にん. Вопрос «сколько человек» — なんにん.",
    examples: [
      { jp: "かぞくは4人です。",           romaji: "kazoku wa yonin desu",     ru: "В семье 4 человека." },
      { jp: "ふたりでいきます。",           romaji: "futari de ikimasu",        ru: "Идём вдвоём." },
      { jp: "なんにんですか？",             romaji: "nan'nin desu ka",          ru: "Сколько человек?" },
    ],
    check: {
      sentence: "こども{?}います。 (= 2 ребёнка)",
      ru: "«Двое детей»",
      options: ["がにに", "がふたり", "がにじん"],
      correct: "がふたり",
      explanation: "2 человека — особая форма ふたり.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Сколько друзей?" },
  },

  {
    id: "kara-made",
    title: "Диапазон: から…まで",
    subtitle: "«От … до …»",
    intro: { mascot: "default", text: "Связка から «от» + まで «до» работает и для времени, и для места. «От 9 до 5» = «9じから5じまで»." },
    pattern: "[A] から [B] まで",
    formula: "A KARA B MADE",
    explanation: "から — точка отсчёта, まで — конечная. Подходит для часов, дней, дат, расстояний. «あさからばんまで» = «с утра до вечера». «とうきょうからおおさかまで» = «от Токио до Осаки».",
    examples: [
      { jp: "10じから3じまではたらきます。", romaji: "juuji kara sanji made hatarakimasu", ru: "Работаю с 10 до 3." },
      { jp: "うちからえきまであるきます。",   romaji: "uchi kara eki made arukimasu",       ru: "Иду пешком от дома до станции." },
      { jp: "げつようびからきんようびまで",   romaji: "getsuyoubi kara kinyoubi made",      ru: "С понедельника по пятницу" },
    ],
    check: {
      sentence: "9じ{?}5じまでべんきょうします。",
      ru: "«Учусь с 9 до 5»",
      options: ["まで", "から", "に"],
      correct: "から",
      explanation: "«От» — から. Затем まで.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Расписание" },
  },

  {
    id: "time-ni",
    title: "Время: 〜時に, 〜曜日に",
    subtitle: "«В 7 часов», «в среду»",
    intro: { mascot: "thinking", text: "Конкретное время требует частицу に (как место). 7じにきます = «приду в 7». Дни недели — тоже на に: げつようびに." },
    pattern: "[конкретное время] に [глагол]",
    formula: "TIME NI VERB",
    explanation: "に нужна для конкретных точек во времени: часов, дней, дат. НЕ нужна для относительных слов (きょう, あした, いま, まいにち) — они без に.",
    examples: [
      { jp: "8じにおきます。",             romaji: "hachiji ni okimasu",       ru: "Встаю в 8." },
      { jp: "どようびにあいましょう。",   romaji: "doyoubi ni aimashou",      ru: "Встретимся в субботу." },
      { jp: "あした、いきます。",         romaji: "ashita, ikimasu",         ru: "Завтра пойду. (без に)" },
    ],
    check: {
      sentence: "10じ{?}ねます。",
      ru: "«Сплю в 10»",
      options: ["で", "に", "を"],
      correct: "に",
      explanation: "Конкретное время → に.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Распорядок дня" },
  },

  {
    id: "dake-only",
    title: "Только: だけ",
    subtitle: "«Только X»",
    intro: { mascot: "happy", text: "だけ означает «только», «всего лишь». Ставится сразу после слова. ひとつだけ = «только один»." },
    pattern: "[X] だけ",
    formula: "X DAKE",
    explanation: "だけ — частица «только». В отличие от しか (которое требует отрицания), だけ нейтральна. ひとりだけ = «только один человек». ちょっとだけ = «совсем чуть-чуть».",
    examples: [
      { jp: "みずだけください。",         romaji: "mizu dake kudasai",        ru: "Только воду, пожалуйста." },
      { jp: "ひとりだけきました。",       romaji: "hitori dake kimashita",    ru: "Пришёл только один человек." },
      { jp: "5ふんだけまってください。",   romaji: "gofun dake matte kudasai", ru: "Подождите всего 5 минут." },
    ],
    check: {
      sentence: "コーヒー{?}のみます。",
      ru: "«Пью только кофе»",
      options: ["だけ", "から", "の"],
      correct: "だけ",
      explanation: "«Только» — だけ.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Скромный заказ" },
  },

  {
    id: "yori-comparison",
    title: "Сравнение: A は B より",
    subtitle: "«A больше/выше чем B»",
    intro: { mascot: "surprised", text: "Чтобы сказать «А больше Б», порядок: A は B より [прил.]. より = «чем»." },
    pattern: "A は B より [прилагательное] です",
    formula: "A WA B YORI ADJ",
    explanation: "A — то, о чём говорим (тема). B より — «по сравнению с B». Прилагательное характеризует A. «とうきょうはおおさかよりおおきいです» = «Токио больше Осаки».",
    examples: [
      { jp: "ねこはいぬよりちいさいです。", romaji: "neko wa inu yori chiisai desu", ru: "Кошка меньше собаки." },
      { jp: "なつはふゆよりあついです。",   romaji: "natsu wa fuyu yori atsui desu", ru: "Лето жарче зимы." },
      { jp: "ラーメンはすしよりやすいです。", romaji: "raamen wa sushi yori yasui desu", ru: "Рамен дешевле суши." },
    ],
    check: {
      sentence: "アキはトムより{?}です。",
      ru: "«Аки выше Тома»",
      options: ["たかい", "たかいの", "たかく"],
      correct: "たかい",
      explanation: "Полная форма い-прил. без изменения.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Кто выше?" },
  },

  {
    id: "no-hou-ga",
    title: "Из двух: A と B では、どちら",
    subtitle: "«Что лучше — A или B?»",
    intro: { mascot: "thinking", text: "Когда выбираем из двух: «A と B では、どちらが [прил.]?». Ответ — «X のほうが [прил.] です» («X-ный лучше»)." },
    pattern: "A と B では、どちらが [прил] ですか? · X のほうが [прил] です",
    formula: "A TO B DEWA, DOCHIRA GA ...?  →  X NO HOU GA ... DESU",
    explanation: "どちら = «который из двух», のほうが = «X-ная сторона больше». Конструкция типична для сравнений-выборов. Может опускать «と B では» если из контекста ясно.",
    examples: [
      { jp: "コーヒーとおちゃでは、どちらがすきですか？", romaji: "koohii to ocha dewa, dochira ga suki desu ka", ru: "Кофе или чай — что любишь?" },
      { jp: "コーヒーのほうがすきです。",                 romaji: "koohii no hou ga suki desu",                  ru: "Я больше люблю кофе." },
      { jp: "ねこのほうがかわいいです。",                 romaji: "neko no hou ga kawaii desu",                  ru: "Кошки милее (чем что-то)." },
    ],
    check: {
      sentence: "「いぬとねこ、どちらがすき？」「ねこ{?}すきです。」",
      ru: "«Кошки больше нравятся»",
      options: ["のほうが", "より", "から"],
      correct: "のほうが",
      explanation: "В ответе «X-ная сторона больше» — のほうが.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Выбор напитка" },
  },

  {
    id: "ichiban-superlative",
    title: "Самый: 一番 (いちばん)",
    subtitle: "«Самый X из всех»",
    intro: { mascot: "happy", text: "Превосходная степень — добавь いちばん перед прилагательным. «いちばんおおきい» = «самый большой»." },
    pattern: "[group] のなかで いちばん [прил.] です",
    formula: "GROUP NO NAKA DE ICHIBAN ADJ DESU",
    explanation: "いちばん буквально = «номер 1». Используется как «most». Группа сравнения: «X のなかで» = «среди X». Можно и без неё, если контекст ясен.",
    examples: [
      { jp: "なつはいちばんあついです。",             romaji: "natsu wa ichiban atsui desu",         ru: "Лето — самое жаркое." },
      { jp: "クラスのなかでアキがいちばんやさしい。", romaji: "kurasu no naka de Aki ga ichiban yasashii", ru: "В классе Аки — самая добрая." },
      { jp: "なにがいちばんすきですか？",             romaji: "nani ga ichiban suki desu ka",        ru: "Что больше всего нравится?" },
    ],
    check: {
      sentence: "クラスのなかで、わたしが{?}たかいです。",
      ru: "«В классе я самый высокий»",
      options: ["いちばん", "もっと", "ぜんぜん"],
      correct: "いちばん",
      explanation: "Превосходная степень — いちばん.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Чемпион среди друзей" },
  },

  {
    id: "e-direction",
    title: "Направление: частица へ",
    subtitle: "«К X», «в X» (направление)",
    intro: { mascot: "default", text: "へ (произносится «э», не «хэ»!) — частица направления. Похожа на に, но подчёркивает направление, а не точку прибытия." },
    pattern: "[направление] へ いきます／きます",
    formula: "DIRECTION E IKIMASU/KIMASU",
    explanation: "へ и に часто взаимозаменяемы для глаголов движения. Тонкость: へ = «в направлении X», に = «в X (точка)». В разговоре чаще に. Но в «手紙を東京へ送る» (письмо в Токио) — обычно へ.",
    examples: [
      { jp: "にほんへいきます。",         romaji: "nihon e ikimasu",       ru: "Поеду в Японию." },
      { jp: "うちへかえります。",         romaji: "uchi e kaerimasu",      ru: "Возвращаюсь домой." },
      { jp: "がっこうへいきました。",     romaji: "gakkou e ikimashita",   ru: "Пошёл в школу." },
    ],
    check: {
      sentence: "とうきょう{?}いきたいです。",
      ru: "«Хочу поехать в Токио»",
      options: ["で", "へ", "を"],
      correct: "へ",
      explanation: "Направление с глаголом движения — へ (или に).",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Куда идём?" },
  },

  {
    id: "ne-yo",
    title: "Эмоции в конце: ね・よ",
    subtitle: "«Правда?» / «Знай!»",
    intro: { mascot: "happy", text: "Маленькие частицы в конце — добавляют эмоцию. ね = «правда?» (ищу согласия). よ = «знай!» (новая инфа для тебя). Делают речь живой." },
    pattern: "[…] です ね · [...] です よ",
    formula: "DESU NE / DESU YO",
    explanation: "ね — мягкое «правда?», объединяющее (おいしいですね = «вкусно, правда?»). よ — «к твоему сведению» (まだはやいですよ = «ещё рано, знай»). Без них речь звучит сухо.",
    examples: [
      { jp: "おいしいですね。", romaji: "oishii desu ne", ru: "Вкусно, правда?" },
      { jp: "あめですよ。",     romaji: "ame desu yo",   ru: "Дождь идёт, к твоему сведению." },
      { jp: "そうですね。",     romaji: "sou desu ne",   ru: "Да, действительно." },
    ],
    check: {
      sentence: "(ищу твоего согласия) このカフェはきれいです{?}。",
      ru: "«Это кафе красивое, правда?»",
      options: ["ね", "よ", "か"],
      correct: "ね",
      explanation: "«Правда?» — частица ね (ищу согласие).",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Беседа за чашкой чая" },
  },

  // === Batch 2: глагольные конструкции (12) ===

  {
    id: "te-form-overview",
    title: "て-форма глаголов",
    subtitle: "Связующая форма — основа множества конструкций",
    intro: { mascot: "thinking", text: "て-форма — самая важная форма глагола после -ます. На её базе строятся: просьбы (てください), длительность (ている), разрешения (てもいい) и многое другое. Сначала запомни шаблон." },
    pattern: "[Verb dict] → て-форма",
    formula: "u/tsu/ru → tte · bu/mu/nu → nde · ku → ite · gu → ide · su → shite · iru/eru → te · suru → shite · kuru → kite",
    explanation: "Правила для глаголов 1-го спряжения (う-глаголы): う/つ/る → って (買う→買って), ぶ/む/ぬ → んで (飲む→飲んで), く → いて (書く→書いて), ぐ → いで (泳ぐ→泳いで), す → して (話す→話して). Для る-глаголов: る → て (食べる→食べて). Особо: する→して, 来る→きて, 行く→いって.",
    examples: [
      { jp: "たべる → たべて", romaji: "taberu → tabete", ru: "есть → ев(ши)" },
      { jp: "のむ → のんで",   romaji: "nomu → nonde",   ru: "пить → выпив" },
      { jp: "いく → いって",   romaji: "iku → itte",     ru: "идти → идя (исключение)" },
    ],
    check: {
      sentence: "かく → {?}",
      ru: "«писать в て-форме»",
      options: ["かいて", "かして", "かんで"],
      correct: "かいて",
      explanation: "く → いて. Поэтому かく → かいて.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Учим формы" },
  },

  {
    id: "te-iru-continuous",
    title: "Длительность: ています",
    subtitle: "«Сейчас делаю / делал»",
    intro: { mascot: "default", text: "て-форма + います = длительное действие или состояние. たべています = «сейчас ем». すんでいます = «живу (где-то)»." },
    pattern: "[Verb-て] います",
    formula: "VERB-TE IMASU",
    explanation: "Два смысла: 1) длится сейчас (今、ほんをよんでいます = читаю книгу прямо сейчас), 2) состояние (とうきょうにすんでいます = живу в Токио). Отрицание: -ていません.",
    examples: [
      { jp: "いま、ごはんをたべています。", romaji: "ima, gohan wo tabeteimasu", ru: "Сейчас ем." },
      { jp: "わたしはとうきょうにすんでいます。", romaji: "watashi wa toukyou ni sundeimasu", ru: "Я живу в Токио." },
      { jp: "なにをしていますか？",         romaji: "nani wo shiteimasu ka",     ru: "Что ты делаешь?" },
    ],
    check: {
      sentence: "アキはいまべんきょうを{?}。",
      ru: "«Аки сейчас занимается»",
      options: ["します", "しています", "しました"],
      correct: "しています",
      explanation: "Длительное «сейчас» — てい-форма.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Что происходит сейчас" },
  },

  {
    id: "te-mo-ii",
    title: "Разрешение: 〜てもいいです",
    subtitle: "«Можно делать X»",
    intro: { mascot: "happy", text: "て-форма + もいい = «можно». Спросить разрешение: 〜てもいいですか?" },
    pattern: "[Verb-て] もいいです (か)",
    formula: "VERB-TE MO II DESU",
    explanation: "Буквально «даже сделать — хорошо». Используется чтобы дать или попросить разрешение. Часто отвечают: «どうぞ» (пожалуйста, давай).",
    examples: [
      { jp: "ここですわってもいいですか？", romaji: "koko de suwattemo ii desu ka", ru: "Можно здесь сесть?" },
      { jp: "しゃしんをとってもいいです。", romaji: "shashin wo tottemo ii desu", ru: "Можно фотографировать." },
      { jp: "テレビをみてもいいですか？", romaji: "terebi wo mitemo ii desu ka", ru: "Можно посмотреть ТВ?" },
    ],
    check: {
      sentence: "ここで{?}いいですか？ (= можно есть здесь)",
      ru: "«Можно ли есть здесь?»",
      options: ["たべて", "たべますも", "たべる"],
      correct: "たべて",
      explanation: "て-форма от 食べる + もいい — «можно есть».",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Спрашиваем разрешения" },
  },

  {
    id: "te-wa-ikenai",
    title: "Запрет: 〜てはいけません",
    subtitle: "«Нельзя делать X»",
    intro: { mascot: "thinking", text: "Противоположность 〜てもいい — 〜てはいけません («нельзя»). Часто сокращается до 〜ちゃだめ в разговоре." },
    pattern: "[Verb-て] は いけません",
    formula: "VERB-TE WA IKEMASEN",
    explanation: "Буквально «делать нельзя/не годится». Формальный запрет. В разговоре: «だめ» (нельзя). На табличках часто пишут полную форму.",
    examples: [
      { jp: "ここでたばこをすってはいけません。", romaji: "koko de tabako wo suttewa ikemasen", ru: "Здесь нельзя курить." },
      { jp: "しゃしんをとってはいけません。", romaji: "shashin wo tottewa ikemasen", ru: "Нельзя фотографировать." },
      { jp: "おそくまでテレビをみてはいけません。", romaji: "osoku made terebi wo mitewa ikemasen", ru: "Нельзя смотреть ТВ допоздна." },
    ],
    check: {
      sentence: "じゅぎょうちゅう、ねて{?}。",
      ru: "«Нельзя спать на занятии»",
      options: ["はいけません", "もいいです", "ください"],
      correct: "はいけません",
      explanation: "Запрет — はいけません.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Что нельзя в школе" },
  },

  {
    id: "nakereba-narimasen",
    title: "Обязанность: 〜なければなりません",
    subtitle: "«Должен делать X»",
    intro: { mascot: "surprised", text: "Длинная конструкция, но крайне частая. Заменяем -ます на -ない-форму (-ない), потом -ない → -なければなりません." },
    pattern: "[Verb-ない] → -なければなりません",
    formula: "VERB-NAI → -NAKEREBA NARIMASEN",
    explanation: "Заменяем な́льный (-ない) на -なければなりません. Также частые сокращения: -なきゃ (разг), -なくては (формально). Все означают «должен».",
    examples: [
      { jp: "あした、はやくおきなければなりません。", romaji: "ashita, hayaku okinakereba narimasen", ru: "Завтра нужно встать рано." },
      { jp: "しゅくだいをしなければなりません。",   romaji: "shukudai wo shinakereba narimasen", ru: "Нужно сделать домашку." },
      { jp: "もうかえらなきゃ。",                    romaji: "mou kaeranakya",                     ru: "Уже надо возвращаться. (разг.)" },
    ],
    check: {
      sentence: "あさ、はを{?}。",
      ru: "«Утром нужно почистить зубы»",
      options: ["みがきます", "みがかなければなりません", "みがいて"],
      correct: "みがかなければなりません",
      explanation: "«Должен» — -なければなりません.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Утренние обязанности" },
  },

  {
    id: "naide-kudasai",
    title: "Просьба не делать: 〜ないでください",
    subtitle: "«Пожалуйста, не делайте X»",
    intro: { mascot: "default", text: "Замена положительной просьбе てください — отрицательная: ないでください. Берём ない-форму глагола + でください." },
    pattern: "[Verb-ない] でください",
    formula: "VERB-NAI DE KUDASAI",
    explanation: "ない-форма — отрицание plain (たべる→たべない, のむ→のまない). Добавляем でください — «не надо, пожалуйста».",
    examples: [
      { jp: "ここでたばこをすわないでください。", romaji: "koko de tabako wo suwanaide kudasai", ru: "Не курите здесь, пожалуйста." },
      { jp: "わすれないでください。",             romaji: "wasurenaide kudasai",                ru: "Не забывайте, пожалуйста." },
      { jp: "あけないでください。",               romaji: "akenaide kudasai",                  ru: "Не открывайте, пожалуйста." },
    ],
    check: {
      sentence: "あぶないですから、{?}。",
      ru: "«Опасно, пожалуйста, не входите»",
      options: ["はいってください", "はいらないでください", "はいります"],
      correct: "はいらないでください",
      explanation: "Отрицательная просьба — ないでください.",
    },
    scene: { id: "izakaya", image: "/scenes/izakaya.png", title: "Идзакая", subtitle: "Когда вежливо отказывают" },
  },

  {
    id: "ni-iku",
    title: "Цель похода: 〜に行きます",
    subtitle: "«Иду делать X»",
    intro: { mascot: "happy", text: "Конструкция «глагол-стем + に行く» = «иду, чтобы…». Берёшь основу глагола (без -ます) и приклеиваешь に行きます." },
    pattern: "[Verb-stem] に いきます／きます／かえります",
    formula: "VERB-STEM NI IKIMASU",
    explanation: "Глагол-стем = форма перед -ます. たべます→たべ, のみます→のみ, べんきょうします→べんきょうし. Конструкция: куда + に + что-делать-стем + に いく.",
    examples: [
      { jp: "ラーメンをたべにいきます。",     romaji: "raamen wo tabe ni ikimasu", ru: "Иду есть рамен." },
      { jp: "うみへおよぎにいきました。",     romaji: "umi e oyogi ni ikimashita", ru: "Я ездил на море плавать." },
      { jp: "アキにあいにきます。",           romaji: "Aki ni ai ni kimasu",       ru: "Прихожу повидаться с Аки." },
    ],
    check: {
      sentence: "えいがを{?}いきましょう。",
      ru: "«Пойдём смотреть фильм»",
      options: ["みに", "みります", "みて"],
      correct: "みに",
      explanation: "«Идти смотреть» — глагол-стем み + に + いく.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Зачем мы здесь" },
  },

  {
    id: "hou-ga-ii",
    title: "Совет: 〜ほうがいいです",
    subtitle: "«Лучше сделать X»",
    intro: { mascot: "thinking", text: "Дать совет — глагол в прошедшей форме (-た) + ほうがいいです. ねたほうがいいです = «лучше поспи»." },
    pattern: "[Verb-た] ほうがいいです",
    formula: "VERB-TA HOU GA II DESU",
    explanation: "Берём прошедшую plain-форму (-た / не -ました): たべる→たべた, ねる→ねた, いく→いった. Добавляем ほうがいい. Отрицательный совет: -ない-форма + ほうがいい.",
    examples: [
      { jp: "やすんだほうがいいですよ。",   romaji: "yasunda hou ga ii desu yo", ru: "Лучше отдохни." },
      { jp: "たくさんねたほうがいい。",     romaji: "takusan neta hou ga ii",   ru: "Лучше много спать." },
      { jp: "おさけはのまないほうがいい。", romaji: "osake wa nomanai hou ga ii", ru: "Лучше не пить сакэ." },
    ],
    check: {
      sentence: "あぶないから、はやく{?}ほうがいいです。",
      ru: "«Опасно, лучше быстро возвращайся»",
      options: ["かえる", "かえった", "かえって"],
      correct: "かえった",
      explanation: "ほうがいい требует -た-форму (прошедшую plain).",
    },
    scene: { id: "izakaya", image: "/scenes/izakaya.png", title: "Идзакая", subtitle: "Совет другу" },
  },

  {
    id: "koto-ga-aru",
    title: "Опыт: 〜たことがあります",
    subtitle: "«Я когда-то делал X»",
    intro: { mascot: "happy", text: "Чтобы сказать «я однажды/когда-то делал X» — -た-форма + ことがあります. すしをたべたことがあります = «я ел суши когда-то»." },
    pattern: "[Verb-た] ことが あります",
    formula: "VERB-TA KOTO GA ARIMASU",
    explanation: "ことがある буквально «есть факт». В прошедшей форме = «случалось делать». Отрицание: ことがない (никогда не делал). Хороший способ обмениваться жизненным опытом.",
    examples: [
      { jp: "にほんへいったことがあります。", romaji: "nihon e itta koto ga arimasu", ru: "Я был в Японии." },
      { jp: "おすしをたべたことがありますか？", romaji: "osushi wo tabeta koto ga arimasu ka", ru: "Ты пробовал суши?" },
      { jp: "いちども、おさけをのんだことがない。", romaji: "ichido mo, osake wo nonda koto ga nai", ru: "Ни разу не пил сакэ." },
    ],
    check: {
      sentence: "わたしはアニメを{?}ことがあります。",
      ru: "«Я смотрел аниме (когда-то)»",
      options: ["みる", "みた", "みて"],
      correct: "みた",
      explanation: "Опыт — -た-форма + ことがある.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Делимся опытом" },
  },

  {
    id: "koto-ga-dekiru",
    title: "Возможность: 〜ことができます",
    subtitle: "«Могу делать X»",
    intro: { mascot: "default", text: "«Могу делать X» — берём глагол в dict-форме + ことができます. にほんごをはなすことができます = «могу говорить по-японски»." },
    pattern: "[Verb-dict] ことが できます",
    formula: "VERB-DICT KOTO GA DEKIMASU",
    explanation: "В отличие от ことがある (опыт в прошлом), ことができる — способность сейчас. Для именной способности: сущ. + が + できる (にほんごができる = «знаю японский»). Отрицание: ことができません.",
    examples: [
      { jp: "ピアノをひくことができます。", romaji: "piano wo hiku koto ga dekimasu", ru: "Могу играть на пианино." },
      { jp: "かんじをよむことができます。", romaji: "kanji wo yomu koto ga dekimasu", ru: "Могу читать кандзи." },
      { jp: "りょうりができません。",       romaji: "ryouri ga dekimasen",            ru: "Не умею готовить." },
    ],
    check: {
      sentence: "あなたはおどる{?}できますか？",
      ru: "«Ты умеешь танцевать?»",
      options: ["ことが", "もの", "なに"],
      correct: "ことが",
      explanation: "Способность — dict-форма + ことができる.",
    },
    scene: { id: "izakaya", image: "/scenes/izakaya.png", title: "Идзакая", subtitle: "Хвалимся способностями" },
  },

  {
    id: "to-omoimasu",
    title: "Мнение: 〜と思います",
    subtitle: "«Я думаю, что X»",
    intro: { mascot: "thinking", text: "Чтобы выразить мнение — добавь と思います в конце. Перед と — plain-форма (не -ます)." },
    pattern: "[plain-форма] と 思います",
    formula: "PLAIN TO OMOIMASU",
    explanation: "Часто полезно: сказать «думаю, что X» — гораздо мягче, чем категорично заявлять. Перед と всегда plain (たべる, たべた, おいしい, きれいだ — не です).",
    examples: [
      { jp: "あしたはあめだとおもいます。", romaji: "ashita wa ame da to omoimasu", ru: "Думаю, завтра дождь." },
      { jp: "アキはやさしいとおもいます。", romaji: "Aki wa yasashii to omoimasu", ru: "Думаю, Аки добрая." },
      { jp: "もうかえったとおもいます。", romaji: "mou kaetta to omoimasu",       ru: "Думаю, уже ушёл." },
    ],
    check: {
      sentence: "アキは{?}とおもいます。",
      ru: "«Думаю, что Аки умница»",
      options: ["かしこい", "かしこいです", "かしこく"],
      correct: "かしこい",
      explanation: "Перед と идёт plain — без です.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Делимся мнениями" },
  },

  {
    id: "deshou",
    title: "Предположение: でしょう",
    subtitle: "«Наверное X», «правда?»",
    intro: { mascot: "happy", text: "でしょう — «наверное» (с уверенностью около 70%). Также используется как «правда?» с поднимающейся интонацией." },
    pattern: "[plain] でしょう",
    formula: "PLAIN DESHOU",
    explanation: "Заменяет です в значении «наверное». «あめだ→あめでしょう» = «наверное дождь». «あついです→あついでしょう» = «наверное жарко». В вопросе с поднимающейся интонацией = «правда же?».",
    examples: [
      { jp: "あしたはさむいでしょう。",     romaji: "ashita wa samui deshou", ru: "Завтра, наверное, холодно." },
      { jp: "アキさんもくるでしょう。",     romaji: "Aki-san mo kuru deshou", ru: "Аки тоже, наверное, придёт." },
      { jp: "おいしいでしょう？",           romaji: "oishii deshou",          ru: "Вкусно же, правда?" },
    ],
    check: {
      sentence: "あした、ゆきが{?}。",
      ru: "«Завтра, наверное, снег»",
      options: ["ふります", "ふるでしょう", "ふっています"],
      correct: "ふるでしょう",
      explanation: "«Наверное X» — plain + でしょう.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Гадаем про погоду" },
  },

  // === Batch 3: условные и эпистемические (11) ===

  {
    id: "tsumori",
    title: "Намерение: つもりです",
    subtitle: "«Я собираюсь делать X»",
    intro: { mascot: "default", text: "Чтобы сказать о намерении — глагол dict-форма + つもりです. Отрицание: つもりはありません («не собираюсь»)." },
    pattern: "[Verb-dict] つもりです",
    formula: "VERB-DICT TSUMORI DESU",
    explanation: "つもり буквально «намерение». В отличие от たい (хочу), つもり = твёрдый план. «あした、にほんへいくつもりです» — звучит как реальное намерение, не пожелание.",
    examples: [
      { jp: "らいねん、にほんへいくつもりです。", romaji: "rainen, nihon e iku tsumori desu", ru: "В следующем году поеду в Японию." },
      { jp: "なつやすみは、なにをするつもりですか？", romaji: "natsuyasumi wa, nani wo suru tsumori desu ka", ru: "Что планируешь на лето?" },
      { jp: "けっこんするつもりはありません。", romaji: "kekkon suru tsumori wa arimasen", ru: "Не собираюсь жениться." },
    ],
    check: {
      sentence: "あした、はやく{?}つもりです。",
      ru: "«Завтра планирую встать рано»",
      options: ["おきる", "おきた", "おきて"],
      correct: "おきる",
      explanation: "Намерение требует dict-форму глагола.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Планы на завтра" },
  },

  {
    id: "ni-naru",
    title: "Становление: 〜になります",
    subtitle: "«Стал X-ом», «делается X-ным»",
    intro: { mascot: "happy", text: "Глагол なる = «становиться». Для существительного и な-прил.: X + に + なる. Для い-прил.: -い → -く + なる." },
    pattern: "[Сущ.] / [な-прил.] に なります  ·  [い-прил. -い→-く] なります",
    formula: "X NI NARU  ·  ADJ-I-KU NARU",
    explanation: "Универсальная конструкция изменения. «Стану учителем» = せんせいになります. «Стало холодно» = さむくなりました (не さむいなった!). Прошедшее: なりました.",
    examples: [
      { jp: "いしゃになりたいです。",       romaji: "isha ni naritai desu",         ru: "Хочу стать врачом." },
      { jp: "ふゆはさむくなります。",       romaji: "fuyu wa samuku narimasu",      ru: "Зимой становится холодно." },
      { jp: "アキはきれいになりました。", romaji: "Aki wa kirei ni narimashita", ru: "Аки стала красивой." },
    ],
    check: {
      sentence: "あさは、はやく{?}なります。 (= рано светает)",
      ru: "«Утро становится рано-ясным»",
      options: ["あかい", "あかく", "あかいに"],
      correct: "あかく",
      explanation: "い-прил. перед なる: -い → -く.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Времена меняются" },
  },

  {
    id: "tara-conditional",
    title: "Условие: 〜たら",
    subtitle: "«Если/когда X, то Y»",
    intro: { mascot: "thinking", text: "Условие через -た-форму + ら. Самая универсальная условная форма: подходит и для гипотетики, и для последовательности «когда X — тогда Y»." },
    pattern: "[Verb-た] ら、[следствие]",
    formula: "VERB-TA-RA, ...",
    explanation: "Берём -た plain (たべる→たべた), добавляем ら. Можно с прил. (さむかったら = «если будет холодно») и сущ./な-прил. (やすみだったら). Универсально.",
    examples: [
      { jp: "あめがふったら、いきません。", romaji: "ame ga futtara, ikimasen", ru: "Если будет дождь — не пойду." },
      { jp: "うちにかえったら、でんわします。", romaji: "uchi ni kaettara, denwa shimasu", ru: "Когда вернусь домой, позвоню." },
      { jp: "やすみだったら、いきます。", romaji: "yasumi dattara, ikimasu", ru: "Если будет выходной — пойду." },
    ],
    check: {
      sentence: "じかんがあっ{?}、てつだいます。",
      ru: "«Если будет время, помогу»",
      options: ["たら", "ても", "ば"],
      correct: "たら",
      explanation: "Условие/«когда» — -たら.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Если бы..." },
  },

  {
    id: "to-conditional",
    title: "Натуральное «если»: 〜と",
    subtitle: "«Когда X, всегда Y» — закономерность",
    intro: { mascot: "default", text: "Условная форма с と подчёркивает естественную, повторяющуюся связь: «нажать — горит», «холодно — снег». Перед と всегда dict-форма." },
    pattern: "[Verb-dict] と、[результат]",
    formula: "VERB-DICT TO, ...",
    explanation: "В отличие от たら (одноразовое условие), と описывает закон: «X → Y всегда». Хорошо для инструкций, законов природы, привычек.",
    examples: [
      { jp: "ボタンをおすと、ドアがあきます。", romaji: "botan wo osu to, doa ga akimasu", ru: "Нажмёшь кнопку — дверь открывается." },
      { jp: "あさになると、とりがなきます。", romaji: "asa ni naru to, tori ga nakimasu", ru: "Наступает утро — поют птицы." },
      { jp: "さむくなると、ゆきがふります。", romaji: "samuku naru to, yuki ga furimasu", ru: "Холодает — идёт снег." },
    ],
    check: {
      sentence: "ボタンを{?}と、ライトがつきます。",
      ru: "«Нажмёшь — загорится»",
      options: ["おす", "おして", "おした"],
      correct: "おす",
      explanation: "Перед と — dict-форма (не -ます).",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Всегда так" },
  },

  {
    id: "ba-conditional",
    title: "Гипотетика: 〜ば",
    subtitle: "«Если X, то…» — формальный гипотетический вариант",
    intro: { mascot: "thinking", text: "Третья условная форма (есть ещё なら). ば — гипотетическая, формальная. Для глаголов: -う/る → -えば. Для い-прил.: -い → -ければ." },
    pattern: "[Verb -えば]  ·  [い-прил. -ければ]",
    formula: "VERB-EBA  ·  ADJ-I-KEREBA",
    explanation: "Глаголы: たべる→たべれば, のむ→のめば, いく→いけば. Прилагательные: さむい→さむければ, おいしい→おいしければ. Часто с пословицами и общими утверждениями.",
    examples: [
      { jp: "やすければ、かいます。",       romaji: "yasukereba, kaimasu",        ru: "Если дёшево — куплю." },
      { jp: "わからなければ、しつもんしてください。", romaji: "wakaranakereba, shitsumon shite kudasai", ru: "Если не понятно — спросите." },
      { jp: "がんばれば、できる。",         romaji: "ganbareba, dekiru",          ru: "Если постараешься — сможешь." },
    ],
    check: {
      sentence: "おなかがすけ{?}、たべます。",
      ru: "«Если голоден — поем»",
      options: ["たら", "ば", "なら"],
      correct: "ば",
      explanation: "Базовая ば-форма: すく→すけば.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Размышляем" },
  },

  {
    id: "node-because",
    title: "Причина (мягкая): 〜ので",
    subtitle: "Альтернатива から — звучит вежливее",
    intro: { mascot: "default", text: "ので и から почти синонимы («потому что»), но ので мягче и формальнее. Часто используется при объяснении/извинении." },
    pattern: "[plain] ので、[следствие]",
    formula: "PLAIN NODE, ...",
    explanation: "Перед ので — plain-форма (но именные/な-прил. через な: しずかなので, やすみなので). Объективная причина → ので. Субъективное «потому что» → から.",
    examples: [
      { jp: "あめなので、いきません。",     romaji: "ame nano de, ikimasen",   ru: "Так как дождь — не пойду." },
      { jp: "つかれたので、ねます。",       romaji: "tsukareta no de, nemasu", ru: "Я устал, поэтому иду спать." },
      { jp: "じかんがないので、すみません。", romaji: "jikan ga nai no de, sumimasen", ru: "Времени нет, извините." },
    ],
    check: {
      sentence: "あぶない{?}、はしらないでください。",
      ru: "«Опасно, не бегайте, пожалуйста»",
      options: ["ので", "から", "が"],
      correct: "ので",
      explanation: "Вежливая объяснительная причина — ので.",
    },
    scene: { id: "izakaya", image: "/scenes/izakaya.png", title: "Идзакая", subtitle: "Объясняем мягко" },
  },

  {
    id: "shika-only",
    title: "Только: 〜しか + отрицание",
    subtitle: "«Только X (и больше ничего)»",
    intro: { mascot: "surprised", text: "しか — «только», но ВСЕГДА с отрицанием. Дает оттенок «всего лишь, к сожалению» (в отличие от だけ — нейтральное)." },
    pattern: "[X] しか [глагол-отрицание]",
    formula: "X SHIKA NEGATIVE-VERB",
    explanation: "«100えんしかありません» = «у меня только 100 иен (мало)». Глагол ВСЕГДА в отрицательной форме, даже если смысл утвердительный. Эмоциональная подсветка: дефицита, ограниченности.",
    examples: [
      { jp: "100えんしかありません。",       romaji: "hyaku-en shika arimasen", ru: "Только 100 иен." },
      { jp: "ひとりしかきませんでした。",   romaji: "hitori shika kimasen deshita", ru: "Пришёл всего один." },
      { jp: "やすみは1にちしかない。",       romaji: "yasumi wa ichinichi shika nai", ru: "Выходной — всего один день." },
    ],
    check: {
      sentence: "コーヒーしか{?}。",
      ru: "«Только кофе и больше ничего»",
      options: ["あります", "ありません", "ですか"],
      correct: "ありません",
      explanation: "しか всегда с отрицанием.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Скудный выбор" },
  },

  {
    id: "to-with",
    title: "С кем: частица と",
    subtitle: "«Делать что-то ВМЕСТЕ с X»",
    intro: { mascot: "happy", text: "と помимо «и» используется как «с кем». «アキとあそぶ» = «играть с Аки»." },
    pattern: "[X] と [глагол совместного действия]",
    formula: "X TO VERB",
    explanation: "Та же частица と, но с глаголом — обозначает «с» (вместе). «だれと» = «с кем». Часто пара с いっしょに («вместе»). Для одиночных: ひとりで («один»).",
    examples: [
      { jp: "ともだちといきます。",         romaji: "tomodachi to ikimasu",   ru: "Пойду с другом." },
      { jp: "だれとはなしましたか？",       romaji: "dare to hanashimashita ka", ru: "С кем ты говорил?" },
      { jp: "アキといっしょにべんきょうします。", romaji: "Aki to issho ni benkyou shimasu", ru: "Учусь вместе с Аки." },
    ],
    check: {
      sentence: "アキ{?}えいがをみました。",
      ru: "«Смотрел фильм с Аки»",
      options: ["で", "と", "に"],
      correct: "と",
      explanation: "«С кем» — частица と.",
    },
    scene: { id: "school-yard", image: "/scenes/school-yard.png", title: "Школьный двор", subtitle: "Всегда не один" },
  },

  {
    id: "tari-tari",
    title: "Перечисление: 〜たり〜たりする",
    subtitle: "«То X, то Y» — несколько действий",
    intro: { mascot: "happy", text: "Чтобы перечислить несколько действий (не последовательно, а «среди прочего»): -たり-формы + する. «ほんをよんだり、テレビをみたりします»." },
    pattern: "[Verb-た] り [Verb-た] り します",
    formula: "VERB-TARI VERB-TARI SURU",
    explanation: "Берём -た-форму, добавляем り. Несколько глаголов одной структуры. Завершаем する (или его формой). Не порядок, а «вот примеры».",
    examples: [
      { jp: "やすみは、ほんをよんだり、おんがくをきいたりします。", romaji: "yasumi wa, hon wo yondari, ongaku wo kiitari shimasu", ru: "В выходные читаю, слушаю музыку и т.п." },
      { jp: "あめがふったり、はれたりします。", romaji: "ame ga futtari, haretari shimasu", ru: "То дождь, то солнце." },
      { jp: "ねたりおきたりしました。",     romaji: "netari okitari shimashita", ru: "То спал, то вставал." },
    ],
    check: {
      sentence: "アニメをみたり、マンガを{?}します。",
      ru: "«Смотрю аниме, читаю мангу...»",
      options: ["よんだり", "よみます", "よんで"],
      correct: "よんだり",
      explanation: "Список через -たり: -た + り.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Чем заняты в выходной" },
  },

  {
    id: "te-mimasu",
    title: "Попробовать: 〜てみます",
    subtitle: "«Сделаю X (попробую как)»",
    intro: { mascot: "happy", text: "て-форма + みる = «попробовать сделать». Не «попробовать на вкус», а «попытаться, как получится»." },
    pattern: "[Verb-て] みます",
    formula: "VERB-TE MIMASU",
    explanation: "みる буквально = «смотреть», но в этой конструкции = «попробовать как, посмотреть, получится ли». «たべてみる» = «съем-ка попробую». Часто с волевыми планами: 〜てみたい (хочу попробовать).",
    examples: [
      { jp: "あたらしいラーメンをたべてみます。", romaji: "atarashii raamen wo tabete mimasu", ru: "Попробую новый рамен." },
      { jp: "にほんへいってみたい。",             romaji: "nihon e itte mitai",                 ru: "Хочу попробовать съездить в Японию." },
      { jp: "アキにきいてみます。",                 romaji: "Aki ni kiite mimasu",                ru: "Спрошу-ка у Аки." },
    ],
    check: {
      sentence: "おすしを{?}みたいです。",
      ru: "«Хочу попробовать суши»",
      options: ["たべて", "たべる", "たべた"],
      correct: "たべて",
      explanation: "て-форма + みたい — «хочу попробовать».",
    },
    scene: { id: "izakaya", image: "/scenes/izakaya.png", title: "Идзакая", subtitle: "Пробуем новое" },
  },

  {
    id: "te-shimau",
    title: "Завершение/жалость: 〜てしまう",
    subtitle: "«Сделать совсем» / «к сожалению сделал»",
    intro: { mascot: "thinking", text: "て-форма + しまう (или сокр. -ちゃう) — два смысла: «доделать до конца» и «к сожалению, что-то нечаянно сделал»." },
    pattern: "[Verb-て] しまいました ／ ちゃった",
    formula: "VERB-TE SHIMAIMASHITA / -CHATTA",
    explanation: "Контекст решает смысл. «ぜんぶたべてしまった» = «я всё съел» (закончил). «かさをわすれてしまった» = «забыл зонт (досадно)». Сокращение: -てしまう → -ちゃう, -でしまう → -じゃう.",
    examples: [
      { jp: "ほんをぜんぶよんでしまいました。", romaji: "hon wo zenbu yonde shimaimashita", ru: "Прочитал всю книгу." },
      { jp: "おさいふをなくしてしまった。",     romaji: "osaifu wo nakushite shimatta",     ru: "Кошелёк потерял (досадно)." },
      { jp: "もうたべちゃった。",               romaji: "mou tabechatta",                   ru: "Уже всё съел. (разг.)" },
    ],
    check: {
      sentence: "コーヒーを{?}しまいました。 (= вылил весь)",
      ru: "«Вылил кофе (досадно)»",
      options: ["こぼして", "こぼします", "こぼした"],
      correct: "こぼして",
      explanation: "て-форма + しまいました.",
    },
    scene: { id: "cafe", image: "/scenes/cafe.png", title: "Сцена в кафе", subtitle: "Ой, опять разлил" },
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
