
// "use client";

// import React, { useRef } from 'react';
// import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';

// const UltraModernVapeSection = () => {
//   const containerRef = useRef(null);

//   // 1. Scroll tracking
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   // Scroll based movement
//   const sodaScrollY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
//   const vapeScrollY = useTransform(scrollYProgress, [0, 1], [50, -50]);

//   // Mouse parallax setup
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const springConfig = { damping: 30, stiffness: 100 };
//   const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
//   const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

//   const handleMouseMove = (event) => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const mouseXRelative = (event.clientX - rect.left) / rect.width - 0.5;
//     const mouseYRelative = (event.clientY - rect.top) / rect.height - 0.5;
//     mouseX.set(mouseXRelative);
//     mouseY.set(mouseYRelative);
//   };

//   return (
//     <section 
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden py-20 cursor-crosshair"
//     >
//       {/* Background Marquee - Cherry Tint */}
//       <div className="absolute inset-0 flex items-center overflow-hidden opacity-[0.03] pointer-events-none z-0">
//         <motion.div 
//           className="flex whitespace-nowrap"
//           animate={{ x: [0, "-50%"] }}
//           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//         >
//           <h1 className="text-[20vw] font-black uppercase pr-20 text-[#ff2d55]">
//             CHERRY SENSATION • PREMIUM VAPE • 
//           </h1>
//           <h1 className="text-[20vw] font-black uppercase pr-20 text-[#ff2d55]">
//             CHERRY SENSATION • PREMIUM VAPE • 
//           </h1>
//         </motion.div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="flex flex-col lg:flex-row items-center gap-16">
          
//           {/* Text Content - Cherry Colored */}
//           <div className="w-full lg:w-1/2 text-white">
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }} 
//               whileInView={{ opacity: 1, x: 0 }} 
//               transition={{ duration: 1, ease: "easeOut" }}
//               viewport={{ once: true }}
//             >
//               {/* Badge with Cherry Border */}
//               <span className="inline-block px-4 py-1 border border-[#ff2d55]/40 rounded-full text-[#ff2d55] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 bg-[#ff2d55]/5">
//                 Authentic Flavor
//               </span>
              
//               {/* Title with Cherry Gradient */}
//               <h2 className="text-7xl lg:text-8xl font-black mb-6 leading-tight italic tracking-tighter">
//                 CHERRY <br /> 
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d55] via-[#ff6b81] to-[#ffffff]">
//                   SODA
//                 </span>
//               </h2>
              
//               <p className="text-gray-400 text-lg max-w-sm mb-8 font-light">
//                 Infused with dark cherry essence and Mesh V2 heating for a bold, velvety cloud experience.
//               </p>

//               {/* Button with Cherry Hover Effect */}
                           
// <button className="group relative px-10 py-4 border border-[#ff2d55]/40 rounded-[2rem] font-bold uppercase tracking-widest transition-all duration-500 shadow-[0_0_20px_rgba(255,45,85,0.1)] hover:shadow-[0_0_30px_rgba(255,45,85,0.4)] overflow-hidden hover:border-[#ff2d55]">
  
//   {/* Text Layer: By default text white hai */}
//   <span className="relative z-10 text-white transition-colors duration-500">
//     Taste the Cherry Soda
//   </span>

//   {/* Sliding Fill Background Layer */}
//   <div className="absolute inset-0 bg-[#ff2d55] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

// </button>
//             </motion.div>
//           </div>

//           {/* Visual Section */}
//           <div className="w-full lg:w-1/2 flex justify-center [perspective:1200px]">
//             <motion.div 
//               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
//               className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
//             >
              
//               {/* SODA SPLASH: Starting from Right, then Scroll-based Y */}
//               <motion.div
//                 initial={{ x: 500, opacity: 0 }} 
//                 whileInView={{ x: 0, opacity: 1 }} 
//                 viewport={{ once: true }} 
//                 transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
//                 style={{ y: sodaScrollY }} 
//                 className="absolute w-[140%] h-auto z-10 pointer-events-none"
//               >
//                 <motion.img 
//                   src="/images/cherrysoda.png" 
//                   alt="Cherry Soda Splash"
//                   className="w-full h-auto brightness-110 contrast-125"
//                   style={{ filter: "drop-shadow(0 0 30px rgba(255,45,85,0.3))" }}
//                   animate={{ rotate: [0, 2, 0] }}
//                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                 />
//               </motion.div>

//               {/* VAPE: Assemble Entry */}
//               <motion.div 
//                 initial={{ x: 100, y: 100, opacity: 0 }}
//                 whileInView={{ x: 0, y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 1.2, ease: "easeOut" }}
//                 className="relative z-30"
//                 style={{ y: vapeScrollY }} 
//               >
//                 <motion.img 
//                   src="/images/vape9.png" 
//                   alt="Vape Visual"
//                   whileHover={{ scale: 1.05 }}
//                   className="w-[300px] md:w-[400px] filter drop-shadow-[0_0_60px_rgba(255,45,85,0.4)]"
//                 />
//               </motion.div>

//               {/* Cherry Glow in Background */}
//               <div className="absolute inset-0 bg-[#ff2d55]/15 rounded-full blur-[100px] -z-10" />
//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default UltraModernVapeSection;
"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";

const UltraModernVapeSection = () => {
  const containerRef = useRef(null);

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

  // ✅ FIX: safe mouse handler (no crash + no boundingRect issues)
  const handleMouseMove = (event) => {
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
              <span className="inline-block px-4 py-1 border border-[#ff2d55]/40 rounded-full text-[#ff2d55] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 bg-[#ff2d55]/5">
                Authentic Flavor
              </span>

              <h2 className="text-7xl lg:text-8xl font-black mb-6 leading-tight italic tracking-tighter">
                CHERRY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d55] via-[#ff6b81] to-white">
                  SODA
                </span>
              </h2>

              <p className="text-gray-400 text-lg max-w-sm mb-8 font-light">
                Infused with dark cherry essence and Mesh V2 heating for bold cloud experience.
              </p>

              <button className="group relative px-10 py-4 border border-[#ff2d55]/40 rounded-[2rem] font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 hover:border-[#ff2d55]">
                <span className="relative z-10 text-white group-hover:text-white">
                  Taste the Cherry Soda
                </span>

                <div className="absolute inset-0 bg-[#ff2d55] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
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