"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 pt-16">
      <div className="text-center max-w-md">
        <p className="text-xs tracking-[0.5em] uppercase text-[#C9963A] mb-6">
          Barbaria Morocco
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#2C1A0E] mb-4">
          Oops
        </h1>
        <p className="text-[#9B8B7A] mb-8">
          Une erreur est survenue. Veuillez réessayer.
        </p>
        <button
          onClick={reset}
          className="btn-glass-gold px-8 py-3 text-sm tracking-[0.2em] uppercase rounded-full"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
