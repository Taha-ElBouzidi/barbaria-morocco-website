"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Mail, Copy, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "@/components/Navbar";
import { CONTACT_EMAIL } from "@/lib/constants";
import { buildWhatsAppText, buildEmailText } from "@/lib/order-utils";
import type { OrderState } from "@/lib/order-utils";
import type { GammeDef, ProductDef } from "@/lib/products";

interface ShareActionsProps {
  order: OrderState;
  gammes: GammeDef[];
  textileProducts: ProductDef[];
  disabled: boolean;
  compact?: boolean;
}

export default function ShareActions({ order, gammes, textileProducts, disabled, compact = false }: ShareActionsProps) {
  const t = useTranslations("order");
  const cosmeticsT = useTranslations("cosmetics.products");
  const cosmeticsGammesT = useTranslations("cosmetics.gammes");
  const textileT = useTranslations("textile.products");
  const [copied, setCopied] = useState(false);

  const buildMaps = () => {
    const productNames = new Map<string, string>();
    const gammeNames = new Map<string, string>();

    gammes.forEach((gamme) => {
      try { gammeNames.set(gamme.key, cosmeticsGammesT(`${gamme.key}.name` as never)); } catch { gammeNames.set(gamme.key, gamme.key); }
      gamme.products.forEach((p) => {
        try { productNames.set(p.key, cosmeticsT(`${p.key}.name` as never)); } catch { productNames.set(p.key, p.key); }
      });
    });

    textileProducts.forEach((p) => {
      try { productNames.set(p.key, textileT(`${p.key}.name` as never)); } catch { productNames.set(p.key, p.key); }
    });

    return { productNames, gammeNames };
  };

  const handleWhatsApp = () => {
    const { productNames, gammeNames } = buildMaps();
    const header = t("whatsapp_header");
    const footer = t("whatsapp_footer");
    const text = buildWhatsAppText(order, gammes, textileProducts, productNames, gammeNames, header, footer);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    const { productNames, gammeNames } = buildMaps();
    const body = buildEmailText(order, gammes, textileProducts, productNames, gammeNames);
    const subject = "Commande Barbaria Morocco";
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const handleCopy = async () => {
    const { productNames, gammeNames } = buildMaps();
    const header = t("whatsapp_header");
    const footer = t("whatsapp_footer");
    const text = buildWhatsAppText(order, gammes, textileProducts, productNames, gammeNames, header, footer);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleWhatsApp}
          disabled={disabled}
          aria-label={t("share_whatsapp")}
          className="w-10 h-10 rounded-full bg-[#25D366]/90 text-white flex items-center justify-center shadow-sm hover:bg-[#25D366] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaWhatsapp size={18} />
        </button>
        <button
          onClick={handleEmail}
          disabled={disabled}
          aria-label={t("share_email")}
          className="w-10 h-10 rounded-full btn-glass-gold flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Mail size={16} />
        </button>
        <button
          onClick={handleCopy}
          disabled={disabled}
          aria-label={copied ? t("share_copied") : t("share_copy")}
          className="w-10 h-10 rounded-full btn-glass-outline-dark flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {copied ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleWhatsApp}
        disabled={disabled}
        className="btn-glass-pink btn-ripple w-full py-3 text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MessageCircle size={14} />
        {t("share_whatsapp")}
      </button>

      <button
        onClick={handleEmail}
        disabled={disabled}
        className="btn-glass-gold btn-ripple w-full py-3 text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Mail size={14} />
        {t("share_email")}
      </button>

      <button
        onClick={handleCopy}
        disabled={disabled}
        className="btn-glass-outline-dark w-full py-3 text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
        {copied ? t("share_copied") : t("share_copy")}
      </button>
    </div>
  );
}
