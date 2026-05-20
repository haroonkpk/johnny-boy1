"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Button from "../../ui/Button";
import { Card } from "../../ui/card";
import { SectionHeading } from "../../ui/SectionHeading";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowLeftIcon, ArrowRightIcon, Pause, PauseCircleIcon, Play, PlayCircleIcon } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);
}

// Data
const TESTIMONIALS = [
  { id: 0, videoSrc: "/video2.mp4" },
  { id: 1, videoSrc: "/video1.mp4" },
  { id: 2, videoSrc: "/video3.mp4" },
];


// Video Card Component
function VideoCard({ t, isActive, onToggle }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isActive]);

  return (
    <Card className="relative flex flex-col w-full h-full overflow-hidden bg-white border border-black/[0.08] hover:border-black/[0.2] transition-colors duration-300 p-0">
      <div
        className="relative flex-1 cursor-pointer bg-gray-100 overflow-hidden"
        onClick={onToggle}
      >
        <video
          ref={videoRef}
          src={t.videoSrc}
          poster={t.videoSrc.replace(".mp4", ".png")}
          playsInline
          loop
          muted={!isActive}
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <Button
          variant="review"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[64px] h-[64px]"
        >
          {isActive ? <Pause /> : <Play />}
        </Button>
      </div>
    </Card>
  );
}

export default function HappyCustomers() {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  
  const [data, setData] = useState({
    customerTitle: "What our customers say",
    customerSubtitle: "Real stories from real people who bought our product",
    customerBadge: "Testimonials"
  });

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content", { cache: 'no-store' });
        const json = await res.json();
        if (json && isMounted) {
          setData({
            customerTitle: json.customerTitle || "What our customers say",
            customerSubtitle: json.customerSubtitle || "Real stories from real people who bought our product",
            customerBadge: json.customerBadge || "Testimonials"
          });
          setTimeout(() => {
            if (isMounted) ScrollTrigger.refresh();
          }, 100);
        }
      } catch (error) { console.error(error); }
    };
    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    let draggables;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: wrapper,
        pin: true,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        }),
      });

      draggables = Draggable.create(track, {
        type: "x",
        bounds: { minX: () => -getScrollAmount(), maxX: 0 },
        inertia: true,
        onDrag: function () {
          if (!scrollTriggerRef.current) return;
          const progress = this.x / -getScrollAmount();
          const target =
            scrollTriggerRef.current.start +
            (scrollTriggerRef.current.end - scrollTriggerRef.current.start) * progress;
          gsap.set(window, { scrollTo: target });
        },
      });
    }, wrapperRef);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (draggables && draggables.length > 0) {
        draggables.forEach((d) => d.kill());
      }
      ctx.revert();
    };
  }, []);

  const moveTrack = (direction) => {
    const step = window.innerWidth * 0.5;
    const currentScroll = window.scrollY;
    const targetScroll =
      direction === "next" ? currentScroll + step : currentScroll - step;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const words = data.customerTitle.split(' ');
  const lastWord = words.pop();
  const remainingText = words.join(' ');

  return (
    <section className="bg-[var(--color-cream)] relative min-h-screen pb-20">
      <div className="container mx-auto max-w-[1500px] pt-24 pb-12 px-6">
        <SectionHeading
          title={
            <>
              {remainingText}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {lastWord}
              </span>
            </>
          }
          subtitle={
            <div className="whitespace-pre-line">
              {data.customerSubtitle}
            </div>
          }
          badge={data.customerBadge}
          mode="light"
        />
      </div>

      <div ref={wrapperRef} className="relative overflow-hidden">
        <div className="h-screen flex items-center relative">
          <div
            ref={trackRef}
            className="flex gap-6 px-[7.5vw] will-change-transform"
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="shrink-0"
                style={{
                  width: "clamp(300px, 70vw, 800px)",
                  height: "clamp(400px, 65vh, 600px)",
                }}
              >
                <VideoCard
                  t={t}
                  isActive={activeVideoId === t.id}
                  onToggle={() =>
                    setActiveVideoId(activeVideoId === t.id ? null : t.id)
                  }
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-0 w-full z-[100] flex justify-center gap-4 pointer-events-none">
            <Button
              variant="secondary-outline"
              onClick={() => moveTrack("prev")}
              className="pointer-events-auto py-[clamp(1rem,2.5vw,1.5rem)]"
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              variant="secondary"
              onClick={() => moveTrack("next")}
              className="pointer-events-auto py-[clamp(1rem,2.5vw,1.5rem)]"
            >
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
