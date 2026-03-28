import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const baseUrl = "https://barbaria-morocco.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Barbaria Morocco | L'authenticite marocaine",
    template: "%s | Barbaria Morocco",
  },
  description:
    "Decouvrez Barbaria Morocco : cosmetiques naturels, textile artisanal et produits alimentaires du terroir marocain.",
  openGraph: {
    type: "website",
    siteName: "Barbaria Morocco",
    locale: "fr_MA",
    alternateLocale: "en_US",
    images: [
      {
        url: "/brand_photos/products-all-three.jpg",
        width: 1200,
        height: 630,
        alt: "Barbaria Morocco - Cosmetiques, Textile, Alimentaire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barbaria Morocco | L'authenticite marocaine",
    description:
      "Cosmetiques naturels, textile artisanal et produits alimentaires du terroir marocain.",
    images: ["/brand_photos/products-all-three.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ViewTransitions>
      <html
        lang={locale}
        className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-[#F7F2EA] text-[#2C1A0E]">
          <NextIntlClientProvider locale={locale}>
            <Navbar locale={locale} />
            <main className="flex-1">{children}</main>
            <WhatsAppFloat />
            <Footer />
          </NextIntlClientProvider>
          <Analytics />
          <SpeedInsights />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Barbaria Morocco",
                url: baseUrl,
                logo: `${baseUrl}/brand_photos/barbaria-logo.jpg`,
                description:
                  "Cosmetiques naturels, textile artisanal et produits alimentaires du terroir marocain.",
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "ta.elbouzidi@gmail.com",
                  contactType: "customer service",
                  availableLanguage: ["French", "English"],
                },
                sameAs: [
                  "https://instagram.com/barbaria_00",
                ],
              }),
            }}
          />
        </body>
      </html>
    </ViewTransitions>
  );
}
