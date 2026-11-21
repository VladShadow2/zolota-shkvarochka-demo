import type { Metadata } from "next";
import { CityMap } from "@/components/contacts/CityMap";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/config/site";
import { gallery } from "@/data/gallery";

const photo = gallery[0];

const rows = [
  { label: "Місто", value: site.venue.city },
  { label: "Адреса", value: site.venue.address },
  { label: "Телефон", value: site.venue.phone },
  { label: "Графік", value: site.venue.hours },
  { label: "Instagram", value: site.venue.instagram },
];

export const metadata: Metadata = {
  title: "Контакти",
  description: "Чернівці. Адреса, телефон, графік і Instagram «Золотої шкварочки» ще уточнюються.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакти"
        title={site.venue.city}
        text="Місто вже відоме. Решту контактів заклад ще не підтвердив, тож їх не вигадано."
        image={photo.src}
        alt={photo.alt}
      />
      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <ul className="divide-y divide-line border-y border-line">
            {rows.map((item) => (
              <li key={item.label} className="grid gap-1 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
                <p className="text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">{item.label}</p>
                <p className="font-serif text-2xl break-words sm:text-right sm:text-3xl">{item.value}</p>
              </li>
            ))}
          </ul>
          <CityMap />
        </Container>
      </section>
    </>
  );
}
