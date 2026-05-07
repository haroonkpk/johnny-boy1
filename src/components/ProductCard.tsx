"use client";

import { motion } from 'framer-motion';
import { Product } from '@/store/useProductStore';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Button from './ui/Button';
import { Card } from './ui/card';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card variant="primary" className="p-4 flex flex-col h-full group transition-all duration-300 hover:border-white/20">
      <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
        {/* Anti-Gravity Animation on the Image Wrapper */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="relative w-full h-full p-4 drop-shadow-2xl"
        >
          {/* Using img for simplicity with external domains to avoid Next.js Image config for now, 
              or if we configure next.config.js we can use next/image. 
              Given the dynamic URLs, standard img with good object-fit is safer here without config. */}
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white mb-2">{product.title}</h3>
        <p className="text-gray-400 font-mono mb-4 text-xl tracking-tight">${product.price.toFixed(2)}</p>
        
        <div className="mt-auto pt-4">
          <Button variant="primary" className="w-full">
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
