
"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const WholesaleShowcase = () => {
    const router = useRouter();
  const products = [
    "/images/retailerfruit.png",
    "/images/ice.webp",
    "/images/vape2.png",
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-cream)] flex justify-center px-4">

      <div className="w-full max-w-6xl rounded-[30px] md:rounded-[50px] overflow-hidden bg-black relative">

        {/* background glow */}
        <div className="absolute top-0 left-0 w-52 md:w-72 h-52 md:h-72 bg-cyan-500/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-52 md:w-72 h-52 md:h-72 bg-purple-500/20 blur-[100px]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-10 md:py-0 text-white">

            <span className="uppercase tracking-[4px] text-cyan-400 text-xs md:text-sm font-semibold mb-4">
              Wholesale Program
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">
              <span>Interested in</span>
              <span className="block">carrying our</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                product?
              </span>
            </h2>

            <p className="text-white/70 text-sm md:text-lg leading-relaxed max-w-[520px] mb-8">
              JOHNNY BOY provides certain retailers across the country the opportunity
              to carry its products subject to requirements. Simply begin the application
              and we'll be in touch.
            </p>

            {/* <Button className="bg-white text-black hover:bg-cyan-400 transition px-6 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-2 w-fit">
              Apply Now
              <ArrowRight size={18} />
            </Button> */}
           
  <Button
                  className="bg-white text-black hover:bg-cyan-400 transition px-6 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-2 w-fit"
                  onClick={() => router.push("/signup")}
                >
                  Apply Now
                    <ArrowRight size={18} />
                </Button>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex items-center justify-center p-6 md:p-10 min-h-[420px] md:min-h-[720px] overflow-visible">

            {/* LEFT FLOATING IMAGE */}
            <div className="absolute left-0 sm:left-[5%] top-[20%] rotate-[-12deg] sm:rotate-[-18deg] opacity-60 z-10 float-slow">
              <Image
                src={products[1]}
                alt="Product"
                width={240}
                height={340}
                className="w-[120px] sm:w-[180px] md:w-[240px] lg:w-[280px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              />
            </div>

            {/* CENTER MAIN PRODUCT */}
            <div className="relative z-20 float-medium">
              <Image
                src={products[0]}
                alt="Product"
                width={260}
                height={600}
                className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] h-auto object-contain drop-shadow-[0_0_40px_rgba(58,200,238,0.5)] hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* RIGHT FLOATING IMAGE */}
            {/* <div className="absolute right-0 sm:right-[5%] top-[20%] rotate-[12deg] sm:rotate-[-18deg] opacity-100 z-30 float-fast">
              <Image
                src={products[2]}
                alt="Product"
                width={380}
                height={500}
                className="w-[160px] sm:w-[220px] md:w-[300px] lg:w-[380px] h-auto object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]"
              />
            </div> */}
                    <div className="absolute right-[5%] top-[18%] rotate-[-18deg] z-50 opacity-100 mr-30 float-fast">
          <Image
            src={products[2]}
            alt="Product"
            width={680}
            height={760}
            className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]"
          />
        </div>

            {/* GLOW EFFECT */}
            <div className="absolute w-[180px] sm:w-[250px] md:w-80 h-[180px] sm:h-[250px] md:h-80 bg-cyan-400/20 rounded-full blur-[100px] md:blur-[120px]" />

          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleShowcase;
