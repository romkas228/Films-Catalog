# Films-Catalog — Запуск локально


## Структура (коротко)
- `src/` — фронтенд (Vue)
- `server/` — локальний мок-сервер (Express) для auth (реєстрація / логін / me)


Приклад файлу для розгортання/передачі:
- Створіть `.env` на вашій машині або у CI з:
  - `VITE_TMDB_KEY=your_tmdb_key_here`

---

## Підготовка (швидко)

1. В корені проєкту:
```bash
npm install
```


2.  Мок-сервер для авторизації

```bash
cd server
npm install
```

3. Запустіть мок-сервер:
```bash
# з кореня проєкту
node server/index.js
```

Демо-юзер (якщо є `server/users.json` початково):
- email: `demo@demo.com`
- password: `password123`

---

## Запуск фронтенду (dev)
```bash
# в корені проєкту
npm run dev
```
---
