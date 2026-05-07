import Hero from '@/components/sections/home/Hero';
import Features from '@/components/sections/home/Feactures';
import ProductShowcase from '@/components/sections/home/ProductShowcase';
import Movement from '@/components/sections/home/Movement';
import TechSpecs from '@/components/sections/home/TechSpecs';
import HappyCustomers from '@/components/sections/home/HappyCustomers';
export default function Home() {
  return (
    <main>
      <Hero />
      <TechSpecs/>
      <Features />
      <Movement/>
      <HappyCustomers/>
      <ProductShowcase/>
    </main>
  );
}