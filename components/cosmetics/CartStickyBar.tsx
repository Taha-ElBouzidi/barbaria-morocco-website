"use client";

import { useCart } from "@/lib/cart-context";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function CartStickyBar() {
  const { totalItems } = useCart();
  const t = useTranslations("cosmetics");

  if (totalItems === 0) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      <Link
        href="/order"
        className="flex items-center justify-between w-full px-6 py-4 bg-[#2C1A0E]/95 backdrop-blur-md border-t border-[#C9963A]/20 text-[#F7F2EA]"
      >
        <span className="text-xs tracking-wider uppercase text-[#F7F2EA]/70">
          {t("cart_bar", { count: totalItems })}
        </span>
        <span className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#C9963A] font-medium">
          {t("view_cart")}
          <ArrowRight size={13} />
        </span>
      </Link>
    </div>
  );
}
