"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "../../ui/Button";
import { SectionHeading } from "../../ui/SectionHeading";
import { SeriesKey, Product } from "@/types/product";
import ProductHighlightCard from "@/components/shared/ProductHighlightCard";
import CarouselArrow from "@/components/shared/CarouselArrow";
import DotIndicators from "@/components/shared/DotIndicators";


interface FeaturesProps {
  initialProducts: Product[];
  content: {
    productBadge?: string;
    productTitle?: string;
    productSubtitle?: string;
    productBgText?: string;
  };
}

// const Features = ({ initialProducts }: FeaturesProps) => {
const Features = ({ initialProducts, content }: FeaturesProps) => {
  const [activeSeries, setActiveSeries] = useState<SeriesKey>("regular");
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const items = initialProducts.filter(p => p.series === activeSeries && !p.comingSoon);
  const CARD_WIDTH = 260 + 40;

  // Yeh lines batati hain ke data database (content) se uthao, agar database khali ho to default text chalao
  const badge = content?.productBadge || "Collection";
  const titleText = content?.productTitle || "Explore Our Products";
  const subtitleText = content?.productSubtitle || "Choose from our premium local and regular series.";
  const bgText = content?.productBgText || "PREMIUM VAPES";


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

  // Track scroll position 
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
              {(() => {
                const words = titleText.trim().split(" ");
                if (words.length <= 1) return titleText;
                
                const lastWord = words.pop();
                const mainText = words.join(" ");
                
                return (
                  <>
                    {mainText}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {lastWord}
                    </span>
                  </>
                );
              })()}
            </>
          }
          // subtitle={subtitleText}
          subtitle={
            <div className="whitespace-pre-line">
              {subtitleText}
            </div>
          }
          badge={badge}
          mode="light"
        />
      </div>

      {/* 2. Cards + Arrows */}
      <div className="relative z-10 w-full mt-8">
        {/* ── Arrow Row + Scrollable Area ── */}
        <div className="flex items-center gap-3 justify-center px-4 md:px-12 max-w-[1580px] mx-auto">
          {/* Left Arrow — desktop */}
          <CarouselArrow
            direction="left"
            onClick={() => scroll("left")}
            className="hidden md:flex shrink-0"
          />

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
                key={`${activeSeries}-${item._id || item.id}-${i}`}
                className="snap-center shrink-0"
              >
                <ProductHighlightCard product={item} index={i} />
              </div>
            ))}
          </div>

          {/* Right Arrow — desktop */}
          <CarouselArrow
            direction="right"
            onClick={() => scroll("right")}
            className="hidden md:flex shrink-0"
          />
        </div>

        {/* ── Mobile Arrows (below cards) ── */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-2">
          <CarouselArrow direction="left" onClick={() => scroll("left")} />
          <CarouselArrow direction="right" onClick={() => scroll("right")} />
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
        {/* <div
          ref={marqueeRef}
          className="flex text-[15rem] font-black text-black/[0.03] select-none whitespace-nowrap will-change-transform"
          style={{ width: "200%" }}
        >
          <span className="mr-20">PREMIUM VAPES</span>
          <span>PREMIUM VAPES</span>
        </div> */}
        <div
  ref={marqueeRef}
  className="flex text-[15rem] font-black text-black/[0.03] select-none whitespace-nowrap will-change-transform"
  style={{ width: "200%" }}
>
  <span className="mr-20">{bgText}</span>
  <span>{bgText}</span>
</div>
      </div>
    </section>
  );
};

export default Features;
