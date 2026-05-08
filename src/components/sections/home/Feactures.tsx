"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../ui/Button";
import { SectionHeading } from "../../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type SeriesKey = "local" | "regular";

const seriesData: Record<
  SeriesKey,
  { id: number; name: string; image: string; fruits: string; bg: string }[]
> = {
  local: [
    {
      id: 101,
      name: "Local Mint",
      image: "/images/vape6.png",
      fruits: "/images/fruit1.png",
      bg: "/images/bg1.jpeg",
    },
    {
      id: 102,
      name: "Local Berry",
      image: "/images/vape6.png",
      fruits: "/images/fruit2.png",
      bg: "/images/bg2.jpeg",
    },
    {
      id: 103,
      name: "Local Mango",
      image: "/images/vape6.png",
      fruits: "/images/fruit3.png",
      bg: "/images/bg3.jpeg",
    },
  ],
  regular: [
    {
      id: 201,
      name: "Reg Classic",
      image: "/images/vape7.png",
      fruits: "/images/fruit3.png",
      bg: "/images/bg3.jpeg",
    },
    {
      id: 202,
      name: "Reg Ice",
      image: "/images/vape9.png",
      fruits: "/images/fruit1.png",
      bg: "/images/bg1.jpeg",
    },
    {
      id: 203,
      name: "Reg Gold",
      image: "/images/vape7.png",
      fruits: "/images/fruit2.png",
      bg: "/images/bg2.jpeg",
    },
  ],
};

//  Single Card
const ProductCard = ({
  item,
  index,
}: {
  item: { id: number; name: string; image: string; fruits: string; bg: string };
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fruitRef = useRef<HTMLImageElement>(null);
  const vapeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    ScrollTrigger.getAll()
      .filter((t) => t.vars.id?.startsWith(`card-${item.id}`))
      .forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      // Mount Animation: fruit & vape scale in on series switch
      gsap.fromTo(
        [fruitRef.current],
        { scale: 0.3, opacity: 0 },
        {
          scale: 1.3,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
          stagger: 0.1,
          delay: index * 0.08,
        },
      );
      gsap.fromTo(
        vapeRef.current,
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
          stagger: 0.1,
          delay: index * 0.08,
        },
      );

      //  Fruit Image
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

      //  Vape / Product Image
      gsap.fromTo(
        vapeRef.current,
        { y: "30%" },
        {
          y: `-${40 + index * 8}%`,
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
      className="relative w-[260px] h-[420px] flex items-end group overflow-hidden rounded-t-[130px] rounded-b-2xl shadow-2xl border-4 border-white/20"
    >
      {/* Layer 1 — Background */}
      <img
        ref={bgRef}
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
        className="absolute bottom-4 left-1/2 scale-[1.3] -translate-x-1/2 z-[5] w-[80%] h-auto object-contain pointer-events-none will-change-transform"
      />

      {/* Layer 3 — Product / Vape Image */}
      <img
        ref={vapeRef}
        src={item.image}
        alt={item.name}
        className="relative z-[10] w-full h-auto object-contain  cursor-pointer will-change-transform"
      />
    </div>
  );
};

//  Main Section
const Features = () => {
  const [activeSeries, setActiveSeries] = useState<SeriesKey>("regular");
  const sectionRef = useRef<HTMLElement>(null);

  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(marqueeRef.current, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 flex flex-col items-center justify-center overflow-hidden bg-[var(--color-cream)]"
    >
      {/* 1. Heading */}
      <div className="container mx-auto max-w-[1500px]">
        <SectionHeading
          title={
            <>
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Products
              </span>
            </>
          }
          subtitle="Choose from our premium local and regular series."
          badge="Collection"
          mode="light"
        />
      </div>

      {/* 2. Cards Grid */}
      <div className="relative z-10 flex flex-wrap items-end justify-center gap-8 md:gap-12 px-4 h-auto md:h-[550px] mt-8">
        {seriesData[activeSeries].map((item, i) => (
          <ProductCard
            key={`${activeSeries}-${item.id}`}
            item={item}
            index={i}
          />
        ))}
      </div>

      {/* 3. Series Toggle Buttons */}
      <div className="flex gap-6 mt-20 z-20">
        {(["local", "regular"] as SeriesKey[]).map((series) => (
          <Button
            key={series}
            variant={
              activeSeries === series ? "secondary" : "secondary-outline"
            }
            onClick={() => setActiveSeries(series)}
          >
            {series === "local" ? "LOCAL SERIES" : "REGULAR SERIES"}
          </Button>
        ))}
      </div>

      {/* 4. Moving Background Text */}
      <div className="absolute bottom-[-5%] left-0 w-[200%] overflow-hidden pointer-events-none z-0">
        <div
          ref={marqueeRef}
          className="flex text-[15rem] font-black text-black/[0.03] select-none whitespace-nowrap will-change-transform"
          style={{ width: "200%" }}
        >
          <span className="mr-20">PREMIUM VAPES</span>
          <span>PREMIUM VAPES</span>
        </div>
      </div>
    </section>
  );
};

export default Features;
