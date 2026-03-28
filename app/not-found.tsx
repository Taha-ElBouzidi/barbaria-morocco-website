import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F2EA] px-6">
      <div className="text-center max-w-md">
        <p className="text-xs tracking-[0.5em] uppercase text-[#C9963A] mb-6">
          Barbaria Morocco
        </p>
        <h1 className="font-playfair text-6xl md:text-8xl font-bold text-[#2C1A0E] mb-4">
          404
        </h1>
        <p className="text-[#9B8B7A] mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/fr"
          className="inline-block btn-glass-gold px-8 py-3 text-sm tracking-[0.2em] uppercase rounded-full"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
