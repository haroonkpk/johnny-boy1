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
    <Card 
      variant="light" 
      className="p-4 flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:border-gray-200 border border-transparent"
    >
      <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden flex items-center justify-center bg-[var(--color-cream)]">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="relative w-full h-full p-4 drop-shadow-xl"
        >
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
          /> 
        </motion.div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 transition-colors text-[var(--gold)]">
          {product.title}
        </h3>
        <p className="font-mono mb-4 text-xl tracking-tight text-gray-800 font-black">
          ${product.price.toFixed(2)}
        </p>
        
        <div className="mt-auto pt-4">
          <Button 
            variant="secondary" 
            className="w-full transition-all transform"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
