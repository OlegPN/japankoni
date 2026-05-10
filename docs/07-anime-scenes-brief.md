# Art Brief — Anime Scenes for KONI

> **Назначение:** иллюстрации для разблокируемых сцен после уроков (Anime Moments).
> **Текущий стиль продукта:** Ghibli-watercolor, тёплая палитра Sakura + Sumi, маскот Кони (чиби-конь в кимоно).
> **Откуда взять:** ChatGPT image / Midjourney v6 / Flux Pro / иллюстратор-фрилансер.

---

## 1. Стилистическая консистенция (общая для всех сцен)

Каждый промпт должен включать эти style anchors, чтобы сцены смотрелись с Кони единым продуктом:

```
Studio Ghibli art style, Hayao Miyazaki aesthetic, soft watercolor painting,
hand-drawn 2D illustration, warm sakura pink and beige palette,
cherry blossom petals floating, gentle light, painterly textures,
no harsh outlines, dreamy atmosphere, cinematic composition.
```

**Палитра** (точные hex для общения с иллюстратором):
- Warm cream `#FFF8F5`
- Sakura pink `#FFD9D0`
- Coral primary `#E85D75`
- Sumi dark `#2A1F1B`
- Indigo accent `#4A2F4B` (как хакама Кони)
- Sunset orange `#FFB088`

**Чего избегаем:**
- Реалистичной фотографии или 3D-рендеров
- Резких кибер-панк или неоновых тонов
- Слишком детализированных лиц/персонажей (они отвлекут от текста учения)
- Текста на самой картинке (текст накладывается программно)

**Технические требования:**
- Формат: PNG с прозрачным или мягким фоном
- Соотношение сторон: **9:13** (~1080×1560px) — под video-frame в приложении
- Без водяных знаков, без подписей
- Размер файла: до 2 МБ после сжатия (сделаем оптимизацию через Next.js Image)

---

## 2. Каталог сцен (5 шт. в MVP)

Каждая сцена привязана к уроку грамматики. Когда ученик закрывает урок — сцена разблокируется.

### Сцена 1 — **Рамэн-бар на закате** 🍜
**Привязка:** разблокируется после 3 уроков (как сейчас). Использует все 3 темы (は・を・です).
**Контекст диалога:** хозяин лавки приветствует, гость заказывает рамэн, оценивает вкус.
**Композиция:** уютный рамэн-бар вечером. Слева — стойка с миской дымящегося рамэна, палочки, пар. Справа — открытое окно с видом на закат и силуэт горы Фудзи. По бокам — два бумажных фонаря 🏮. Сакура осыпается. Атмосфера: тёплая, домашняя, как в «Унесённые призраками».
**Промпт:**
```
Cozy Japanese ramen bar interior at sunset, Studio Ghibli watercolor style,
wooden counter with steaming ramen bowl in foreground, chopsticks resting on bowl,
warm orange-pink sky visible through open window, distant Fuji mountain silhouette,
two glowing red paper lanterns hanging on either side, falling cherry blossom petals,
empty stools at counter, no people, soft painterly textures, warm cream and sakura pink palette,
gentle light, dreamy nostalgic atmosphere, hand-drawn anime, --ar 9:13 --style raw
```

### Сцена 2 — **Школьный двор весной** 🌸
**Привязка:** для будущего соло-урока «は + です».
**Контекст диалога:** Аки знакомится с одноклассником под цветущей сакурой.
**Композиция:** дорожка к деревянному школьному зданию. Большая цветущая сакура с осыпающимися лепестками. На земле — тропинка и опавшие лепестки. На заднем плане — японская школа с черепичной крышей. Никаких людей в кадре (они появятся через речевые баблы программно).
**Промпт:**
```
Japanese school courtyard in spring, Studio Ghibli watercolor style,
giant blooming cherry blossom tree dropping petals on path, traditional wooden school building with tiled roof in background,
soft morning light, painterly clouds, no people, warm sakura pink and pale blue palette,
hand-drawn anime, dreamy peaceful atmosphere, painterly textures, --ar 9:13 --style raw
```

### Сцена 3 — **Кафе в Токио** ☕
**Привязка:** для урока «を».
**Контекст диалога:** Аки заказывает напиток у бариста.
**Композиция:** уютное окно кафе в дождливый вечер. На столике — чашка кофе с парком. Снаружи — мокрая улица с неоновыми вывесками отражающимися в лужах. Бумажный зонт прислонён у входа. Через окно видны дома с традиционными крышами.
**Промпт:**
```
Cozy Japanese cafe interior on rainy evening, Studio Ghibli watercolor style,
window seat with steaming coffee cup on wooden table, view of wet Tokyo street outside with soft pink and blue neon reflections in puddles,
paper umbrella leaning by entrance, traditional rooftops in distance, raindrops on window,
warm interior lighting, no people visible, painterly textures, hand-drawn anime,
warm cream and sakura pink palette accented with cool blue, --ar 9:13 --style raw
```

### Сцена 4 — **Икидзака с друзьями** 🍻
**Привязка:** для урока «ません» (отказ от алкоголя/мяса).
**Контекст диалога:** друзья сидят в идзакая, Аки вежливо отказывается.
**Композиция:** интерьер идзакая (япoнский паб). Низкий стол с маленькими блюдами (соевый соус, эдамаме, гёдза). Подушки татами для сидения. Деревянные балки потолка. Тёплый красный свет фонариков.
**Промпт:**
```
Cozy Japanese izakaya interior, Studio Ghibli watercolor style,
low wooden table with small dishes (edamame, gyoza, soy sauce), tatami cushions,
red paper lanterns glowing warmly above, wooden ceiling beams, no people visible,
painterly textures, hand-drawn anime, warm amber and sakura pink palette, intimate evening atmosphere, --ar 9:13 --style raw
```

### Сцена 5 — **Под сакурой** 🌸 (бонус, для онбординга/hero)
**Привязка:** не к уроку — общая мотивационная иллюстрация. Можно использовать на splash screen или в email-уведомлениях.
**Композиция:** одинокая старая сакура на холме на закате. Лепестки кружатся в воздухе. Внизу — японская деревня с черепичными крышами. Ощущение спокойствия и медитации.
**Промпт:**
```
Lone ancient cherry blossom tree on hilltop at sunset, Studio Ghibli watercolor style,
swirling petals in wind, distant Japanese village with tiled rooftops below, soft purple-pink sky, distant mountains,
painterly clouds, no people, hand-drawn anime, dreamy contemplative atmosphere,
warm sakura pink and twilight purple palette, --ar 9:13 --style raw
```

---

## 3. Соответствие сцен → урокам

| ID | Файл (предлагаемое имя) | Привязка | В прототипе |
|---|---|---|---|
| `ramen-bar` | `scenes/ramen-bar.png` | После всех 3 уроков | ✅ Уже описана в коде |
| `school-yard` | `scenes/school-yard.png` | Урок 1 (は + です) | Соло-сцена для урока |
| `cafe` | `scenes/cafe.png` | Урок 2 (を) | Соло-сцена для урока |
| `izakaya` | `scenes/izakaya.png` | Урок 3 (ません) | Соло-сцена для урока |
| `sakura-hero` | `scenes/sakura-hero.png` | Hero / онбординг | Декоративная |

В будущем (post-MVP) — по 2–3 кадра на сцену для большего cinematic-эффекта (intro shot → mid → reaction).

---

## 4. Где взять

### Опция A — AI-генерация (быстро, дёшево, ~1 час)
Тот же путь, что мы прошли с Кони:
1. Открыть ChatGPT с image-mode (или Midjourney v6 / Flux Pro).
2. Вставить промпт из раздела 2 по очереди.
3. Перегенерировать пока не получится в стиле.
4. Скачать с прозрачным фоном (если возможно), сохранить в `prototype/public/scenes/`.

**Стоимость:** $20/мес ChatGPT Plus или Midjourney Basic.
**Время:** ~10–15 минут на сцену.

### Опция B — Иллюстратор-фрилансер (качественно, дороже, ~1 неделя)
1. Behance / Dribbble / Fiverr — поиск по «Studio Ghibli style illustration».
2. Передать этот документ + готовых Кони как референс.
3. Договориться о пакете 5 сцен.

**Стоимость:** $200–600 за пак из 5 сцен у среднего иллюстратора, $1500+ у топовых.
**Время:** 5–10 рабочих дней.

### Опция C — Гибрид
AI делает черновик → иллюстратор дорабатывает (правит композицию, синхронизирует стиль с Кони). Лучшее качество за разумные деньги.

---

## 5. Интеграция в код (что я подготовлю)

После того, как картинки появятся в `prototype/public/scenes/`, я:

1. Обновлю `app/anime/page.tsx`: добавлю поле `image?: string` в SCENE-объект.
2. Если поле задано — рендерим `<Image>`-фон вместо CSS-арта.
3. Если не задано — фолбэк на текущую CSS-сцену (она остаётся как заглушка).
4. Подключу остальные 4 сцены к их урокам через мapping в `lib/lessons.ts`.

После этого karaoke-поверх будет работать с любой картинкой как фоном.

---

## 6. Чек-лист перед заказом

- [ ] Согласовать палитру с Кони (использовать палитру в разделе 1)
- [ ] Передать референс-папку `img/koni/` (особенно `koni-default.png` — full-body) иллюстратору
- [ ] Подтвердить пропорции 9:13 (важно — 16:9 не подойдёт под нашу video-frame)
- [ ] Указать, что сцены **без персонажей** (Кони и пользователь появятся через subtitle bubbles)
- [ ] Прозрачный фон не обязателен (фон будет сцена), но прозрачные края для мягкого скругления приветствуются
- [ ] Уточнить лицензию: коммерческое использование, exclusive rights, право на модификацию

---

## 7. Что делать дальше

Скажите когда сгенерируете/закажете первую сцену — я обновлю код, чтобы он подхватил картинку и убрал CSS-фолбэк. Можно начать с **Сцены 1 (Рамэн-бар)** — она уже привязана в коде, готова получить иллюстрацию.
