"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "TODO_WHATSAPP"; // TODO: add WhatsApp number
const INSTAGRAM_HANDLE = "barbariamorocco"; // TODO: confirm handle

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "glass shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-playfair text-lg font-bold tracking-widest text-[#1A1A1A] uppercase">
            Barbaria
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#E299A1] uppercase font-medium">
            Morocco
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[#E299A1] ${
                  pathname === href ? "text-[#E299A1] font-medium" : "text-[#1A1A1A]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <a
            href={`/${otherLocale}${pathname}`}
            className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full glass border-none hover:shadow-md transition-all duration-300 text-[#1A1A1A]/70 hover:text-[#E299A1]"
          >
            {otherLocale.toUpperCase()}
          </a>
          <button
            className="md:hidden p-1 transition-transform duration-200 hover:scale-110"
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
          <ul className="flex flex-col gap-5">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm tracking-wider uppercase hover:text-[#E299A1] transition-colors duration-300"
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
