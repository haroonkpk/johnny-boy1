"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Box, Cpu, Leaf } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Pure Aesthetics",
      desc: "Designed with a focus on clean lines and simple forms that blend into any space.",
      icon: <Box className="w-6 h-6 text-[#937ef1]" />,
      number: "01"
    },
    {
      title: "Smart Tech",
      desc: "Seamlessly integrated technology that works for you without the complexity.",
      icon: <Cpu className="w-6 h-6 text-[#3ac8ee]" />,
      number: "02"
    },
    {
      title: "Eco-Friendly",
      desc: "Sustainable materials that don't compromise on premium quality or style.",
      icon: <Leaf className="w-6 h-6 text-emerald-500" />,
      number: "03"
    }
  ];

  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">
      {/* Smooth Transition Overlay: Hero se connectivity ke liye */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-md bg-[#937ef1]/10 text-[#937ef1] text-xs font-bold uppercase tracking-widest">
              The Collection
            </div>
            <h2 className="text-black text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              Crafted for the <br /> 
              <span className="text-gray-300">Modern Minimalist.</span>
            </h2>
          </div>
          
          <div className="pb-2">
            <Link 
              href="/shop" 
              className="group flex items-center gap-2 text-black font-semibold text-lg hover:underline underline-offset-8 decoration-2 decoration-[#937ef1] transition-all"
            >
              Explore Collection 
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <div 
              key={i}
              className="group relative p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Card Number Background */}
              <span className="absolute top-8 right-10 text-6xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-500 italic">
                {item.number}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-black">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-lg">
                  {item.desc}
                </p>
              </div>

              {/* Subtle hover line animation */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#3ac8ee] to-[#937ef1] group-hover:w-full transition-all duration-500 rounded-b-[2.5rem]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Blurs */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-[#3ac8ee]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-[#937ef1]/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default Features;