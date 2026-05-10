# KONI

> Японский с нуля до N3 для русскоязычных. AI-Кони + аниме-сцены как механика обучения.

**Слоган:** «Японский через то, что ты любишь. От первой каны до первого аниме без субтитров.»

## Фишка — Anime Loop

Не «учи карточки → потом награда-клип», а:

```
услышал реплику в аниме-сцене → не понял слово →
тапнул в субтитре → слово в SRS →
вернулся к сцене → теперь слышишь
```

Сцена = ~15 сек диалога с AI-озвучкой (ElevenLabs Yui + Takuya), картинка-фон, тапаемые субтитры, прогресс «понимаешь N/M слов».

## Структура

```
docs/                  → исследование, позиционирование, PRD, mockups, roadmap
prototype/             → Next.js 15 + React 19 RC + Tailwind, упакован Capacitor под Android
  app/                  → роуты (onboarding, session, scene, anime, milestone)
  lib/                  → данные (hiragana, katakana, kanji, vocab, scenes, lessons) + FSRS
  components/           → ScenePlayer, PhoneFrame
  scripts/              → generate-audio.mjs, generate-scene-audio.mjs (ElevenLabs)
  public/audio/         → 162 mp3 для всех карточек обучения (голос Yui)
  public/scenes/audio/  → mp3 реплик аниме-сцен
img/koni/              → арты маскота (чиби-конь в кимоно)
```

## Что внутри (M1 + M2.1)

| Блок | Готово |
|---|---|
| Хирагана 46 | ✅ |
| Катакана 46 | ✅ |
| Кандзи 20 (значение + on/kun чтения в SRS) | ✅ |
| Vocab 40 слов N5 | ✅ |
| 3 урока грамматики (は・を・ません) | ✅ |
| FSRS-движок + 5 типов карт | ✅ |
| Анime Loop player с тапаемыми субтитрами | ✅ |
| **2 сцены** с ElevenLabs аудио (school-yard, cafe) | ✅ |
| **Listening-карты** в Review (40% шанс на знакомых) | ✅ |
| Озвучка всех 162 учебных карточек (Yui) | ✅ |
| Onboarding + дашборд + хаб сцен `/anime` | ✅ |
| Capacitor APK для Android | ✅ |
| AI Talk через Claude API | 🟡 в работе |
| Supabase бэкенд | ❌ M3 |
| iOS | ❌ v1.1 |
| Pitch accent | ❌ v1.2 |

## Запуск

```sh
cd prototype
npm install
cp .env.example .env.local   # заполни ELEVENLABS_API_KEY и voice IDs
npm run dev                  # http://localhost:3000
```

Сборка APK:
```sh
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

## Генерация аудио (ElevenLabs)

```sh
node scripts/generate-audio.mjs all          # все 162 карточки
node scripts/generate-audio.mjs hiragana     # одна категория
node scripts/generate-scene-audio.mjs cafe   # одна сцена
```

## Стек

- Next.js 15 (PWA, static export для Capacitor)
- React 19 RC + Tailwind
- ts-fsrs (SRS-расписание FSRS-4.5)
- ElevenLabs (TTS, голоса Yui + Takuya)
- Capacitor (Android wrapper)
- localStorage (заменим на Supabase в M3)
- Anthropic Claude (для Talk — в работе)

## План развития

См. [docs/08-roadmap.md](docs/08-roadmap.md). Резюме:

**M1** ✅ — фишка живёт на 1 сцене (закрыто).
**M2.1** 🟡 — Listening + сцена кафе ✅; AI Talk текстом — в работе.
**M2.2** — +12 паттернов грамматики, +60 vocab, +1 сцена.
**M2.3** — полный N5 (50 паттернов, 100 кандзи, 800 слов, 8 сцен).
**M3** — Supabase бэкенд, монетизация, RuStore + Google Play.
**v1.1** — голосовой Talk (Whisper STT), iOS.
**v1.2** — pitch accent, N4.

---

Проект разрабатывается силами одного человека + Claude Code. Контент валидируется через перекрёстную проверку Claude + DeepL + Jisho.
