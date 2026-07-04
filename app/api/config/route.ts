import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, withErrorHandling } from "@/lib/middleware";

const defaultSiteConfig = {
 home: {
 heroSlides: [
 {
 image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
 tag: "🍽️ Premium Dining",
 title: "Discover Your Next",
 highlight: "Culinary Adventure",
 subtitle: "From authentic recipes to hidden restaurant gems — explore a world of flavors."
 },
 {
 image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
 tag: "☕ Cafe Culture",
 title: "Experience the",
 highlight: "Perfect Café Escape",
 subtitle: "Cozy cafés, artisan coffee, and sweet moments curated just for you."
 }
 ],
 floatingStats: [
 { value: "50K+", label: "Food Lovers", icon: "❤️" },
 { value: "10K+", label: "Recipes", icon: "📖" },
 { value: "500+", label: "Restaurants", icon: "🍴" }
 ],
 ourStory: {
 title: "Our Story",
 subtitle: "Crafting Culinary Experiences Since 2020",
 text1: "Foodiety began as a simple space for sharing home-cooked family recipes. We believed that food was the ultimate connector — transcending borders, languages, and cultures.",
 text2: "Today, we've grown into a global community of chefs, writers, and restaurant discoverers dedicated to providing authentic culinary reviews and reviews for cafes, hotels, and local food spots.",
 image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
 statValue: "15+",
 statLabel: "Years Combined Culinary Craft"
 },
 contactCTA: {
 title: "Have a Food Project in Mind?",
 subtitle: "Let's collaborate to showcase your restaurant, cafe, or catering events.",
 btnText: "Get In Touch"
 }
 },
 services: [
 {
 title: "Event Catering",
 description: "Professional catering services for all your special occasions — from intimate gatherings to grand celebrations, we deliver culinary excellence every time.",
 features: ["Custom menu planning", "Professional chefs & servers", "Full setup & breakdown", "Dietary adjustments"],
 image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
 gradient: " ",
 glow: "shadow-orange-500/20",
 badge: "Most Popular"
 },
 {
 title: "Personal Chef Service",
 description: "Enjoy restaurant-quality meals in the comfort of your own home. Our personal chefs bring the finest dining experience directly to your table.",
 features: ["Customized meal planning", "Fresh local ingredients", "In-home prep", "Complete cleanup"],
 image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
 gradient: " ",
 glow: "shadow-amber-500/20"
 }
 ],
 gallery: [
 { id: 1, src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Gourmet Burger Platter", category: "Dishes", likes: 124, featured: true },
 { id: 2, src: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Chef at Work", category: "Behind the Scenes", likes: 89 },
 { id: 3, src: "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Wedding Reception Setup", category: "Events", likes: 156, featured: true }
 ],
 about: {
 heroTitle: "About Foodiety",
 heroSubtitle: "We're more than just a food platform – we're a community of passionate food lovers.",
 membersCount: "50K+",
 recipesCount: "10K+",
 restaurantsCount: "500+",
 countriesCount: "25+",
 mission: "To democratize exceptional food experiences by connecting people through authentic recipes, quality ingredients, and memorable dining adventures.",
 vision: "A world where great food brings people together, cultural traditions are preserved, and culinary creativity knows no bounds.",
 impact: "Empowering home cooks, supporting local restaurants, and fostering a global community passionate about food and culture.",
 timeline: [
 { year: "2020", title: "The Beginning", description: "Started as a passion project by three food enthusiasts sharing family recipes." },
 { year: "2023", title: "Restaurant Partnerships", description: "Partnered with 100+ restaurants and launched our restaurant directory." }
 ],
 team: [
 { name: "Sarah Chen", role: "Founder & Head Chef", bio: "Culinary Institute graduate with 15 years of experience in fine dining.", image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400" },
 { name: "Marco Rodriguez", role: "Creative Director", bio: "Award-winning food photographer and visual storyteller.", image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=400" }
 ]
 },
 contact: {
 heroTitle: "Get In Touch",
 heroSubtitle: "Ready to start your culinary journey? We're here to help bring your food dreams to life.",
 email: "hello@foodiety.com",
 phone: "+1 (555) 123-4567",
 address: "123 Culinary Street, San Francisco, CA 94102",
 hours: "Mon-Fri: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 4:00 PM, Sunday: Closed"
 },
 servicesPage: {
 bannerTag: "What We Offer",
 bannerTitle: "Our Services",
 bannerSubtitle: "From intimate dinner parties to grand celebrations, we bring culinary excellence and professional service to every occasion."
 },
 galleryPage: {
 bannerTag: "Visual Stories",
 bannerTitle: "Food Gallery",
 bannerSubtitle: "Explore stunning food photography, behind-the-scenes moments, and unforgettable dining experiences."
 },
 recipesPage: {
 bannerTag: "Culinary Recipes",
 bannerTitle: "Recipe Collection",
 bannerSubtitle: "Discover amazing recipes from around the world. Filter by cuisine, cooking time, and difficulty to find the perfect dish for any occasion."
 }
};

async function getConfigHandler(request: NextRequest) {
 let config = await prisma.siteConfig.findUnique({
 where: { key: "site_config" }
 });

 if (!config) {
 config = await prisma.siteConfig.create({
 data: {
 key: "site_config",
 value: defaultSiteConfig as any
 }
 });
 }

 return NextResponse.json({
 success: true,
 data: config.value
 });
}

async function postConfigHandler(request: NextRequest) {
 const authError = await withAuth(request, "ADMIN");
 if (authError) return authError;

 const body = await request.json();
 const updated = await prisma.siteConfig.upsert({
 where: { key: "site_config" },
 update: { value: body as any },
 create: { key: "site_config", value: body as any }
 });

 return NextResponse.json({
 success: true,
 data: updated.value
 });
}

export const GET = withErrorHandling(getConfigHandler);
export const POST = withErrorHandling(postConfigHandler);
export const PUT = withErrorHandling(postConfigHandler);
