import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ReservationForm } from "@/components/reservation/ReservationForm";
import { site } from "@/config/site";
import { gallery } from "@/data/gallery";

const photo = gallery[1];

export const metadata: Metadata = {
  title: "Бронювання",
  description: "Демонстраційна форма «Золота шкварочка». Заявку не надіслано, номер не зберігається.",
};

export default function ReservationPage() {
  return (
    <>
      <PageHero
        eyebrow="Бронювання"
        title="Лише спроба форми"
        text={site.reservationNote}
        image={photo.src}
        alt={photo.alt}
      />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="border border-burgundy/25 bg-paper px-5 py-6 sm:px-6">
            <p className="text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">{site.demoLabel}</p>
            <p className="mt-3 text-base leading-7">{site.reservationNote}</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Місто</dt>
                <dd>{site.venue.city}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Графік</dt>
                <dd>{site.venue.hours}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Телефон</dt>
                <dd>{site.venue.phone}</dd>
              </div>
            </dl>
          </aside>
          <ReservationForm />
        </Container>
      </section>
    </>
  );
}
