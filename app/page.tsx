'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { OurStorySection } from '@/components/home/OurStorySection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { RecommendedPicksSection } from '@/components/home/RecommendedPicksSection';
import { BlogPreviewSection } from '@/components/home/BlogPreviewSection';
import { RecipePreviewSection } from '@/components/home/RecipePreviewSection';
import { ContactCTASection } from '@/components/home/ContactCTASection';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <OurStorySection />
      <ServicesSection />
      <RecommendedPicksSection />
      <BlogPreviewSection />
      <RecipePreviewSection />
      <ContactCTASection />
    </div>
  );
}