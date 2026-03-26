"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "./Navbar";

export default function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");

  return (
    <footer className="bg-[#1A1A1A] text-[#FDFCF8] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <span className="font-playfair text-xl font-bold tracking-widest uppercase">
                Barbaria
              </span>
              <br />
              <span className="text-[10px] tracking-[0.3em] text-[#E299A1] uppercase">
                Morocco
              </span>
            </div>
            <p className="text-sm text-[#FDFCF8]/60 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-[#E299A1] mb-4">
              {t("links")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: navT("home") },
                { href: "/products", label: navT("products") },
                { href: "/about", label: navT("about") },
                { href: "/contact", label: navT("contact") },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#FDFCF8]/70 hover:text-[#E299A1] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-[#E299A1] mb-4">
              {t("follow")}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#FDFCF8]/70 hover:text-[#E299A1] transition-colors"
              >
                <FaInstagram size={16} />
                @{INSTAGRAM_HANDLE}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#FDFCF8]/70 hover:text-[#E299A1] transition-colors"
              >
                <FaWhatsapp size={16} />
                WhatsApp
              </a>
              <a
                href="mailto:ta.elbouzidi@gmail.com"
                className="flex items-center gap-2 text-sm text-[#FDFCF8]/70 hover:text-[#E299A1] transition-colors"
              >
                <Mail size={16} />
                ta.elbouzidi@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#FDFCF8]/10 text-center">
          <p className="text-xs text-[#FDFCF8]/40 tracking-wide">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
