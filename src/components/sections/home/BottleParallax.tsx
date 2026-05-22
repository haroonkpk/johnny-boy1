"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function BottleParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftWrapper = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Ab sirf bottle (leftWrapper) move hogi, text static rahega
      gsap.to(leftWrapper.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1.5,
          start: "top bottom",
          end: "bottom top",
        },
        y: -150,
        ease: "none",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[600px] w-full overflow-hidden flex flex-col md:flex-row justify-center items-center px-[5%] py-20 gap-12 md:gap-24"
    >
      {/* Left Group */}
      <div
        ref={leftWrapper}
        className="relative w-96 md:w-[800px] flex justify-center items-center"
      >
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <img
            src="/images/fruit7.png"
            className="w-[95%] h-auto object-contain scale-125"
            alt="Fruit"
          />
        </div>
        <img
          src="/images/vape7.png"
          className="w-full object-contain rotate-[-20deg] -translate-x-20 translate-y-16 scale-125"
          alt="Vape"
        />
      </div>

      {/* Right Group: Content (Static/Fixed) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-[1.1]">
            Quality
            <br />
            Every Time
          </h2>
        </div>

        <p className="text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed">
          Johnny Boy consistently outperforms competing disposables in terms of
          device quality, battery strength, and flavour profile.
        </p>
        <div className="pt-4">
          <Link
            href="/signup"
            className="inline-block px-12 py-5 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:scale-105"
          >
            Become a Reseller
          </Link>
        </div>
      </div>
    </div>
  );
}
