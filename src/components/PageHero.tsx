import React from 'react';
import { SectionHeading } from './ui/SectionHeading';

interface PageHeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  badge?: string;
}

const PageHero = ({ title, subtitle, badge }: PageHeroProps) => {
  return (
    <section className="relative w-full h-[40vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/page-hero-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay for better readability if needed */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionHeading 
          title={title}
          subtitle={subtitle}
          badge={badge}
          mode="dark" // PageHero bg is usually dark/imaged, so dark mode (gold text) looks better
          className="mb-0" // Remove bottom margin from heading
        />
      </div>
    </section>
  );
};

export default PageHero;
