"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureItem } from "@/data/featuresData";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  item: FeatureItem;
  index: number;
}

const FeatureCard = ({ item, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLImageElement>(null);
  const vapeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    ScrollTrigger.getAll()
      .filter((t) => t.vars.id?.startsWith(`card-${item.id}`))
      .forEach((t) => t.kill());

    const entryDelay = index * 0.08;

    const ctx = gsap.context(() => {
      // ── Entry: Fruits image ──────────────────────────────────────
      gsap.fromTo(
        fruitRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1.3,
          opacity: 1,
          duration: 0.65,
          ease: "back.out(1.5)",
          delay: entryDelay,
        },
      );

      // ── Entry: Product (vape) image ──────────────────────────────
      gsap.fromTo(
        vapeRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1.5,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
          delay: entryDelay + 0.08,
        },
      );

      // ── Scroll parallax: Fruits ──────────────────────────────────
      gsap.fromTo(
        fruitRef.current,
        { y: "25%", scale: 1.3 },
        {
          y: "-30%",
          scale: 1.8,
          ease: "none",
          scrollTrigger: {
            id: `card-${item.id}-fruit`,
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      // ── Scroll parallax: Product ─────────────────────────────────
      gsap.fromTo(
        vapeRef.current,
        { yPercent: 50 },
        {
          yPercent: -80,
          ease: "none",
          scrollTrigger: {
            id: `card-${item.id}-vape`,
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    }, card);

    return () => ctx.revert();
  }, [item.id, index]);

  return (
    <div
      ref={cardRef}
      className="relative w-[260px] h-[420px] flex items-end group overflow-hidden rounded-t-[130px] rounded-b-2xl border-4 border-white"
    >
      {/* Layer 1 — Background */}
      <img
        src={item.bg}
        alt="background"
        className="absolute inset-0 w-full h-[120%] object-cover brightness-95 group-hover:scale-110 transition-transform duration-700 z-0 will-change-transform"
        style={{ top: "-10%" }}
      />

      {/* Layer 2 — Fruits Image */}
      <img
        ref={fruitRef}
        src={item.fruits}
        alt="fruits"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[5] w-[80%] h-auto object-contain pointer-events-none will-change-transform"
      />

      {/* Layer 3 — Product / Vape Image */}
      <img
        ref={vapeRef}
        src={item.image}
        alt={item.name}
        className="relative z-[10] -translate-x-15 w-full h-auto object-contain cursor-pointer will-change-transform"
      />
   <h3
  className={`absolute top-5 left-1/2 -translate-x-1/2 z-[20] text-white text-center font-bold text-xs leading-tight px-4 py-2 rounded-full backdrop-blur-md shadow-lg max-w-[85%] `}
>
  {item.name}
</h3>
      
    </div>
  );
};

export default FeatureCard;
