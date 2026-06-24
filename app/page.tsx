"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { OurStorySection } from "@/components/home/OurStorySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { RecommendedPicksSection } from "@/components/home/RecommendedPicksSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { RecipePreviewSection } from "@/components/home/RecipePreviewSection";
import { TopRestaurantsSection } from "@/components/home/TopRestaurantsSection";
import { ContactCTASection } from "@/components/home/ContactCTASection";

import nextDynamic from "next/dynamic";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

function HomeComponent() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <OurStorySection />
      <ServicesSection />
      <RecommendedPicksSection />
      <BlogPreviewSection />
      <RecipePreviewSection />
      <TopRestaurantsSection />
      <ContactCTASection />
    </div>
  );
}

const Home = nextDynamic(
  () => Promise.resolve(HomeComponent),
  { ssr: false }
);

export default Home;
