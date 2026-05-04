
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";

const UltraModernVapeSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll animations
  const sodaScrollY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const vapeScrollY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Mouse tracking (safe + smooth)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig
  );


  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden py-20 cursor-crosshair"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 flex items-center overflow-hidden opacity-[0.03] pointer-events-none z-0">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <h1 className="text-[20vw] font-black uppercase pr-20 text-[#ff2d55]">
            CHERRY SENSATION • PREMIUM VAPE •
          </h1>
          <h1 className="text-[20vw] font-black uppercase pr-20 text-[#ff2d55]">
            CHERRY SENSATION • PREMIUM VAPE •
          </h1>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* TEXT */}
          <div className="w-full lg:w-1/2 text-white">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >


              <h2 className="text-7xl lg:text-8xl font-black mb-6 leading-tight italic tracking-tighter">
                CHERRY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d55] via-[#ff6b81] to-white">
                  SODA
                </span>
              </h2>

              <p className="text-gray-400 text-lg max-w-sm mb-8 font-light">
                Infused with dark cherry essence and Mesh V2 heating for bold cloud experience.
              </p>

            <Link href="/contact">
  <button className="group relative px-10 py-4 border border-[#ff2d55]/40 rounded-[2rem] font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 hover:border-[#ff2d55]">
    
    <span className="relative z-10 text-white group-hover:text-white">
      Get In Touch
    </span>

    <div className="absolute inset-0 bg-[#ff2d55] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
  
  </button>
</Link>
            </motion.div>
          </div>

          {/* VISUAL */}
          <div className="w-full lg:w-1/2 flex justify-center [perspective:1200px]">
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
            >
              {/* SODA */}
              <motion.img
                src="/images/cherrysoda.png"
                alt="soda"
                className="absolute w-[140%] z-10 pointer-events-none"
                style={{ y: sodaScrollY }}
              />

              {/* VAPE */}
              <motion.img
                src="/images/vape9.png"
                alt="vape"
                className="relative z-30 w-[300px] md:w-[400px] pointer-events-none"
                style={{ y: vapeScrollY }}
              />

              {/* GLOW */}
              <div className="absolute inset-0 bg-[#ff2d55]/15 rounded-full blur-[100px] -z-10" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UltraModernVapeSection;