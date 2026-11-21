import Image from "next/image";
import Link from "next/link";
import { gallery } from "@/data/gallery";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const frames = [
  "min-[760px]:col-span-7 min-[760px]:row-span-2 min-h-72 min-[760px]:min-h-[34rem]",
  "min-[760px]:col-span-5 min-h-56",
  "min-[760px]:col-span-5 min-h-56",
];

export function GalleryPreview() {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Галерея"
            title="Атмосфера зали"
            text="Це ілюстративні фото, не знімки закладу. Позначка є на кожному кадрі."
          />
          <Link
            href="/gallery"
            className="inline-flex min-h-11 items-center text-[0.72rem] tracking-[0.16em] text-burgundy uppercase"
          >
            Уся галерея
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 min-[760px]:grid-cols-12">
          {gallery.map((item, index) => (
            <li key={item.src} className={frames[index]}>
              <Link href="/gallery" aria-label={`${item.caption}. ${item.alt}`} className="group flex h-full flex-col">
                <div className="relative min-h-0 flex-1 overflow-hidden bg-cream-deep">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes={index === 0 ? "(max-width: 760px) 100vw, 58vw" : "(max-width: 760px) 100vw, 42vw"}
                  />
                  <span className="absolute bottom-2 left-2 bg-burgundy-deep/70 px-2 py-1 text-[0.68rem] text-cream">
                    {item.caption}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
