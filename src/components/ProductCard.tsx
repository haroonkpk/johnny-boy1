"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Product } from "@/store/useProductStore";
import { ChevronDown, ChevronUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
      gsap.fromTo(bottle,
        { yPercent: 20, scale: 1.5 },
        {
          yPercent: -60,
          scale: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      // Hover Interaction (Desktop)
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(info, { y: "0%", duration: 0.5, ease: "power2.out" }, 0)
        .to(water, { scale: 1.1, opacity: 0.6, duration: 0.7, ease: "power2.out" }, 0)
        .to(desc, { opacity: 1, duration: 0.3 }, 0.2);

      const onMouseEnter = () => { if (window.innerWidth > 768) hoverTl.play(); };
      const onMouseLeave = () => { if (window.innerWidth > 768) hoverTl.reverse(); };

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
      ease: "power2.out" 
    });
    
    gsap.to(descRef.current, { 
      opacity: newState ? 1 : 0, 
      duration: 0.3 
    });
  };

  return (
    <Card
      ref={cardRef}
      className="relative w-full h-[520px] p-0 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500 cursor-pointer group rounded-2xl"
    >
      <div
        ref={waterRef}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/bg2ex.png"
          alt="Water Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- 3. MAIN PRODUCT BOTTLE --- */}
      <img
        ref={bottleRef}
        src={product.imageUrl}
        alt={product.title}
        className="absolute translate-x-[-25%] scale-150 z-20 w-full h-auto object-contain "
      />

      <div
        ref={infoRef}
        className="absolute bottom-0 left-0 right-0 z-30 bg-black px-6 pt-6 pb-18 rounded-t-2xl "
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
          <h3 className="text-xl font-black text-white uppercase italic tracking-wider">
            {product.title}
          </h3>

          {/* Description */}
          <div ref={descRef} className="mt-2">
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] mb-2">
              Flavor Notes
            </p>
            <p className="text-sm text-white/80 leading-relaxed font-medium px-2">
              {product.description || "Sweet, tangy and incredibly smooth. Crafted for the perfect refreshing experience."}
            </p>
          </div>

        </div>
      </div>
    </Card>
  );
}