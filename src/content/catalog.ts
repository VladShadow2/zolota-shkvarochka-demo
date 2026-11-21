import { gallery } from "@/data/gallery";
import { categories, dishes } from "@/data/menu";
import { site } from "@/config/site";

export { gallery, categories, dishes, site };

export const reservationRules = {
  minGuests: 1,
  maxGuests: 12,
} as const;

export const orderModes = [
  { id: "onsite", label: "Ні, замовлю в ресторані" },
  { id: "preorder", label: "Так, хочу вибрати страви" },
] as const;

export type OrderModeId = (typeof orderModes)[number]["id"];

export type Promotion = {
  id: string;
  title: string;
  note: string;
};

export const promotions: Promotion[] = [];

export const cityMap = {
  label: "Чернівці",
  embedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=25.85%2C48.25%2C26.02%2C48.33&layer=mapnik",
  notice:
    "Карта відкривається з OpenStreetMap — це зовнішній картографічний сервіс. Маркер закладу не поставлено: адресу ще не підтверджено.",
} as const;
