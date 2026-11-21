"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/data/gallery";

const frames = [
  "min-[760px]:col-span-7 min-[760px]:row-span-2 aspect-[4/5] min-[760px]:aspect-auto min-[760px]:min-h-[36rem]",
  "min-[760px]:col-span-5 aspect-[5/4]",
  "min-[760px]:col-span-5 aspect-[5/4]",
];

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeX = useRef<number | null>(null);
  const active = index === null ? null : items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
    if (!active && dialog.open) dialog.close();
  }, [active]);

  function close() {
    setIndex(null);
  }

  function step(direction: -1 | 1) {
    setIndex((current) => {
      if (current === null) return current;
      return (current + direction + items.length) % items.length;
    });
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 min-[760px]:grid-cols-12">
        {items.map((item, itemIndex) => (
          <li key={item.src} className={frames[itemIndex] ?? "min-[760px]:col-span-4"}>
            <button
              type="button"
              className="group relative block h-full w-full text-left"
              aria-label={item.alt}
              onClick={() => setIndex(itemIndex)}
            >
              <div className="relative h-full min-h-64 overflow-hidden bg-cream-deep">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes={itemIndex === 0 ? "(max-width: 760px) 100vw, 58vw" : "(max-width: 760px) 100vw, 42vw"}
                />
                <span className="absolute bottom-2 left-2 bg-burgundy-deep/70 px-2 py-1 text-[0.68rem] text-cream" aria-hidden="true">
                  {item.caption}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        className="gallery-dialog"
        aria-labelledby="gallery-dialog-title"
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "Escape") close();
        }}
      >
        {active ? (
          <div className="bg-paper p-3 text-foreground sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <p id="gallery-dialog-title" className="font-serif text-2xl">
                {active.caption}
              </p>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-line"
                onClick={close}
              >
                <X aria-hidden="true" size={18} />
                <span className="sr-only">Закрити перегляд</span>
              </button>
            </div>
            <div
              className="relative mt-3 h-[min(82svh,52rem)] touch-none bg-cream-deep"
              onPointerDown={(event) => {
                if (event.pointerType === "mouse" && event.button !== 0) return;
                swipeX.current = event.clientX;
              }}
              onPointerUp={(event) => {
                if (swipeX.current === null) return;
                const delta = event.clientX - swipeX.current;
                swipeX.current = null;
                if (delta > 48) step(-1);
                if (delta < -48) step(1);
              }}
              onPointerCancel={() => {
                swipeX.current = null;
              }}
            >
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                className="gallery-fade object-cover"
                sizes="96vw"
              />
              <button
                type="button"
                className="absolute top-1/2 left-3 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-cream/90 text-burgundy"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => step(-1)}
              >
                <ChevronLeft aria-hidden="true" size={22} />
                <span className="sr-only">Попереднє фото</span>
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-3 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-cream/90 text-burgundy"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => step(1)}
              >
                <ChevronRight aria-hidden="true" size={22} />
                <span className="sr-only">Наступне фото</span>
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
