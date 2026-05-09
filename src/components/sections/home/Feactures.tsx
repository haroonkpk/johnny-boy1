"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../ui/Button";
import { SectionHeading } from "../../ui/SectionHeading";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import { seriesData, SeriesKey, FeatureItem } from "@/data/featuresData";

//  Single Card
const ProductCard = ({
  item,
  index,
}: {
  item: FeatureItem;
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
        className="relative scale-150 z-[10] -translate-x-15 w-full h-auto object-contain cursor-pointer will-change-transform"
      />
    </div>
  );
};

// ─── Arrow Button Component ──────────────────────────────────────────────────
const ArrowBtn = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <Button
    variant="secondary"
    onClick={onClick}
    className="!p-4"
    aria-label={direction === "left" ? "Previous" : "Next"}
  >
    {direction === "left" ? (
      <ChevronLeft size={18} strokeWidth={2.2} />
    ) : (
      <ChevronRight size={18} strokeWidth={2.2} />
      )}
  </Button>
);

// ─── Dot Indicators ──────────────────────────────────────────────────────────
const DotIndicators = ({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) => (
  <div className="flex items-center gap-[6px] justify-center mt-6">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDotClick(i)}
        aria-label={`Go to card ${i + 1}`}
        className={`
          rounded-full transition-all duration-300 cursor-pointer border-0 p-0
          ${
            i === active
              ? "w-6 h-2 bg-black"
              : "w-2 h-2 bg-black/20 hover:bg-black/40"
          }
        `}
      />
    ))}
  </div>
);

//  Main Section
const Features = () => {
  const [activeSeries, setActiveSeries] = useState<SeriesKey>("regular");
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const items = seriesData[activeSeries];
  const CARD_WIDTH = 260 + 40;

  // Reset active card when series changes
  useEffect(() => {
    setActiveCard(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeSeries]);

  // Marquee animation
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

  // Scroll & sync dot
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const next =
      direction === "left"
        ? Math.max(0, activeCard - 1)
        : Math.min(items.length - 1, activeCard + 1);
    setActiveCard(next);
    container.scrollTo({ left: next * CARD_WIDTH, behavior: "smooth" });
  };

  const goToCard = (i: number) => {
    setActiveCard(i);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: i * CARD_WIDTH,
        behavior: "smooth",
      });
    }
  };

  // Track scroll position → update active dot
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollLeft / CARD_WIDTH);
      setActiveCard(Math.min(idx, items.length - 1));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [items.length, CARD_WIDTH]);

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

      {/* 2. Cards + Arrows */}
      <div className="relative z-10 w-full mt-8">
        {/* ── Arrow Row + Scrollable Area ── */}
        <div className="flex items-center gap-3 justify-center px-4 md:px-12 max-w-[1580px] mx-auto">
          {/* Left Arrow */}
          <div className="hidden md:flex shrink-0">
            <ArrowBtn direction="left" onClick={() => scroll("left")} />
          </div>

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="
              flex flex-nowrap items-end
              gap-6 md:gap-10
              overflow-x-auto
              hide-scrollbar
              snap-x snap-mandatory
              py-10
              flex-1
              max-w-full lg:max-w-[1500px]
              scroll-smooth
            "
          >
            {items.map((item, i) => (
              <div
                key={`${activeSeries}-${item.id}-${i}`}
                className="snap-center shrink-0"
              >
                <ProductCard item={item} index={i} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <div className="hidden md:flex shrink-0">
            <ArrowBtn direction="right" onClick={() => scroll("right")} />
          </div>
        </div>

        {/* ── Mobile Arrows (below cards) ── */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-2">
          <ArrowBtn direction="left" onClick={() => scroll("left")} />
          <ArrowBtn direction="right" onClick={() => scroll("right")} />
        </div>

        {/* ── Dot Indicators ── */}
        <DotIndicators
          total={items.length}
          active={activeCard}
          onDotClick={goToCard}
        />
      </div>

      {/* 3. Series Toggle Buttons */}
      <div className="flex gap-6 mt-12 z-20">
        {(["local", "regular"] as SeriesKey[]).map((series) => (
          <Button
            key={series}
            variant={activeSeries === series ? "secondary" : "secondary-outline"}
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
