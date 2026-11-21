import Image from "next/image";
import { Container } from "@/components/layout/Container";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="absolute inset-0">
        <Image src={image} alt={alt} fill priority loading="eager" className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-burgundy-deep/72" />
      </div>
      <Container className="relative py-20 text-cream sm:py-28">
        <p className="text-[0.72rem] tracking-[0.2em] text-gold-soft uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-cream/90">{text}</p>
      </Container>
    </section>
  );
}
