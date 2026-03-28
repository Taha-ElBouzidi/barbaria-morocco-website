import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Leaf, Scissors, MapPin } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

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
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/brand_photos/gift-box-flat.jpg"
          alt="Barbaria Morocco"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#2C1A0E]/55" />
        <div className="relative z-10 text-center text-[#F7F2EA] px-6">
          <p className="animate-fade-in-up text-xs tracking-[0.4em] uppercase text-[#C9963A] mb-4">
            {t("subtitle")}
          </p>
          <h1 className="animate-fade-in-up animation-delay-200 font-playfair text-4xl sm:text-5xl md:text-7xl font-bold">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <ScrollReveal>
          <div className="space-y-8">
            <p className="text-base sm:text-lg leading-relaxed text-[#2C1A0E]/80">
              {t("story_1")}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#2C1A0E]/80">
              {t("story_2")}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#2C1A0E]/80">
              {t("story_3")}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="bg-[#2C1A0E] text-[#F7F2EA] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12 sm:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">
              {t("values_title")}
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
            {(["natural", "artisanal", "moroccan"] as const).map((key) => {
              const Icon = valueIcons[key];
              return (
                <StaggerItem key={key} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 border border-[#C9963A] rounded-full mb-6">
                    <Icon size={20} className="text-[#C9963A]" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-3">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-[#F7F2EA]/70 text-sm leading-relaxed">
                    {t(`values.${key}.desc`)}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <ScrollReveal className="mb-12 sm:mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center text-[#2C1A0E]">
            {t("gallery_title")}
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {galleryPhotos.map(({ src, alt }) => (
            <StaggerItem key={src}>
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
