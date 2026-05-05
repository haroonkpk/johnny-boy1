
// "use client";

// import { useProductStore } from '@/store/useProductStore';
// import ProductCard from '@/components/ProductCard';

// export default function ServicesPage() {
//   const products = useProductStore((state) => state.products);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
//           Curated Collection
//         </h1>
//         <p className="text-lg text-gray-400 max-w-3xl">
//           Experience our floating catalog. Each product is crafted with premium materials and designed for the modern aesthetic.
//         </p>
//       </div>

//       {products.length === 0 ? (
//         <div className="text-center py-20 text-gray-500">
//           <p>No products available right now. Please check back later.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';

export default function ServicesPage() {
  const products = useProductStore((state) => state.products);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header Section: Centered for JohnnyBoy */}
      <div className="mb-16 text-center">
        {/* <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 uppercase italic">
          Johnny Boy
           {/* <span className="text-yellow-500">Boy</span> */}
        {/* </h1> */} 
         <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Johnny <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Boy</span>
          </h2>
        {/* <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div> */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Premium clouds ultimate flavor. Explore the exclusive JohnnyBoy collection where 
          cutting-edge tech meets bold aesthetics. Elevate your vape game today.
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-800 rounded-3xl">
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
  );
}