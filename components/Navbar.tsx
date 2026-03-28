"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const WHATSAPP_NUMBER = "TODO_WHATSAPP"; // TODO: add WhatsApp number
const INSTAGRAM_HANDLE = "barbaria_00";

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const collections = [
    { href: "/cosmetics", label: t("cosmetics"), dot: "#E299A1" },
    { href: "/textile",   label: t("textile"),   dot: "#A0856A" },
    { href: "/food",      label: t("food"),       dot: "#C9963A" },
  ];

  const mainLinks = [
    { href: "/about",   label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const otherLocale = locale === "fr" ? "en" : "fr";

  const isHeroPage = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen || collectionsOpen
          ? "glass shadow-sm"
          : isHeroPage
          ? "bg-transparent"
          : "glass"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/brand_photos/barbaria-logo.jpg"
            alt="Barbaria Morocco"
            width={36}
            height={36}
            className="rounded-full"
          />
          <div className="flex flex-col leading-none">
            <span
              className={`font-playfair text-lg font-bold tracking-widest uppercase transition-colors duration-300 ${
                scrolled || !isHeroPage ? "text-[#2C1A0E]" : "text-[#F7F2EA]"
              }`}
            >
              Barbaria
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#C9963A] uppercase font-medium">
              Morocco
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Collections dropdown */}
          <div className="relative">
            <button
              className={`flex items-center gap-1 text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[#C9963A] ${
                scrolled || !isHeroPage ? "text-[#2C1A0E]" : "text-[#F7F2EA]"
              }`}
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
              aria-expanded={collectionsOpen}
              aria-haspopup="true"
            >
              {t("collections")}
              <ChevronDown size={14} className={`transition-transform duration-300 ${collectionsOpen ? "rotate-180" : ""}`} />
            </button>
            {collectionsOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                onMouseEnter={() => setCollectionsOpen(true)}
                onMouseLeave={() => setCollectionsOpen(false)}
              >
                <div className="glass rounded-sm py-2 min-w-[180px] shadow-lg">
                  {collections.map(({ href, label, dot }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2C1A0E] hover:text-[#C9963A] transition-colors"
                      onClick={() => setCollectionsOpen(false)}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {mainLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[#C9963A] ${
                pathname === href
                  ? "text-[#C9963A] font-medium"
                  : scrolled || !isHeroPage
                  ? "text-[#2C1A0E]"
                  : "text-[#F7F2EA]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: locale + mobile */}
        <div className="flex items-center gap-4">
          <a
            href={`/${otherLocale}${pathname}`}
            className={`text-xs tracking-widest uppercase px-3 py-1.5 rounded-full glass border-none hover:shadow-md transition-all duration-300 ${
              scrolled || !isHeroPage ? "text-[#2C1A0E]/70 hover:text-[#C9963A]" : "text-[#F7F2EA]/70 hover:text-[#C9963A]"
            }`}
          >
            {otherLocale.toUpperCase()}
          </a>
          <button
            className={`md:hidden p-1 transition-transform duration-200 hover:scale-110 ${
              scrolled || !isHeroPage ? "text-[#2C1A0E]" : "text-[#F7F2EA]"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/30 px-6 py-6">
          <p className="text-xs tracking-widest uppercase text-[#C9963A] mb-3">{t("collections")}</p>
          <ul className="flex flex-col gap-3 mb-6">
            {collections.map(({ href, label, dot }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 text-sm tracking-wider uppercase text-[#2C1A0E] hover:text-[#C9963A] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dot }} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-3">
            {mainLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm tracking-wider uppercase text-[#2C1A0E] hover:text-[#C9963A] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export { WHATSAPP_NUMBER, INSTAGRAM_HANDLE };
