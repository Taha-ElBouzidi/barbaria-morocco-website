import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import CompactProductCard from "./CompactProductCard";
import type { GammeDef } from "@/lib/products";

interface GammeSectionProps {
  gamme: GammeDef;
  gammeName: string;
  gammeTagline: string;
}

export default function GammeSection({ gamme, gammeName, gammeTagline }: GammeSectionProps) {
  return (
    <section id={`gamme-${gamme.key}`} className="py-12 sm:py-16 md:py-20 scroll-mt-24 sm:scroll-mt-28">
      {/* Gamme header */}
      <div className="flex items-start gap-6 mb-10 sm:mb-12">
        <div className="flex-shrink-0">
          <span className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-[#E299A1]/20 leading-none select-none">
            {gamme.number}
          </span>
        </div>
        <div className="pt-2">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2C1A0E] mb-1">
            {gammeName}
          </h2>
          <p className="text-xs tracking-[0.3em] uppercase text-[#9B8B7A]">{gammeTagline}</p>
          <div className="w-10 h-px bg-[#E299A1]/60 mt-3" />
        </div>
      </div>

      {/* Product grid */}
      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {gamme.products.map((product) => (
          <StaggerItem key={product.key}>
            <CompactProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
