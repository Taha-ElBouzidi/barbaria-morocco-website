"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import ProductRow from "./ProductRow";
import type { GammeDef, ProductDef } from "@/lib/products";
import type { OrderState } from "@/lib/order-utils";

interface GammeAccordionProps {
  gamme: GammeDef;
  order: OrderState;
  onToggle: (key: string) => void;
  onQuantityChange: (key: string, qty: number) => void;
}

export function GammeAccordion({ gamme, order, onToggle, onQuantityChange }: GammeAccordionProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("cosmetics.gammes");
  const selectedCount = gamme.products.filter((p) => order.has(p.key)).length;

  return (
    <div className="border border-[#DDD0BC]/60 rounded-sm overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 bg-[#F7F2EA] hover:bg-[#EAD9C0]/40 transition-colors text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <span className="font-playfair text-lg font-bold text-[#E299A1]/40">{gamme.number}</span>
          <div>
            <p className="text-sm font-semibold text-[#2C1A0E]">{t(`${gamme.key}.name`)}</p>
            <p className="text-[10px] tracking-wider uppercase text-[#9B8B7A]">{t(`${gamme.key}.tagline`)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {selectedCount > 0 && (
            <span className="text-xs font-medium bg-[#E299A1] text-white px-2 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-[#9B8B7A] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="px-2 py-2 space-y-1 bg-white/50">
          {gamme.products.map((product) => (
            <ProductRow
              key={product.key}
              product={product}
              namespace="cosmetics.products"
              quantity={order.get(product.key)}
              onToggle={onToggle}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TextileAccordionProps {
  products: ProductDef[];
  order: OrderState;
  onToggle: (key: string) => void;
  onQuantityChange: (key: string, qty: number) => void;
}

export function TextileAccordion({ products, order, onToggle, onQuantityChange }: TextileAccordionProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("order");
  const selectedCount = products.filter((p) => order.has(p.key)).length;

  return (
    <div className="border border-[#DDD0BC]/60 rounded-sm overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 bg-[#F7F2EA] hover:bg-[#EAD9C0]/40 transition-colors text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <p className="text-sm font-semibold text-[#2C1A0E]">{t("section_textile")}</p>
          <p className="text-[10px] tracking-wider uppercase text-[#9B8B7A]">100% fait main · Made in Morocco</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {selectedCount > 0 && (
            <span className="text-xs font-medium bg-[#A0856A] text-white px-2 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-[#9B8B7A] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="px-2 py-2 space-y-1 bg-white/50">
          {products.map((product) => (
            <ProductRow
              key={product.key}
              product={product}
              namespace="textile.products"
              quantity={order.get(product.key)}
              onToggle={onToggle}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
