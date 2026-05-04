"use client";

import React from 'react';
import { ShieldCheck, Battery, Wind, Droplets } from 'lucide-react';

const TechSpecs = () => {
  const specs = [
    {
      icon: <Battery className="w-6 h-6" />,
      title: "Powerful Battery",
      detail: "650mAh Rechargeable",
      desc: "Type-C fast charging that lasts up to 2 days of heavy usage."
    },
    {
      icon: <Wind className="w-6 h-6" />,
      title: "Airflow Control",
      detail: "Precision Toggle",
      desc: "Switch between MTL and DTL vaping with a simple slide."
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Leak Proof",
      detail: "5-Layer Silicone",
      desc: "Advanced vacuum sealing technology to prevent any messy leaks."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Smart Chipset",
      detail: "Safety First",
      desc: "Overcharge and short-circuit protection for peace of mind."
    }
  ];

  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Visual Technical Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 p-4 md:p-12 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 group">
              <img 
                src="/images/vape-internal.png" 
                alt="Technical View" 
                className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(58,200,238,0.3)] group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Pulsing Hotspots (Dots) */}
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-[#3ac8ee] rounded-full animate-ping" />
              <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-[#937ef1] rounded-full animate-ping delay-300" />
            </div>
            
            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#937ef1]/20 to-[#3ac8ee]/20 blur-[120px]" />
          </div>

          {/* Right Side: Specs List */}
          <div className="space-y-12 order-1 lg:order-2">
            <div>
              <h2 className="text-[#937ef1] font-mono text-sm tracking-[0.3em] uppercase mb-4">Engineering Excellence</h2>
              <h3 className="text-white text-4xl md:text-6xl font-bold tracking-tight">Built for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ac8ee] to-white">Performance.</span></h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {specs.map((spec, index) => (
                <div key={index} className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#3ac8ee] group-hover:bg-[#3ac8ee] group-hover:text-black transition-all duration-300">
                      {spec.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{spec.title}</h4>
                      <p className="text-[#937ef1] text-xs font-mono uppercase">{spec.detail}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-[#3ac8ee] transition-colors">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <button className="px-10 py-4 bg-white text-black rounded-full font-black uppercase tracking-tighter hover:bg-[#3ac8ee] transition-all flex items-center gap-3">
                Download Technical Sheet
                <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechSpecs;