import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, JetBrains_Mono, Nunito_Sans } from "next/font/google";
import { site } from "@/data/site";
import { buildJsonLd } from "@/lib/seo";
import { CartProvider } from "@/hooks/use-cart";
import { LocaleProvider } from "@/hooks/use-locale";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CartDrawer } from "@/components/order/CartDrawer";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Solae Matcha",
    "Casa Solae",
    "matcha",
    "matcha ceremonial",
    "matcha premium",
    "matcha República Dominicana",
    "comprar matcha",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/brand/solae-logo-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/brand/solae-logo-512.png"],
  },
  icons: {
    icon: "/images/brand/solae-logo.png",
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c4035",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} ${fraunces.variable} ${caveat.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
        <LocaleProvider>
          <CartProvider>
            <Navbar />
            <main id="contenido" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <FloatingWhatsApp />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
