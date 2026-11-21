"use client";

import { useMemo, useState } from "react";
import { categories, dishes, exampleLabel, type CategoryId } from "@/data/menu";
import { cn } from "@/lib/cn";

export function MenuBrowser() {
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const visible = useMemo(
    () => dishes.filter((dish) => category === "all" || dish.category === category),
    [category],
  );

  return (
    <div>
      <p className="text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">
        Приклад меню · демонстраційні позиції
      </p>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Категорії меню">
        <button
          type="button"
          onClick={() => setCategory("all")}
          aria-pressed={category === "all"}
          className={cn(
            "min-h-11 px-4 text-[0.72rem] tracking-[0.14em] uppercase",
            category === "all" ? "bg-burgundy text-cream" : "border border-line text-muted hover:text-foreground",
          )}
        >
          Усі
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCategory(item.id)}
            aria-pressed={category === item.id}
            className={cn(
              "min-h-11 px-4 text-[0.72rem] tracking-[0.14em] uppercase",
              category === item.id
                ? "bg-burgundy text-cream"
                : "border border-line text-muted hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {visible.map((dish) => (
          <li key={dish.id} className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
            <div>
              <h2 className="font-serif text-3xl leading-tight">{dish.name}</h2>
              <p className="mt-2 max-w-xl text-base leading-7 text-muted">{dish.description}</p>
            </div>
            <p className="text-sm text-burgundy">{exampleLabel}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
