import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/components/Navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "food" });
  return {
    title: `Alimentaire — ${t("subtitle")} | Barbaria Morocco`,
    description: t("desc"),
  };
}

export default function FoodPage() {
  const t = useTranslations("food");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("notify_msg"))}`;

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Full-screen coming soon */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[80vh]">
        <Image
          src="/brand_photos/sugar-scrub-ingredients.jpg"
          alt="Barbaria Alimentaire"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A0E]/70 via-[#2C1A0E]/55 to-[#2C1A0E]/80 backdrop-blur-[2px]" />

        <div className="relative z-10 text-center text-[#F7F2EA] px-6 max-w-2xl mx-auto">
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#C9963A]/60" />
            <div className="w-2 h-2 rounded-full bg-[#C9963A]" />
            <div className="w-12 h-px bg-[#C9963A]/60" />
          </div>

          <p className="text-xs tracking-[0.5em] uppercase text-[#C9963A] mb-6">
            Barbaria Morocco
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 leading-tight">
            {t("title")}
          </h1>
          <p className="font-playfair text-xl md:text-2xl italic text-[#E8C97A] mb-6">
            {t("subtitle")}
          </p>
          <p className="text-[#F7F2EA]/70 leading-relaxed mb-12 max-w-md mx-auto">
            {t("desc")}
          </p>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn-glass-gold px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium rounded-full flex items-center gap-3 mx-auto">
              <MessageCircle size={18} />
              {t("notify")}
            </button>
          </a>

          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-12 h-px bg-[#C9963A]/60" />
            <div className="w-2 h-2 rounded-full bg-[#C9963A]" />
            <div className="w-12 h-px bg-[#C9963A]/60" />
          </div>
        </div>
      </section>
    </div>
  );
}
