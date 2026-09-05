# NoteHub

NoteHub — застосунок на Next.js для перегляду та керування особистими нотатками.
Він працює з REST API, підтримує пошук, пагінацію, створення, видалення та
фільтрацію за тегами. Дані попередньо завантажуються на сервері та передаються
клієнтським компонентам через гідратацію кешу TanStack Query.

## Можливості

- перегляд списку нотаток із пагінацією;
- пошук із затримкою запиту 500 мс;
- фільтрація за тегами `Work`, `Personal`, `Meeting`, `Shopping` і `Todo`;
- перегляд усіх нотаток через фільтр `All notes` без передачі тега в API;
- клієнтське перемикання фільтрів без повного перезавантаження сторінки;
- створення нотаток на окремому маршруті `/notes/action/create` з валідацією
  форми через Yup;
- збереження чернетки нотатки в локальному сховищі (`localStorage`) за допомогою
  Zustand (`persist` middleware) з автоматичним відновленням при
  перезавантаженні сторінки та очищенням після успішного збереження;
- видалення нотаток;
- перегляд деталей нотатки на окремій сторінці або в intercepting-модальному
  маршруті при переході зі списку;
- динамічні та статичні метадані (Next.js Metadata API, Open Graph, Twitter
  Cards) для сторінок застосунку, включаючи сторінку 404 (`not-found.tsx`) та
  динамічне визначення базового URL;
- серверне попереднє завантаження даних і гідратація кешу TanStack Query;
- кешування та автоматична інвалідація кешу після мутацій;
- індикатор завантаження, повідомлення про успішні операції та помилки (React
  Hot Toast);
- окремі сторінки обробки помилок для маршрутів нотаток.

## Технології

- Next.js 16 (App Router) і React 19;
- паралельні, динамічні, catch-all та intercepting маршрути Next.js;
- TypeScript;
- Zustand (з middleware `persist` для збереження стану чернетки в
  `localStorage`);
- Yup (схема валідації полів форми);
- TanStack Query;
- Axios;
- CSS Modules;
- React Hot Toast, React Paginate, React Loader Spinner та use-debounce;
- React Compiler;
- ESLint і Prettier.

## Вимоги

- Node.js `20.9+`;
- npm;
- URL NoteHub API та токен доступу.

## Встановлення і запуск

1. Клонуйте репозиторій і перейдіть до каталогу проєкту:

   ```bash
   git clone https://github.com/StepanxXx/08-zustand.git
   cd 08-zustand
   ```

2. Встановіть залежності:

   ```bash
   npm install
   ```

3. Створіть у корені проєкту файл `.env`:

   ```env
   NEXT_PUBLIC_NOTEHUB_URL=https://your-notehub-api.example.com
   NEXT_PUBLIC_NOTEHUB_TOKEN=your_access_token
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   `NEXT_PUBLIC_NOTEHUB_URL` — базова адреса API, а `NEXT_PUBLIC_NOTEHUB_TOKEN`
   — токен, який надсилається в заголовку `Authorization: Bearer <token>`. Файли
   `.env*` виключені з Git.

4. Запустіть сервер розробки:

   ```bash
   npm run dev
   ```

5. Відкрийте [http://localhost:3000](http://localhost:3000).

## Маршрути

| Маршрут                | Опис                                        |
| ---------------------- | ------------------------------------------- |
| `/`                    | Головна сторінка                            |
| `/notes`               | Список усіх нотаток                         |
| `/notes/filter/all`    | Усі нотатки та меню фільтрів                |
| `/notes/filter/{tag}`  | Нотатки з вибраним тегом                    |
| `/notes/[id]`          | Окрема сторінка деталей нотатки             |
| `@modal/(.)notes/[id]` | Деталі в модальному вікні зі списку нотаток |
| `/notes/action/create` | Сторінка створення нової нотатки            |

Фільтрація реалізована catch-all маршрутом
`app/notes/filter/[...slug]/page.tsx`. Меню тегів знаходиться у паралельному
слоті `app/notes/filter/@sidebar`, тому переходи через `next/link` оновлюють
область зі списком нотаток без повного перезавантаження сторінки. Значення `all`
використовується лише в URL: у запиті до бекенда параметр `tag` для нього не
передається.

## Доступні команди

| Команда                | Призначення                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Запуск локального сервера розробки      |
| `npm run build`        | Створення production-збірки             |
| `npm run start`        | Запуск зібраного застосунку             |
| `npm run lint`         | Перевірка коду ESLint                   |
| `npm run format`       | Форматування файлів через Prettier      |
| `npm run format:check` | Перевірка форматування без зміни файлів |

## Структура проєкту

```text
app/
├── @modal/                  # паралельний слот та intercepting-маршрут деталей
├── layout.tsx               # кореневий лейаут із глобальними метаданими
├── not-found.tsx            # сторінка 404 з метаданими
├── page.tsx                 # головна сторінка
└── notes/
    ├── [id]/                # динамічна сторінка нотатки
    ├── action/
    │   └── create/          # сторінка створення нотатки
    └── filter/
        ├── @sidebar/        # паралельний слот із меню тегів
        └── [...slug]/       # catch-all маршрут фільтрації
components/                  # UI-компоненти та CSS Modules
hooks/                       # запити й мутації TanStack Query
lib/                         # HTTP-функції API, утиліти та Zustand-стори
│   ├── api.ts               # клієнт Axios та методи API
│   ├── getBaseUrl.ts        # визначення базового URL застосунку
│   └── store/
│       └── noteStore.ts     # Zustand-стор чернетки нотатки з persist
providers/                   # глобальні React-провайдери (TanStack Query, Toasts)
public/                      # статичні ресурси
types/                       # TypeScript-типи нотаток і тегів
```

Опис контракту API збережений у файлі [`swagger.json`](./swagger.json).

## Перевірка перед публікацією

```bash
npm run lint
npm run format:check
npm run build
```
