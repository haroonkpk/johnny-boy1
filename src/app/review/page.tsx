
"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

const TESTIMONIALS: Testimonial[] = [
  { id: 0, name: "Sarah Jenkins", role: "Product Designer", videoSrc: "/video1.mp4", tag: "Review" },
  { id: 1, name: "Marcus Chen", role: "Growth Lead", videoSrc: "/video2.mp4", tag: "Review" },
  { id: 2, name: "Elena Rodriguez", role: "Founder @ EcoFlow", videoSrc: "/video3.mp4", tag: "Review" },
  { id: 3, name: "David Miller", role: "Software Engineer", videoSrc: "/video4.mp4", tag: "Review" },
];

function VideoCard({ t, isActive, onToggle }: VideoCardProps) {
  // Added proper HTML types for refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(cardRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5 });
    }
  };

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
    <Card
      variant="primary"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-[450px] overflow-hidden border border-white/10 bg-[#1a1a1a]"
    >
      <video
        ref={videoRef}
        src={t.videoSrc}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
          }
        }}
        onEnded={onToggle}
        playsInline
        muted={!isActive}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 p-8 flex flex-col justify-between">
        <span className="self-start px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-widest">{t.tag}</span>
        <div onClick={onToggle} className="cursor-pointer self-center transition-all group-hover:scale-110 ">
           <Button variant="review">Play/Pause</Button>
        </div>
        {/* <div className="space-y-1">
          <h3 className="text-white text-xl font-bold">{t.name}</h3>
          <p className="text-white/60 text-sm">{t.role}</p>
        </div> */}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
        <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }} />
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
    <section ref={containerRef} className="bg-[#0a0a0a] min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1500px] mx-auto relative z-10">
        <SectionHeading 
          title={<>Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Visionaries.</span></>}
          subtitle="Real stories from real people who bought our products."
          badge="Reviews"
          mode="dark"
        />

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
    </section>
  );
}