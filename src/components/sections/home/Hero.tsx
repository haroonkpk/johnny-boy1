"use client";

import React, { useEffect, useRef, useState } from "react";
import { LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particles: any[] = [];
    let animationFrameId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    resize();
    class Particle {
      x: number; y: number; size: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      draw() { if (!ctx) return; ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x > (canvas?.width || 0)) this.x = 0;
        if (this.x < 0) this.x = canvas?.width || 0;
        if (this.y > (canvas?.height || 0)) this.y = 0;
        if (this.y < 0) this.y = canvas?.height || 0;
      }
    }
    const init = () => { particles = []; for (let i = 0; i < 70; i++) particles.push(new Particle()); };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.draw(); p.update(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    init(); animate();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default function Home() {
  const [dynamicContent, setDynamicContent] = useState<string>("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef({ done: false, running: false });

  // AUTO-SCROLL
useEffect(() => {
  const state = autoScrollRef.current;
  state.done = false;
  state.running = false;

  const prevent = (e: Event) => { e.preventDefault(); e.stopPropagation(); };

  const unlock = () => {
    document.body.style.overflow = "";
    window.removeEventListener("wheel",     prevent, false);
    window.removeEventListener("touchmove", prevent, false);
  };

  const getTargets = () => {
    const heroEl  = triggerRef.current;
    if (!heroEl) return { pinEnd: 0, pinStart: 0 };
    const navHeight = document.querySelector("nav")?.offsetHeight || 0;
    const heroTop   = heroEl.offsetTop - navHeight;
    const pinStart  = heroTop;                          
    const pinEnd    = heroTop + heroEl.offsetHeight * 8; 
    return { pinEnd, pinStart };
  };

  const runDown = () => {
    if (state.running) return;
    state.running = true;
    state.done    = false;

    const { pinEnd } = getTargets();
    const scrollTarget = pinEnd - 10;

    document.body.style.overflow = "hidden";
    window.addEventListener("wheel",     prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    if (document.body.scrollHeight < scrollTarget + 100) {
      document.body.style.minHeight = `${scrollTarget + 200}px`;
    }

    gsap.to(window, {
      duration: 4,
      scrollTo: { y: scrollTarget, autoKill: false },
      ease: "power2.inOut",
      onComplete: () => {
        state.done    = true;
        state.running = false;
        document.body.style.minHeight = "";
        unlock();
      },
    });
  };

  const runUp = () => {
    if (state.running) return;
    state.running = true;
    state.done    = false;

    document.body.style.overflow = "hidden";
    window.addEventListener("wheel",     prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    gsap.to(window, {
      duration: 4,
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.inOut",
      onComplete: () => {
        state.done    = false;
        state.running = false;
        document.body.style.minHeight = "";
        unlock();
      },
    });
  };

  const onWheel = (e: WheelEvent) => {
    if (state.running) return;

    const { pinEnd, pinStart } = getTargets();
    const scrollY = window.scrollY;

    if (e.deltaY > 0 && scrollY < pinEnd - 10 && scrollY >= pinStart - 100) {
      runDown();
      return;
    }
    if (e.deltaY < 0 && scrollY > pinStart && scrollY <= pinEnd) {
      runUp();
      return;
    }
  };

  let touchStartY = 0;
  const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
  const onTouchEnd   = (e: TouchEvent) => {
    if (state.running) return;
    const diff = touchStartY - e.changedTouches[0].clientY;
    const { pinEnd, pinStart } = getTargets();
    const scrollY = window.scrollY;

    if (diff > 30 && scrollY < pinEnd - 10 && scrollY >= pinStart - 100) {
      runDown();
    } else if (diff < -30 && scrollY > pinStart && scrollY <= pinEnd) {
      runUp();
    }
  };

  window.addEventListener("wheel",      onWheel,      { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend",   onTouchEnd,   { passive: true });

  return () => {
    unlock();
    window.removeEventListener("wheel",      onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend",   onTouchEnd);
    gsap.killTweensOf(window);
    document.body.style.minHeight = "";
  };
}, []);


  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        if (data && data.heroContent) setDynamicContent(data.heroContent);
      } catch (err) { console.error("Failed to load hero content", err); }
    };
    fetchHeroContent();
  }, []);

  // ScrollTrigger Animation
 useEffect(() => {
  const ctx = gsap.context(() => {
    const heroEl = triggerRef.current;
    if (!heroEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
  trigger: heroEl,
  start: () => `top top+=${document.querySelector("nav")?.offsetHeight || 0}`,
  end: () => `+=${heroEl.offsetHeight * 8}`,
  pin: true,
  scrub: 1.5,

  onLeave:        () => { autoScrollRef.current.done = true; },
  onEnterBack:    () => { autoScrollRef.current.done = false; }, 
},  
    });

    tl.fromTo(".main-visual-wrapper", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 2 })
      .to(".char-left",  { x: "-500%", y: () => (Math.random() - 0.5) * 800, rotation: -360, opacity: 0, duration: 2.5, stagger: 0.05, ease: "power4.in" }, "-=0.5")
      .to(".char-right", { x:  "500%", y: () => (Math.random() - 0.5) * 800, rotation:  360, opacity: 0, duration: 2.5, stagger: 0.05, ease: "power4.in" }, "-=2.5")
      .to(".side-water-left",  { x: "-150%", opacity: 0, scale: 1.5, duration: 2 }, "-=2")
      .to(".side-water-right", { x:  "150%", opacity: 0, scale: 1.5, duration: 2 }, "-=2")
      .fromTo(".full-bg-water", { opacity: 0, scale: 0.8 }, { opacity: 0.4, scale: 1.1, duration: 2 })
      .to(".main-visual-wrapper", { 
        x: window.innerWidth >= 1024 ? "25%" : "0%", 
        y: window.innerWidth >= 1024 ? 0 : (window.innerHeight < 750 ? -15 : -50),
        scale: window.innerWidth >= 1024 ? 1.1 : 1.2, 
        duration: 3, 
        ease: "power3.inOut" 
      })
      .fromTo(".hero-text-content", { x: "-100px", opacity: 0 }, { x: "0px", opacity: 1, duration: 3, ease: "power3.out" }, "-=3");

  }, containerRef);

  return () => ctx.revert();
}, []);

  const splitText = (text: string, className: string) =>
    text.split("").map((char, i) => (
      <span key={i} className={`${className} inline-block`}>{char === " " ? "\u00A0" : char}</span>
    ));

  const isLoggedIn = status === "authenticated" && !!session;
  const userRole = (session?.user as any)?.role;
  const handleDashboardClick = () => {
    if (userRole === "admin") router.push("/admin");
    else if (userRole === "retailer") router.push("/retailer");
    else if (userRole === "worker") router.push("/worker/messages");
  };

  return (
    <div ref={containerRef} className="relative bg-black overflow-x-hidden w-full">
      <ParticleBackground />

      <style jsx global>{`
        .sweep-text {
          -webkit-text-stroke: 1.2px white;
          background: linear-gradient(to right, #3ac8ee 0%, #937ef1 25%, #3ac8ee 50%, transparent 50%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: sweepFill 4s ease-in-out infinite alternate;
        }
        @keyframes sweepFill {
          0% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>

      <div ref={triggerRef} className="relative h-screen w-full flex items-center justify-center">

        <div className="full-bg-water absolute inset-0 z-0 opacity-0 pointer-events-none">
          <img src="/images/water7.png" className="w-full h-full object-cover mix-blend-screen" alt="water bg" />
        </div>

        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="flex tracking-tighter sweep-text leading-[0.9] font-black text-[clamp(2.9rem,12vw,14rem)] uppercase italic">
            <div className="mr-4 md:mr-8">{splitText("JOHNNY", "char-left")}</div>
            <div className="ml-4 md:ml-8">{splitText("BOY", "char-right")}</div>
          </div>
        </div>

        <div className="side-water-left absolute left-0 z-20 pointer-events-none">
          <img src="/images/water1.png" className="w-[300px] md:w-[600px] h-auto opacity-70" alt="splash" />
        </div>
        <div className="side-water-right absolute right-0 z-20 pointer-events-none">
          <img src="/images/water22.png" className="w-[300px] md:w-[600px] h-auto opacity-70" alt="splash" />
        </div>

        <div className="container mx-auto max-w-[1500px] px-6 z-30 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

            <div className="hero-text-content opacity-0 flex flex-col space-y-4 md:space-y-10 text-center lg:text-left order-2 lg:order-1 -mt-8 lg:mt-0 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[140%] h-[150%] md:h-[140%] bg-black/60 blur-[60px] rounded-[100%] -z-10 pointer-events-none"></div>

              <div className="space-y-4 md:space-y-6 relative z-10">
                <h1 className="text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter sweep-text leading-[0.9] drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
                  JOHNNY <br className="hidden md:block" /> BOY
                </h1>
                {dynamicContent ? (
                  <div
                    className="dynamic-html-content text-gray-200 font-medium text-base sm:text-lg md:text-2xl max-w-full md:max-w-lg mx-auto lg:mx-0 tracking-wide leading-relaxed text-center lg:text-left px-2"
                    style={{ wordBreak: "break-word", overflowWrap: "anywhere", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
                    dangerouslySetInnerHTML={{ __html: dynamicContent }}
                  />
                ) : (
                  <p 
                    className="text-gray-200 font-medium text-base sm:text-lg md:text-2xl max-w-full md:max-w-lg mx-auto lg:mx-0 tracking-wide leading-relaxed"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
                  >
                    Smooth hits. Bold flavors.<br className="hidden sm:block" />
                    Crafted for a premium vaping experience that defines excellence.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 relative z-10 mt-8">
                {isLoggedIn ? (
                  <Button className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#3ac8ee] to-[#937ef1] text-white font-black" onClick={handleDashboardClick}>
                    <LayoutDashboard size={20} className="mr-2" /> DASHBOARD
                  </Button>
                ) : (
                  <>
                    <Button variant="primary-outline" className="rounded-full px-8 md:px-10 py-3 md:py-4" onClick={() => router.push("/login")}>
                      <LogIn size={20} className="mr-2" /> LOGIN
                    </Button>
                    <Button className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#3ac8ee] to-[#937ef1] text-white font-black" onClick={() => router.push("/signup")}>
                      <UserPlus size={20} className="mr-2" /> JOIN NOW
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="main-visual-wrapper relative flex justify-center items-center h-[40vh] min-h-[300px] md:min-h-0 md:h-[550px] lg:h-[650px] order-1 lg:order-2 -mt-4 md:-mt-8 lg:mt-0">
              <img src="/images/cloud-bg.webp" className="absolute w-full h-full object-contain opacity-20 mix-blend-screen z-0 blur-2xl" alt="cloud" />
              <div className="relative z-20 flex flex-col items-center">
                <img src="/images/icestraight.png" alt="Product" className="w-[340px] sm:w-[420px] md:w-[650px] lg:w-[750px] max-w-[110vw] h-auto object-contain drop-shadow-[0_20px_50px_rgba(147,126,241,0.5)]" />
                <div className="absolute top-[98%] w-full h-[50%] opacity-40 pointer-events-none scale-y-[-1] blur-md overflow-hidden">
                  <img src="/images/icestraight.png" className="w-full h-full object-contain" alt="reflection" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#937ef1]/20 rounded-full blur-[120px] -z-10"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}