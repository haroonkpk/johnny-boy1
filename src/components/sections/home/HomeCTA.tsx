"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const HomeCTA = () => {
  const router = useRouter();
  const products = [
    "/images/retailerfruit.png",
    "/images/ice.webp",
    "/images/vape2.png",
  ];

  return (
    <section className="w-full py-[clamp(2.5rem,8vw,6rem)] bg-[var(--color-cream)] flex justify-center px-4 sm:px-12">
      {/* Outer stylish border container */}
      <div className="w-full max-w-[1500px] border-2 border-[#7A7D8F] p-1 lg:-skew-x-[3deg] transition-all duration-500">
        <Card 
          variant="primary" 
          className="w-full !p-0 rounded-none bg-black border-2 border-[#7A7D8F] lg:-skew-x-[1deg] overflow-hidden relative group"
        >
          {/* Reverse skew */}
          <div className="lg:skew-x-[3deg] relative z-10 grid grid-cols-1 lg:grid-cols-2">
            
            {/* background glows - subtle */}
            <div className="absolute top-0 left-0 w-[clamp(15rem,40vw,30rem)] h-[clamp(15rem,40vw,30rem)] bg-cyan-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[clamp(15rem,40vw,30rem)] h-[clamp(15rem,40vw,30rem)] bg-purple-500/10 blur-[100px] pointer-events-none" />

            {/* LEFT SIDE - CONTENT */}
            <div className="flex flex-col justify-center px-[clamp(1.5rem,6vw,5rem)] py-[clamp(3.5rem,10vw,7rem)] text-white text-center lg:text-left items-center lg:items-start relative z-20">
            <span className="uppercase tracking-[clamp(2px,0.4vw,4px)] text-cyan-400 text-[clamp(0.7rem,1.5vw,0.875rem)] font-semibold mb-[clamp(1rem,2vw,1.5rem)]">
              Wholesale Program
            </span>

              <h2 className="text-[clamp(1.85rem,7vw,4rem)] font-black mb-6 sm:mb-8 leading-[1.05] tracking-tight max-w-[650px] uppercase italic italic-none sm:not-italic">
                Interested in <span className="lg:block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">carrying our</span>
                <span className="block">product?</span>
              </h2>

              <p className="text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed max-w-[550px] mb-10 sm:mb-12 font-medium">
                JOHNNY BOY provides certain retailers across the country the opportunity
                to carry its products subject to requirements. Simply begin the application
                and we'll be in touch.
              </p>

              <Button
                className="bg-white text-black hover:bg-cyan-400 transition-all duration-300 px-10 py-4 text-xs sm:text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 w-fit group shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                onClick={() => router.push("/signup")}
              >
                Apply Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* RIGHT SIDE - IMAGES (Hidden on mobile) */}
            <div className="hidden lg:flex relative items-center justify-center p-12 min-h-[650px] lg:min-h-[800px] overflow-visible">
              {/* LEFT FLOATING IMAGE */}
              <div className="absolute left-[-10%] top-[20%] rotate-[-15deg] opacity-30 z-10 float-slow pointer-events-none">
                <Image
                  src={products[1]}
                  alt="Product"
                  width={240}
                  height={300}
                  className="w-auto h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                />
              </div>

              {/* CENTER MAIN PRODUCT */}
              <div className="relative z-20 float-medium scale-110 pointer-events-none">
                <Image
                  src={products[0]}
                  alt="Product"
                  width={320}
                  height={600}
                  className="w-auto h-auto object-contain drop-shadow-[0_0_60px_rgba(58,200,238,0.4)]"
                />
              </div>

              {/* RIGHT FLOATING IMAGE */}
              <div className="absolute right-[-5%] top-[10%] rotate-[-20deg] z-50 opacity-90 float-fast pointer-events-none">
                <Image
                  src={products[2]}
                  alt="Product"
                  width={550}
                  height={650}
                  className="w-auto h-auto object-contain drop-shadow-[0_0_70px_rgba(255,255,255,0.2)]"
                />
              </div>

              {/* GLOW EFFECT */}
              <div className="absolute w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HomeCTA;
