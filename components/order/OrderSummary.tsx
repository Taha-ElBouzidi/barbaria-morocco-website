"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import type { OrderState } from "@/lib/order-utils";
import type { GammeDef, ProductDef } from "@/lib/products";

interface OrderSummaryProps {
  order: OrderState;
  gammes: GammeDef[];
  textileProducts: ProductDef[];
  onRemove: (key: string) => void;
  onClear: () => void;
  children: React.ReactNode; // ShareActions slot
}

export default function OrderSummary({
  order,
  gammes,
  textileProducts,
  onRemove,
  onClear,
  children,
}: OrderSummaryProps) {
  const t = useTranslations("order");
  const cosmeticsT = useTranslations("cosmetics.products");
  const textileT = useTranslations("textile.products");

  const totalItems = order.size;
  const totalQty = Array.from(order.values()).reduce((a, b) => a + b, 0);

  const getProductName = (key: string): string => {
    // Check if it's a textile product
    const isTextile = textileProducts.some((p) => p.key === key);
    if (isTextile) {
      try { return textileT(`${key}.name` as never); } catch { return key; }
    }
    try { return cosmeticsT(`${key}.name` as never); } catch { return key; }
  };

  // Build ordered list: cosmetics (by gamme order) then textile
  const orderedItems: { key: string; qty: number; name: string }[] = [];

  gammes.forEach((gamme) => {
    gamme.products.forEach((p) => {
      const qty = order.get(p.key);
      if (qty !== undefined) {
        orderedItems.push({ key: p.key, qty, name: getProductName(p.key) });
      }
    });
  });

  textileProducts.forEach((p) => {
    const qty = order.get(p.key);
    if (qty !== undefined) {
      orderedItems.push({ key: p.key, qty, name: getProductName(p.key) });
    }
  });

  return (
    <div className="glass rounded-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/30 flex items-center justify-between">
        <div>
          <h2 className="font-playfair text-lg font-bold text-[#2C1A0E]">{t("summary_title")}</h2>
          {totalItems > 0 && (
            <p className="text-xs text-[#9B8B7A] mt-0.5">
              {totalItems} {t("summary_items")} · {totalQty} unité(s)
            </p>
          )}
        </div>
        {totalItems > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-[#9B8B7A] hover:text-[#C86446] transition-colors tracking-wider uppercase"
          >
            {t("clear")}
          </button>
        )}
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto max-h-80 px-4 py-3">
        {orderedItems.length === 0 ? (
          <p className="text-sm text-[#9B8B7A] text-center py-6 italic">{t("summary_empty")}</p>
        ) : (
          <ul className="space-y-2">
            {orderedItems.map(({ key, qty, name }) => (
              <li key={key} className="flex items-start gap-2 group">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#2C1A0E] leading-snug">{name}</p>
                  <p className="text-[10px] text-[#9B8B7A]">× {qty}</p>
                </div>
                <button
                  onClick={() => onRemove(key)}
                  className="flex-shrink-0 mt-0.5 text-[#DDD0BC] hover:text-[#C86446] transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove"
                >
                  <X size={13} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Share actions slot */}
      <div className="px-4 py-4 border-t border-white/30">
        {children}
      </div>
    </div>
  );
}
