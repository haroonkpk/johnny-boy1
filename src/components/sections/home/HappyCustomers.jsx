"use client";

import { useRef, useState, useEffect } from "react";
import Button from "../../ui/Button";
import { Card } from "../../ui/card";
import { SectionHeading } from "../../ui/SectionHeading";

// Data
const TESTIMONIALS = [
  { id: 0, videoSrc: "/video2.mp4" },
  { id: 1, videoSrc: "/video1.mp4" },
  { id: 2, videoSrc: "/video3.mp4" },
];

// Icons
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const ArrowLeft = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const ArrowRight = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

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
          {isActive ? <PauseIcon /> : <PlayIcon />}
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
  const draggableRef = useRef([]);

  
  // 1. Pehle state banayein
  const [data, setData] = useState({
    customerTitle: "What our customers say",
    customerSubtitle: "Real stories from real people who bought our product",
    customerBadge: "Testimonials"
  });

  // 2. useEffect se data fetch karein
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content", { cache: 'no-store' });
        const json = await res.json();
        if (json) {
          setData({
            customerTitle: json.customerTitle || "What our customers say",
            customerSubtitle: json.customerSubtitle || "Real stories from real people who bought our product",
            customerBadge: json.customerBadge || "Testimonials"
          });
          // Refresh ScrollTrigger to recalculate heights after dynamic content loads
          import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh();
          });
        }
      } catch (error) { console.error(error); }
    };
    fetchContent();
  }, []);

  // ... baaki GSAP wala useEffect waisa hi rahega ...

  useEffect(() => {
    let ctx;
    let isMounted = true;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { Draggable } = await import("gsap/Draggable");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);

      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      ctx = gsap.context(() => {
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

        const draggables = Draggable.create(track, {
          type: "x",
          bounds: { minX: () => -getScrollAmount(), maxX: 0 },
          inertia: true,
          onDrag: function () {
            const progress = this.x / -getScrollAmount();
            const target =
              scrollTriggerRef.current.start +
              (scrollTriggerRef.current.end - scrollTriggerRef.current.start) *
                progress;
            gsap.set(window, { scrollTo: target });
          },
        });
        draggableRef.current = draggables;
      });

      // Refresh ScrollTrigger after a slight delay to ensure heights are correctly calculated
      setTimeout(() => {
        if (isMounted) {
          ScrollTrigger.refresh();
        }
      }, 100);
    };

    init();

    return () => {
      isMounted = false;

      // Clean up Draggable instances
      if (draggableRef.current && draggableRef.current.length > 0) {
        draggableRef.current.forEach((d) => {
          if (d && typeof d.kill === "function") {
            d.kill();
          }
        });
      }

      // Revert GSAP context (kills ScrollTrigger and animations inside the context)
      if (ctx) {
        ctx.revert();
      }

      // Explicitly kill the ScrollTrigger instance if it exists
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      // Refresh ScrollTrigger layout after unmounting to remove pinning styles
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  const moveTrack = async (direction) => {
    const { gsap } = await import("gsap");
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
  // --- YE LOGIC ADD KAREIN ---
const words = data.customerTitle.split(' ');
const lastWord = words.pop(); // Aakhri word nikal lega
const remainingText = words.join(' '); // Baaki words ko wapas jod dega

  return (
    <section className="bg-[var(--color-cream)] relative min-h-screen pb-20">
      {/* 1. Header */}
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
        // subtitle={data.customerSubtitle}
        subtitle={
  <div className="whitespace-pre-line">
    {data.customerSubtitle}
  </div>
}
        badge={data.customerBadge}
        mode="light"
      />
      </div>

      {/* 2. GSAP Wrapper  */}
      <div ref={wrapperRef} className="relative overflow-hidden">
        <div className="h-screen flex items-center relative">
          {/* Moving Videos Track */}
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
              <ArrowLeft />
            </Button>
            <Button
              variant="secondary"
              onClick={() => moveTrack("next")}
              className="pointer-events-auto py-[clamp(1rem,2.5vw,1.5rem)]"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
