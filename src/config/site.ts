export const site = {
  name: "Золота шкварочка",
  fullName: "Золота шкварочка",
  url: "https://zolota-shkvarochka-demo.pages.dev",
  description:
    "Демонстраційний сайт «Золота шкварочка» в Чернівцях. Меню, фото і форма бронювання не є пропозицією закладу і нічого не надсилають.",
  demoLabel: "Демонстраційний сайт",
  reservationNote:
    "Це лише приклад форми. Заявку не надіслано, стіл не бронюється і номер не зберігається.",
  demoComplete: "Демо завершено. Заявку не надіслано",
  nav: [
    { href: "/menu", label: "Меню" },
    { href: "/gallery", label: "Галерея" },
    { href: "/contacts", label: "Контакти" },
  ],
  venue: {
    city: "Чернівці",
    address: "Уточнюються",
    phone: "Уточнюються",
    hours: "Уточнюються",
    instagram: "Уточнюються",
  },
} as const;
