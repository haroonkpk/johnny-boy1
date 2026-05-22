import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface PageHeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  badge?: string;
}

const PageHero = ({ title, subtitle, badge }: PageHeroProps) => {
  const formatTitleWithGradient = (text: string) => {
    if (!text) return text;
    if (text.includes('<') && text.includes('>')) {
      return text;
    }
    const words = text.trim().split(/\s+/);
    if (words.length === 0) return text;
    if (words.length === 1) {
      return `<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">${words[0]}</span>`;
    }
    const lastWord = words[words.length - 1];
    const otherWords = words.slice(0, -1).join(" ");
    return `${otherWords} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">${lastWord}</span>`;
  };

  const renderedTitle = typeof title === 'string' ? (
    <span dangerouslySetInnerHTML={{ __html: formatTitleWithGradient(title) }} />
  ) : title;

  const renderedSubtitle = typeof subtitle === 'string' && subtitle.includes('<') && subtitle.includes('>') ? (
    <span dangerouslySetInnerHTML={{ __html: subtitle }} />
  ) : subtitle;

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
          title={renderedTitle}
          subtitle={renderedSubtitle}
          badge={badge}
          mode="dark" // PageHero bg is usually dark/imaged, so dark mode (gold text) looks better
          className="mb-0" // Remove bottom margin from heading
        />
      </div>
    </section>
  );
};

export default PageHero;
