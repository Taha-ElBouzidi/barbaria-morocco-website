import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Leaf, Scissors, MapPin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("story_1"),
    openGraph: {
      images: [{ url: "/brand_photos/gift-box-open.jpg" }],
    },
  };
}

const galleryPhotos = [
  { src: "/brand_photos/gift-box-open.jpg", alt: "Barbaria gift set" },
  { src: "/brand_photos/argan-oil-dropper.jpg", alt: "Argan oil" },
  { src: "/brand_photos/savon-noir-3.jpg", alt: "Savon noir" },
  { src: "/brand_photos/sugar-scrub-hammam.jpg", alt: "Sugar scrub hammam" },
  { src: "/brand_photos/packaging-1.jpg", alt: "Barbaria packaging" },
  { src: "/brand_photos/gift-boxes-overhead.jpg", alt: "Gift boxes" },
];

const valueIcons = {
  natural: Leaf,
  artisanal: Scissors,
  moroccan: MapPin,
};

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/brand_photos/gift-box-flat.jpg"
          alt="Barbaria Morocco"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/50" />
        <div className="relative z-10 text-center text-[#FDFCF8] px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-[#E299A1] mb-4">
            {t("subtitle")}
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-8">
          <p className="text-lg leading-relaxed text-[#1A1A1A]/80">
            {t("story_1")}
          </p>
          <p className="text-lg leading-relaxed text-[#1A1A1A]/80">
            {t("story_2")}
          </p>
          <p className="text-lg leading-relaxed text-[#1A1A1A]/80">
            {t("story_3")}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#1A1A1A] text-[#FDFCF8] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-16">
            {t("values_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(["natural", "artisanal", "moroccan"] as const).map((key) => {
              const Icon = valueIcons[key];
              return (
                <div key={key} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 border border-[#E299A1] rounded-full mb-6">
                    <Icon size={20} className="text-[#E299A1]" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-3">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-[#FDFCF8]/70 text-sm leading-relaxed">
                    {t(`values.${key}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="font-playfair text-4xl font-bold text-center mb-16">
          {t("gallery_title")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryPhotos.map(({ src, alt }) => (
            <div key={src} className="relative aspect-square overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
