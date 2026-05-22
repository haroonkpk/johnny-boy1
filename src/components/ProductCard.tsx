"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import CloudinaryImage from "@/components/ui/CloudinaryImage";

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
  type: "local" | "regular";
}

export default function ProductCard({ product, type }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLImageElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const info = infoRef.current;
    const water = waterRef.current;
    const fruit = fruitRef.current;
    const bottle = bottleRef.current;
    const desc = descRef.current;

    if (!card || !info || !desc) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Initialize states
      gsap.set(info, { y: "65%" });
      gsap.set(desc, { opacity: 0 });

      //Product
      gsap.fromTo(
        bottle,
        { yPercent: 80, scale: 1.8 },
        {
          yPercent: -60,
          scale: 1.8,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );

      // Hover Interaction (Desktop)
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(info, { y: "0%", duration: 0.5, ease: "power2.out" }, 0)
        .to(
          water,
          { scale: 1.1, opacity: 0.6, duration: 0.7, ease: "power2.out" },
          0,
        )
        .to(desc, { opacity: 1, duration: 0.3 }, 0.2);

      const onMouseEnter = () => {
        if (window.innerWidth > 768) hoverTl.play();
      };
      const onMouseLeave = () => {
        if (window.innerWidth > 768) hoverTl.reverse();
      };

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);

      // Mobile Scroll Animation
      mm.add("(max-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: card,
          start: "center 65%",
          end: "center 35%",
          onEnter: () => {
            setIsExpanded(true);
            gsap.to(info, { y: "0%", duration: 0.5, ease: "power2.out" });
            gsap.to(desc, { opacity: 1, duration: 0.3, delay: 0.2 });
          },
          onLeave: () => {
            setIsExpanded(false);
            gsap.to(info, { y: "65%", duration: 0.5, ease: "power2.in" });
            gsap.to(desc, { opacity: 0, duration: 0.2 });
          },
          onEnterBack: () => {
            setIsExpanded(true);
            gsap.to(info, { y: "0%", duration: 0.5, ease: "power2.out" });
            gsap.to(desc, { opacity: 1, duration: 0.3, delay: 0.2 });
          },
          onLeaveBack: () => {
            setIsExpanded(false);
            gsap.to(info, { y: "65%", duration: 0.5, ease: "power2.in" });
            gsap.to(desc, { opacity: 0, duration: 0.2 });
          },
        });
      });
    }, cardRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const togglePanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isExpanded;
    setIsExpanded(newState);

    gsap.to(infoRef.current, {
      y: newState ? "0%" : "65%",
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(descRef.current, {
      opacity: newState ? 1 : 0,
      duration: 0.3,
    });
  };

  return (
    <Card
      ref={cardRef}
      className="relative w-[clamp(280px,100%,400px)] h-[clamp(450px,75vh,550px)] mx-auto p-0 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500 cursor-pointer group rounded-3xl"
    >
      <div ref={waterRef} className="absolute inset-0">
        {/* --- BACKGROUND + FRUITS --- */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${product.comingSoon ? "grayscale brightness-75 contrast-125" : ""}`}
        >
          <CloudinaryImage
            src={product?.bg ? product.bg : "/images/bg1.png"}
            alt="background"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover z-0"
          />

          {/* 2. FRUIT (MIDDLE LAYER) */}
          {product?.fruits && (
            <CloudinaryImage
              src={product.fruits}
              alt="fruit"
              width={500}
              height={500}
              sizes="(max-width: 768px) 90vw, 400px"
              className="absolute top-1/2 left-1/2 
                 -translate-x-1/2 -translate-y-1/2
                 w-[90%] md:w-[100%] h-auto
                 z-10
                 drop-shadow-2xl"
            />
          )}
        </div>

        {/* 3. WATER EFFECT (ON TOP OF BG + FRUIT) */}
        <Image
          src="/images/ice.webp"
          alt="water effect"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover z-20 opacity-60 mix-blend-screen pointer-events-none"
        />

        {/* --- 4. COMING SOON OVERLAY (Rotated & Styled) --- */}
        {product.comingSoon && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <div className="relative transform -rotate-12 scale-110">
              {/* -rotate-12 text ka angle change kar dega taake wo straight na lage */}

              {/* Background Glow for Premium Look */}
              <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full"></div>

              <h2 className="relative text-white text-4xl md:text-5xl font-black tracking-tighter uppercase border-y-4 border-white/90 py-1 px-6 shadow-2xl text-center leading-none">
                Coming <br />
                <span className="text-white">Soon</span>
              </h2>
            </div>
          </div>
        )}
      </div>

      {/* --- 3. MAIN PRODUCT BOTTLE --- */}
      {!product.comingSoon && product.image && (
        <CloudinaryImage
          ref={bottleRef}
          src={product.image}
          alt={product.name}
          width={600}
          height={800}
          sizes="(max-width: 768px) 100vw, 400px"
          className="absolute translate-x-[-25%] scale-180 z-20 w-full h-auto object-contain "
        />
      )}

      <div
        ref={infoRef}
        className="absolute bottom-0 left-0 right-0 z-30 bg-black px-[clamp(1rem,3vw,1.5rem)] pt-[clamp(1.5rem,3vw,2rem)] pb-[clamp(3.5rem,10vw,5rem)] rounded-t-2xl "
      >
        {/* Toggle Button */}
        <button
          onClick={togglePanel}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors md:hidden"
        >
          {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>

        <div className="flex flex-col h-full items-center text-center">
          {/* Always Visible Title */}
          <h3 className="text-[clamp(1.25rem,4vw,1.75rem)] pb-22 font-black text-white uppercase italic tracking-wider leading-tight">
            {product.name}
          </h3>

          {/* Description */}
          <div ref={descRef} className="mt-[clamp(0.5rem,1.5vw,1rem)]">
            <p className="text-[clamp(9px,1.2vw,11px)] text-white/50 font-bold uppercase tracking-[0.2em] mb-2">
              Flavor Notes
            </p>

            <p className="text-[clamp(0.85rem,1.5vw,0.95rem)] text-white/80 leading-relaxed font-medium px-2">
              {product.comingSoon ? (
                <span className="inline-block bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-md transform rotate-[-3deg] border border-yellow-500/30">
                  Coming Soon
                </span>
              ) : (
                product.description || `${product.name} delivers a smooth, refreshing experience crafted for perfection.`
              )}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
