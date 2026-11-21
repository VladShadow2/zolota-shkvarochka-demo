"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState, useSyncExternalStore } from "react";
import { orderModes, reservationRules, type OrderModeId } from "@/content/catalog";
import { site } from "@/config/site";
import { categories, dishes } from "@/data/menu";
import { isUkrainianPhone, isValidName } from "@/lib/phone";
import { isPastDate, isValidGuestCount, todayISO } from "@/lib/reservation";

type Fields = {
  name: string;
  date: string;
  time: string;
  phone: string;
  guests: string;
  mode: "" | OrderModeId;
};

type ErrorKey = keyof Fields | "order";

const empty: Fields = {
  name: "",
  date: "",
  time: "",
  phone: "",
  guests: "2",
  mode: "",
};

function subscribeToNothing() {
  return () => {};
}

function readToday() {
  return todayISO();
}

function readEmpty() {
  return "";
}

export function ReservationForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [portions, setPortions] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [done, setDone] = useState(false);
  const minDate = useSyncExternalStore(subscribeToNothing, readToday, readEmpty);
  const formId = useId();

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    if (key === "mode" && value !== "preorder") setPortions({});
    setDone(false);
    setErrors((current) => ({ ...current, [key]: undefined, order: undefined }));
  }

  function stepGuests(delta: -1 | 1) {
    const parsed = Number(fields.guests);
    const current = Number.isInteger(parsed) ? parsed : delta > 0 ? reservationRules.minGuests - 1 : reservationRules.minGuests + 1;
    const next = Math.min(reservationRules.maxGuests, Math.max(reservationRules.minGuests, current + delta));
    update("guests", String(next));
  }

  function changePortion(id: string, delta: number) {
    setPortions((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] ?? 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
    setDone(false);
    setErrors((current) => ({ ...current, order: undefined }));
  }

  function validate(values: Fields, today: string, selected: Record<string, number>) {
    const next: Partial<Record<ErrorKey, string>> = {};
    if (!isValidName(values.name)) {
      next.name = "Укажіть ім’я — щонайменше дві літери.";
    }
    if (!values.date) {
      next.date = "Оберіть дату.";
    } else if (isPastDate(values.date, today)) {
      next.date = "Минула дата недоступна.";
    }
    if (!values.time) {
      next.time = "Оберіть час.";
    }
    if (!values.phone.trim()) {
      next.phone = "Укажіть тестовий номер.";
    } else if (!isUkrainianPhone(values.phone)) {
      next.phone = "Формат тестового номера: +380 і 9 цифр або 0 і 9 цифр.";
    }
    if (!isValidGuestCount(values.guests, reservationRules.minGuests, reservationRules.maxGuests)) {
      next.guests = `Укажіть кількість гостей від ${reservationRules.minGuests} до ${reservationRules.maxGuests}.`;
    }
    if (!values.mode) {
      next.mode = "Оберіть одну з відповідей.";
    }
    if (values.mode === "preorder" && Object.values(selected).every((count) => count < 1)) {
      next.order = "Оберіть хоча б одну демонстраційну позицію.";
    }
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields, todayISO(), portions);
    setErrors(nextErrors);
    const first = (["name", "date", "time", "phone", "guests", "mode", "order"] as const).find(
      (key) => nextErrors[key],
    );
    if (first) {
      setDone(false);
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }
    setFields(empty);
    setPortions({});
    setErrors({});
    setDone(true);
  }

  const selected = dishes.filter((dish) => (portions[dish.id] ?? 0) > 0);

  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className="grid gap-8">
      <p
        role="status"
        aria-live="polite"
        className={done ? "border border-burgundy/30 bg-paper px-4 py-4 text-base leading-7" : "sr-only"}
      >
        {done ? site.demoComplete : ""}
      </p>
      <Field id={`${formId}-name`} label="Ім’я клієнта" error={errors.name}>
        <input
          id={`${formId}-name`}
          type="text"
          autoComplete="off"
          value={fields.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className="min-h-12 w-full border-b border-line bg-transparent text-base outline-none"
        />
      </Field>
      <Field id={`${formId}-date`} label="Дата" error={errors.date}>
        <input
          id={`${formId}-date`}
          type="date"
          min={minDate || undefined}
          value={fields.date}
          onChange={(event) => update("date", event.target.value)}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? `${formId}-date-error` : undefined}
          className="min-h-12 w-full border-b border-line bg-transparent text-base outline-none"
        />
      </Field>
      <Field id={`${formId}-time`} label="Час" error={errors.time}>
        <input
          id={`${formId}-time`}
          type="time"
          value={fields.time}
          onChange={(event) => update("time", event.target.value)}
          aria-invalid={Boolean(errors.time)}
          aria-describedby={errors.time ? `${formId}-time-error` : undefined}
          className="min-h-12 w-full border-b border-line bg-transparent text-base outline-none"
        />
      </Field>
      <Field
        id={`${formId}-phone`}
        label="Телефон"
        hint="Укажіть тестовий номер. Його не надіслано і не збережено."
        error={errors.phone}
      >
        <input
          id={`${formId}-phone`}
          type="tel"
          inputMode="tel"
          autoComplete="off"
          placeholder="+380"
          value={fields.phone}
          onChange={(event) => update("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${formId}-phone-error` : `${formId}-phone-hint`}
          className="min-h-12 w-full border-b border-line bg-transparent text-base outline-none placeholder:text-muted/60"
        />
      </Field>
      <Field
        id={`${formId}-guests`}
        label="Кількість гостей"
        error={errors.guests}
      >
        <div className="flex items-center gap-3 border-b border-line">
          <button
            type="button"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center text-burgundy"
            onClick={() => stepGuests(-1)}
            aria-label="Менше гостей"
          >
            <Minus aria-hidden="true" size={16} />
          </button>
          <input
            id={`${formId}-guests`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            value={fields.guests}
            onChange={(event) => update("guests", event.target.value)}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? `${formId}-guests-error` : undefined}
            className="min-h-12 w-full bg-transparent text-center text-base outline-none"
          />
          <button
            type="button"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center text-burgundy"
            onClick={() => stepGuests(1)}
            aria-label="Більше гостей"
          >
            <Plus aria-hidden="true" size={16} />
          </button>
        </div>
      </Field>
      <fieldset
        id={`${formId}-mode`}
        tabIndex={-1}
        aria-describedby={errors.mode ? `${formId}-mode-error` : undefined}
      >
        <legend className="text-base leading-7 text-foreground">
          Бажаєте замовити страви до свого приходу?
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {orderModes.map((mode) => {
            const selectedMode = fields.mode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                aria-pressed={selectedMode}
                onClick={() => update("mode", mode.id)}
                className={
                  selectedMode
                    ? "min-h-12 border border-burgundy bg-burgundy px-4 text-left text-sm text-cream"
                    : "min-h-12 border border-line px-4 text-left text-sm text-foreground"
                }
              >
                {mode.label}
              </button>
            );
          })}
        </div>
        {errors.mode ? (
          <p id={`${formId}-mode-error`} className="mt-2 text-sm text-burgundy">
            {errors.mode}
          </p>
        ) : null}
      </fieldset>
      {fields.mode === "preorder" ? (
        <div className="menu-reveal">
          <p id={`${formId}-order`} tabIndex={-1} className="text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">
            Демонстраційне меню
          </p>
          <p className="mt-2 text-sm text-muted">Ціни не вказані. Кожна позиція демонстраційна і не є пропозицією закладу.</p>
          <div className="mt-6 space-y-8">
            {categories.map((category) => (
              <section key={category.id}>
                <h3 className="font-serif text-3xl">{category.label}</h3>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {dishes
                    .filter((dish) => dish.category === category.id)
                    .map((dish) => {
                      const count = portions[dish.id] ?? 0;
                      return (
                        <li key={dish.id} className="grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                          <div>
                            <p className="text-lg">{dish.name}</p>
                            <p className="mt-1 text-sm leading-6 text-muted">{dish.description}</p>
                            <p className="mt-1 text-sm text-burgundy">Демонстраційна позиція</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              className="inline-flex h-11 w-11 items-center justify-center border border-line"
                              onClick={() => changePortion(dish.id, -1)}
                              aria-label={`Менше порцій: ${dish.name}`}
                            >
                              <Minus aria-hidden="true" size={16} />
                            </button>
                            <p className="min-w-6 text-center text-lg" aria-live="polite">
                              {count}
                            </p>
                            <button
                              type="button"
                              className="inline-flex h-11 w-11 items-center justify-center border border-line"
                              onClick={() => changePortion(dish.id, 1)}
                              aria-label={`Більше порцій: ${dish.name}`}
                            >
                              <Plus aria-hidden="true" size={16} />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </section>
            ))}
          </div>
          <div className="mt-6 border border-burgundy/25 bg-paper px-4 py-4">
            <p className="text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">Підсумок</p>
            {selected.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Позицій ще не вибрано.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {selected.map((dish) => (
                  <li key={dish.id} className="flex justify-between gap-4 text-sm">
                    <span>{dish.name}</span>
                    <span>
                      {portions[dish.id]} порц. · демонстраційна
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.order ? (
            <p id={`${formId}-order-error`} className="mt-2 text-sm text-burgundy">
              {errors.order}
            </p>
          ) : null}
        </div>
      ) : null}
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center bg-burgundy px-6 text-[0.72rem] tracking-[0.16em] text-cream uppercase hover:bg-burgundy-deep"
      >
        Забронювати столик
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-burgundy">
          {error}
        </p>
      ) : null}
    </div>
  );
}
