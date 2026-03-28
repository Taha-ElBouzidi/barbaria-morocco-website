import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MessageCircle, Check } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

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
    openGraph: { images: [{ url: "/brand_photos/argan-oil-dropper.jpg" }] },
  };
}

const productData = [
  {
    key: "argan" as const,
    id: "argan-oil",
    photos: ["/brand_photos/argan-oil-dropper.jpg", "/brand_photos/brand-lifestyle-1.jpg"],
  },
  {
    key: "savon" as const,
    id: "savon-noir",
    photos: ["/brand_photos/savon-noir-3.jpg", "/brand_photos/savon-noir-2.jpg"],
  },
  {
    key: "scrub" as const,
    id: "sugar-scrub",
    photos: ["/brand_photos/sugar-scrub-ingredients.jpg", "/brand_photos/sugar-scrub-hammam.jpg"],
  },
  {
    key: "saad" as const,
    id: "huile-saad",
    photos: ["/brand_photos/brand-lifestyle-2.jpg", "/brand_photos/argan-oil-dropper.jpg"],
  },
];

function ProductCard({
  productKey,
  id,
  photos,
  index,
}: {
  productKey: "argan" | "savon" | "scrub" | "saad";
  id: string;
  photos: string[];
  index: number;
}) {
  const t = useTranslations(`cosmetics.products.${productKey}`);
  const isReversed = index % 2 === 1;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("whatsapp_msg"))}`;

  return (
    <ScrollReveal>
    <article
      id={id}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center py-16 sm:py-24 border-b border-[#DDD0BC]/60 last:border-0"
    >
      <div className={`relative ${isReversed ? "md:order-2" : ""}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-lg">
          <Image
            src={photos[0]}
            alt={t("name")}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {photos[1] && (
          <div className="absolute -bottom-8 right-4 w-2/5 aspect-square overflow-hidden rounded-sm border-4 border-[#F7F2EA] shadow-xl">
            <Image src={photos[1]} alt={t("name")} fill className="object-cover" sizes="20vw" />
          </div>
        )}
      </div>

      <div className={`${isReversed ? "md:order-1" : ""} pt-10 md:pt-0`}>
        <p className="text-xs tracking-[0.4em] uppercase text-[#E299A1] mb-3">{t("tagline")}</p>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-2">
          {t("name")}
        </h2>
        <p className="text-sm text-[#9B8B7A] mb-6">
          {t("volume")} · <span className="font-semibold text-[#2C1A0E]">{t("price")}</span>
        </p>
        <p className="text-[#2C1A0E]/80 leading-relaxed mb-8">{t("description")}</p>

        <div className="mb-8 p-5 glass rounded-sm">
          <p className="text-xs tracking-widest uppercase text-[#9B8B7A] mb-3">Ingrédients</p>
          <ul className="space-y-2">
            {(t.raw("ingredients") as string[]).map((ing) => (
              <li key={ing} className="flex items-center gap-2 text-sm text-[#2C1A0E]">
                <Check size={13} className="text-[#E299A1] flex-shrink-0" />
                {ing}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className="btn-glass-pink btn-ripple w-full py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2">
              <MessageCircle size={16} />
              {t("order")}
            </button>
          </a>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <button className="btn-glass-outline-dark btn-ripple w-full py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2">
              <FaInstagram size={16} />
              {t("instagram")}
            </button>
          </a>
        </div>
      </div>
    </article>
    </ScrollReveal>
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
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ingredients.map(({ key, photo }) => (
            <StaggerItem key={key} className="group overflow-hidden rounded-sm card-hover">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo}
                  alt={t(`${key}.name`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/70 via-[#2C1A0E]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="glass-dark rounded-sm p-4">
                    <h3 className="font-playfair text-lg font-bold text-[#F7F2EA] mb-1">
                      {t(`${key}.name`)}
                    </h3>
                    <p className="text-xs text-[#F7F2EA]/75 leading-relaxed">{t(`${key}.desc`)}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default function CosmeticsPage() {
  const t = useTranslations("cosmetics");

  const products = [
    { name: "Huile d'Argan Pure", price: "45", image: "/brand_photos/argan-oil-dropper.jpg" },
    { name: "Savon Noir Beldi", price: "28", image: "/brand_photos/savon-noir-3.jpg" },
    { name: "Sugar Body Scrub", price: "35", image: "/brand_photos/sugar-scrub-ingredients.jpg" },
  ];

  return (
    <div className="pt-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Barbaria Morocco Cosmetics",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              image: `https://barbaria-morocco.vercel.app${p.image}`,
              brand: { "@type": "Brand", name: "Barbaria Morocco" },
              offers: {
                "@type": "Offer",
                priceCurrency: "EUR",
                price: p.price,
                availability: "https://schema.org/InStock",
              },
            },
          })),
        }}
      />
      {/* Header */}
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
          <p className="text-[#9B8B7A] max-w-lg mx-auto">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {productData.map((p, i) => (
          <ProductCard key={p.key} productKey={p.key} id={p.id} photos={p.photos} index={i} />
        ))}
      </div>

      <IngredientSpotlight />
    </div>
  );
}
