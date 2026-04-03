import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import GammeNav from "@/components/cosmetics/GammeNav";
import GammeSection from "@/components/cosmetics/GammeSection";
import CartStickyBar from "@/components/cosmetics/CartStickyBar";
import { GAMMES } from "@/lib/products";
import { BASE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cosmetics" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: { images: [{ url: "/brand_photos/products-all-three.jpg" }] },
  };
}

function GammeNavWrapper() {
  const t = useTranslations("cosmetics.gammes");
  const gammeNames: Record<string, string> = {};
  GAMMES.forEach((g) => {
    gammeNames[g.key] = t(`${g.key}.name` as Parameters<typeof t>[0]);
  });
  return <GammeNav gammes={GAMMES} gammeNames={gammeNames} />;
}

function GammeSections() {
  const t = useTranslations("cosmetics.gammes");
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 divide-y divide-[#DDD0BC]/40">
      {GAMMES.map((gamme) => (
        <GammeSection
          key={gamme.key}
          gamme={gamme}
          gammeName={t(`${gamme.key}.name` as Parameters<typeof t>[0])}
          gammeTagline={t(`${gamme.key}.tagline` as Parameters<typeof t>[0])}
        />
      ))}
    </div>
  );
}

function IngredientSpotlight() {
  const t = useTranslations("cosmetics.ingredients");
  const ingredients = [
    { key: "argan" as const, photo: "/brand_photos/sugar-scrub-ingredients.jpg" },
    { key: "orange" as const, photo: "/brand_photos/brand-lifestyle-3.jpg" },
    { key: "nila" as const, photo: "/brand_photos/sugar-scrub-hammam.jpg" },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#EAD9C0]/30">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#2C1A0E] mb-3">{t("title")}</h2>
          <p className="text-[#9B8B7A]">{t("subtitle")}</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ingredients.map(({ key, photo }) => (
            <ScrollReveal key={key} className="group overflow-hidden rounded-sm card-hover">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo}
                  alt={t(`${key}.name` as Parameters<typeof t>[0])}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/70 via-[#2C1A0E]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="glass-dark rounded-sm p-4">
                    <h3 className="font-playfair text-lg font-bold text-[#F7F2EA] mb-1">
                      {t(`${key}.name` as Parameters<typeof t>[0])}
                    </h3>
                    <p className="text-xs text-[#F7F2EA]/75 leading-relaxed">
                      {t(`${key}.desc` as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderCTA() {
  const t = useTranslations("order");
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#2C1A0E] text-[#F7F2EA]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.5em] uppercase text-[#E299A1] mb-4">Barbaria Morocco</p>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">{t("cta_title")}</h2>
        <p className="text-[#F7F2EA]/70 mb-8 leading-relaxed">{t("cta_subtitle")}</p>
        <Link href="/order">
          <button className="btn-glass-pink btn-ripple px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium rounded-full inline-flex items-center gap-3">
            {t("title")}
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </section>
  );
}

export default function CosmeticsPage() {
  const t = useTranslations("cosmetics");

  // JSON-LD: flat list of all 36 products
  const allProducts = GAMMES.flatMap((g) => g.products);

  return (
    <div className="pt-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Barbaria Morocco - Cosmétiques Naturels",
          numberOfItems: allProducts.length,
          itemListElement: allProducts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.key,
              brand: { "@type": "Brand", name: "Barbaria Morocco" },
              url: `${BASE_URL}/fr/cosmetics#gamme-${p.gamme}`,
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "Barbaria Morocco" },
              },
            },
          })),
        }}
      />

      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <Image
          src="/brand_photos/products-all-three.jpg"
          alt="Barbaria Cosmetics"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#F7F2EA]/82 backdrop-blur-sm" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-[#E299A1] mb-4">{t("tagline_page")}</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-[#2C1A0E] mb-4">
            {t("title")}
          </h1>
          <p className="text-[#9B8B7A] max-w-lg mx-auto mb-6">{t("subtitle")}</p>
          <div className="flex items-center justify-center gap-6 text-xs tracking-widest uppercase text-[#9B8B7A]">
            <span>6 Gammes</span>
            <span className="w-1 h-1 rounded-full bg-[#E299A1]" />
            <span>36 Produits</span>
            <span className="w-1 h-1 rounded-full bg-[#E299A1]" />
            <span>100% Naturel</span>
          </div>
        </div>
      </div>

      {/* Sticky gamme navigation */}
      <GammeNavWrapper />

      {/* All 36 products in 6 gamme sections */}
      <GammeSections />

      {/* Ingredient spotlight */}
      <IngredientSpotlight />

      {/* Order CTA */}
      <OrderCTA />

      {/* Mobile sticky cart bar */}
      <CartStickyBar />
    </div>
  );
}
