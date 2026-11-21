export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[0.72rem] tracking-[0.18em] text-burgundy uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-muted">{text}</p> : null}
    </div>
  );
}
