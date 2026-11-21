import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { gallery } from "@/data/gallery";

const photo = gallery[1];

export const metadata: Metadata = {
  title: "Меню",
  description:
    "Приклад меню «Золота шкварочка»: закуски, основні страви й десерти без цін. Позиції умовні.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Меню"
        title="Приклад меню"
        text="Ціни навмисно не вказані. Кожен рядок — умовний приклад, а не картка закладу."
        image={photo.src}
        alt={photo.alt}
      />
      <section className="py-14 sm:py-20">
        <Container>
          <MenuBrowser />
        </Container>
      </section>
    </>
  );
}
