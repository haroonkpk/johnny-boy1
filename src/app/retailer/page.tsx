"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  MapPin,
  Zap,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";

// Context, Drawer aur Data imports
import { useCart } from "@/components/context/CartContext";
import { seriesData, SeriesKey } from "@/data/products";
import CartDrawer from "@/components/context/CartDrawer";
import Button from "@/components/ui/Button";
import { useAuth } from "@/components/context/AuthContext";
    
export default function RetailerPage() {
  const { addToCart, totalItems, openDrawer } = useCart();
  const [activeTab, setActiveTab] = useState<SeriesKey | "all">("all");
  const { user } = useAuth();
  const userStatus = user?.status;

  // 1. Products Filter Logic (Strictly returns an array)
  const displayProducts = useMemo(() => {
    // Agar user status pending hai, tab bhi empty array return karein taake map crash na ho
    if (userStatus === "pending") return [];

    let list =
      activeTab === "all"
        ? [...seriesData.local, ...seriesData.regular]
        : [...seriesData[activeTab]];

    return list.sort((a, b) =>
      a.comingSoon === b.comingSoon ? 0 : a.comingSoon ? 1 : -1
    );
  }, [activeTab, userStatus]);

  // 2. Early Return for Pending Status (UI Logic)
  // Isay useMemo se bahar rakhein taake main return se pehle trigger ho ske
  if (userStatus === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] px-4">
        <div className="max-w-xl w-full bg-white rounded-[2rem] p-8 shadow-xl text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-5">
            <Zap className="text-yellow-600" size={38} />
          </div>
          <h1 className="text-3xl font-black uppercase">Account Pending</h1>
          <p className="text-gray-500 mt-4">
            Your account is under review. Please wait 24 hours for approval.
          </p>
        </div>
      </div>
    );
  }

  // 3. Main Page Render
  return (
    <div className="min-h-screen w-full bg-[var(--color-cream)] text-black flex flex-col">
  
      {/* SIDEBAR DRAWER COMPONENT */}
      <CartDrawer />
  
      {/* HEADER SECTION */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
       

          <div className="flex w-full lg:w-auto overflow-x-auto no-scrollbar p-1 bg-gray-100 text-black rounded-2xl border border-gray-200">
            <TabBtn
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              icon={<LayoutGrid size={14} />}
              label="ALL"
            />
            <TabBtn
              active={activeTab === "local"}
              onClick={() => setActiveTab("local")}
              icon={<MapPin size={14} />}
              label="LOCAL"
            />
            <TabBtn
              active={activeTab === "regular"}
              onClick={() => setActiveTab("regular")}
              icon={<Zap size={14} />}
              label="REGULAR"
            />
          </div>

          {/* Cart Icon with Dynamic Badge & Open Drawer Trigger */}
         <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 md:static z-[999] flex items-center gap-4">
  <div
    onClick={openDrawer}
    className="h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-zinc-900 flex items-center justify-center text-white cursor-pointer relative hover:bg-gray-700 transition-colors group active:scale-90 shadow-2xl"
  >
    <ShoppingCart size={18} />

    <AnimatePresence mode="popLayout">
      {totalItems > 0 && (
        <motion.span
          key={totalItems}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="absolute -top-1 -right-1 bg-gray-700 text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white font-bold shadow-lg"
        >
          {totalItems}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
</div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-12">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight">
            {activeTab} <span className="text-gray-700 italic">Series</span>
          </h2>
          <div className="h-1.5 w-24 bg-black mt-4 rounded-full" />
        </div>

        {/* ULTRA-RESPONSIVE GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayProducts.map((product) => (
              <motion.div
                key={`${activeTab}-${product.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`flex flex-col group ${product.comingSoon ? "opacity-70" : ""}`}
              >
                {/* PRODUCT CARD */}
                <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={product.bg}
                      alt="BG"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                  </div>

                  {/* Overlay Labels */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                  
                    {product.comingSoon && (
                      <span className="bg-black text-white px-3 py-1.5 rounded-xl text-[9px] font-black animate-pulse uppercase">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Main Product Image */}
                  <div className="relative w-full h-full p-6 sm:p-10 lg:p-12 flex items-center justify-center z-10">
                    <Image
                      src={product.image}
                      alt={product.name}
                      // width={280}
                      // height={380}
                      width={240}
                      height={320}
                      className={`object-contain transition-all duration-500 drop-shadow-2xl ${!product.comingSoon && "group-hover:scale-110"}`}
                    />

                    {/* Flavor Icon */}
                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-11 h-11 sm:w-14 sm:h-14 bg-white/80 backdrop-blur-lg rounded-2xl p-2 border border-white/30 shadow-xl group-hover:rotate-12 transition-transform">
                      <Image
                        src={product.fruits}
                        alt="flavor"
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Details & Action */}
                <div className="mt-6 space-y-4 px-2 flex-grow">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight leading-none group-hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest italic">
                      Premium Quality Vapes
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-y border-gray-100 py-4">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase">
                        Retailer Price
                      </p>
                      <p className="text-2xl font-black tracking-tighter">
                        {product.comingSoon
                          ? "---"
                          : `$${(product.price || 15.0).toFixed(2)}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-gray-400 uppercase">
                        Min Order
                      </p>
                      <p className="text-sm font-black text-zinc-700 underline decoration-gray-700 underline-offset-4">
                        10 Pieces
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={product.comingSoon}
                    onClick={() => addToCart(product)}
                    className={`w-full py-4 rounded-2xl font-black text-[11px] tracking-widest transition-all flex items-center justify-center gap-2 ${
                      product.comingSoon
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-700 shadow-xl shadow-black/10 active:scale-95"
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
    </div>
  );
}

// Reusable Tab Button Component
function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <Button
      onClick={onClick}
   className={`min-w-[110px] px-4 sm:px-6 py-2.5 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 ${
  active

     ? "bg-black text-black shadow-md"
    : "text-gray-400 hover:text-black"
}`}
    >
      {icon} {label}
    </Button>
  );
}

