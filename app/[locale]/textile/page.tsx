import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MessageCircle, Check } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "textile" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: { images: [{ url: "/brand_photos/gift-box-open.jpg" }] },
  };
}

// NOTE: Replace these with actual textile product photos once provided
// Expected files: /brand_photos/textile-bag-femme.jpg, textile-bag-homme.jpg,
//                 textile-pouche.jpg, textile-pins.jpg
const productData = [
  {
    key: "sac_femme" as const,
    id: "sac-femme",
    photos: ["/brand_photos/packaging-1.jpg", "/brand_photos/packaging-2.jpg"],
    isReversed: false,
  },
  {
    key: "sac_homme" as const,
    id: "sac-homme",
    photos: ["/brand_photos/packaging-3.jpg", "/brand_photos/packaging-4.jpg"],
    isReversed: true,
  },
  {
    key: "pouche" as const,
    id: "pouche",
    photos: ["/brand_photos/packaging-5.jpg", "/brand_photos/gift-boxes-overhead.jpg"],
    isReversed: false,
  },
];

function ProductCard({
  productKey,
  id,
  photos,
  isReversed,
}: {
  productKey: "sac_femme" | "sac_homme" | "pouche";
  id: string;
  photos: string[];
  isReversed: boolean;
}) {
  const t = useTranslations(`textile.products.${productKey}`);
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
        <p className="text-xs tracking-[0.4em] uppercase text-[#A0856A] mb-3">{t("tagline")}</p>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-6">
          {t("name")}
        </h2>
        <p className="text-[#2C1A0E]/80 leading-relaxed mb-8">{t("description")}</p>

        <div className="mb-8 p-5 glass rounded-sm">
          <p className="text-xs tracking-widest uppercase text-[#9B8B7A] mb-3">Détails</p>
          <ul className="space-y-2">
            {(t.raw("details") as string[]).map((detail) => (
              <li key={detail} className="flex items-center gap-2 text-sm text-[#2C1A0E]">
                <Check size={13} className="text-[#A0856A] flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className="btn-glass-leather btn-ripple w-full py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2">
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

function PinsSection() {
  const t = useTranslations("textile.products.pins");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("whatsapp_msg"))}`;

  return (
    <section className="py-24 px-6 bg-[#2C1A0E] text-[#F7F2EA]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9963A] mb-4">{t("tagline")}</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">{t("name")}</h2>
            <p className="text-[#F7F2EA]/75 leading-relaxed mb-8">{t("description")}</p>

            <div className="grid grid-cols-1 gap-2 mb-8">
              {(t.raw("collections") as string[]).map((col) => (
                <div key={col} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9963A] flex-shrink-0" />
                  <span className="text-[#F7F2EA]/80">{col}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="btn-glass-gold w-full py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2">
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
                <button className="btn-glass-outline w-full py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2">
                  <FaInstagram size={16} />
                  {t("instagram")}
                </button>
              </a>
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
              src="/brand_photos/gift-box-flat.jpg"
              alt="Barbaria Pins"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A0E]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TextilePage() {
  const t = useTranslations("textile");

  return (
    <div className="pt-16">
      {/* Hero header */}
      <div className="relative py-28 px-6 text-center overflow-hidden">
        <Image
          src="/brand_photos/gift-boxes-overhead.jpg"
          alt="Barbaria Textile"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#EDE4D0]/80 backdrop-blur-sm" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-[#A0856A] mb-4">{t("tagline_page")}</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-[#2C1A0E] mb-4">
            {t("title")}
          </h1>
          <p className="text-[#9B8B7A] max-w-lg mx-auto mb-6">{t("subtitle")}</p>
          <div className="w-16 h-px bg-[#A0856A] mx-auto" />
        </div>
      </div>

      {/* Brand story strip */}
      <div className="bg-[#EAD9C0]/40 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#2C1A0E]/80 leading-relaxed italic font-playfair text-lg">
            "{t("story")}"
          </p>
          <p className="mt-4 text-sm text-[#9B8B7A]">{t("impact")}</p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-6">
        {productData.map((p) => (
          <ProductCard
            key={p.key}
            productKey={p.key}
            id={p.id}
            photos={p.photos}
            isReversed={p.isReversed}
          />
        ))}
      </div>

      {/* Pins section */}
      <PinsSection />
    </div>
  );
}
