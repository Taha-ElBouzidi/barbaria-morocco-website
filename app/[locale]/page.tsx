import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "@/components/Navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: "Barbaria Morocco — Cosmétiques Naturels du Maroc",
    description: t("subheadline"),
    openGraph: { images: [{ url: "/brand_photos/products-all-three.jpg" }] },
  };
}

function HeroSection() {
  const t = useTranslations("hero");
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/brand_photos/products-all-three.jpg"
        alt="Barbaria Morocco products"
        fill
        priority
        className="object-cover scale-105"
        sizes="100vw"
      />
      {/* layered blur gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-[#1A1A1A]/30 to-[#1A1A1A]/60" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center text-[#FDFCF8] px-6 max-w-3xl mx-auto">
        <p className="animate-fade-in-up text-xs tracking-[0.5em] uppercase mb-6 text-[#E299A1]">
          {t("tagline")}
        </p>
        <h1 className="animate-fade-in-up animation-delay-200 font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
          {t("headline")}
        </h1>
        <p className="animate-fade-in-up animation-delay-400 text-base md:text-lg text-[#FDFCF8]/85 mb-10 leading-relaxed max-w-xl mx-auto">
          {t("subheadline")}
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <Link href="/products">
            <button className="btn-glass-pink px-10 py-3.5 text-sm tracking-[0.2em] uppercase font-medium rounded-full">
              {t("cta")}
            </button>
          </Link>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up animation-delay-600">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#E299A1]/70" />
      </div>
    </section>
  );
}

const products = [
  { key: "argan" as const, photo: "/brand_photos/argan-oil-dropper.jpg", anchor: "argan-oil" },
  { key: "savon" as const, photo: "/brand_photos/savon-noir-2.jpg", anchor: "savon-noir" },
  { key: "scrub" as const, photo: "/brand_photos/sugar-scrub-ingredients.jpg", anchor: "sugar-scrub" },
];

function FeaturedProducts() {
  const t = useTranslations("featured");
  const pt = useTranslations("products");

  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">{t("title")}</h2>
        <p className="text-[#6B6B6B] max-w-lg mx-auto">{t("subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map(({ key, photo, anchor }) => (
          <div key={key} className="group card-hover">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-5">
              <Image
                src={photo}
                alt={pt(`${key}.name`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* glass overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <Link href={`/products#${anchor}`}>
                  <button className="btn-glass-outline w-full py-2.5 text-xs tracking-widest uppercase rounded-full">
                    {t("view")}
                  </button>
                </Link>
              </div>
            </div>
            <div className="px-1">
              <p className="text-xs tracking-widest uppercase text-[#E299A1] mb-1">
                {pt(`${key}.tagline`)}
              </p>
              <div className="flex items-center justify-between">
                <h3 className="font-playfair text-xl font-bold">{pt(`${key}.name`)}</h3>
                <span className="text-sm font-medium text-[#6B6B6B]">{pt(`${key}.price`)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ingredients = [
  { key: "argan" as const, photo: "/brand_photos/sugar-scrub-ingredients.jpg" },
  { key: "orange" as const, photo: "/brand_photos/brand-lifestyle-3.jpg" },
  { key: "nila" as const, photo: "/brand_photos/sugar-scrub-hammam.jpg" },
];

function IngredientSpotlight() {
  const t = useTranslations("ingredients");

  return (
    <section className="py-24 px-6 bg-[#EAE7DC]/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">{t("title")}</h2>
          <p className="text-[#6B6B6B]">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ingredients.map(({ key, photo }) => (
            <div key={key} className="group overflow-hidden rounded-sm card-hover">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo}
                  alt={t(`${key}.name`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-[#1A1A1A]/20 to-transparent" />
                {/* glass card at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="glass-dark rounded-sm p-4">
                    <h3 className="font-playfair text-lg font-bold text-[#FDFCF8] mb-1">
                      {t(`${key}.name`)}
                    </h3>
                    <p className="text-xs text-[#FDFCF8]/75 leading-relaxed">
                      {t(`${key}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const t = useTranslations("cta_banner");

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <Image
        src="/brand_photos/gift-box-open.jpg"
        alt="Barbaria gift set"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#1A1A1A]/55 backdrop-blur-[3px]" />
      <div className="relative z-10 max-w-2xl mx-auto text-center text-[#FDFCF8]">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 drop-shadow">{t("title")}</h2>
        <p className="text-[#FDFCF8]/75 mb-10">{t("subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-glass-pink px-8 py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center gap-2 w-full sm:w-auto justify-center">
              <MessageCircle size={16} />
              {t("whatsapp")}
            </button>
          </a>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-glass-outline px-8 py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center gap-2 w-full sm:w-auto justify-center">
              <FaInstagram size={16} />
              {t("instagram")}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <IngredientSpotlight />
      <CTABanner />
    </>
  );
}
