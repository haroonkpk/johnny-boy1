
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, MapPin, Zap, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { seriesData, SeriesKey } from "@/data/products";

export default function RetailerPage() {
  const [activeTab, setActiveTab] = useState<SeriesKey | "all">("all");

  // Logic: Available top par, Coming Soon bottom par
  const displayProducts = useMemo(() => {
    let list = activeTab === "all" 
      ? [...seriesData.local, ...seriesData.regular] 
      : [...seriesData[activeTab]];

    return list.sort((a, b) => (a.comingSoon === b.comingSoon ? 0 : a.comingSoon ? 1 : -1));
  }, [activeTab]);

  return (
    <div className="min-h-screen w-full bg-[#f8f7f4] text-black flex flex-col">
      
      {/* HEADER SECTION */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-black tracking-tighter italic">JOHNNY BOY</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em]">Professional Wholesale</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-gray-100 rounded-2xl w-full md:w-auto border border-gray-200">
            <TabBtn active={activeTab === "all"} onClick={() => setActiveTab("all")} icon={<LayoutGrid size={14}/>} label="ALL"/>
            <TabBtn active={activeTab === "local"} onClick={() => setActiveTab("local")} icon={<MapPin size={14}/>} label="LOCAL"/>
            <TabBtn active={activeTab === "regular"} onClick={() => setActiveTab("regular")} icon={<Zap size={14}/>} label="REGULAR"/>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-white cursor-pointer relative">
               <ShoppingCart size={18} />
               <span className="absolute -top-1 -right-1 bg-orange-600 text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">0</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-[1920px] mx-auto p-6 md:p-12">
        
        <div className="mb-12">
          <h2 className="text-5xl font-black uppercase tracking-tighter">
            {activeTab} <span className="text-orange-600 italic">Series</span>
          </h2>
          <div className="h-1.5 w-24 bg-black mt-4 rounded-full" />
        </div>

        {/* ULTRA-RESPONSIVE GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayProducts.map((product) => (
              <motion.div 
                key={`${activeTab}-${product.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`flex flex-col group ${product.comingSoon ? "opacity-60" : ""}`}
              >
                {/* PRODUCT CARD WITH DYNAMIC BACKGROUND */}
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  
                  {/* --- DYNAMIC BACKGROUND IMAGE (From product.bg) --- */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image 
                      src={product.bg} 
                      alt="Product Background" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" 
                    />
                    {/* Subtle Overlay to ensure text/icons are visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                  </div>
                  
                  {/* Overlay Labels */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                    <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black border border-white/50 shadow-sm">
                      #{product.id}
                    </span>
                    {product.comingSoon && (
                      <span className="bg-black text-white px-3 py-1.5 rounded-xl text-[9px] font-black animate-pulse">
                        OUT OF STOCK
                      </span>
                    )}
                  </div>

                  {/* Main Product Image */}
                  <div className="relative w-full h-full p-12 flex items-center justify-center z-10">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      width={280}
                      height={380}
                      className={`object-contain transition-all duration-500 drop-shadow-2xl ${!product.comingSoon && "group-hover:scale-110"}`}
                    />
                    
                    {/* Floating Flavor/Fruit Icon */}
                    <div className="absolute bottom-8 right-8 w-16 h-16 bg-white/60 backdrop-blur-lg rounded-2xl p-2 border border-white/30 shadow-xl group-hover:rotate-12 transition-transform">
                      <Image src={product.fruits} alt="flavor" width={60} height={60} className="object-contain" />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-6 space-y-4 px-2 flex-grow">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight leading-none group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest italic">
                      Premium Quality Vapes
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-y border-gray-100 py-4">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">Retailer Price</p>
                      <p className="text-2xl font-black tracking-tighter">
                        {product.comingSoon ? "---" : `$${(product.price || 15.00).toFixed(2)}`}
                      </p>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-100" />
                    <div className="text-right">
                      <p className="text-[9px] font-black text-gray-400 uppercase">Min Order</p>
                      <p className="text-sm font-black text-zinc-700 underline decoration-orange-500 underline-offset-4">10 Pieces</p>
                    </div>
                  </div>

                  <button 
                    disabled={product.comingSoon}
                    className={`w-full py-4 rounded-2xl font-black text-[11px] tracking-widest transition-all flex items-center justify-center gap-2 ${
                      product.comingSoon 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-black text-white hover:bg-orange-600 shadow-xl shadow-black/10 hover:shadow-orange-600/30 active:scale-95"
                    }`}
                  >
                    {!product.comingSoon && <ShoppingBag size={16} />}
                    {product.comingSoon ? "NOT IN STOCK" : "ORDER NOW"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-gray-200 py-16 mt-24">
        <div className="max-w-[1920px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="text-2xl font-black italic">JOHNNY BOY</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2024 All Rights Reserved.</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="hover:text-black cursor-pointer">Security</span>
            <span className="hover:text-black cursor-pointer">Support</span>
            <span className="hover:text-black cursor-pointer">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-component for Cleaner Header Buttons
function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 ${
        active ? "bg-white text-black shadow-md" : "text-gray-400 hover:text-black"
      }`}
    >
      {icon} {label}
    </button>
  );
}