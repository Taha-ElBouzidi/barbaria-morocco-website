"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ProductDef } from "@/lib/products";
import ProductPlaceholder from "@/components/shared/ProductPlaceholder";

interface ProductRowProps {
  product: ProductDef;
  namespace: string; // "cosmetics.products" or "textile.products"
  quantity: number | undefined;
  onToggle: (key: string) => void;
  onQuantityChange: (key: string, qty: number) => void;
}

export default function ProductRow({
  product,
  namespace,
  quantity,
  onToggle,
  onQuantityChange,
}: ProductRowProps) {
  const t = useTranslations(`${namespace}.${product.key}`);
  const isSelected = quantity !== undefined;

  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm transition-all duration-200 cursor-pointer group ${
        isSelected
          ? "bg-[#E299A1]/10 border border-[#E299A1]/30"
          : "border border-transparent hover:bg-[#F7F2EA] hover:border-[#DDD0BC]/50"
      }`}
      onClick={() => onToggle(product.key)}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden relative">
        {product.photo ? (
          <Image
            src={product.photo}
            alt={t("name")}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <ProductPlaceholder name={t("name")} size={48} />
        )}
      </div>

      {/* Checkbox */}
      <div
        className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
          isSelected
            ? "bg-[#E299A1] border-[#E299A1]"
            : "border-[#DDD0BC] group-hover:border-[#E299A1]/60"
        }`}
      >
        {isSelected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Product name */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate transition-colors ${isSelected ? "text-[#2C1A0E]" : "text-[#2C1A0E]/70"}`}>
          {t("name")}
        </p>
        {product.tag && (
          <p className="text-[9px] tracking-wider uppercase text-[#E299A1]/70 mt-0.5">{product.tag}</p>
        )}
      </div>

      {/* Quantity input */}
      {isSelected && (
        <div
          className="flex items-center gap-1 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-8 h-8 sm:w-7 sm:h-7 rounded-full border border-[#DDD0BC] flex items-center justify-center text-sm sm:text-xs text-[#2C1A0E]/60 hover:border-[#E299A1] hover:text-[#E299A1] transition-colors flex-shrink-0"
            onClick={() => onQuantityChange(product.key, Math.max(1, (quantity ?? 1) - 1))}
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={999}
            value={quantity ?? 1}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1) onQuantityChange(product.key, val);
            }}
            className="w-10 sm:w-9 text-center text-sm font-medium text-[#2C1A0E] bg-transparent border-b border-[#DDD0BC] focus:outline-none focus:border-[#E299A1]"
          />
          <button
            className="w-8 h-8 sm:w-7 sm:h-7 rounded-full border border-[#DDD0BC] flex items-center justify-center text-sm sm:text-xs text-[#2C1A0E]/60 hover:border-[#E299A1] hover:text-[#E299A1] transition-colors flex-shrink-0"
            onClick={() => onQuantityChange(product.key, (quantity ?? 1) + 1)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
