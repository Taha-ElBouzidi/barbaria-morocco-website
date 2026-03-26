import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MessageCircle, Check } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "@/components/Navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: { images: [{ url: "/brand_photos/products-all-three.jpg" }] },
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
];

function ProductCard({
  productKey,
  id,
  photos,
  index,
}: {
  productKey: "argan" | "savon" | "scrub";
  id: string;
  photos: string[];
  index: number;
}) {
  const t = useTranslations(`products.${productKey}`);
  const isReversed = index % 2 === 1;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("whatsapp_msg"))}`;

  return (
    <article
      id={id}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24 border-b border-[#E5E0D5]/60 last:border-0`}
    >
      {/* Photo */}
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
          <div className="absolute -bottom-8 right-4 w-2/5 aspect-square overflow-hidden rounded-sm border-4 border-[#FDFCF8] shadow-xl">
            <Image
              src={photos[1]}
              alt={t("name")}
              fill
              className="object-cover"
              sizes="20vw"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`${isReversed ? "md:order-1" : ""} pt-10 md:pt-0`}>
        <p className="text-xs tracking-[0.4em] uppercase text-[#E299A1] mb-3">{t("tagline")}</p>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-2">{t("name")}</h2>
        <p className="text-sm text-[#6B6B6B] mb-6">
          {t("volume")} · <span className="font-semibold text-[#1A1A1A]">{t("price")}</span>
        </p>
        <p className="text-[#1A1A1A]/80 leading-relaxed mb-8">{t("description")}</p>

        {/* Ingredients */}
        <div className="mb-8 p-5 glass rounded-sm">
          <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-3">Ingrédients</p>
          <ul className="space-y-2">
            {(t.raw("ingredients") as string[]).map((ing) => (
              <li key={ing} className="flex items-center gap-2 text-sm">
                <Check size={13} className="text-[#E299A1] flex-shrink-0" />
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* Order buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className="btn-glass-pink w-full py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2">
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
            <button className="btn-glass-outline-dark w-full py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2">
              <FaInstagram size={16} />
              {t("instagram")}
            </button>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const t = useTranslations("products");

  return (
    <div className="pt-16">
      {/* Page header */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <Image
          src="/brand_photos/packaging-1.jpg"
          alt="Barbaria Morocco"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#FDFCF8]/80 backdrop-blur-sm" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-[#E299A1] mb-4">Barbaria Morocco</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">{t("title")}</h1>
          <p className="text-[#6B6B6B] max-w-lg mx-auto">{t("subtitle")}</p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-6">
        {productData.map((p, i) => (
          <ProductCard key={p.key} productKey={p.key} id={p.id} photos={p.photos} index={i} />
        ))}
      </div>
    </div>
  );
}
