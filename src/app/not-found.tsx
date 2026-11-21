import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="py-28">
      <p className="text-[0.72rem] tracking-[0.18em] text-burgundy uppercase">404</p>
      <h1 className="mt-3 font-serif text-5xl">Такої сторінки немає</h1>
      <p className="mt-4 max-w-md text-muted">Поверніться на головну або відкрийте меню.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">На головну</Button>
        <Button href="/menu" variant="line">
          Меню
        </Button>
      </div>
    </Container>
  );
}
