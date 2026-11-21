import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "@/components/layout/Container";

const facts = [
  { label: "Місто", value: site.venue.city },
  { label: "Адреса", value: site.venue.address },
  { label: "Телефон", value: site.venue.phone },
  { label: "Графік", value: site.venue.hours },
  { label: "Instagram", value: site.venue.instagram },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream-deep">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.3fr_0.7fr_1fr]">
        <div>
          <p className="font-serif text-3xl text-burgundy">{site.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{site.description}</p>
        </div>
        <nav aria-label="Навігація у підвалі">
          <p className="text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">Сторінки</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className="text-sm text-muted hover:text-foreground">
                Головна
              </Link>
            </li>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reservation" className="text-sm text-muted hover:text-foreground">
                Бронювання
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">Заклад</p>
          <ul className="mt-4 space-y-2">
            {facts.map((item) => (
              <li key={item.label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                <span className="text-muted">{item.label}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
