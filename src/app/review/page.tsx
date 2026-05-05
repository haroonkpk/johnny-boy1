
// "use client";

// import { useRef, useState, useEffect, useLayoutEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Plugin register karna zaroori hai
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const TESTIMONIALS = [
//   { id: 0, name: "Sarah Jenkins", role: "Product Designer", videoSrc: "/video1.mp4", tag: "Innovation" },
//   { id: 1, name: "Marcus Chen", role: "Growth Lead", videoSrc: "/video2.mp4", tag: "Results" },
//   { id: 2, name: "Elena Rodriguez", role: "Founder @ EcoFlow", videoSrc: "/video3.mp4", tag: "Efficiency" },
//   { id: 3, name: "David Miller", role: "Software Engineer", videoSrc: "/video4.mp4", tag: "Reliability" },
// ];

// // ... (PlayIcon aur PauseIcon components same rahenge)

// function VideoCard({ t, isActive, onToggle }) {
//   const videoRef = useRef(null);
//   const cardRef = useRef(null);
//   const [progress, setProgress] = useState(0);

//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;
//     const { left, top, width, height } = cardRef.current.getBoundingClientRect();
//     const x = (e.clientX - left) / width - 0.5;
//     const y = (e.clientY - top) / height - 0.5;
    
//     gsap.to(cardRef.current, {
//       rotateY: x * 15,
//       rotateX: -y * 15,
//       transformPerspective: 1000,
//       duration: 0.5,
//       ease: "power2.out",
//     });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5 });
//   };

//   useEffect(() => {
//     const vid = videoRef.current;
//     if (!vid) return;
//     isActive ? vid.play().catch(() => {}) : vid.pause();
//   }, [isActive]);

//   return (
//     <div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       className="group relative w-full h-[450px] rounded-[2rem] overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-2xl"
//     >
//       <video
//         ref={videoRef}
//         src={t.videoSrc}
//         onTimeUpdate={() => setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100)}
//         onEnded={onToggle}
//         playsInline
//         muted={!isActive}
//         className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60'}`}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 p-8 flex flex-col justify-between">
//         <span className="self-start px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-widest">{t.tag}</span>
//         <div onClick={onToggle} className="cursor-pointer self-center transition-all group-hover:scale-110">
//            {/* Add your icons here */}
//            <div className="text-white bg-white/20 p-4 rounded-full">Play/Pause</div>
//         </div>
//         <div className="space-y-1">
//           <h3 className="text-white text-xl font-bold">{t.name}</h3>
//           <p className="text-white/60 text-sm">{t.role}</p>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
//         <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }} />
//       </div>
//     </div>
//   );
// }

// export default function ReviewSection() {
//   const [activeVideoId, setActiveVideoId] = useState(null);
//   const containerRef = useRef(null);

//   useLayoutEffect(() => {
//     let ctx = gsap.context(() => {
      
//       // 1. Pehle ensure karein ke elements visible ho sakein
//       gsap.set(".header-content, .video-grid-item", { opacity: 0, y: 50 });

//       // 2. Header Animation
//       gsap.to(".header-content", {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power3.out",
//       });

//       // 3. ScrollTrigger Animation
//       gsap.to(".video-grid-item", {
//         y: 0,
//         opacity: 1,
//         stagger: 0.15,
//         duration: 0.8,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ".video-grid",
//           start: "top 85%",
//           // Refresh ScrollTrigger after loading
//           onEnter: () => ScrollTrigger.refresh()
//         }
//       });
//     }, containerRef);

//     // Force refresh after a small timeout to handle Next.js hydration
//     const timer = setTimeout(() => {
//         ScrollTrigger.refresh();
//     }, 100);

//     return () => {
//         ctx.revert();
//         clearTimeout(timer);
//     };
//   }, []);

//   return (
//     <section ref={containerRef} className="bg-[#0a0a0a] min-h-screen py-24 px-6 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto relative z-10">
//         <header className="header-content text-center mb-20">
//           {/* <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
//             Trusted by <span className="text-blue-400">Visionaries.</span>
//           </h2> */}
//            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
//             Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Visionaries.</span>
//           </h2>
//           <p className="text-white/50 text-lg">Real stories from real people.</p>
//         </header>

//         <div className="video-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
//           {TESTIMONIALS.map((t) => (
//             <div key={t.id} className="video-grid-item">
//               <VideoCard
//                 t={t}
//                 isActive={activeVideoId === t.id}
//                 onToggle={() => setActiveVideoId(activeVideoId === t.id ? null : t.id)}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-[450px] rounded-[2rem] overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-2xl"
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
           <div className="text-white bg-white/20 p-4 rounded-full">Play/Pause</div>
        </div>
        {/* <div className="space-y-1">
          <h3 className="text-white text-xl font-bold">{t.name}</h3>
          <p className="text-white/60 text-sm">{t.role}</p>
        </div> */}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
        <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
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
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="header-content text-center mb-20">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
             Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Visionaries.</span>
          </h2>
          <p className="text-white/50 text-lg">Real stories from real people.</p>
        </header>

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