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
