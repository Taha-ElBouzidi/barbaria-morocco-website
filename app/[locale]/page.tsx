import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: "Barbaria Morocco — L'authenticité marocaine",
    description: t("subheadline"),
    openGraph: { images: [{ url: "/brand_photos/products-all-three.jpg" }] },
  };
}

const categories = [
  {
    key: "cosmetics" as const,
    href: "/cosmetics",
    photo: "/brand_photos/argan-oil-dropper.jpg",
    accent: "#E299A1",
    accentGlass: "rgba(226,153,161,0.18)",
    border: "rgba(226,153,161,0.4)",
    btnClass: "btn-glass-pink",
  },
  {
    key: "textile" as const,
    href: "/textile",
    photo: "/brand_photos/gift-box-open.jpg",
    accent: "#A0856A",
    accentGlass: "rgba(160,133,106,0.18)",
    border: "rgba(160,133,106,0.4)",
    btnClass: "btn-glass-leather",
  },
  {
    key: "food" as const,
    href: "/food",
    photo: "/brand_photos/sugar-scrub-ingredients.jpg",
    accent: "#C4840A",
    accentGlass: "rgba(196,132,10,0.18)",
    border: "rgba(196,132,10,0.35)",
    btnClass: "btn-glass-gold",
  },
];

function HeroSection() {
  const t = useTranslations("home");
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/brand_photos/brand-lifestyle-5.jpg"
        alt="Barbaria Morocco"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A0E]/60 via-[#2C1A0E]/35 to-[#2C1A0E]/70" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      <div className="relative z-10 text-center text-[#F7F2EA] px-6 max-w-4xl mx-auto">
        <p className="animate-fade-in-up text-xs tracking-[0.5em] uppercase mb-6 text-[#C9963A]">
          {t("tagline")}
        </p>
        <h1 className="animate-fade-in-up animation-delay-200 font-playfair text-6xl md:text-8xl font-bold mb-6 leading-tight drop-shadow-lg">
          {t("headline")}
        </h1>
        <p className="animate-fade-in-up animation-delay-400 text-base md:text-lg text-[#F7F2EA]/80 mb-12 leading-relaxed max-w-xl mx-auto">
          {t("subheadline")}
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <a href="#collections">
            <button className="btn-glass-gold px-10 py-3.5 text-sm tracking-[0.2em] uppercase font-medium rounded-full">
              {t("cta")}
            </button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in-up animation-delay-600">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#C9963A]/70" />
      </div>
    </section>
  );
}

function CategoryCards() {
  const t = useTranslations("home");

  return (
    <section id="collections" className="py-28 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9963A] mb-4">Barbaria Morocco</p>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-4">
          Nos Collections
        </h2>
        <div className="w-16 h-px bg-[#C9963A] mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map(({ key, href, photo, accentGlass, border, btnClass }) => {
          const label = t(`categories.${key}.label`);
          const tagline = t(`categories.${key}.tagline`);
          const desc = t(`categories.${key}.desc`);
          const cta = t(`categories.${key}.cta`);

          return (
            <Link key={key} href={href} className="group block card-hover">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={photo}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/80 via-[#2C1A0E]/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className="rounded-sm p-5"
                    style={{
                      background: accentGlass,
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: `1px solid ${border}`,
                    }}
                  >
                    <p className="text-xs tracking-[0.3em] uppercase text-[#F7F2EA]/70 mb-1">
                      {tagline}
                    </p>
                    <h3 className="font-playfair text-2xl font-bold text-[#F7F2EA] mb-2">
                      {label}
                    </h3>
                    <p className="text-sm text-[#F7F2EA]/75 leading-relaxed mb-4">{desc}</p>
                    <button
                      className={`${btnClass} px-5 py-2 text-xs tracking-widest uppercase rounded-full flex items-center gap-2`}
                    >
                      {cta} <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function BrandStripSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <Image
        src="/brand_photos/brand-lifestyle-4.jpg"
        alt="Barbaria Morocco artisans"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#2C1A0E]/60 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#F7F2EA]">
        <p className="text-xs tracking-[0.5em] uppercase text-[#C9963A] mb-6">Notre engagement</p>
        <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 leading-tight">
          "Every bag has a story.<br />Every story changes a life."
        </h2>
        <p className="text-[#F7F2EA]/75 max-w-xl mx-auto leading-relaxed">
          En collaborant directement avec des artisanes marocaines, nous les aidons à vivre
          dignement de leur savoir-faire, à soutenir leurs familles et à offrir un avenir meilleur
          à leurs enfants.
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <BrandStripSection />
    </>
  );
}
