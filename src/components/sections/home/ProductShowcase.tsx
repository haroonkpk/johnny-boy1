"use client";

import React, { useState } from 'react';
import { ShoppingBag, Star, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ProductShowcase = () => {
  const flavorData = [
    { name: 'Blue Razz', img: '/images/vape6.png', color: '#3ac8ee' },
    { name: 'Lush Ice', img: '/images/vape9.png', color: '#ff4f81' },
    { name: 'Mango Bomb', img: '/images/vape5.png', color: '#ffb800' },
    { name: 'Mint Chill', img: '/images/vape7.png', color: '#2dd4bf' },
  ];

  const [activeFlavor, setActiveFlavor] = useState(flavorData[0]);

  return (
    <section className="bg-white py-24 px-6">
      <div className="container mx-auto max-w-[1500px]">
        
        <SectionHeading 
          title="The Next Generation"
          subtitle="Experience the fusion of flavor and technology with our flagship Series-X line."
          badge="Showcase"
          mode="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]">
          
          <Card variant="primary" className="md:col-span-8 relative overflow-hidden group border-none bg-gray-900">
            <div 
              className="absolute inset-0 opacity-20 transition-all duration-700" 
              style={{ backgroundColor: activeFlavor.color }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
            
            {/* --- Dynamic Image --- */}
            <img 
              key={activeFlavor.name} 
              src={activeFlavor.img} 
              alt={activeFlavor.name} 
              className="w-full h-full object-contain p-10 group-hover:scale-105 transition-all duration-700 animate-in fade-in zoom-in"
            />
            
            <div className="absolute bottom-10 left-10 z-20 space-y-4">
              <div className="flex gap-2">
                <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {activeFlavor.name}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Series X</span>
              </div>
              <h3 className="text-white text-4xl md:text-5xl font-bold italic">Titanium Cloud Edition</h3>
              <Button 
                className="px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all"
                style={{ backgroundColor: activeFlavor.color, color: '#000' }}
              >
                <ShoppingBag size={18} /> shopping
              </Button>
            </div>
          </Card>

          {/* Side Column Cards */} 
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
         <Card className="bg-(--heading-bg) p-8 flex flex-col justify-between border border-white/15 hover:border-[#3ac8ee]/40 transition-all group">
  <div className="w-12 h-12 bg-white/18 rounded-2xl flex items-center justify-center text-[#3ac8ee]">
    <Zap fill="currentColor" />
  </div>
  <div>
    <h4 className="text-xl font-bold text-white mb-2 italic">8000+ Puffs</h4>
    <p className="text-white/65 text-sm leading-relaxed">Longest lasting mesh coil technology.</p>
  </div>
  <div className="pt-4 border-t border-white/20 mt-4 flex justify-between items-center text-white/90 font-bold uppercase text-xs tracking-widest">
    <span>Performance</span>
    <Star size={14} className="text-[#937ef1]" />
  </div>
</Card>
            <Card className="bg-gradient-to-br from-[#937ef1] to-[#3ac8ee] p-8 relative overflow-hidden group border-none">
              <div className="relative z-10 text-white h-full flex flex-col justify-center">
                <h4 className="text-3xl font-black italic leading-none mb-2">NEON<br />PUNCH</h4>
                <p className="text-white/80 text-sm">Available in 12 vibrant flavors.</p>
              </div>
              <div className="absolute top-1/2 right-[-20%] w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </Card>
          </div>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
  {flavorData.map((flavor, i) => {
    const isActive = activeFlavor.name === flavor.name;

    return (
      <div
        key={i}
        onMouseEnter={() => setActiveFlavor(flavor)}
        className={`group relative py-4 px-6 rounded-4xl border-2 transition-all cursor-pointer flex items-center justify-center text-sm font-bold uppercase tracking-widest overflow-hidden
          ${isActive 
            ? 'border-black scale-105 shadow-lg' 
            : 'border-gray-200 hover:border-black'
          }`}
      >
        <span className={`relative z-10 transition-colors duration-300 
          ${isActive ? 'text-white' : 'text-black group-hover:text-white'}`}>
          {flavor.name}
        </span>

        <div 
          className={`absolute inset-0 bg-black transition-transform duration-300
            ${isActive 
              ? 'translate-y-0' 
              : 'translate-y-full group-hover:translate-y-0'
            }`} 
        />
      </div>
    );
  })}
</div>

      </div>
    </section>
  );
};

export default ProductShowcase;