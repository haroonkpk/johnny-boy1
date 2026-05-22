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
  
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
    
    {highlightsData.map((item) => (
      <div 
        key={item.id} 
        className="flex flex-col items-center transition-all duration-300"
      >
        <div className="relative w-28 h-28 md:w-40 md:h-40 mb-6 rounded-[32px] md:rounded-[48px] flex items-center justify-center p-[3px] overflow-hidden">
          
          {/* Rotating Border */}
          <div className="absolute inset-0 rounded-[32px] md:rounded-[48px] bg-[conic-gradient(from_0deg,_#3b82f6_20%,_#818cf8_40%,_#3b82f6_60%)] animate-spin [animation-duration:6s] -z-10"></div>
          <div className="absolute inset-[4px] rounded-[28px] md:rounded-[44px] bg-white flex items-center justify-center p-6 shadow-sm">
            <img 
              src={item.iconUrl} 
              alt={item.name} 
              className="w-16 h-16 md:w-24 md:h-24 object-contain" 
            />
          </div>
        </div>
   
        <h3 className="text-center text-xs md:text-lg font-bold tracking-wider text-gray-800 uppercase leading-relaxed max-w-[150px] md:max-w-[200px]">
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