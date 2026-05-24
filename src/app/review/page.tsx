
"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import PageHero from "@/components/PageHero";
import { getSiteContent } from "@/actions/content";
import { getReviewVideos } from "@/actions/review";

// TypeScript Interface for Testimonial data
interface Testimonial {
  id: string;
  videoSrc: string;
  thumbnailUrl: string;
  tag: string;
}

// Interface for VideoCard Props
interface VideoCardProps {
  t: Testimonial;
  isActive: boolean;
  onToggle: () => void;
}


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

function VideoCard({ t, isActive, onToggle }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (isActive) {
      setHasPlayed(true);
    }
  }, [isActive]);

  useEffect(() => {
    const vid = videoRef.current;
    if (hasPlayed && vid) {
      if (isActive) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    }
  }, [isActive, hasPlayed]);

  return (
    <Card className="relative flex flex-col w-full h-[450px] overflow-hidden bg-white border border-black/[0.08] hover:border-black/[0.2] transition-colors duration-300 p-0">
      <div className="relative flex-1 cursor-pointer bg-gray-100 overflow-hidden" onClick={onToggle}>
        {!hasPlayed && t.thumbnailUrl && (
          <img
            src={t.thumbnailUrl}
            alt="Review Thumbnail"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {hasPlayed && (
          <video
            ref={videoRef}
            src={t.videoSrc}
            poster={t.thumbnailUrl}
            playsInline
            loop
            muted={!isActive}
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}
        <Button
          variant="review"
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[64px] h-[64px]"
        >
          {isActive ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <div className="absolute top-6 left-6 z-20">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-widest">
            {t.tag}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default function ReviewSection() {
  // Added type for state (string or null)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [content, setContent] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const containerRef = useRef<HTMLElement>(null);

useEffect(() => {
  const fetchAll = async () => {
    try {
      const [siteData, videoData] = await Promise.all([getSiteContent(), getReviewVideos()]);
      setContent(siteData);
      setVideos(videoData || []);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };
  fetchAll();
}, []);
 

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
        title={content?.reviewTitle || 'Trusted by <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Visionaries.</span>'}
        subtitle={content?.reviewSubtitle || "Real stories from real people who bought our products."}
        badge={content?.reviewBadge || "Reviews"}
      />
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

        <div className="video-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {videos.map((t) => (
            <div key={t._id} className="video-grid-item">
              <VideoCard
                t={{ 
                    id: t._id, 
                    videoSrc: t.videoUrl, 
                    thumbnailUrl: t.thumbnailUrl,
                    tag: t.tag || "Review" 
                }}
                isActive={activeVideoId === t._id}
                onToggle={() => setActiveVideoId(activeVideoId === t._id ? null : t._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}