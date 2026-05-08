
"use client";

import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import PageHero from '@/components/PageHero';

export default function ServicesPage() {
  const products = useProductStore((state) => state.products);

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <PageHero 
        title={<>Johnny <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Boy</span></>}
        subtitle="Premium clouds ultimate flavor. Explore the exclusive JohnnyBoy collection where cutting-edge tech meets bold aesthetics."
        badge="Products"
      />
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20">


        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-300 rounded-3xl bg-white/50">
            <p className="text-gray-500 text-lg italic">
              The vault is empty. New flavors dropping soon...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product) => (
              <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}