

"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";
import Button from "@/components/ui/Button";

const UltraModernVapeSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  // new
  const [isMounted, setIsMounted] = useState(false);
  // --- BACKEND FETCH LOGIC ---
  const [data, setData] = useState({
    ultraTitle: "CHERRY SODA",
    ultraDesc:
      "Infused with dark cherry essence and Mesh V2 heating for a bold cloud experience.",
    ultraBgText: "Integrated Power Bank for unyielding performance.",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        
        const res = await fetch("/api/content", { cache: "no-store" });
        const json = await res.json();
        if (json) {
          setData({
            ultraTitle: json.ultraTitle || "CHERRY SODA",
            ultraDesc:
              json.ultraDesc ||
              "Infused with dark cherry essence and Mesh V2 heating for a bold cloud experience.",
            ultraBgText:
              json.ultraBgText || "Integrated Power Bank for unyielding performance.",
          });
        }
      } catch (error) {
        console.error("Error fetching ultra modern content:", error);
      }
    };
    fetchContent();
    // new
    setIsMounted(true);
  }, []);

  // Title Splitting Logic (Style maintain karne ke liye)
  const titleWords = data.ultraTitle.split(" ");
  const firstPart = titleWords[0]; // CHERRY
  const secondPart = titleWords.slice(1).join(" "); // SODA (ya baaki ka text)

  // --- ANIMATIONS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sodaScrollY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const vapeScrollY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig,
  );

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden py-20"
    >
      {/* BACKGROUND SCROLLING TEXT (DYNAMIC) */}
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

      <div className="container mx-auto max-w-[1500px] px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* TEXT CONTENT (DYNAMIC) */}
          <div className="w-full lg:w-1/2 text-white">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl lg:text-8xl font-black mb-6 leading-tight italic tracking-tighter">
                {firstPart} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d55] via-[#ff6b81] to-white">
                  {secondPart}
                </span>
              </h2>

              {/* <p className="text-gray-400 text-lg max-w-sm mb-8 font-light leading-relaxed whitespace-pre-line">
                {data.ultraDesc}
                <span className="text-[#ff2d55] block mt-2 font-medium">
                    {data.ultraBgText} 
                </span>
              </p> */}
              <div className="space-y-4 mb-8 max-w-sm">
                <p className="text-gray-400 text-lg font-light leading-relaxed whitespace-pre-line">
                  {data.ultraDesc}
                </p>
                {data.ultraBgText && (
                  <p className="text-[#ff2d55] text-lg font-medium leading-relaxed whitespace-pre-line">
                    {data.ultraBgText}
                  </p>
                )}
              </div>

              <Link href="/contact">
                <Button
                  variant="primary-outline"
                  className="px-10 py-4 border-[#ff2d55]/40 rounded-[2rem] font-bold uppercase tracking-widest hover:border-[#ff2d55] hover:bg-[#ff2d55]/10"
                >
                  Get In Touch
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* VISUALS (ANIMATED) */}
          <div className="w-full lg:w-1/2 flex justify-center [perspective:1200px]">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
            >
              <motion.img
                src="/images/cherrysoda.png"
                alt="soda"
                // className="absolute w-[140%] z-10 pointer-events-none"
                // style={{ y: sodaScrollY }}
                className="absolute w-[140%] z-10 pointer-events-none will-change-transform"
                style={{ y: isMounted ? sodaScrollY : 0 }}
              />

              <motion.img
                src="/images/vape9.png"
                alt="vape"
                // className="relative z-30 w-[300px] md:w-[400px] pointer-events-none"
                // style={{ y: vapeScrollY }}
                className="relative z-30 w-[300px] md:w-[400px] pointer-events-none will-change-transform"
                style={{ y: isMounted ? vapeScrollY : 0 }}
              />

              <div className="absolute inset-0 bg-[#ff2d55]/15 rounded-full blur-[100px] -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UltraModernVapeSection;
