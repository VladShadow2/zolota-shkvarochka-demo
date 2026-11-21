import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Oranienbaum } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/config/site";
import "./globals.css";

const serif = Oranienbaum({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-oranienbaum",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.fullName,
    template: `%s · ${site.fullName}`,
  },
  description: site.description,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: site.fullName,
    url: "./",
    images: [
      {
        url: "/images/interior.jpg",
        width: 1800,
        height: 1200,
        alt: "Ілюстративне фото зали. Це не знімок закладу.",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="uk"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="absolute top-4 left-4 z-50 -translate-y-24 bg-burgundy px-4 py-2 text-sm text-cream focus:translate-y-0"
        >
          Перейти до вмісту
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
