
"use client";

import React, { useEffect, useState } from "react";
import { Wind, Zap, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FlavorAroma = () => {
  const [data, setData] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Data Fetching Logic (Connect with Admin API)
  useEffect(() => {
    setIsMounted(true);
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (json) setData(json);
      } catch (err) {
        console.error("FlavorAroma Content fetch error:", err);
      }
    };
    fetchContent();
  }, []);

  // 2. Default Values (Agar admin khali ho toh ye show hoga)
  const defaults = {
    badge: "Engineering",
    bgText: "Aroma",
    title: "Beyond Ordinary Vapor.",
    subtitle: "Our flavors are not just about taste, they are an experience. In every puff, you get the perfect balance of premium quality nicotine and natural extracts.",
    // Progress Bars Defaults
    stat1Label: "Intensity",
    stat1Value: "85%",
    stat2Label: "Smoothness",
    stat2Value: "95%",
    stat3Label: "Freshness",
    stat3Value: "70%",
    btnText: "Discover All Flavors"
  };

  if (!isMounted) return null;

  // Data Mapping
  const finalBadge = data?.badge || defaults.badge;
  const finalBgText = data?.bgText || defaults.bgText;
  const finalTitle = data?.title || defaults.title;
  const finalSubtitle = data?.subtitle || defaults.subtitle;
  const finalBtnText = data?.btnText || defaults.btnText;

  // Title Splitting Logic for Design (Aakhri word gradient mein jayega)
  const words = finalTitle.split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  return (
    <section className="relative bg-[var(--color-cream)] py-24 overflow-hidden">
      {/* Background Text Decor */}
      <div className="absolute top-10 left-10 text-[15rem] font-black text-black/[0.02] select-none pointer-events-none uppercase">
        {finalBgText}
      </div>

      <div className="container mx-auto max-w-[1500px] px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content Area */}
          <div className="w-full lg:w-1/2">
            <SectionHeading
              title={
                <>
                  {firstPart}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {lastWord}
                  </span>
                </>
              }
              subtitle={finalSubtitle}
              badge={finalBadge}
              mode="light"
              className="mb-8"
            />

            {/* Flavor Profile Stats - Now Fully Dynamic */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 mb-6">
              {/* Stat 1: Intensity */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black font-bold uppercase text-xs">
                  <Zap size={14} className="text-[#3ac8ee]" /> {data?.stat1Label || defaults.stat1Label}
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#3ac8ee] rounded-full transition-all duration-1000" 
                    style={{ width: data?.stat1Value || defaults.stat1Value }}
                  />
                </div>
              </div>

              {/* Stat 2: Smoothness */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black font-bold uppercase text-xs">
                  <Droplets size={14} className="text-[#937ef1]" /> {data?.stat2Label || defaults.stat2Label}
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#937ef1] rounded-full transition-all duration-1000" 
                    style={{ width: data?.stat2Value || defaults.stat2Value }}
                  />
                </div>
              </div>

              {/* Stat 3: Freshness */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black font-bold uppercase text-xs">
                  <Wind size={14} className="text-emerald-500" /> {data?.stat3Label || defaults.stat3Label}
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                    style={{ width: data?.stat3Value || defaults.stat3Value }}
                  />
                </div>
              </div>
            </div>

          
                        <Button
              variant="secondary-outline"
              className="rounded-full px-8 py-4"
            >
              Discover All Flavors
            </Button>
          </div>

          {/* Right: Visuals */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[400px] md:h-[400px] rounded-full border-2 border-dashed border-black/10 animate-spin [animation-duration:25s]" />

            <div className="relative aspect-square w-full max-w-lg mx-auto flex items-center justify-center">
              <motion.img
                src="/images/two.png"
                className="relative z-20 w-4/5 h-auto object-contain"
                initial={{ x: 300, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
              />

              {/* Decorative Glows */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-[#3ac8ee]/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#937ef1]/20 rounded-full blur-3xl animate-pulse delay-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlavorAroma;
