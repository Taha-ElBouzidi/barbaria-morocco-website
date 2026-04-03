import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OrderConfigurator from "@/components/order/OrderConfigurator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "order" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "order" });

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero header */}
      <div className="py-16 sm:py-20 px-6 text-center bg-[#EAD9C0]/30 border-b border-[#DDD0BC]/40">
        <p className="text-xs tracking-[0.5em] uppercase text-[#C9963A] mb-4">Barbaria Morocco</p>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-4">
          {t("title")}
        </h1>
        <p className="text-[#9B8B7A] max-w-lg mx-auto leading-relaxed">{t("subtitle")}</p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 text-[10px] sm:text-xs text-[#9B8B7A]/70">
          <span>36 cosmétiques</span>
          <span className="w-1 h-1 rounded-full bg-[#C9963A]/40" />
          <span>Textile artisanal</span>
          <span className="w-1 h-1 rounded-full bg-[#C9963A]/40" />
          <span>WhatsApp · Email</span>
        </div>
      </div>

      {/* Configurator */}
      <OrderConfigurator />
    </div>
  );
}
