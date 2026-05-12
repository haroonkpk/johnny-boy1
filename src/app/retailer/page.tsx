"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  MapPin,
  Zap,
} from "lucide-react";
import Image from "next/image";

// Context, Drawer aur Data imports
import { useCart } from "@/components/context/CartContext";
import { seriesData, SeriesKey } from "@/data/products";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useAuth } from "@/components/context/AuthContext";
import { TabNavigation } from "@/components/shared/TabNavigation";
    
export default function RetailerPage() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<SeriesKey | "all">("all");
  const { user } = useAuth();
  const userStatus = user?.status;

  // 1. Products Filter Logic 
  const displayProducts = useMemo(() => {
    if (userStatus === "pending") return [];

    let list =
      activeTab === "all"
        ? [...seriesData.local, ...seriesData.regular]
        : [...seriesData[activeTab]];

    return list.filter((product) => !product.comingSoon);
  }, [activeTab, userStatus]);

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
    <div className="min-h-screen w-full text-black flex flex-col">
  
      <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-6 lg:px-12 pt-10">
        <SectionHeading 
          title={`${activeTab} Series`}
          subtitle="Explore our curated collection of premium vapes and flavors."
          badge="RETAILER PANEL"
          mode="light"
          className="mb-10"
        />
        
        <div className="flex justify-center mb-8">
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { id: "all", label: "ALL", icon: <LayoutGrid size={16} /> },
              { id: "local", label: "LOCAL", icon: <MapPin size={16} /> },
              { id: "regular", label: "REGULAR", icon: <Zap size={16} /> },
            ]}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-12">


        {/* ULTRA-RESPONSIVE GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayProducts.map((product) => (
              <motion.div
                key={`${activeTab}-${product.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`flex flex-col h-full group ${product.comingSoon ? "opacity-50" : ""}`}
              >
                <Card variant="light" className="flex flex-col h-full shadow-none border-none bg-white p-3 sm:p-4">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 flex items-center justify-center bg-gray-50/50">
                    {/* Background */}
                    <Image
                      src={product.bg}
                      alt="bg"
                      fill
                      className="object-cover z-0 opacity-50"
                    />
                    
                    {/* Fruit */}
                    <Image
                      src={product.fruits}
                      alt="fruit"
                      fill
                      className="absolute z-10 drop-shadow-md"
                    />

                    {/* Device */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="relative scale-[1.6] translate-x-[-26%]  z-20 object-contain drop-shadow-xl"
                    />
                    
                    {product.comingSoon && (
                      <span className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase z-30">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col flex-grow justify-between gap-3 px-1">
                    <h3 className="text-lg font-black uppercase tracking-tight text-center text-gray-900">
                      {product.name}
                    </h3>
                    
                    <Button
                      variant="secondary"
                      className="w-full text-xs uppercase tracking-widest py-3 mt-auto"
                      disabled={product.comingSoon}
                      onClick={() => addToCart(product)}
                    >
                      {product.comingSoon ? "Not in Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}



