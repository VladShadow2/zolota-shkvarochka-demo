import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { site } from "@/config/site";
import { gallery } from "@/data/gallery";

export function Hero() {
  const photo = gallery[0];

  return (
    <section className="relative isolate -mt-16 flex h-svh min-h-svh items-end overflow-hidden sm:-mt-[4.5rem]">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        loading="eager"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/45 to-burgundy-deep/25" />
      <div className="relative mx-auto w-full max-w-[1120px] px-4 pt-28 pb-14 text-cream sm:px-6 sm:pb-16 lg:px-8">
        <FadeIn>
          <p className="inline-flex min-h-9 items-center border border-gold-soft bg-cream px-3 text-[0.72rem] tracking-[0.16em] text-burgundy uppercase">
            {site.demoLabel}
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
            {site.name}
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-cream/95">
            Вечірня зала в Чернівцях: довгий стіл і тепле світло. Ця форма стіл не бронює.
          </p>
          <div className="mt-8">
            <Button href="/reservation" className="w-full bg-gold text-ink hover:bg-gold-soft sm:w-auto">
              Забронювати столик
            </Button>
          </div>
        </FadeIn>
      </div>
      <p className="absolute bottom-4 left-4 bg-burgundy-deep/70 px-2.5 py-1 text-[0.7rem] text-cream sm:bottom-6 sm:left-6">
        {photo.caption}
      </p>
    </section>
  );
}
