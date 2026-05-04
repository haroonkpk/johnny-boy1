"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

// Product data definition
const seriesData = {
  local: [
    { id: 101, name: "Local Mint", image: "/images/vape6.png", bg: "/images/bg1.png" },
    { id: 102, name: "Local Berry", image: "/images/vape6.png", bg: "/images/bg2.png" },
    { id: 103, name: "Local Mango", image: "/images/vape6.png", bg: "/images/bg3.png" },
  ],
  regular: [
    { id: 201, name: "Reg Classic", image: "/images/vape7.png", bg: "/images/bg3.png" },
    { id: 202, name: "Reg Ice", image: "/images/vape9.png", bg: "/images/bg1.png" },
    { id: 203, name: "Reg Gold", image: "/images/vape7.png", bg: "/images/bg2.png" },
  ],
};

const Features = () => {
  const [activeSeries, setActiveSeries] = useState("regular");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* 1. Top Heading Section */}
      <div className="relative z-20 text-center mb-3">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-[#222] tracking-tighter"
        >
          EXPLORE OUR PRODUCTS
        </motion.h2>
        <div className="w-24 h-1 bg-black mx-auto mt-4 rounded-full" />
      </div>

      {/* 2. Products Grid Section */}
      <div className="relative z-10 flex flex-wrap items-end justify-center gap-8 md:gap-12 px-4 h-auto md:h-[550px]">
        {seriesData[activeSeries].map((item, i) => {
          
          // Scroll based Parallax movement
          const imgY = useTransform(
            scrollYProgress,
            [0, 1],
            ["40%", `${-15 - i * 8}%`] // Har image alag speed se upar jayegi
          );

          const bgY = useTransform(scrollYProgress, [0, 1], ["15%", "0%"]);

          return (
            <div 
              key={item.id} 
              className="relative w-[260px] h-[420px] flex items-end group"
            >
              {/* Background Card with Parallax */}
              <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 overflow-hidden rounded-t-[130px] rounded-b-2xl shadow-2xl border-4 border-white/20"
              >
                <img
                  src={item.bg}
                  alt="background"
                  className="w-full h-full object-cover brightness-95 group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>

              {/* Product Vape Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSeries + item.id} // Re-animate on series change
                  src={item.image}
                  alt={item.name}
                  initial={{ opacity: 0, scale: 0.5, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  style={{ y: imgY }}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] cursor-pointer"
                />
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 3. Control Buttons */}
      <div className="flex gap-6 mt-20 z-20">
        <button
          onClick={() => setActiveSeries("local")}
          className={`px-10 py-4 rounded-full font-bold text-sm tracking-widest transition-all duration-300 border-2 ${
            activeSeries === "local"
              ? "bg-black text-white border-black scale-110 shadow-xl"
              : "bg-transparent text-black border-black hover:bg-black hover:text-white"
          }`}
        >
          LOCAL SERIES
        </button>
        
        <button
          onClick={() => setActiveSeries("regular")}
          className={`px-10 py-4 rounded-full font-bold text-sm tracking-widest transition-all duration-300 border-2 ${
            activeSeries === "regular"
              ? "bg-black text-white border-black scale-110 shadow-xl"
              : "bg-transparent text-black border-black hover:bg-black hover:text-white"
          }`}
        >
          REGULAR SERIES
        </button>
      </div>
      
      {/* Decorative Text in background */}
      {/* <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 text-[15rem] font-black text-black/[0.03] select-none whitespace-nowrap z-0">
        PREMIUM VAPES
      </div> */}
      <motion.div
  initial={{ x: "0%" }}
  animate={{ x: "-50%" }}
  transition={{
    repeat: Infinity,
    repeatType: "loop",
    duration: 20, // speed control (kam = fast, zyada = slow)
    ease: "linear",
  }}
  className="absolute bottom-[-5%] left-0 w-[200%] flex text-[15rem] font-black text-black/[0.03] select-none whitespace-nowrap z-0"
>
  <span className="mr-20">PREMIUM VAPES</span>
  <span>PREMIUM VAPES</span>
</motion.div>
    </section>
  );
};

export default Features;