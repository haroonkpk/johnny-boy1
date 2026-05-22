import ProductCard from '@/components/ProductCard';
import PageHero from '@/components/PageHero';
import { getProducts } from '@/actions/product';
import { getSiteContent } from '@/actions/content';
import { Product } from '@/types/product';
import Link from 'next/link';

export const revalidate = 10;

export default async function LocalSeries() {
  const [allProducts, content] = await Promise.all([
    getProducts(),
    getSiteContent(),
  ]);

  const products = (allProducts as Product[])
    .filter(p => p.series === 'local')
    .sort((a, b) => Number(a.comingSoon) - Number(b.comingSoon));

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <PageHero 
        title={content.localseriesTitle}
        subtitle={content.localseriesSubtitle}
        badge={content.localseriesBadge}
      />
    
  
      {/* <div className="py-10 flex justify-center items-center "> */}
     
         <div className="pt-10 pb-6 flex justify-center items-center">
        <h1 className="text-black text-5xl md:text-7xl font-extrabold text-center">
          {products.length} Flavours
        </h1>
      </div>

      {/* --- BUTTON becom reseller --- */}
      {/* <div className="flex justify-center pb-12">
        <Link 
          href="/signup" 
          className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
        >
          Become a Reseller
        </Link>
      </div> */}
       
      {/* <DeviceHighlights />
      <BottleParallax /> */}

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-300 rounded-3xl bg-white/50">
            <p className="text-gray-500 text-lg italic">
              The vault is empty. New flavors dropping soon...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pb-32">
            {products.map((product, index) => {
              const staggerClass = index % 3 === 0 
                ? "lg:translate-y-0" 
                : index % 3 === 1 
                  ? "lg:translate-y-32" 
                  : "lg:translate-y-16";
              
              const smStaggerClass = index % 2 === 0 
                ? "sm:translate-y-0" 
                : "sm:translate-y-20";

              return (
                <div 
                  key={product._id || product.id} 
                  className={`transform hover:scale-110 transition-all duration-700 ease-out ${smStaggerClass} ${staggerClass}`}
                >
                  <ProductCard 
                    product={product as any} 
                    type="local" 
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}