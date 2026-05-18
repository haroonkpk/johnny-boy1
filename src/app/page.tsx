import Hero from '@/components/sections/home/Hero';
import HomeCTA from '@/components/sections/home/HomeCTA';
import Movement from '@/components/sections/home/Movement';
import TechSpecs from '@/components/sections/home/TechSpecs';
import HappyCustomers from '@/components/sections/home/HappyCustomers';
import Features from '@/components/sections/home/Features';
import { getProducts } from '@/actions/product';
import { getSiteContent } from '@/actions/content';
import { ComponentType } from 'react';

export const revalidate = 5;

// Map section IDs to their components
const SECTION_MAP: Record<string, ComponentType<any>> = {
  hero: Hero,
  techSpecs: TechSpecs,
  features: Features,
  movement: Movement,
  happyCustomers: HappyCustomers,
  homeCta: HomeCTA,
};

const DEFAULT_ORDER = [
  'hero',
  'techSpecs',
  'features',
  'movement',
  'happyCustomers',
  'homeCta',
];

export default async function Home() {
  const [products, content] = await Promise.all([
    getProducts(),
    getSiteContent(),
  ]);

  const sectionOrder =
    (content as any)?.sectionOrder?.length > 0
      ? (content as any).sectionOrder
      : DEFAULT_ORDER;

  const hiddenSections = (content as any)?.hiddenSections || [];
  const visibleSections = sectionOrder.filter((id: string) => !hiddenSections.includes(id));

  return (
    <main>
      {visibleSections.map((sectionId: string) => {
        const Component = SECTION_MAP[sectionId];
        if (!Component) return null;

        // Pass appropriate props to each section
        const props: Record<string, any> = { key: sectionId };

        if (sectionId === 'features') {
          props.initialProducts = products;
        }

        return <Component {...props} />;
      })}
    </main>
  );
}
