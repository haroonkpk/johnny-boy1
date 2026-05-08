
"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import PageHero from "@/components/PageHero";

// TypeScript Interface for Testimonial data
interface Testimonial {
  id: number;
  name: string;
  role: string;
  videoSrc: string;
  tag: string;
}

// Interface for VideoCard Props
interface VideoCardProps {
  t: Testimonial;
  isActive: boolean;
  onToggle: () => void;
}

// Plugin register karna zaroori hai
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icons 
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);

const TESTIMONIALS: Testimonial[] = [
  { id: 0, name: "Sarah Jenkins", role: "Product Designer", videoSrc: "/video1.mp4", tag: "Review" },
  { id: 1, name: "Marcus Chen", role: "Growth Lead", videoSrc: "/video2.mp4", tag: "Review" },
  { id: 2, name: "Elena Rodriguez", role: "Founder @ EcoFlow", videoSrc: "/video3.mp4", tag: "Review" },
];

function VideoCard({ t, isActive, onToggle }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <Card className="relative flex flex-col w-full h-[450px] overflow-hidden bg-white border border-black/[0.08] hover:border-black/[0.2] transition-colors duration-300 p-0">
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
        <Button
          variant="review"
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[64px] h-[64px]"
        >
          {isActive ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <div className="absolute top-6 left-6 z-10">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-widest">
            {t.tag}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default function ReviewSection() {
  // Added type for state (number or null)
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".header-content, .video-grid-item", { opacity: 0, y: 50 });

      gsap.to(".header-content", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(".video-grid-item", {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".video-grid",
          start: "top 85%",
          onEnter: () => ScrollTrigger.refresh()
        }
      });
    }, containerRef);

    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    return () => {
        ctx.revert();
        clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <PageHero 
        title={<>Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Visionaries.</span></>}
        subtitle="Real stories from real people who bought our products."
        badge="Reviews"
      />
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

        <div className="video-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="video-grid-item">
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
  );
}