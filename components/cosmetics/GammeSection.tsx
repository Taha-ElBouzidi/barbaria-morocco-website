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
    <section id={`gamme-${gamme.key}`} className="py-16 sm:py-20 scroll-mt-28">
      {/* Gamme header */}
      <div className="flex items-start gap-6 mb-10 sm:mb-12">
        <div className="flex-shrink-0">
          <span className="font-playfair text-5xl sm:text-6xl font-bold text-[#E299A1]/20 leading-none select-none">
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
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {gamme.products.map((product) => (
          <StaggerItem key={product.key}>
            <CompactProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
