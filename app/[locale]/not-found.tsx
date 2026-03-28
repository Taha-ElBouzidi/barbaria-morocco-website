import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/brand_photos/brand-lifestyle-5.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A0E]/70 via-[#2C1A0E]/55 to-[#2C1A0E]/80" />

      <div className="relative z-10 text-center text-[#F7F2EA] px-6 max-w-lg mx-auto">
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-[#C9963A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#C9963A]" />
          <div className="w-12 h-px bg-[#C9963A]/60" />
        </div>

        <p className="text-xs tracking-[0.5em] uppercase text-[#C9963A] mb-4">
          Barbaria Morocco
        </p>
        <h1 className="font-playfair text-8xl md:text-9xl font-bold mb-4 drop-shadow-lg">
          404
        </h1>
        <p className="font-playfair text-xl italic text-[#E8C97A] mb-3">
          Page introuvable
        </p>
        <p className="text-[#F7F2EA]/70 mb-10 leading-relaxed">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>

        <Link href="/">
          <button className="btn-glass-gold btn-ripple px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium rounded-full">
            Retour à l&apos;accueil
          </button>
        </Link>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="w-12 h-px bg-[#C9963A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#C9963A]" />
          <div className="w-12 h-px bg-[#C9963A]/60" />
        </div>
      </div>
    </div>
  );
}
