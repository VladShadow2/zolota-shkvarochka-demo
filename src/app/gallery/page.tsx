import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { gallery } from "@/data/gallery";

const photo = gallery[2];

export const metadata: Metadata = {
  title: "Галерея",
  description: "Затишні зустрічі, теплі розмови та особливі моменти за одним столом.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Галерея"
        title="Атмосфера, яку хочеться відчути"
        text="Затишні зустрічі, теплі розмови та особливі моменти за одним столом."
        image={photo.src}
        alt={photo.alt}
      />
      <section className="py-14 sm:py-20">
        <Container>
          <GalleryGrid items={gallery} />
        </Container>
      </section>
    </>
  );
}
