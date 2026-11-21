"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const overPhoto = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  function closeMenu(focusToggle = false) {
    restoreFocus.current = focusToggle;
    setOpenPath(null);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const inertTargets = [
      document.querySelector("header"),
      document.getElementById("main"),
      document.querySelector("footer"),
    ];
    inertTargets.forEach((node) => node?.setAttribute("inert", ""));
    const toggleButton = toggleRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocus.current = true;
        setOpenPath(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      inertTargets.forEach((node) => node?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      if (restoreFocus.current) {
        restoreFocus.current = false;
        toggleButton?.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpenPath(null);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        overPhoto ? "border-transparent bg-transparent" : "border-line bg-cream/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            "font-serif text-xl leading-none sm:text-2xl",
            overPhoto ? "text-cream" : "text-burgundy",
          )}
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основна навігація">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[0.72rem] tracking-[0.16em] uppercase transition-colors",
                  overPhoto
                    ? active
                      ? "text-gold-soft"
                      : "text-cream/85 hover:text-cream"
                    : active
                      ? "text-burgundy"
                      : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/reservation"
            className="hidden min-h-11 items-center bg-burgundy px-5 text-[0.72rem] tracking-[0.16em] text-cream uppercase transition-colors hover:bg-burgundy-deep lg:inline-flex"
          >
            Бронювання
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center border lg:hidden",
              overPhoto ? "border-cream/50 text-cream" : "border-line text-foreground",
            )}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => (open ? closeMenu(true) : setOpenPath(pathname))}
          >
            {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            <span className="sr-only">{open ? "Закрити меню" : "Відкрити меню"}</span>
          </button>
        </div>
      </div>
      {open
        ? createPortal(
            <nav
              id={menuId}
              className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cream px-6 pt-6 lg:hidden"
              aria-label="Мобільна навігація"
            >
              <div className="flex items-center justify-between">
                <p className="font-serif text-2xl text-burgundy">{site.name}</p>
                <button
                  ref={closeRef}
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center border border-line"
                  onClick={() => closeMenu(true)}
                >
                  <X aria-hidden="true" size={20} />
                  <span className="sr-only">Закрити меню</span>
                </button>
              </div>
              <ul className="mt-12 flex flex-col gap-5">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-4xl text-foreground"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/reservation"
                className="mt-10 inline-flex min-h-12 items-center justify-center bg-burgundy px-6 text-[0.72rem] tracking-[0.16em] text-cream uppercase"
              >
                Забронювати столик
              </Link>
            </nav>,
            document.body,
          )
        : null}
    </header>
  );
}
