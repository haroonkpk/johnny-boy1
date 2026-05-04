
"use client";

import React from 'react';
import { Wind, Zap, Droplets } from 'lucide-react';
import { motion } from 'framer-motion'; // Animation ke liye import

const FlavorAroma = () => {
  return (
    <section className="relative bg-[#f8f8f8] py-24 overflow-hidden">
      {/* Background Text Decor */}
      <div className="absolute top-10 left-10 text-[15rem] font-black text-black/[0.02] select-none pointer-events-none uppercase">
        Aroma
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Content Area */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase">
              <Wind size={14} className="animate-pulse" />
              The Sensation
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-black tracking-tighter leading-[0.9]">
              Beyond <br /> 
              <span className="text-[#937ef1]">Ordinary </span> 
              Vapor.
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Our flavors are not just about taste, they are an experience. In every puff, you get the perfect balance of premium quality nicotine and natural extracts.
            </p>

            {/* Flavor Profile Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black font-bold uppercase text-xs">
                  <Zap size={14} className="text-[#3ac8ee]" /> Intensity
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-[#3ac8ee] rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black font-bold uppercase text-xs">
                  <Droplets size={14} className="text-[#937ef1]" /> Smoothness
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-[#937ef1] rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black font-bold uppercase text-xs">
                  <Wind size={14} className="text-emerald-500" /> Freshness
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            <button className="group relative px-8 py-4 bg-transparent text-black border-2 border-black font-bold rounded-full overflow-hidden transition-all hover:text-white">
              <span className="relative z-10">Discover All Flavors</span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Right: Abstract Visuals & Animated Image */}
          <div className="w-full lg:w-1/2 relative">
            {/* Spinning Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[400px] md:h-[400px] rounded-full border-2 border-dashed border-black/10 animate-spin [animation-duration:25s]" />
            
            <div className="relative aspect-square w-full max-w-lg mx-auto flex items-center justify-center">
              
              {/* --- IMAGE ANIMATION START --- */}
              <motion.img 
                src="/images/two.png" 
                className="relative z-20 w-4/5 h-auto object-contain"
                initial={{ x: 300, opacity: 0 }} // Start position (bahar)
                whileInView={{ x: 0, opacity: 1 }} // End position (fix)
                viewport={{ once: true }} // Sirf ek baar animate hoga
                transition={{ 
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1], // Custom smooth ease
                  delay: 0.2 
                }}
              />
              {/* --- IMAGE ANIMATION END --- */}
              
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-[#3ac8ee]/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#937ef1]/20 rounded-full blur-3xl animate-pulse delay-700" />
              
              {/* Floating Labels */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute top-[20%] -right-4 bg-white shadow-xl p-4 rounded-2xl z-30 rotate-6 hover:rotate-0 transition-transform"
              >
                <p className="text-xs font-bold text-gray-400 uppercase">Nicotine</p>
                <p className="text-lg font-black text-black">50MG/ML</p>
              </motion.div>
              
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-[20%] -left-4 bg-white shadow-xl p-4 rounded-2xl z-30 -rotate-6 hover:rotate-0 transition-transform"
              >
                <p className="text-xs font-bold text-gray-400 uppercase">Coil</p>
                <p className="text-lg font-black text-black">MESH V2</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FlavorAroma;