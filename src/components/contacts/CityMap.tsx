"use client";

import { useState } from "react";
import { cityMap } from "@/content/catalog";

export function CityMap() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 max-w-full">
      <p className="max-w-full text-sm leading-6 text-muted">{cityMap.notice}</p>
      {open ? (
        <div className="mt-4 max-w-full overflow-hidden border border-line">
          <iframe
            title={`Карта міста ${cityMap.label}`}
            src={cityMap.embedUrl}
            className="block h-72 w-full max-w-full sm:h-[26rem]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <button
          type="button"
          className="mt-4 inline-flex min-h-12 items-center justify-center bg-burgundy px-6 text-[0.72rem] tracking-[0.16em] text-cream uppercase hover:bg-burgundy-deep"
          onClick={() => setOpen(true)}
        >
          Показати карту
        </button>
      )}
    </div>
  );
}
