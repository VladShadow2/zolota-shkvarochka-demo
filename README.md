# Золота шкварочка

Локальне демонстраційне демо сайту. Заклад у Чернівцях, але адреса, телефон, графік і Instagram ще не підтверджені: на сайті для них стоїть «Уточнюються». Ці факти зібрані в `src/config/site.ts`.

Меню — умовні приклади без цін. Форма бронювання працює лише в браузері: вона нічого не надсилає, не пише номер у сховище і не звертається до API.

## Сторінки

- `/` — головна
- `/menu` — приклад меню
- `/gallery` — ілюстративні фото
- `/contacts` — місто і контакти, що уточнюються
- `/reservation` — демонстраційна форма

## Запуск

```bash
npm install
npm run dev
```

Сайт відкриється на [http://localhost:3000](http://localhost:3000).

## Фотографії

Дозволу на кадри закладу немає. У `public/images/` лежать три ілюстративні знімки Pexels. На сторінці кожен підписаний «Ілюстративне фото».

- Зала: [interior-of-restaurant-14590691](https://www.pexels.com/photo/interior-of-restaurant-14590691/) — `public/images/interior.jpg`
- Сервірування: [elegant-restaurant-table-setting-with-warm-lighting-32738698](https://www.pexels.com/photo/elegant-restaurant-table-setting-with-warm-lighting-32738698/) — `public/images/table-setting.jpg`
- Столи: [tables-in-restaurant-14965698](https://www.pexels.com/photo/tables-in-restaurant-14965698/) — `public/images/tables.jpg`

## Стек

Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React. Секрети для запуску не потрібні.
