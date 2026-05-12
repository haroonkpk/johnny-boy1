"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  MapPin,
  Zap,
} from "lucide-react";
import Image from "next/image";

import { useCart } from "@/components/context/CartContext";
import { SeriesKey, Product } from "@/types/product";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSession } from "next-auth/react";
import { TabNavigation } from "@/components/shared/TabNavigation";
    
export default function RetailerClient({ initialProducts }: { initialProducts: Product[] }) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<SeriesKey | "all">("all");
  const { data: session } = useSession();
  const userStatus = (session?.user as any)?.status;

  // 1. Products Filter Logic 
  const displayProducts = useMemo(() => {
    let list =
      activeTab === "all"
        ? [...initialProducts]
        : initialProducts.filter(p => p.series === activeTab);

    return list.filter((product) => !product.comingSoon);
  }, [activeTab, initialProducts]);


  const isPending = userStatus === "pending";

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Account Pending Approval
          </h2>
          <p className="text-gray-600 mb-4">
            Your account is currently under review by our administration team. This process typically takes up to 24 hours. If you have been waiting longer than expected or need urgent assistance, please reach out to us.
          </p>
          <button 
            onClick={() => window.location.href = "/contact"}
            className="text-blue-600 font-semibold hover:underline transition-colors"
          >
            Contact Us
          </button>
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
                key={`${activeTab}-${product._id || product.id}`}
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



