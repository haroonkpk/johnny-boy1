"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/types/product";

gsap.registerPlugin(ScrollTrigger);

interface ProductHighlightCardProps {
  product: Product;
  index: number;
}

const ProductHighlightCard = ({ product, index }: ProductHighlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLImageElement>(null);
  const vapeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    ScrollTrigger.getAll()
      .filter((t) => t.vars.id?.startsWith(`card-${product._id || product.id}`))
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
            id: `card-${product._id || product.id}-fruit`,
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
            id: `card-${product._id || product.id}-vape`,
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    }, card);

    return () => ctx.revert();
  }, [product._id, product.id, index]);

  return (
    <div
      ref={cardRef}
      className="relative w-[260px] h-[420px] flex items-end group overflow-hidden rounded-t-[130px] rounded-b-2xl border-4 border-white"
    >
      {/* Layer 1 — Background */}
      <img
        src={product.bg}
        alt="background"
        className="absolute inset-0 w-full h-[120%] object-cover brightness-95 group-hover:scale-110 transition-transform duration-700 z-0 will-change-transform"
        style={{ top: "-10%" }}
      />

      {/* Layer 2 — Fruits Image */}
      <img
        ref={fruitRef}
        src={product.fruits}
        alt="fruits"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[5] w-[80%] h-auto object-contain pointer-events-none will-change-transform"
      />

      {/* Layer 3 — Product / Vape Image */}
      <img
        ref={vapeRef}
        src={product.image}
        alt={product.name}
        className="relative z-[10] -translate-x-15 w-full h-auto object-contain cursor-pointer will-change-transform"
      />
      {/* Coming Soon Blur Overlay */}
{product.comingSoon && (
  <div className="absolute inset-0 z-[15] bg-black/25 backdrop-blur-[6px]" />
)}
   <h3
  className={`absolute top-5 left-1/2 -translate-x-1/2 z-[20] text-white text-center font-bold text-xs leading-tight px-4 py-2 rounded-full backdrop-blur-md shadow-lg max-w-[85%] `}
>
  {product.name}
</h3>
{product.comingSoon && (
  <div className="absolute inset-0 flex items-center justify-center z-[50] pointer-events-none">
    <div className="rotate-[-20deg]">
      <span className="inline-block bg-gradient-to-r from-black/80 via-neutral-900/90 to-black/80 backdrop-blur-xl text-white text-[11px] md:text-xs font-extrabold uppercase tracking-[0.4em] px-10 py-2 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
        Coming Soon
      </span>
    </div>
  </div>
)}
      
    </div>
  );
};

export default ProductHighlightCard;
