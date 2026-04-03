"use client";

import { useState, useEffect, useRef } from "react";
import type { GammeDef } from "@/lib/products";

interface GammeNavProps {
  gammes: GammeDef[];
  gammeNames: Record<string, string>;
}

export default function GammeNav({ gammes, gammeNames }: GammeNavProps) {
  const [activeKey, setActiveKey] = useState<string>(gammes[0]?.key ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    gammes.forEach((gamme) => {
      const el = document.getElementById(`gamme-${gamme.key}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveKey(gamme.key);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [gammes]);

  // Auto-scroll the nav pill into view when active changes
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector(`[data-key="${activeKey}"]`) as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeKey]);

  const scrollToGamme = (key: string) => {
    const el = document.getElementById(`gamme-${key}`);
    if (el) {
      const offset = 112; // navbar (64px) + gamme nav (~48px)
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-16 z-40 glass shadow-sm border-b border-white/20">
      <div
        ref={scrollRef}
        className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none py-1.5"
        style={{ scrollbarWidth: "none" }}
      >
        {gammes.map((gamme) => {
          const isActive = activeKey === gamme.key;
          return (
            <button
              key={gamme.key}
              data-key={gamme.key}
              onClick={() => scrollToGamme(gamme.key)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "bg-[#E299A1] text-white shadow-sm"
                  : "text-[#2C1A0E]/60 hover:text-[#2C1A0E] hover:bg-[#E299A1]/10"
              }`}
            >
              <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-white/70" : "text-[#E299A1]/60"}`}>
                {gamme.number}
              </span>
              {gammeNames[gamme.key]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
