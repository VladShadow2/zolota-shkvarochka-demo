export const categories = [
  { id: "appetizers", label: "Закуски" },
  { id: "mains", label: "Основні страви" },
  { id: "desserts", label: "Десерти" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Dish = {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  demo: true;
  price: null;
};

export const exampleLabel = "Умовний приклад";

export const dishes: Dish[] = [
  {
    id: "crackling-bites",
    name: "Хрустка шкварка з часником",
    description: "Золотисті смужки шкірки, часник і прохолодний йогурт.",
    category: "appetizers",
    demo: true,
    price: null,
  },
  {
    id: "warm-bread",
    name: "Теплий хліб із салом",
    description: "Скибка з печі, сіль і зелена цибуля.",
    category: "appetizers",
    demo: true,
    price: null,
  },
  {
    id: "pickles",
    name: "Соління з глека",
    description: "Огірок, помідор і хрін — як на домашньому столі.",
    category: "appetizers",
    demo: true,
    price: null,
  },
  {
    id: "ribs",
    name: "Ребра з медовою скоринкою",
    description: "Довго томлені ребра, мед і чорний перець.",
    category: "mains",
    demo: true,
    price: null,
  },
  {
    id: "potato",
    name: "Печена картопля зі шкваркою",
    description: "Картопля з жару і хрустка шкірка зверху.",
    category: "mains",
    demo: true,
    price: null,
  },
  {
    id: "deruny",
    name: "Деруни зі сметаною",
    description: "Терта картопля, сковорідка і густа сметана.",
    category: "mains",
    demo: true,
    price: null,
  },
  {
    id: "honey-cake",
    name: "Медівник",
    description: "Тонкі коржі, мед і сметанний крем.",
    category: "desserts",
    demo: true,
    price: null,
  },
  {
    id: "syrnyky",
    name: "Сирники з вишнею",
    description: "Сир, ваніль і тепла вишня.",
    category: "desserts",
    demo: true,
    price: null,
  },
  {
    id: "baked-apple",
    name: "Печене яблуко",
    description: "Яблуко, волоський горіх і ложка меду.",
    category: "desserts",
    demo: true,
    price: null,
  },
];
