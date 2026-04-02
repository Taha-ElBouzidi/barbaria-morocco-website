"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/components/Navbar";
import Image from "next/image";
import type { ProductDef } from "@/lib/products";

function ProductPlaceholder({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EAD9C0]/60">
      {/* Berber geometric SVG watermark */}
      <svg
        className="absolute opacity-[0.06] w-3/4 h-3/4"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke="#2C1A0E" strokeWidth="2" fill="none" />
        <polygon points="50,18 82,34.5 82,65.5 50,82 18,65.5 18,34.5" stroke="#2C1A0E" strokeWidth="1.5" fill="none" />
        <polygon points="50,31 69,41.5 69,58.5 50,69 31,58.5 31,41.5" stroke="#2C1A0E" strokeWidth="1" fill="none" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="#2C1A0E" strokeWidth="0.5" />
        <line x1="5" y1="27.5" x2="95" y2="72.5" stroke="#2C1A0E" strokeWidth="0.5" />
        <line x1="5" y1="72.5" x2="95" y2="27.5" stroke="#2C1A0E" strokeWidth="0.5" />
      </svg>
      <span className="relative font-playfair italic text-[#2C1A0E]/30 text-center px-4 text-xs leading-relaxed">
        {name}
      </span>
    </div>
  );
}

export default function CompactProductCard({ product }: { product: ProductDef }) {
  const t = useTranslations(`cosmetics.products.${product.key}`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("whatsapp_msg"))}`;

  return (
    <article className="group flex flex-col glass rounded-sm card-hover overflow-hidden">
      {/* Photo area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EAD9C0]/40 flex-shrink-0">
        {product.photo ? (
          <Image
            src={product.photo}
            alt={t("name")}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <ProductPlaceholder name={t("name")} />
        )}
        {/* Tag badge */}
        {product.tag && (
          <div className="absolute top-3 left-3">
            <span className="text-[9px] tracking-[0.15em] uppercase font-medium px-2 py-1 bg-[#2C1A0E]/70 text-[#E299A1] backdrop-blur-sm rounded-full">
              {product.tag}
            </span>
          </div>
        )}
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#E299A1] mb-1">{t("tagline")}</p>
        <h3 className="font-playfair text-base font-bold text-[#2C1A0E] mb-2 leading-snug">{t("name")}</h3>
        <p className="text-xs text-[#2C1A0E]/65 leading-relaxed line-clamp-2 mb-4 flex-1">{t("description")}</p>

        {/* INCI key ingredient pill */}
        {product.inci[0] && (
          <div className="mb-4">
            <span className="inline-block text-[9px] tracking-wider text-[#9B8B7A] bg-[#EAD9C0]/60 px-2 py-1 rounded-full font-mono truncate max-w-full">
              {product.inci[0].split(" ")[0]} {product.inci[0].split(" ")[1] ?? ""}
            </span>
          </div>
        )}

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <button className="btn-glass-pink btn-ripple w-full py-2.5 text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2">
            <MessageCircle size={13} />
            Commander
          </button>
        </a>
      </div>
    </article>
  );
}
