import Link from "next/link";
import { cn } from "@/lib/cn";

const styles = {
  solid: "bg-burgundy text-cream hover:bg-burgundy-deep",
  line: "border border-burgundy/50 text-burgundy hover:bg-burgundy hover:text-cream",
};

export function Button({
  href,
  variant = "solid",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-6 text-center text-[0.72rem] tracking-[0.16em] uppercase transition-colors",
        styles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
