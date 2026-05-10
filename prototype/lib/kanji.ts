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

  // === Расширение M2.3.2: ещё 60 кандзи N5 (40 → 100) ===

  // Числа 4-10 (7)
  { char: "四", meaning: "четыре",  meanings: ["четыре","4"], onyomi:["シ"],   kunyomi:["よん","よ"], mnemonic: "Окно с разделёнными ставнями — четыре сектора." },
  { char: "五", meaning: "пять",    meanings: ["пять","5"],   onyomi:["ゴ"],   kunyomi:["いつ"],     mnemonic: "Кулак с пятью пальцами — стилизованная пятёрка." },
  { char: "六", meaning: "шесть",   meanings: ["шесть","6"],  onyomi:["ロク"], kunyomi:["むっ","む"], mnemonic: "Шалаш с входом — посчитай 6 предметов внутри." },
  { char: "七", meaning: "семь",    meanings: ["семь","7"],   onyomi:["シチ"], kunyomi:["なな"],     mnemonic: "Семёрка с крюком — наша «7» наоборот." },
  { char: "八", meaning: "восемь",  meanings: ["восемь","8"], onyomi:["ハチ"], kunyomi:["やっ","や"], mnemonic: "Гора с раздвинутыми склонами." },
  { char: "九", meaning: "девять",  meanings: ["девять","9"], onyomi:["キュウ","ク"], kunyomi:["ここの"], mnemonic: "Похоже на цифру 9 в зеркале." },
  { char: "十", meaning: "десять",  meanings: ["десять","10"], onyomi:["ジュウ"], kunyomi:["とお"], mnemonic: "Крест из десяти спиц." },

  // Большие числа и валюта (4)
  { char: "百", meaning: "сто",     meanings: ["сто","100"],  onyomi:["ヒャク"], kunyomi:[], mnemonic: "Один (一) над «белым» (白) — белая сотня." },
  { char: "千", meaning: "тысяча",  meanings: ["тысяча","1000"], onyomi:["セン"], kunyomi:["ち"], mnemonic: "Палочка с засечкой — отмечаешь тысячу." },
  { char: "円", meaning: "иена",    meanings: ["иена","круг"], onyomi:["エン"], kunyomi:["まる"], mnemonic: "Стилизованный круг — монета." },
  { char: "万", meaning: "10000",   meanings: ["10 тысяч","десять тысяч"], onyomi:["マン"], kunyomi:[], mnemonic: "Свастика без хвостов — древний символ изобилия." },

  // Время (8)
  { char: "年", meaning: "год",     meanings: ["год"],         onyomi:["ネン"], kunyomi:["とし"],     mnemonic: "Колосок риса — один урожай в год." },
  { char: "時", meaning: "время",   meanings: ["время","час"], onyomi:["ジ"],   kunyomi:["とき"],     mnemonic: "Солнце (日) + храм (寺) — солнечные часы." },
  { char: "分", meaning: "минута",  meanings: ["минута","часть","понимать"], onyomi:["フン","ブン"], kunyomi:["わ"], mnemonic: "Меч (刀) делит на две части (八)." },
  { char: "朝", meaning: "утро",    meanings: ["утро"],        onyomi:["チョウ"], kunyomi:["あさ"], mnemonic: "Солнце (十+日) поднимается над травой." },
  { char: "夜", meaning: "ночь",    meanings: ["ночь"],        onyomi:["ヤ"],   kunyomi:["よる","よ"], mnemonic: "Крыша + луна — ночь дома." },
  { char: "前", meaning: "перед",   meanings: ["перед","раньше"], onyomi:["ゼン"], kunyomi:["まえ"], mnemonic: "Что-то впереди — рога/нос вперёд." },
  { char: "後", meaning: "после",   meanings: ["после","сзади"], onyomi:["ゴ","コウ"], kunyomi:["あと","うし"], mnemonic: "Маленькие ноги — отстают, идут после." },
  { char: "何", meaning: "что",     meanings: ["что","какой","сколько"], onyomi:["カ"], kunyomi:["なに","なん"], mnemonic: "Человек (亻) с крюком (可) — «что несёшь?»." },

  // Люди и семья (7)
  { char: "子", meaning: "ребёнок", meanings: ["ребёнок","сын"], onyomi:["シ","ス"], kunyomi:["こ"], mnemonic: "Младенец с большой головой и пелёнкой." },
  { char: "男", meaning: "мужчина", meanings: ["мужчина"],     onyomi:["ダン","ナン"], kunyomi:["おとこ"], mnemonic: "Поле (田) + сила (力) — мужчина в поле." },
  { char: "女", meaning: "женщина", meanings: ["женщина"],     onyomi:["ジョ","ニョ"], kunyomi:["おんな"], mnemonic: "Стилизованная фигура с сидящими ногами." },
  { char: "父", meaning: "отец",    meanings: ["отец"],        onyomi:["フ"],   kunyomi:["ちち","とう"], mnemonic: "Скрещённые руки — строгая фигура отца." },
  { char: "母", meaning: "мать",    meanings: ["мать"],        onyomi:["ボ"],   kunyomi:["はは","かあ"], mnemonic: "Грудь с двумя точками — мать кормит." },
  { char: "友", meaning: "друг",    meanings: ["друг","дружба"], onyomi:["ユウ"], kunyomi:["とも"], mnemonic: "Две руки протягиваются друг другу." },
  { char: "名", meaning: "имя",     meanings: ["имя","известный"], onyomi:["メイ","ミョウ"], kunyomi:["な"], mnemonic: "Вечером (夕) кричишь рот (口) — называешь имя." },

  // Тело (2)
  { char: "足", meaning: "нога",    meanings: ["нога","достаточно"], onyomi:["ソク"], kunyomi:["あし","た"], mnemonic: "Стопа с пальцами и икрой." },
  { char: "耳", meaning: "ухо",     meanings: ["ухо"],         onyomi:["ジ"],   kunyomi:["みみ"],     mnemonic: "Контур уха с мочкой." },

  // Направления (8)
  { char: "北", meaning: "север",   meanings: ["север"],       onyomi:["ホク"], kunyomi:["きた"],     mnemonic: "Два человека спина к спине, отвернулись — на север (там холодно)." },
  { char: "南", meaning: "юг",      meanings: ["юг"],          onyomi:["ナン"], kunyomi:["みなみ"],   mnemonic: "Шатёр + растение — на юге растёт." },
  { char: "東", meaning: "восток",  meanings: ["восток"],      onyomi:["トウ"], kunyomi:["ひがし"],   mnemonic: "Солнце (日) за деревом (木) — солнце восходит на востоке." },
  { char: "西", meaning: "запад",   meanings: ["запад"],       onyomi:["セイ","サイ"], kunyomi:["にし"], mnemonic: "Птица в гнезде на закате (на западе)." },
  { char: "右", meaning: "право",   meanings: ["право","справа"], onyomi:["ウ","ユウ"], kunyomi:["みぎ"], mnemonic: "Рука + рот — правой рукой ешь." },
  { char: "左", meaning: "лево",    meanings: ["лево","слева"], onyomi:["サ"],   kunyomi:["ひだり"], mnemonic: "Рука + работа — левой держишь инструмент." },
  { char: "外", meaning: "вне",     meanings: ["вне","снаружи","иностранный"], onyomi:["ガイ","ゲ"], kunyomi:["そと","ほか"], mnemonic: "Вечер (夕) + гадание (卜) — гадают вне дома." },
  { char: "道", meaning: "дорога",  meanings: ["дорога","путь"], onyomi:["ドウ"], kunyomi:["みち"], mnemonic: "Голова идёт по пути (辶+首) — дорога." },

  // Природа (5)
  { char: "雨", meaning: "дождь",   meanings: ["дождь"],       onyomi:["ウ"],   kunyomi:["あめ"],     mnemonic: "Облако с каплями." },
  { char: "花", meaning: "цветок",  meanings: ["цветок"],      onyomi:["カ"],   kunyomi:["はな"],     mnemonic: "Трава (艹) + изменение (化) — растение трансформируется в цветок." },
  { char: "海", meaning: "море",    meanings: ["море"],        onyomi:["カイ"], kunyomi:["うみ"],     mnemonic: "Вода (氵) + всегда (毎) — море всегда здесь." },
  { char: "空", meaning: "небо",    meanings: ["небо","пустой","воздух"], onyomi:["クウ"], kunyomi:["そら","から","あ"], mnemonic: "Под крышей пустота — пусто как небо." },
  { char: "魚", meaning: "рыба",    meanings: ["рыба"],        onyomi:["ギョ"], kunyomi:["さかな","うお"], mnemonic: "Голова + туловище + чешуя + хвост." },

  // Базовые глаголы (15)
  { char: "入", meaning: "входить", meanings: ["входить","вкладывать"], onyomi:["ニュウ"], kunyomi:["い","はい"], mnemonic: "Стрелочка указывает внутрь." },
  { char: "出", meaning: "выходить", meanings: ["выходить","выпускать"], onyomi:["シュツ"], kunyomi:["で","だ"], mnemonic: "Гора над горой — выходишь над холмами." },
  { char: "買", meaning: "покупать", meanings: ["покупать"],   onyomi:["バイ"], kunyomi:["か"],       mnemonic: "Ракушка (貝) сверху сетка — деньги в кармане для покупок." },
  { char: "売", meaning: "продавать", meanings: ["продавать"], onyomi:["バイ"], kunyomi:["う"],       mnemonic: "Самурай (士) продаёт — стоит на ногах." },
  { char: "使", meaning: "использовать", meanings: ["использовать","посланник"], onyomi:["シ"], kunyomi:["つか"], mnemonic: "Человек (亻) + чиновник (吏) — приказывает, использует." },
  { char: "作", meaning: "делать",  meanings: ["делать","создавать"], onyomi:["サク","サ"], kunyomi:["つく"], mnemonic: "Человек (亻) + резец — создаёт изделие." },
  { char: "知", meaning: "знать",   meanings: ["знать","знание"], onyomi:["チ"],   kunyomi:["し"], mnemonic: "Стрела (矢) + рот (口) — знание попадает в цель и говорится." },
  { char: "帰", meaning: "возвращаться", meanings: ["возвращаться","домой"], onyomi:["キ"], kunyomi:["かえ","き"], mnemonic: "Метла домой — убирает по возвращении." },
  { char: "寝", meaning: "спать",   meanings: ["спать","ложиться"], onyomi:["シン"], kunyomi:["ね"], mnemonic: "Крыша (宀) + кровать + рука — спать дома." },
  { char: "歩", meaning: "ходить",  meanings: ["ходить","шаг"], onyomi:["ホ","ブ"], kunyomi:["ある","あゆ"], mnemonic: "Стопа над стопой (止) — переступаешь, идёшь." },
  { char: "走", meaning: "бежать",  meanings: ["бежать"],      onyomi:["ソウ"], kunyomi:["はし"],     mnemonic: "Земля (土) + ноги (人 ниже) — мчишься по земле." },
  { char: "休", meaning: "отдых",   meanings: ["отдых","отдыхать","выходной"], onyomi:["キュウ"], kunyomi:["やす"], mnemonic: "Человек (亻) у дерева (木) — отдыхает в тени." },
  { char: "立", meaning: "стоять",  meanings: ["стоять"],      onyomi:["リツ"], kunyomi:["た"],       mnemonic: "Человек на земле — стоит ровно." },
  { char: "持", meaning: "держать", meanings: ["держать","иметь"], onyomi:["ジ"],   kunyomi:["も"],   mnemonic: "Рука (扌) + храм (寺) — держит святой артефакт." },
  { char: "思", meaning: "думать",  meanings: ["думать"],      onyomi:["シ"],   kunyomi:["おも"],     mnemonic: "Поле (田) + сердце (心) — мысль вырастает из сердца." },

  // Прилагательные (5)
  { char: "高", meaning: "высокий", meanings: ["высокий","дорогой"], onyomi:["コウ"], kunyomi:["たか"], mnemonic: "Высокая башня с этажами." },
  { char: "安", meaning: "дешёвый", meanings: ["дешёвый","спокойный","безопасный"], onyomi:["アン"], kunyomi:["やす"], mnemonic: "Женщина (女) под крышей — спокойно и недорого дома." },
  { char: "多", meaning: "много",   meanings: ["много","много чего"], onyomi:["タ"], kunyomi:["おお"], mnemonic: "Два «вечера» (夕夕) — за много вечеров накопится." },
  { char: "少", meaning: "мало",    meanings: ["мало","немного"], onyomi:["ショウ"], kunyomi:["すく","すこ"], mnemonic: "Маленький (小) с лишней чёрточкой — ещё меньше." },
  { char: "新", meaning: "новый",   meanings: ["новый"],       onyomi:["シン"], kunyomi:["あたら","あら"], mnemonic: "Топор (斤) у дерева — рубят свежее дерево." },

  // Прочее (2)
  { char: "国", meaning: "страна",  meanings: ["страна"],      onyomi:["コク"], kunyomi:["くに"],     mnemonic: "Страна с границей и драгоценностью внутри." },
  { char: "語", meaning: "язык",    meanings: ["язык","слово"], onyomi:["ゴ"],   kunyomi:["かた"],    mnemonic: "Слова (言) + я (吾) — мой язык." },
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
