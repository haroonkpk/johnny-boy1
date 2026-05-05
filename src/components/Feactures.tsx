// // "use client";

// // // features
// // import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// // import { useRef, useState } from "react";

// // type SeriesKey = "local" | "regular";

// // // Product data definition
// // const seriesData: Record<
// //   SeriesKey,
// //   { id: number; name: string; image: string; bg: string }[]
// // > = {
// //   local: [
// //     { id: 101, name: "Local Mint", image: "/images/fruiti2.png", bg: "/images/all1.jpeg" },
// //     { id: 102, name: "Local Berry", image: "/images/fruiti3.png", bg: "/images/all2.jpeg" },
// //     { id: 103, name: "Local Mango", image: "/images/fruiti7.png", bg: "/images/all3.jpeg" },
// //   ],
// //   regular: [
// //     { id: 201, name: "Reg Classic", image: "/images/fruiti7.png", bg: "/images/all3.jpeg" },
// //     { id: 202, name: "Reg Ice", image: "/images/fruiti2.png", bg: "/images/all1.jpeg" },
// //     { id: 203, name: "Reg Gold", image: "/images/fruiti3.png", bg: "/images/all2.jpeg" },
// //   ],
// // };

// // const Features = () => {

// //   const [activeSeries, setActiveSeries] = useState<SeriesKey>("regular");
// //   // const [activeSeries, setActiveSeries] = useState<SeriesKey>("regular");

// //   const containerRef = useRef(null);
// //   // const containerRef = useRef(null);

// //   const { scrollYProgress } = useScroll({
// //     target: containerRef,
// //     offset: ["start end", "end start"],
// //   });

// //   return (
// //     <section
// //       ref={containerRef}
// //       className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden bg-white"
// //     >
// //       {/* 1. Top Heading Section */}
// //       <div className="relative z-20 text-center mb-3">
// //         <motion.h2
// //           initial={{ opacity: 0, y: -20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           className="text-5xl md:text-6xl font-black text-[#222] tracking-tighter"
// //         >
// //           EXPLORE OUR PRODUCTS
// //         </motion.h2>
// //         <div className="w-24 h-1 bg-black mx-auto mt-4 rounded-full" />
// //       </div>

// //       {/* 2. Products Grid Section */}
// //       <div className="relative z-10 flex flex-wrap items-end justify-center gap-8 md:gap-12 px-4 h-auto md:h-[550px]">
// //         {seriesData[activeSeries].map((item, i) => {
// //           const imgY = useTransform(
// //             scrollYProgress,
// //             [0, 1],
// //             ["40%", `${-15 - i * 8}%`]
// //           );

// //           const bgY = useTransform(scrollYProgress, [0, 1], ["15%", "0%"]);

// //           return (
// //             <div
// //               key={item.id}
// //               className="relative w-[260px] h-[420px] flex items-end group"
// //             >
// //               {/* Background */}
// //               <motion.div
// //                 style={{ y: bgY }}
// //                 className="absolute inset-0 overflow-hidden rounded-t-[130px] rounded-b-2xl shadow-2xl border-4 border-white/20"
// //               >
// //                 <img
// //                   src={item.bg}
// //                   alt="background"
// //                   className="w-full h-full object-cover brightness-95 group-hover:scale-110 transition-transform duration-700"
// //                 />
// //               </motion.div>

// //               {/* Product Image */}
// //               <AnimatePresence mode="wait">
// //                 <motion.img
// //                   key={activeSeries + item.id}
// //                   src={item.image}
// //                   alt={item.name}
// //                   initial={{ opacity: 0, scale: 0.5, y: 100 }}
// //                   animate={{ opacity: 1, scale: 1, y: 0 }}
// //                   exit={{ opacity: 0, scale: 0.8, y: -50 }}
// //                   transition={{ type: "spring", damping: 15, stiffness: 100 }}
// //                   style={{ y: imgY }}
// //                   className="relative z-10 w-[900px] h-[300px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] cursor-pointer"
// //                 />
// //               </AnimatePresence>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* 3. Control Buttons */}
// //       <div className="flex gap-6 mt-20 z-20">
// //         <button
// //           onClick={() => setActiveSeries("local")}
// //           className={`px-10 py-4 rounded-full font-bold text-sm tracking-widest transition-all duration-300 border-2 ${
// //             activeSeries === "local"
// //               ? "bg-black text-white border-black scale-110 shadow-xl"
// //               : "bg-transparent text-black border-black hover:bg-black hover:text-white"
// //           }`}
// //         >
// //           LOCAL SERIES
// //         </button>

// //         <button
// //           onClick={() => setActiveSeries("regular")}
// //           className={`px-10 py-4 rounded-full font-bold text-sm tracking-widest transition-all duration-300 border-2 ${
// //             activeSeries === "regular"
// //               ? "bg-black text-white border-black scale-110 shadow-xl"
// //               : "bg-transparent text-black border-black hover:bg-black hover:text-white"
// //           }`}
// //         >
// //           REGULAR SERIES
// //         </button>
// //       </div>

// //       {/* Moving Background Text */}
// //       <motion.div
// //         initial={{ x: "0%" }}
// //         animate={{ x: "-50%" }}
// //         transition={{
// //           repeat: Infinity,
// //           duration: 20,
// //           ease: "linear",
// //         }}
// //         className="absolute bottom-[-5%] left-0 w-[200%] flex text-[15rem] font-black text-black/[0.03] select-none whitespace-nowrap z-0"
// //       >
// //         <span className="mr-20">PREMIUM VAPES</span>
// //         <span>PREMIUM VAPES</span>
// //       </motion.div>
// //     </section>
// //   );
// // };

// // export default Features;

// // newly


"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// Types definition
type SeriesKey = "local" | "regular";

interface ProductItem {
  id: number;
  name: string;
  image: string;
  vapeImage: string;
  bg: string;
  waterImage: string;
  description: string;
}

const seriesData: Record<SeriesKey, ProductItem[]> = {
  local: [
    {
      id: 101,
      name: "Kiwi Passion Fruit",
      image: "/images/fruiti2.png",
      vapeImage: "/images/vape2.png",
      bg: "/images/all1.jpeg",
      waterImage: "/images/water.png",
      description: "Refreshing natural mint leaves with a cool breeze.",
    },
    {
      id: 102,
      name: "Grape Ice",
      image: "/images/fruiti3.png",
      vapeImage: "/images/vape6.png",
      bg: "/images/all2.jpeg",
      waterImage: "/images/water.png",
      description: "Hand-picked wild berries for a sweet tarty finish.",
    },
    {
      id: 103,
      name: "Cherry Soda",
      image: "/images/fruiti7.png",
      vapeImage: "/images/vape3.png",
      bg: "/images/all3.jpeg",
      waterImage: "/images/water.png",
      description: "Pure Alphonso mango pulp for tropical lovers.",
    },
  ],
  regular: [
    {
      id: 201,
      name: "Cherry Soda",
      image: "/images/fruiti7.png",
      vapeImage: "/images/vape9.png",
      bg: "/images/all3.jpeg",
      waterImage: "/images/water.png",
      description: "The original classic blend with smooth undertones.",
    },
    {
      id: 202,
      name: "Kiwi Passion Fruit",
      image: "/images/fruiti2.png",
      vapeImage: "/images/vape7.png",
      bg: "/images/all1.jpeg",
      waterImage: "/images/water.png",
      description: "Sub-zero menthol blast for an extreme icy hit.",
    },
    {
      id: 203,
      name: "Grape Ice",
      image: "/images/fruiti3.png",
      vapeImage: "/images/vape4.png",
      bg: "/images/all2.jpeg",
      waterImage: "/images/water.png",
      description: "Premium golden tobacco leaves for a rich experience.",
    },
  ],
};

const Features = () => {
  const [activeSeries, setActiveSeries] = useState<SeriesKey>("regular");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Top Heading */}
      <div className="relative z-20 text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black text-[#222] tracking-tighter"
        >
          EXPLORE OUR PRODUCTS
        </motion.h2>
        <div className="w-24 h-1 bg-black mx-auto mt-4 rounded-full" />
      </div>

      {/* Products Grid */}
      <div className="relative z-10 flex flex-wrap items-end justify-center gap-8 md:gap-12 px-4 h-auto md:h-[550px]">
        {seriesData[activeSeries].map((item, i) => {
          // Parallax Calculations
          const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
          const vapeY = useTransform(scrollYProgress, [0, 1], [120, -120]);
          const waterY = useTransform(scrollYProgress, [0, 1], [150, -50]);
          const bgY = useTransform(scrollYProgress, [0, 1], [40, 0]);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative w-[280px] h-[450px] flex items-end group cursor-pointer"
            >
              {/* Card Background & Hover Overlay */}
              <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 overflow-hidden rounded-t-[140px] rounded-b-3xl shadow-2xl border-4 border-white/20 z-0"
              >
                <img
                  src={item.bg}
                  alt="bg"
                  className="w-full h-full object-cover brightness-90 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Hover Detail Content */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-50 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-white font-black text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.name}
                  </h3>
                  <p className="text-white/80 mb-50 text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.description}
                  </p>
                  {/* <button className="mt-6 px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-black hover:text-white transition-all">
                    BUY NOW
                  </button> */}
                </div>
              </motion.div>

              {/* Decorative Parallax Images */}
              <motion.img
                src={item.waterImage}
                style={{ y: waterY }}
                className="absolute z-10 w-[140%] h-auto pointer-events-none mix-blend-screen -left-[20%] opacity-40"
              />

              <motion.img
                src={item.vapeImage}
                style={{ y: vapeY }}
                className="absolute z-[30] w-[260px] left-[-15px] drop-shadow-2xl"
              />

              <motion.img
                src={item.image}
                style={{ y: imgY }}
                className="relative z-20 w-full h-[280px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />

              {/* Name Tag */}
              <div className="absolute bottom-6 left-0 right-0 z-[35] text-center group-hover:opacity-0 transition-opacity">
                <span className="bg-black/90 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  {item.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-16 z-20">
        {(["local", "regular"] as SeriesKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveSeries(key)}
            className={`px-8 py-3 rounded-full font-bold text-xs tracking-[0.2em] transition-all border-2 ${
              activeSeries === key
                ? "bg-black text-white border-black scale-105 shadow-lg"
                : "bg-transparent text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            {key.toUpperCase()} SERIES
          </button>
        ))}
      </div>

      {/* Marquee Background Text */}
      <div className="absolute bottom-[-2%] left-0 w-full overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap text-[12rem] font-black text-black/[0.03]"
        >
          <span className="mr-20">PREMIUM VAPES</span>
          <span className="mr-20">PREMIUM VAPES</span>
        </motion.div>
      </div>
    </section>
  );
};

// CRITICAL: Ensure this is a default export
export default Features;
