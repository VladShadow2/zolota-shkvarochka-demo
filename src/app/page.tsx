import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { ReservationCta } from "@/components/home/ReservationCta";
import { Container } from "@/components/layout/Container";
import { site } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="py-16 sm:py-24">
        <Container className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="font-serif text-4xl leading-tight text-burgundy sm:text-5xl">
            Шкварка, мед і довгий стіл.
          </p>
          <p className="max-w-xl text-base leading-8 text-muted">
            «{site.name}» зібрана як локальний приклад сайту для міста {site.venue.city}. Адреса, телефон,
            графік і Instagram позначені як «{site.venue.address}», доки заклад їх не підтвердить.
            Можна пройтися сторінками, подивитися умовне меню і перевірити форму. Жодна заявка звідси не вирушає.
          </p>
        </Container>
      </section>
      <GalleryPreview />
      <ReservationCta />
    </>
  );
}
