"use client";
import React from 'react';

interface HighlightItem {
  id: number;
  name: string;
  iconUrl: string;
}

const highlightsData: HighlightItem[] = [
  { id: 1, name: 'Dual Mesh Coil', iconUrl: '/images/icons-dual-mesh-coil.svg' },
  { id: 2, name: 'E-Liquid Display', iconUrl: '/images/icons-adjustable-airflow.svg' },
  { id: 3, name: 'Power Display', iconUrl: '/images/icons-usb-type-c.svg' },
  { id: 4, name: 'Adjustable Airflow', iconUrl: '/images/icons-power-display.svg' },
  { id: 5, name: 'USB Type-C', iconUrl: '/images/icons-e-liquid-display.svg' },
];

const DeviceHighlights: React.FC = () => {
  return (
    <section className="relative py-24 bg-[var(--color-cream)] overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 max-w-[2000px]">
        
        {/* Heading aur Description Section */}
      <div className="text-center mb-16">

  <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
    Section
  </h2>

  <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
  </p>
</div>

        {/* Grid Section */}
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
  {highlightsData.map((item) => (
    <div 
      key={item.id} 
      className="flex flex-col items-center transition-all duration-300"
    >
      {/* Container Size: w-32 h-32 (mobile), w-48 h-48 (desktop) */}
      <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 rounded-[32px] md:rounded-[48px] flex items-center justify-center p-[3px] overflow-hidden">
        
        {/* Rotating Border */}
        <div className="absolute inset-0 rounded-[32px] md:rounded-[48px] bg-[conic-gradient(from_0deg,_#3b82f6_20%,_#818cf8_40%,_#3b82f6_60%)] animate-spin [animation-duration:6s] -z-10"></div>
        
        {/* Inner Box */}
        <div className="absolute inset-[4px] rounded-[28px] md:rounded-[44px] bg-white flex items-center justify-center p-8 shadow-sm">
          {/* Image Size: w-20 h-20 (mobile), w-28 h-28 (desktop) */}
          <img 
            src={item.iconUrl} 
            alt={item.name} 
            className="w-20 h-20 md:w-28 md:h-28 object-contain" 
          />
        </div>
      </div>

      {/* Text Size badhane ke liye text-sm/text-xl */}
      <h3 className="text-center text-sm md:text-xl font-bold tracking-wider text-gray-800 uppercase leading-relaxed max-w-[180px] md:max-w-[220px]">
        {item.name}
      </h3>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default DeviceHighlights;