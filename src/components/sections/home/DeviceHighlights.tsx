
"use client";

import React, { useEffect, useState } from "react";

const DeviceHighlights: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      const res = await fetch(`/api/content?t=${new Date().getTime()}`, { 
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        }
      });
      
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Content fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();

    const onFocus = () => fetchContent();
    window.addEventListener("focus", onFocus);
    
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  if (loading) return null;


  const title = data?.highlightTitle ?? "Device Highlights";
  const subtitle = data?.highlightSubtitle ?? "Experience the ultimate vaping technology...";
  const items = data?.highlightsList ?? [];

  return (
    <section className="relative py-24 bg-[var(--color-cream)] overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 max-w-[2000px]">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {items.map((item: any, index: number) => (
            <div key={item.id || index} className="flex flex-col items-center transition-all duration-300">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 rounded-[32px] md:rounded-[48px] flex items-center justify-center p-[3px] overflow-hidden">
                {/* Animation Container */}
                <div className="absolute inset-0 rounded-[32px] md:rounded-[48px] bg-[conic-gradient(from_0deg,_#3b82f6_20%,_#818cf8_40%,_#3b82f6_60%)] animate-spin [animation-duration:6s] -z-10"></div>
                
                {/* Content Box */}
                <div className="absolute inset-[4px] rounded-[28px] md:rounded-[44px] bg-white flex items-center justify-center p-8 shadow-sm">
                  {item.iconUrl && (
                    <img 
                      src={item.iconUrl} 
                      alt={item.name || "feature"} 
                      className="w-20 h-20 md:w-28 md:h-28 object-contain" 
                    />
                  )}
                </div>
              </div>

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