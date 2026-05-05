"use client";

import { useRef, useState, useCallback, useEffect } from "react";

//  Data 
const TESTIMONIALS = [
  {
    id: 0,
    videoSrc: "/video2.mp4",
  },
  {
    id: 1,
    videoSrc: "/video1.mp4",
  },
  {
    id: 2,
    videoSrc: "/video3.mp4",
  },
];

//  Icons 
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

//  Video Card 
function VideoCard({ t, isActive, onToggle }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isActive]);

  const onTimeUpdate = useCallback(() => {
    const vid = videoRef.current;
    if (!vid?.duration) return;
    setProgress((vid.currentTime / vid.duration) * 100);
  }, []);

  const onEnded = useCallback(() => {
    onToggle(); 
    setProgress(0);
  }, [onToggle]);

  return (
    <div className="relative flex flex-col w-full h-full rounded-2xl overflow-hidden bg-white border border-black/[0.08] hover:border-black/[0.2] transition-colors duration-300 ">

      <div
        className="relative flex-1 cursor-pointer bg-gray-50 overflow-hidden"
        onClick={onToggle}
      >
       
        <video
          ref={videoRef}
          src={t.videoSrc}
          poster={t.videoSrc.replace(".mp4", ".png")}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-contain"
        />


        {/* Play / Pause button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          aria-label={isActive ? "Pause" : "Play"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                     w-[56px] h-[56px] rounded-full
                     flex items-center justify-center text-white/90
                     backdrop-blur-sm
                     transition-all duration-200 active:scale-95
                     hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.8)",
            border: `1.5px solid rgba(0,0,0,0.1)`,
            color: "#000"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,1)";
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.8)";
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
          }}
        >
          {isActive ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
        
        </div>
  );
}

//  Main Export 
export default function HappyCustomers() {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const wrapperRef = useRef(null); 
  const stickyRef = useRef(null);  
  const trackRef  = useRef(null);  

  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap }           = await import("gsap");
      const { ScrollTrigger }  = await import("gsap/ScrollTrigger");
      const { Draggable }      = await import("gsap/Draggable");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");
      
      gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);

      ScrollTrigger.normalizeScroll(true);

      const wrapper = wrapperRef.current;
      const sticky  = stickyRef.current;
      const track   = trackRef.current;
      if (!wrapper || !sticky || !track) return;

      ctx = gsap.context(() => {
        const getScrollAmount = () => track.scrollWidth - window.innerWidth;

        const st = ScrollTrigger.create({
          trigger: wrapper,
          pin: sticky,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1.5, 
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(track, { x: -self.progress * getScrollAmount() });
          }
        });

        Draggable.create(track, {
          type: "x",
          trigger: track,
          bounds: { minX: -getScrollAmount(), maxX: 0 },
          dragClickables: true,
          onDrag: function() {
            const progress = this.x / -getScrollAmount();
            const targetScroll = st.start + (st.end - st.start) * progress;
            
            gsap.to(window, {
              scrollTo: targetScroll,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="bg-[#f8f8f8] h-fit">
      

      {/* Section header  */}
      <div className="text-center pt-24 pb-16 px-6 relative z-10">
        <h2
          className="font-bold leading-[1.1] text-black tracking-tighter"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          }}
        >
          What our customers say
        </h2>
        <p
          className="text-lg font-normal mt-4 max-w-2xl mx-auto"
          style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Real stories from real people who bought our product
        </p>
      </div>

      <div
        ref={wrapperRef}
        className="relative"
      >
        {/*  viewport panel */}
        <div
          ref={stickyRef}
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: "100vh" }}
        >
         
          <div
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex items-center gap-6 will-change-transform cursor-grab active:cursor-grabbing"
            style={{ paddingLeft: "7.5vw", paddingRight: "7.5vw" }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="relative shrink-0"
                style={{
                  width:  "clamp(320px, 75vw, 900px)",
                  height: "clamp(380px, 78vh, 720px)",
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
        </div>
      </div>
    </section>
  );
}