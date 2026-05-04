"use client";

import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';

export default function ServicesPage() {
  const products = useProductStore((state) => state.products);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Curated Collection
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl">
          Experience our floating catalog. Each product is crafted with premium materials and designed for the modern aesthetic.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No products available right now. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
