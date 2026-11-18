import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

// Self-hosted, SIL Open Font License, so the build needs no network.
const newsreader = localFont({
  src: [
    { path: "../fonts/newsreader-latin-opsz-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/newsreader-latin-opsz-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-newsreader",
});

const albert = localFont({
  src: "../fonts/albert-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-albert",
});

export const metadata: Metadata = {
  title: {
    default: "ATHAR THOBES | Thobes, shirts and hats for men",
    template: "%s | ATHAR THOBES",
  },
  description:
    "Men's thobes, shirts and hats, designed in Minnesota. Free shipping in the United States.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${albert.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
