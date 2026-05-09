
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/store/useProductStore';
import { Card } from './ui/card';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Floating animation configuration
  const floatingTransition = {
    repeat: Infinity,
    duration: 4,
    ease: 'easeInOut',
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant="light"
      className="p-4 flex flex-col h-full group transition-all duration-500 hover:shadow-2xl border border-transparent relative overflow-hidden bg-white"
    >
      {/* Product Display Area */}
      <div className="relative w-full h-72 mb-4 rounded-xl overflow-hidden flex items-center justify-center bg-[var(--color-cream)]">
        {/* <div className="absolute inset-0 z-0"> */}
        <div className="absolute inset-0 z-0">
    <img 
      src="/images/water.png" 
      alt="background"
      className="w-full h-full object-cover opacity-50" 
    />
  </div>
        {/* ---  OVERLAY  --- */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2 }}
              className="absolute inset-4 z-10 bg-white/40 backdrop-blur-md rounded-full flex flex-col items-start justify-center p-8 border border-white/60 shadow-xl"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-[140px]" // Content ko left side par rakhne ke liye width limit
              >
                <p className="text-[10px] uppercase tracking-widest text-gray-800 font-bold mb-1">Flavor Notes</p>
                <p className="text-[11px] font-medium text-gray-700 leading-tight text-left">
                  {product.description || "Sweet, tangy and incredibly smooth."}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- 2. ASSETS CONTAINER --- */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Bottle Parent (Floating + Tilt on Hover) */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: isHovered ? 15 : 0, 
              x: isHovered ? 20 : 0       
            }}
            transition={{ 
              y: floatingTransition,
              rotate: { type: "spring", stiffness: 100 },
              x: { type: "spring", stiffness: 100 }
            }}
            className="absolute z-30 flex items-center justify-center w-full h-full pointer-events-none"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-auto h-[85%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* Fruits Parent (Floating + Pop out) */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ ...floatingTransition, delay: 0.5 }}
            className="absolute inset-0 z-40 pointer-events-none"
          >
            <motion.img
              initial={{ rotate: 0, scale: 1 }}
              animate={isHovered ? { 
                rotate: 35, 
                scale: 1.4, 
                x: 30, 
                y: -20,
                filter: "drop-shadow(0px 15px 20px rgba(0,0,0,0.25))"
              } : { 
                rotate: 0, 
                scale: 1, 
                x: 0, 
                y: 0 
              }}
              transition={{ type: "spring", stiffness: 120 }}
              src="/images/fruit1.png" 
              className="absolute bottom-8 right-2 w-32 h-32 object-contain"
            />
          </motion.div>
          
        </div>
      </div>

      {/* --- 3. BOTTOM INFO --- */}
      <div className="flex flex-col flex-grow z-50 bg-white pt-2 relative"> 
        <div className="mt-auto">
          <h3 className="text-center font-black text-gray-800 text-lg uppercase tracking-tighter">
            {product.title}
          </h3>
          <div className="w-8 h-1 bg-[var(--color-primary)] mx-auto mt-1 rounded-full" />
        </div>
      </div>
    </Card>
  );
}