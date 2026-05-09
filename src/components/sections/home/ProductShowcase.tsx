

"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const WholesaleShowcase = () => {
  const products = [
    "/images/retailerfruit.png",
    "/images/ice.webp",
    "/images/vape2.png",
    "/images/pack.png",
  ];

  return (
    <section className="w-full py-24 bg-[var(--color-cream)] flex justify-center px-4">
      <div className="w-[80%] rounded-[50px] overflow-hidden bg-black relative">
        
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px] relative z-10">

          {/* LEFT */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-16 text-white">
            <span className="uppercase tracking-[5px] text-cyan-400 text-sm font-semibold mb-6">
              Wholesale Program
            </span>

            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
              Interested in <br />
              carrying our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                product?
              </span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed max-w-[550px] mb-10">
              JOHNNY BOY provides certain retailers across the
              country the opportunity to carry its products subject to
              certain requirements. Simply begin the application and
              we'll be in touch.
            </p>

            <Button className="bg-white text-black hover:bg-cyan-400 transition-all duration-300 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-3">
              Apply Now
              <ArrowRight size={18} />
            </Button>
          </div>

          {/* RIGHT */}
         {/* RIGHT SIDE IMAGES */}
<div className="relative flex items-center justify-center p-10">

  {/* BACKGROUND LEFT */}
  <div className="absolute left-[5%] top-[18%] rotate-[-18deg] opacity-60 z-10 transition-all duration-500">
    <Image
      src={products[1]}
      alt="Product"
      width={320}
      height={500}
      className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
    />
  </div>

  {/* BACKGROUND CENTER */}
  <div className="relative z-10">
    <Image
      src={products[0]}
      alt="Product"
      width={320}
      height={600}
      className="object-contain drop-shadow-[0_0_40px_rgba(58,200,238,0.5)] hover:scale-105 transition-all duration-500"
    />
  </div>

  {/* BACKGROUND RIGHT (pack) */}
  <div className="absolute right-[5%] bottom-[12%] rotate-[18deg] opacity-60 z-10 transition-all duration-500">
    <Image
      src={products[3]}
      alt="Product"
      width={220}
      height={500}
      className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
    />
  </div>

  {/*  VAPE2 - TOP LAYER */}
  <div className="absolute right-[5%] top-[18%] rotate-[-18deg] z-50 opacity-100 hover:scale-110 transition-all duration-500">
    <Image
      src={products[2]}
      alt="Product"
      width={580}
      height={660}
      className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]"
    />
  </div>

  {/* Glow */}
  <div className="absolute w-80 h-80 bg-cyan-400/20 rounded-full blur-[120px]" />

</div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleShowcase;