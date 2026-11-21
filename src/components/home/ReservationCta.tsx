import { site } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function ReservationCta() {
  return (
    <section className="bg-burgundy py-16 text-cream sm:py-24">
      <Container className="grid items-end gap-8 lg:grid-cols-[1.4fr_auto]">
        <div>
          <p className="text-[0.72rem] tracking-[0.18em] text-gold-soft uppercase">Демонстрація</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">
            Спробуйте форму, стіл лишиться вільним
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-cream/85">{site.reservationNote}</p>
        </div>
        <Button href="/reservation" className="w-full bg-gold text-ink hover:bg-gold-soft sm:w-auto">
          Забронювати столик
        </Button>
      </Container>
    </section>
  );
}
