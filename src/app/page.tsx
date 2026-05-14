import Hero from '@/components/sections/home/Hero';
import HomeCTA from '@/components/sections/home/HomeCTA';
import Movement from '@/components/sections/home/Movement';
import TechSpecs from '@/components/sections/home/TechSpecs';
import HappyCustomers from '@/components/sections/home/HappyCustomers';
import Features from '@/components/sections/home/Features';
import { getProducts } from '@/actions/product';
import HeroScroll from '@/components/HeroScroll';

export const revalidate = 10;

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <Hero />
      <HeroScroll />
      <TechSpecs/>
      <Features initialProducts={products} />
      <Movement/>
      <HappyCustomers/>
      <HomeCTA/>
    </main>
  );
}