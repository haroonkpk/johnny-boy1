import Hero from '../components/Hero'; // Agar hero alag hai
import Features from '../components/Feactures';
import ProductShowcase from '@/components/ProductShowcase';
import Movement from '@/components/Movement';
import TechSpecs from '@/components/TechSpecs';
import CustomCursor from '../components/CustomCursor';
import HappyCustomers from '../components/HappyCustomers';
export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Hero />
      <TechSpecs/>
      <Features />
      <Movement/>
      <HappyCustomers/>
      <ProductShowcase/>
    </main>
  );
}