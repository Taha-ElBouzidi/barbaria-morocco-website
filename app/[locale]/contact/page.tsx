"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Send, CheckCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "@/components/Navbar";

const FORMSPREE_ID = "TODO_FORMSPREE_ID"; // TODO: replace with your Formspree form ID

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/brand_photos/gift-box-flat.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#F7F2EA]/80 backdrop-blur-md" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9963A] mb-4">Barbaria Morocco</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-[#2C1A0E] mb-4">{t("title")}</h1>
          <p className="text-[#9B8B7A] max-w-md mx-auto">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
                <CheckCircle size={32} className="text-[#C9963A]" />
              </div>
              <p className="font-playfair text-2xl text-[#2C1A0E]">{t("form.success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder={t("form.name")}
                required
                className="rounded-full border-[#DDD0BC] bg-white/70 backdrop-blur-sm px-5 h-12 focus-visible:ring-[#C9963A] focus-visible:ring-1 transition-all duration-300"
              />
              <Input
                name="email"
                type="email"
                placeholder={t("form.email")}
                required
                className="rounded-full border-[#DDD0BC] bg-white/70 backdrop-blur-sm px-5 h-12 focus-visible:ring-[#C9963A] focus-visible:ring-1 transition-all duration-300"
              />
              <Textarea
                name="message"
                placeholder={t("form.message")}
                required
                rows={6}
                className="rounded-2xl border-[#DDD0BC] bg-white/70 backdrop-blur-sm px-5 py-4 focus-visible:ring-[#C9963A] focus-visible:ring-1 resize-none transition-all duration-300"
              />
              {status === "error" && (
                <p className="text-sm text-red-500 px-2">{t("form.error")}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-glass-gold w-full py-3.5 text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Send size={15} />
                {status === "sending" ? t("form.sending") : t("form.submit")}
              </button>
            </form>
          )}
        </div>

        {/* Direct contact */}
        <div className="flex flex-col justify-center gap-6">
          <p className="text-xs tracking-widest uppercase text-[#9B8B7A] mb-2">{t("or")}</p>

          {[
            {
              href: `https://wa.me/${WHATSAPP_NUMBER}`,
              Icon: MessageCircle,
              label: t("whatsapp"),
              sub: `+${WHATSAPP_NUMBER}`,
            },
            {
              href: `https://instagram.com/${INSTAGRAM_HANDLE}`,
              Icon: FaInstagram,
              label: t("instagram"),
              sub: `@${INSTAGRAM_HANDLE}`,
            },
            {
              href: "mailto:ta.elbouzidi@gmail.com",
              Icon: Mail,
              label: t("email_label"),
              sub: "ta.elbouzidi@gmail.com",
            },
          ].map(({ href, Icon, label, sub }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 glass rounded-2xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-full bg-[#C9963A]/10 border border-[#C9963A]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9963A] group-hover:border-[#C9963A] transition-all duration-300">
                <Icon size={18} className="text-[#C9963A] group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="font-medium text-sm text-[#2C1A0E]">{label}</p>
                <p className="text-xs text-[#9B8B7A]">{sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
