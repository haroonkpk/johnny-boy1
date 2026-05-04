
"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useMemo } from "react";

export default function LuxuryVapeUniverse() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const stars = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      size: Math.random() * 2.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      depth: Math.random() * 60 + 20, 
    }));
  }, []);

  // Mouse rotation logic
  const heroRotateY = useTransform(smoothMouseX, (v) => v * 15);
  const heroRotateX = useTransform(smoothMouseY, (v) => v * -15);

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="h-screen w-full bg-[#000] overflow-hidden flex items-center justify-center"
    >
      {/* Star Field */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              width: star.size, height: star.size,
              left: `${star.x}%`, top: `${star.y}%`,
              x: useTransform(smoothMouseX, (v) => v * star.depth * -1),
              y: useTransform(smoothMouseY, (v) => v * star.depth * -1),
            }}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: star.duration, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
        
        {/* --- HERO CONTENT GROUP --- */}
        <motion.div
          style={{ 
            rotateY: heroRotateY,
            rotateX: heroRotateX,
            perspective: 1000
          }}
          // AUTO ANIMATION LOGIC:
          initial={{ scale: 0.3, opacity: 0, y: 50 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 60, 
            damping: 15,
            duration: 1.2 
          }}
          className="absolute z-30 flex flex-col items-center"
        >
          {/* Main Center Image */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full scale-125" />
            <Image 
              src="/images/water.png" 
              width={400} 
              height={400} 
              alt="Main Hero" 
              className="relative drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]" 
              priority
            />
          </div>

          {/* --- REFINED TEXT BOX --- */}
          <motion.div 
            className="flex items-center gap-6 bg-white/5 backdrop-blur-2xl p-5 rounded-[2.5rem] border border-white/10 max-w-lg shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-white/20 shadow-inner">
              <Image 
                src="/images/vape6.png" 
                width={100} 
                height={100} 
                alt="Flavor"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="text-left">
              <h2 className="text-2xl font-bold text-white tracking-tight">Pure Blue Refresh</h2>
              <p className="text-gray-400 text-sm mt-1 leading-snug">
                Experience the pinnacle of luxury vaping. 
                Smooth, cold, and intensely flavorful.
              </p>
              <div className="flex gap-2 mt-4">
                 <span className="text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30">10k Puffs</span>
                 <span className="text-[10px] font-bold uppercase bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30">5% Nicotine</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </div>
  );
}