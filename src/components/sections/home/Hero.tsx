"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/navigation";

// --- Particle Background Component ---
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      constructor() {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > (canvas?.width || 0)) this.x = 0;
        if (this.x < 0) this.x = canvas?.width || 0;
        if (this.y > (canvas?.height || 0)) this.y = 0;
        if (this.y < 0) this.y = canvas?.height || 0;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 70; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
};

export default function Home() {
  const [activeModal, setActiveModal] = useState<"login" | "signup" | null>(
    null,
  );
  const router = useRouter();

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  // Scroll Parallax Logic
  const cloudY = useTransform(smoothY, [0, 500], [0, -130]);
  const waterY = useTransform(smoothY, [0, 500], [0, -230]);
  const bottleY = useTransform(smoothY, [0, 500], [0, -45]);

  const handleLoginSuccess = () => {
    setActiveModal(null);
    router.refresh();
  };

  const handleSignupSuccess = () => {
    setActiveModal(null);
    router.refresh();
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden overflow-y-hidden flex flex-col">
      <ParticleBackground />

      <style jsx global>{`
        @keyframes sweepFill {
          0% {
            background-position: 100% 0%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        .sweep-text {
          -webkit-text-stroke: 1.2px white;
          background: linear-gradient(
            to right,
            #3ac8ee 0%,
            #937ef1 25%,
            #3ac8ee 50%,
            transparent 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: sweepFill 4s ease-in-out infinite alternate;
        }
        .reflection-mask {
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 5%,
            transparent 95%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 5%,
            transparent 95%
          );
        }
      `}</style>

      {/* Main Section */}
      <section className="relative w-full min-h-screen flex items-center z-10 py-20 md:py-0">
        <div className="container mx-auto max-w-[1500px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            {/* LEFT COLUMN: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col space-y-6 md:space-y-10 text-center lg:text-left order-2 lg:order-1"
            >
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter sweep-text leading-[0.9]">
                  JOHNNY <br className="hidden md:block" /> BOY
                </h1>
                <p className="text-lg md:text-2xl text-gray-400 font-light max-w-lg mx-auto lg:mx-0 tracking-wide leading-relaxed">
                  Smooth hits. Bold flavors. <br />
                  Crafted for a premium vaping experience that defines
                  excellence.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
                <Button
                  variant="primary-outline"
                  className="rounded-full px-8 md:px-10 py-3 md:py-4"
                   onClick={() => router.push("/login")}
                >
                  <LogIn size={20} /> LOGIN
                </Button>

                <Button
                  className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#3ac8ee] to-[#937ef1] text-white font-black"
                  onClick={() => router.push("/signup")}
                >
                  <UserPlus size={20} /> JOIN NOW
                </Button>
              </div>
            </motion.div>

           

            {/* RIGHT COLUMN: Visuals Area */}
            <div className="relative flex justify-center items-center h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] order-1 lg:order-2">
              {/* Cloud Layer */}
              <motion.img
                style={{ y: cloudY }}
                src="/images/cloud-bg.webp"
                alt="Cloud"
                className="absolute w-full h-full object-contain opacity-20 mix-blend-screen z-0 filter blur-xl md:blur-2xl"
              />

              {/* Water Layer */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.6 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                style={{ y: waterY }}
                className="absolute inset-0 flex justify-center items-center z-10"
              >
                <img
                  src="/images/water.png"
                  alt="Water"
                  className="w-[85%] lg:w-[75%] h-full object-contain mix-blend-lighten"
                />
              </motion.div>

              {/* Product Bottle & Reflection */}
              <motion.div
                style={{ y: bottleY }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative z-20 flex flex-col items-center"
              >
                {/* Main Bottle */}
                <img
                  src="/images/icestraight.png"
                  alt="Product"
                  className="w-[200px] sm:w-[280px] md:w-[350px] lg:w-[430px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(147,126,241,0.5)]"
                />

                {/* Reflection */}
                <div className="absolute top-[98%] w-full h-[60%] reflection-mask opacity-60 pointer-events-none">
                  <img
                    src="/images/icestraight.png"
                    alt="Reflection"
                    className="w-full h-full object-contain scale-y-[-1] blur-[4px] md:blur-[5px]"
                  />
                </div>
              </motion.div>

              {/* Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#937ef1]/10 rounded-full blur-[80px] md:blur-[150px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for scroll depth */}
      <div className="h-[20vh] w-full"></div>
    </div>
  );
}
