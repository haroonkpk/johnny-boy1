
"use client";

import { useRef, useState, useEffect } from "react";

// Data 
const TESTIMONIALS = [
  { id: 0, videoSrc: "/video2.mp4" },
  { id: 1, videoSrc: "/video1.mp4" },
  { id: 2, videoSrc: "/video3.mp4" },
  { id: 3, videoSrc: "/video2.mp4" },
];

// Icons 
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);
const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
    <div className="relative flex flex-col w-full h-full rounded-2xl overflow-hidden bg-white border border-black/[0.08] hover:border-black/[0.2] transition-colors duration-300 shadow-sm">
      <div className="relative flex-1 cursor-pointer bg-gray-100 overflow-hidden" onClick={onToggle}>
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
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[64px] h-[64px] rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm text-black transition-all hover:scale-110 active:scale-95 border border-black/10 shadow-xl"
        >
          {isActive ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
}

export default function HappyCustomers() {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { Draggable } = await import("gsap/Draggable");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");

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

        Draggable.create(track, {
          type: "x",
          bounds: { minX: () => -getScrollAmount(), maxX: 0 },
          inertia: true,
          onDrag: function() {
            const progress = this.x / -getScrollAmount();
            const target = scrollTriggerRef.current.start + (scrollTriggerRef.current.end - scrollTriggerRef.current.start) * progress;
            gsap.set(window, { scrollTo: target });
          }
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  const moveTrack = async (direction) => {
    const { gsap } = await import("gsap");
    const step = window.innerWidth * 0.5;
    const currentScroll = window.scrollY;
    const targetScroll = direction === 'next' ? currentScroll + step : currentScroll - step;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };

  return (
    <section className="bg-[#f8f8f8] relative min-h-screen pb-20">
      {/* 1. Header */}
      <div className="text-center pt-24 pb-12 px-6">
        <h2 className="font-bold leading-[1.1] text-black tracking-tighter" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
          What our customers say
        </h2>
         <p className="text-lg mt-4 opacity-50 max-w-2xl mx-auto text-gray-600">
           Real stories from real people who bought our product
         </p>
      </div>

      {/* 2. GSAP Wrapper (Pining area) */}
      <div ref={wrapperRef} className="relative overflow-hidden">
        {/* Is div ko humne sticky banaya hai taki arrows iske bottom par chipke rahein */}
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
                  onToggle={() => setActiveVideoId(activeVideoId === t.id ? null : t.id)}
                />
              </div>
            ))}
          </div>

          {/* ARROWS: Inhe track se bahar aur wrapper ke andar rakha hai */}
          <div className="absolute bottom-10 left-0 w-full z-[100] flex justify-center gap-4 pointer-events-none">
            <button
              onClick={() => moveTrack('prev')}
              className="pointer-events-auto p-4 rounded-full bg-white text-black shadow-xl border border-black/5 hover:scale-110 active:scale-95 transition-all"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => moveTrack('next')}
              className="pointer-events-auto p-4 rounded-full bg-black text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
            >
              <ArrowRight />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}