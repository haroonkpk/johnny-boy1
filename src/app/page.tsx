import Hero from '../components/Hero'; // Agar hero alag hai
import Features from '../components/Feactures';
import ProductShowcase from '@/components/ProductShowcase';
import Movement from '@/components/Movement';
import TechSpecs from '@/components/TechSpecs';

import HappyCustomers from '../components/HappyCustomers';
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