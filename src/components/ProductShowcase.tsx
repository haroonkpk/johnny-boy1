"use client";

import React, { useState } from 'react';
import { ShoppingBag, Star, Zap } from 'lucide-react';

const ProductShowcase = () => {
  // 1. Flavors ka data array banaya jisme images aur colors honge
  const flavorData = [
    { name: 'Blue Razz', img: '/images/vape6.png', color: '#3ac8ee' },
    { name: 'Lush Ice', img: '/images/vape9.png', color: '#ff4f81' },
    { name: 'Mango Bomb', img: '/images/vape5.png', color: '#ffb800' },
    { name: 'Mint Chill', img: '/images/vape7.png', color: '#2dd4bf' },
  ];

  // 2. State banayi current image aur info track karne ke liye
  const [activeFlavor, setActiveFlavor] = useState(flavorData[0]);

  return (
    <section className="bg-white py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        
        <div className="mb-16 text-center">
          <h2 className="text-black text-4xl md:text-6xl font-black tracking-tighter mb-4">
            THE NEXT GENERATION
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Experience the fusion of flavor and technology with our flagship Series-X line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]">
          
          {/* Main Hero Product Card */}
          <div className="md:col-span-8 relative overflow-hidden rounded-[2.5rem] bg-gray-900 group">
            {/* Dynamic Background Glow based on flavor */}
            <div 
              className="absolute inset-0 opacity-20 transition-all duration-700" 
              style={{ backgroundColor: activeFlavor.color }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
            
            {/* --- Dynamic Image --- */}
            <img 
              key={activeFlavor.name} // Key dalne se image change hote waqt animation refresh hogi
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
              <button 
                className="px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all"
                style={{ backgroundColor: activeFlavor.color, color: '#000' }}
              >
                <ShoppingBag size={18} /> Buy Now — $49.00
              </button>
            </div>
          </div>

          {/* Side Column Cards */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="bg-gray-50 rounded-[2.5rem] p-8 flex flex-col justify-between border border-gray-100 hover:border-[#3ac8ee]/30 transition-all group">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#3ac8ee]">
                <Zap fill="currentColor" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-black mb-2 italic">8000+ Puffs</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Longest lasting mesh coil technology.</p>
              </div>
              <div className="pt-4 border-t border-gray-200 mt-4 flex justify-between items-center text-black font-bold uppercase text-xs tracking-widest">
                <span>Performance</span>
                <Star size={14} className="text-[#937ef1]" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#937ef1] to-[#3ac8ee] rounded-[2.5rem] p-8 relative overflow-hidden group">
              <div className="relative z-10 text-white h-full flex flex-col justify-center">
                <h4 className="text-3xl font-black italic leading-none mb-2">NEON<br />PUNCH</h4>
                <p className="text-white/80 text-sm">Available in 12 vibrant flavors.</p>
              </div>
              <div className="absolute top-1/2 right-[-20%] w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </div>

        {/* --- Bottom Flavor Buttons --- */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {flavorData.map((flavor, i) => (
            <div 
              key={i} 
              onMouseEnter={() => setActiveFlavor(flavor)} // Hover par image change hogi
              className={`py-4 px-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-center text-sm font-bold uppercase tracking-widest
                ${activeFlavor.name === flavor.name 
                  ? 'bg-black text-white border-black scale-105 shadow-lg' 
                  : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300'
                }`}
            >
              {flavor.name}
            </div>
          ))}
        </div> */}
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
        {/* Text Layer: isActive ho ya hover ho, text white hona chahiye */}
        <span className={`relative z-10 transition-colors duration-300 
          ${isActive ? 'text-white' : 'text-black group-hover:text-white'}`}>
          {flavor.name}
        </span>

        {/* Fill Background Layer: Neeche se upar aane wala black box */}
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