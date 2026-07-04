"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import {
 Home,
 Coffee,
 Hotel,
 Utensils,
 Image as ImageIcon,
 Sparkles,
 Phone,
 Mail,
 MapPin,
 Clock,
 Plus,
 Trash2,
 Check,
 Save,
 Grid,
 Info,
 Calendar,
 Layers,
 ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { ImageUpload } from "@/components/admin/ImageUpload";

import nextDynamic from "next/dynamic";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

// Preset defaults for site config
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
 }
};

const defaultRecipes = [
 {
 id: 1,
 title: "Homemade Pizza Margherita",
 image: "https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800",
 difficulty: "Beginner",
 cookTime: "30 min",
 servings: 4,
 rating: 4.9,
 cuisine: "Italian",
 tags: ["Vegetarian", "Quick", "Family-Friendly"],
 description: "Classic Italian pizza with fresh tomatoes, mozzarella, and basil",
 calories: 285
 },
 {
 id: 2,
 title: "Thai Green Curry",
 image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
 difficulty: "Intermediate",
 cookTime: "45 min",
 servings: 3,
 rating: 4.8,
 cuisine: "Thai",
 tags: ["Spicy", "Coconut", "Gluten-Free"],
 description: "Aromatic and creamy Thai curry with fresh herbs and vegetables",
 calories: 342
 }
];

function SiteCMSPageComponent() {
 const [activeTab, setActiveTab] = useState<"home" | "services" | "gallery" | "recipes" | "about" | "contact">("home");
 const [config, setConfig] = useState<any>(null);
 const [recipes, setRecipes] = useState<any[]>([]);
 const [isMounted, setIsMounted] = useState(false);

 // Services Edit Helper State
 const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
 const [newService, setNewService] = useState({ title: "", description: "", features: "", image: "", gradient: " ", glow: "shadow-orange-500/20" });

 // Gallery Edit Helper State
 const [newGalleryItem, setNewGalleryItem] = useState({ title: "", category: "Dishes", src: "", featured: false });

 // Recipe Edit Helper State
 const [editingRecipeIndex, setEditingRecipeIndex] = useState<number | null>(null);
 const [newRecipe, setNewRecipe] = useState({ title: "", image: "", difficulty: "Beginner", cookTime: "30 min", servings: 4, rating: 4.8, cuisine: "Italian", tags: "", description: "", calories: 300 });

 // Timeline Edit Helper State
 const [newTimeline, setNewTimeline] = useState({ year: "", title: "", description: "" });

 // Team Edit Helper State
 const [newTeam, setNewTeam] = useState({ name: "", role: "", bio: "", image: "" });

 // Hero slides helper
 const [editingSlideIdx, setEditingSlideIdx] = useState<number | null>(null);
 const [newSlide, setNewSlide] = useState({ title: "", highlight: "", subtitle: "", tag: "", image: "" });

 useEffect(() => {
 setIsMounted(true);
 // Fetch config from DB
 fetch("/api/config")
 .then(res => res.json())
 .then(res => {
 if (res.success && res.data) {
 setConfig(res.data);
 } else {
 setConfig(defaultSiteConfig);
 }
 })
 .catch(err => {
 console.error(err);
 setConfig(defaultSiteConfig);
 });

 // Load recipes database from DB
 fetch("/api/recipes")
 .then(res => res.json())
 .then(res => {
 if (res.success && res.data) {
 setRecipes(res.data);
 } else {
 setRecipes(defaultRecipes);
 }
 })
 .catch(err => {
 console.error(err);
 setRecipes(defaultRecipes);
 });
 }, []);

 const handleSaveConfig = (updatedConfig: any = config) => {
 setConfig({ ...updatedConfig });
 apiClient.post("/config", updatedConfig)
 .then(res => {
 if (res.data.success) {
 toast.success("Site configuration saved to database successfully!");
 }
 })
 .catch(err => {
 console.error(err);
 toast.error("Failed to save config to database: " + err.message);
 });
 };

 const handleSaveRecipes = (updatedRecipes: any[]) => {
 setRecipes([...updatedRecipes]);
 toast.success("Recipe database updated!");
 };

 if (!isMounted || !config) {
 return (
 <div className="flex items-center justify-center h-64">
 <div className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
 </div>
 );
 }

 // --- HOME SLIDES LOGIC ---
 const handleOpenSlideEdit = (idx: number) => {
 setEditingSlideIdx(idx);
 setNewSlide({ ...config.home.heroSlides[idx] });
 };
 const handleSaveSlide = () => {
 if (editingSlideIdx === null) return;
 const slides = [...config.home.heroSlides];
 slides[editingSlideIdx] = { ...newSlide };
 const updated = { ...config, home: { ...config.home, heroSlides: slides } };
 handleSaveConfig(updated);
 setEditingSlideIdx(null);
 };

 // --- SERVICES LOGIC ---
 const handleAddOrUpdateService = () => {
 if (!newService.title || !newService.description) {
 toast.error("Title and description are required.");
 return;
 }
 const splitFeatures = newService.features.split(",").map(f => f.trim()).filter(Boolean);
 const serviceObj = {
 ...newService,
 features: splitFeatures
 };

 let updatedServices = [...config.services];
 if (editingServiceIndex !== null) {
 updatedServices[editingServiceIndex] = serviceObj;
 toast.success("Service updated!");
 } else {
 updatedServices.push(serviceObj);
 toast.success("Service added!");
 }

 const updated = { ...config, services: updatedServices };
 handleSaveConfig(updated);
 // Reset helper
 setNewService({ title: "", description: "", features: "", image: "", gradient: " ", glow: "shadow-orange-500/20" });
 setEditingServiceIndex(null);
 };
 const handleEditService = (idx: number) => {
 setEditingServiceIndex(idx);
 setNewService({
 ...config.services[idx],
 features: config.services[idx].features.join(", ")
 });
 };
 const handleDeleteService = (idx: number) => {
 if (confirm("Delete this service?")) {
 const updatedServices = config.services.filter((_: any, i: number) => i !== idx);
 const updated = { ...config, services: updatedServices };
 handleSaveConfig(updated);
 }
 };

 // --- GALLERY LOGIC ---
 const handleAddGalleryItem = () => {
 if (!newGalleryItem.title || !newGalleryItem.src) {
 toast.error("Title and Image Source URL are required.");
 return;
 }
 const newItem = {
 id: Date.now(),
 ...newGalleryItem,
 likes: 0
 };
 const updatedGallery = [...config.gallery, newItem];
 const updated = { ...config, gallery: updatedGallery };
 handleSaveConfig(updated);
 setNewGalleryItem({ title: "", category: "Dishes", src: "", featured: false });
 toast.success("Gallery image added!");
 };
 const handleDeleteGalleryItem = (id: number) => {
 if (confirm("Remove this gallery image?")) {
 const updatedGallery = config.gallery.filter((img: any) => img.id !== id);
 const updated = { ...config, gallery: updatedGallery };
 handleSaveConfig(updated);
 }
 };

 // --- RECIPE LOGIC ---
 const handleAddOrUpdateRecipe = () => {
 if (!newRecipe.title || !newRecipe.description) {
 toast.error("Recipe title and description are required.");
 return;
 }
 const splitTags = newRecipe.tags.split(",").map(t => t.trim()).filter(Boolean);
 const recipeObj = {
 id: editingRecipeIndex !== null ? recipes[editingRecipeIndex].id : Date.now(),
 ...newRecipe,
 tags: splitTags,
 servings: Number(newRecipe.servings),
 rating: Number(newRecipe.rating),
 calories: Number(newRecipe.calories)
 };

 let updatedRecipes = [...recipes];
 if (editingRecipeIndex !== null) {
 updatedRecipes[editingRecipeIndex] = recipeObj;
 toast.success("Recipe modified!");
 } else {
 updatedRecipes.push(recipeObj);
 toast.success("Recipe added successfully!");
 }

 handleSaveRecipes(updatedRecipes);
 setNewRecipe({ title: "", image: "", difficulty: "Beginner", cookTime: "30 min", servings: 4, rating: 4.8, cuisine: "Italian", tags: "", description: "", calories: 300 });
 setEditingRecipeIndex(null);
 };
 const handleEditRecipe = (idx: number) => {
 setEditingRecipeIndex(idx);
 setNewRecipe({
 ...recipes[idx],
 tags: recipes[idx].tags.join(", ")
 });
 };
 const handleDeleteRecipe = (id: number) => {
 if (confirm("Delete this recipe?")) {
 const updated = recipes.filter((r) => r.id !== id);
 handleSaveRecipes(updated);
 }
 };

 // --- ABOUT TIMELINE & TEAM LOGIC ---
 const handleAddTimeline = () => {
 if (!newTimeline.year || !newTimeline.title) return;
 const timeline = [...config.about.timeline, newTimeline];
 const updated = { ...config, about: { ...config.about, timeline } };
 handleSaveConfig(updated);
 setNewTimeline({ year: "", title: "", description: "" });
 };
 const handleDeleteTimeline = (idx: number) => {
 const timeline = config.about.timeline.filter((_: any, i: number) => i !== idx);
 const updated = { ...config, about: { ...config.about, timeline } };
 handleSaveConfig(updated);
 };

 const handleAddTeam = () => {
 if (!newTeam.name || !newTeam.role) return;
 const team = [...config.about.team, newTeam];
 const updated = { ...config, about: { ...config.about, team } };
 handleSaveConfig(updated);
 setNewTeam({ name: "", role: "", bio: "", image: "" });
 };
 const handleDeleteTeam = (idx: number) => {
 const team = config.about.team.filter((_: any, i: number) => i !== idx);
 const updated = { ...config, about: { ...config.about, team } };
 handleSaveConfig(updated);
 };

 return (
 <div className="space-y-6 text-foreground min-h-screen">
 
 {/* Title */}
 <div>
 <h2 className="text-3xl font-bold tracking-tight font-outfit">Site Content Manager (CMS)</h2>
 <p className="text-muted-foreground text-sm">
 Modify the dynamic contents of the homepage, services, gallery, recipes, about, and contact routes in real-time.
 </p>
 </div>

 {/* Tabs Layout */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 
 {/* Left Vertical Selector */}
 <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl border border-border p-4 flex flex-col space-y-1.5 shadow-md">
 <span className="text-[10px] font-bold text-muted-foreground uppercase px-3 pb-2 border-b border-border mb-2">Select Hub Page</span>
 {[
 { id: "home", label: "Home Page", icon: Home },
 { id: "services", label: "Services Page", icon: Utensils },
 { id: "gallery", label: "Gallery Page", icon: ImageIcon },
 { id: "recipes", label: "Recipes Page", icon: Coffee },
 { id: "about", label: "About Page", icon: Info },
 { id: "contact", label: "Contact Page", icon: Phone },
 ].map((tab) => {
 const Icon = tab.icon;
 const isActive = activeTab === tab.id;
 return (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id as any)}
 className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all duration-200 ${
 isActive
 ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
 : "text-muted-foreground hover:text-foreground hover:bg-orange-500/5"
 }`}
 >
 <div className="flex items-center space-x-3">
 <Icon className="h-4 w-4" />
 <span>{tab.label}</span>
 </div>
 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
 </button>
 );
 })}
 </div>

 {/* Right Editor Window */}
 <div className="lg:col-span-9 bg-white dark:bg-gray-800 rounded-3xl border border-border p-6 md:p-8 shadow-xl">
 <AnimatePresence mode="wait">
 
 {/* 1. HOME EDITOR */}
 {activeTab === "home" && (
 <motion.div
 key="home-editor"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0 }}
 className="space-y-8"
 >
 <div className="border-b pb-3 border-border">
 <h3 className="text-xl font-bold font-outfit text-orange-500">Home Page Sections</h3>
 <p className="text-xs text-muted-foreground">Customize slide banners, Our Story credentials, and CTA buttons.</p>
 </div>

 {/* Hero Slides section */}
 <div className="space-y-4">
 <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Hero Slide Banner Carousels</h4>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {config.home.heroSlides.map((slide: any, idx: number) => (
 <div key={idx} className="border border-border p-4 rounded-xl space-y-3 bg-muted/40">
 <div className="h-32 w-full rounded-lg overflow-hidden border border-border">
 <img src={slide.image} className="w-full h-full object-cover" alt="slide" />
 </div>
 <div>
 <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/10 text-[9px] uppercase px-1.5 py-0.5">{slide.tag}</Badge>
 <h5 className="font-bold text-sm mt-1">{slide.title} <span className="text-orange-500">{slide.highlight}</span></h5>
 <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{slide.subtitle}</p>
 </div>
 <Button size="sm" variant="outline" className="w-full text-xs font-semibold rounded-lg" onClick={() => handleOpenSlideEdit(idx)}>
 Edit Slide Content
 </Button>
 </div>
 ))}
 </div>

 {/* Slide Edit Sub-modal */}
 {editingSlideIdx !== null && (
 <div className="p-5 border border-orange-500/20 bg-orange-500/5 rounded-2xl space-y-4">
 <h5 className="text-xs font-bold text-orange-500 uppercase">Modify Slide #{editingSlideIdx + 1}</h5>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-3 flex flex-col justify-between">
 <Input placeholder="Slide Title prefix..." value={newSlide.title} onChange={e => setNewSlide({...newSlide, title: e.target.value})} className="rounded-lg text-xs" />
 <Input placeholder="Slide Title highlight..." value={newSlide.highlight} onChange={e => setNewSlide({...newSlide, highlight: e.target.value})} className="rounded-lg text-xs" />
 <Input placeholder="Badge / Tag..." value={newSlide.tag} onChange={e => setNewSlide({...newSlide, tag: e.target.value})} className="rounded-lg text-xs" />
 <Input placeholder="Slide Subtitle..." value={newSlide.subtitle} onChange={e => setNewSlide({...newSlide, subtitle: e.target.value})} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <ImageUpload
 directory="cms"
 value={newSlide.image}
 onUpload={(src) => setNewSlide({...newSlide, image: src as string})}
 label="Slide Image"
 />
 </div>
 </div>
 <div className="flex space-x-2 pt-2">
 <Button size="sm" onClick={handleSaveSlide} className="bg-orange-500 text-white text-xs">Save Slide</Button>
 <Button size="sm" variant="ghost" onClick={() => setEditingSlideIdx(null)} className="text-xs border">Cancel</Button>
 </div>
 </div>
 )}
 </div>

 {/* Our Story section */}
 <div className="space-y-4 border-t pt-6 border-border/40">
 <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Our Story Section</h4>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Section Title</label>
 <Input value={config.home.ourStory.title} onChange={e => handleSaveConfig({...config, home: {...config.home, ourStory: {...config.home.ourStory, title: e.target.value}}})} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Section Subtitle</label>
 <Input value={config.home.ourStory.subtitle} onChange={e => handleSaveConfig({...config, home: {...config.home, ourStory: {...config.home.ourStory, subtitle: e.target.value}}})} className="rounded-lg text-xs" />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Description paragraph 1</label>
 <Textarea value={config.home.ourStory.text1} onChange={e => handleSaveConfig({...config, home: {...config.home, ourStory: {...config.home.ourStory, text1: e.target.value}}})} className="rounded-lg text-xs min-h-[70px]" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Description paragraph 2</label>
 <Textarea value={config.home.ourStory.text2} onChange={e => handleSaveConfig({...config, home: {...config.home, ourStory: {...config.home.ourStory, text2: e.target.value}}})} className="rounded-lg text-xs min-h-[70px]" />
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <ImageUpload
 directory="cms"
 value={config.home.ourStory.image}
 onUpload={(src) => handleSaveConfig({
 ...config,
 home: {
 ...config.home,
 ourStory: {
 ...config.home.ourStory,
 image: src as string
 }
 }
 })}
 label="Story Image"
 />
 </div>
 <div className="space-y-4 flex flex-col justify-center">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Badge Value (e.g. '15+')</label>
 <Input value={config.home.ourStory.statValue} onChange={e => handleSaveConfig({...config, home: {...config.home, ourStory: {...config.home.ourStory, statValue: e.target.value}}})} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Badge Label</label>
 <Input value={config.home.ourStory.statLabel} onChange={e => handleSaveConfig({...config, home: {...config.home, ourStory: {...config.home.ourStory, statLabel: e.target.value}}})} className="rounded-lg text-xs" />
 </div>
 </div>
 </div>
 </div>

 {/* Contact CTA Section */}
 <div className="space-y-4 border-t pt-6 border-border/40">
 <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Home Contact CTA Banner</h4>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">CTA Title</label>
 <Input value={config.home.contactCTA.title} onChange={e => handleSaveConfig({...config, home: {...config.home, contactCTA: {...config.home.contactCTA, title: e.target.value}}})} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">CTA Subtitle</label>
 <Input value={config.home.contactCTA.subtitle} onChange={e => handleSaveConfig({...config, home: {...config.home, contactCTA: {...config.home.contactCTA, subtitle: e.target.value}}})} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Button Text</label>
 <Input value={config.home.contactCTA.btnText} onChange={e => handleSaveConfig({...config, home: {...config.home, contactCTA: {...config.home.contactCTA, btnText: e.target.value}}})} className="rounded-lg text-xs" />
 </div>
 </div>
 </div>

 </motion.div>
 )}

 {/* 2. SERVICES EDITOR */}
 {activeTab === "services" && (
 <motion.div
 key="services-editor"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0 }}
 className="space-y-6"
 >
 <div className="border-b pb-3 border-border">
 <h3 className="text-xl font-bold font-outfit text-orange-500">Services Page Banner Settings</h3>
 <p className="text-xs text-muted-foreground">Modify the hero banner content for the Services page.</p>
 </div>

 <div className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Tag / Category Badge</label>
 <Input
 value={config.servicesPage?.bannerTag || ""}
 onChange={e => handleSaveConfig({
 ...config,
 servicesPage: {
 ...(config.servicesPage || {}),
 bannerTag: e.target.value
 }
 })}
 className="rounded-lg text-xs"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Title</label>
 <Input
 value={config.servicesPage?.bannerTitle || ""}
 onChange={e => handleSaveConfig({
 ...config,
 servicesPage: {
 ...(config.servicesPage || {}),
 bannerTitle: e.target.value
 }
 })}
 className="rounded-lg text-xs"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Subtitle / Description</label>
 <Textarea
 value={config.servicesPage?.bannerSubtitle || ""}
 onChange={e => handleSaveConfig({
 ...config,
 servicesPage: {
 ...(config.servicesPage || {}),
 bannerSubtitle: e.target.value
 }
 })}
 className="rounded-lg text-xs min-h-[80px]"
 />
 </div>
 </div>
 </motion.div>
 )}

 {/* 3. GALLERY EDITOR */}
 {activeTab === "gallery" && (
 <motion.div
 key="gallery-editor"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0 }}
 className="space-y-6"
 >
 <div className="border-b pb-3 border-border">
 <h3 className="text-xl font-bold font-outfit text-orange-500">Gallery Page Banner Settings</h3>
 <p className="text-xs text-muted-foreground">Modify the hero banner content for the Gallery page.</p>
 </div>

 <div className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Tag / Category Badge</label>
 <Input
 value={config.galleryPage?.bannerTag || ""}
 onChange={e => handleSaveConfig({
 ...config,
 galleryPage: {
 ...(config.galleryPage || {}),
 bannerTag: e.target.value
 }
 })}
 className="rounded-lg text-xs"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Title</label>
 <Input
 value={config.galleryPage?.bannerTitle || ""}
 onChange={e => handleSaveConfig({
 ...config,
 galleryPage: {
 ...(config.galleryPage || {}),
 bannerTitle: e.target.value
 }
 })}
 className="rounded-lg text-xs"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Subtitle / Description</label>
 <Textarea
 value={config.galleryPage?.bannerSubtitle || ""}
 onChange={e => handleSaveConfig({
 ...config,
 galleryPage: {
 ...(config.galleryPage || {}),
 bannerSubtitle: e.target.value
 }
 })}
 className="rounded-lg text-xs min-h-[80px]"
 />
 </div>
 </div>
 </motion.div>
 )}

 {/* 4. RECIPES EDITOR */}
 {activeTab === "recipes" && (
 <motion.div
 key="recipes-editor"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0 }}
 className="space-y-6"
 >
 <div className="border-b pb-3 border-border">
 <h3 className="text-xl font-bold font-outfit text-orange-500">Recipes Page Banner Settings</h3>
 <p className="text-xs text-muted-foreground">Modify the hero banner content for the Recipes page.</p>
 </div>

 <div className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Tag / Category Badge</label>
 <Input
 value={config.recipesPage?.bannerTag || ""}
 onChange={e => handleSaveConfig({
 ...config,
 recipesPage: {
 ...(config.recipesPage || {}),
 bannerTag: e.target.value
 }
 })}
 className="rounded-lg text-xs"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Title</label>
 <Input
 value={config.recipesPage?.bannerTitle || ""}
 onChange={e => handleSaveConfig({
 ...config,
 recipesPage: {
 ...(config.recipesPage || {}),
 bannerTitle: e.target.value
 }
 })}
 className="rounded-lg text-xs"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Banner Subtitle / Description</label>
 <Textarea
 value={config.recipesPage?.bannerSubtitle || ""}
 onChange={e => handleSaveConfig({
 ...config,
 recipesPage: {
 ...(config.recipesPage || {}),
 bannerSubtitle: e.target.value
 }
 })}
 className="rounded-lg text-xs min-h-[80px]"
 />
 </div>
 </div>
 </motion.div>
 )}

 {/* 5. ABOUT EDITOR */}
 {activeTab === "about" && (
 <motion.div
 key="about-editor"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0 }}
 className="space-y-8"
 >
 <div className="border-b pb-3 border-border">
 <h3 className="text-xl font-bold font-outfit text-orange-500">About Page Editor</h3>
 <p className="text-xs text-muted-foreground">Customize stats counters, mission text, timeline journey landmarks, and team profiles.</p>
 </div>

 {/* About header & stats counters */}
 <div className="space-y-4">
 <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Header & Stats Index</h4>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Hero Title</label>
 <Input value={config.about.heroTitle} onChange={e => handleSaveConfig({...config, about: {...config.about, heroTitle: e.target.value}})} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Hero Subtitle</label>
 <Input value={config.about.heroSubtitle} onChange={e => handleSaveConfig({...config, about: {...config.about, heroSubtitle: e.target.value}})} className="rounded-lg text-xs" />
 </div>
 </div>
 
 {/* Counters */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl border bg-muted/40">
 {[
 { key: "membersCount", label: "Members Count" },
 { key: "recipesCount", label: "Recipes Count" },
 { key: "restaurantsCount", label: "Partners Count" },
 { key: "countriesCount", label: "Countries Count" },
 ].map((st) => (
 <div key={st.key} className="space-y-1">
 <label className="text-[10px] font-bold text-muted-foreground uppercase">{st.label}</label>
 <Input value={config.about[st.key]} onChange={e => handleSaveConfig({...config, about: {...config.about, [st.key]: e.target.value}})} className="rounded-lg text-xs bg-background" />
 </div>
 ))}
 </div>
 </div>

 {/* Mission / Vision / Impact */}
 <div className="space-y-4 border-t pt-6 border-border/40">
 <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Mission Statements</h4>
 <div className="space-y-3">
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Our Mission Statement</label>
 <Textarea value={config.about.mission} onChange={e => handleSaveConfig({...config, about: {...config.about, mission: e.target.value}})} className="rounded-lg text-xs min-h-[50px]" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Our Vision Statement</label>
 <Textarea value={config.about.vision} onChange={e => handleSaveConfig({...config, about: {...config.about, vision: e.target.value}})} className="rounded-lg text-xs min-h-[50px]" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Our Impact Statement</label>
 <Textarea value={config.about.impact} onChange={e => handleSaveConfig({...config, about: {...config.about, impact: e.target.value}})} className="rounded-lg text-xs min-h-[50px]" />
 </div>
 </div>
 </div>

 {/* Team CMS */}
 <div className="space-y-4 border-t pt-6 border-border/40">
 <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Team Member CMS</h4>
 
 {/* Existing Team */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 {config.about.team.map((mem: any, idx: number) => (
 <div key={idx} className="border p-3.5 rounded-xl flex items-center space-x-3 bg-muted/40">
 <img src={mem.image} className="w-10 h-10 rounded-full object-cover border" alt="team" />
 <div className="flex-1 min-w-0">
 <h5 className="font-bold text-xs text-foreground truncate">{mem.name}</h5>
 <span className="text-[10px] text-orange-500 font-semibold uppercase truncate block">{mem.role}</span>
 </div>
 <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={() => handleDeleteTeam(idx)}>
 <Trash2 className="h-4.5 w-4.5" />
 </Button>
 </div>
 ))}
 </div>

 {/* Add team block */}
 <div className="p-4 border border-orange-500/10 bg-orange-500/5 rounded-xl space-y-3">
 <h5 className="text-xs font-bold text-orange-500 uppercase">Add Team Profile</h5>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-3">
 <Input placeholder="Name..." value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} className="rounded-lg text-xs bg-background" />
 <Input placeholder="Role..." value={newTeam.role} onChange={e => setNewTeam({...newTeam, role: e.target.value})} className="rounded-lg text-xs bg-background" />
 <Textarea placeholder="Short Biography..." value={newTeam.bio} onChange={e => setNewTeam({...newTeam, bio: e.target.value})} className="rounded-lg text-xs min-h-[50px] bg-background" />
 </div>
 <div className="space-y-2">
 <ImageUpload
 directory="cms"
 value={newTeam.image}
 onUpload={(src) => setNewTeam({...newTeam, image: src as string})}
 label="Avatar Photo"
 />
 </div>
 </div>
 <Button size="sm" onClick={handleAddTeam} className="bg-orange-500 text-white text-[11px] font-bold">Add Member</Button>
 </div>
 </div>

 {/* Timeline CMS */}
 <div className="space-y-4 border-t pt-6 border-border/40">
 <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Timeline Milestones</h4>
 
 {/* Timeline list */}
 <div className="space-y-2">
 {config.about.timeline.map((line: any, idx: number) => (
 <div key={idx} className="border p-3 rounded-lg flex items-center justify-between bg-muted/40 text-xs">
 <div className="flex items-center space-x-3">
 <Badge className="bg-orange-500 text-white">{line.year}</Badge>
 <span className="font-bold">{line.title}</span>
 <span className="text-muted-foreground font-light line-clamp-1">— {line.description}</span>
 </div>
 <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500" onClick={() => handleDeleteTimeline(idx)}>
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 ))}
 </div>

 {/* Add timeline block */}
 <div className="p-4 border border-orange-500/10 bg-orange-500/5 rounded-xl space-y-3">
 <h5 className="text-xs font-bold text-orange-500 uppercase">Add Milestone Event</h5>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
 <Input placeholder="Year (e.g. 2026)..." value={newTimeline.year} onChange={e => setNewTimeline({...newTimeline, year: e.target.value})} className="rounded-lg text-xs bg-background" />
 <Input placeholder="Milestone Title..." value={newTimeline.title} onChange={e => setNewTimeline({...newTimeline, title: e.target.value})} className="rounded-lg text-xs bg-background" />
 <Input placeholder="Description..." value={newTimeline.description} onChange={e => setNewTimeline({...newTimeline, description: e.target.value})} className="rounded-lg text-xs bg-background" />
 </div>
 <Button size="sm" onClick={handleAddTimeline} className="bg-orange-500 text-white text-[11px] font-bold">Add Event</Button>
 </div>
 </div>

 </motion.div>
 )}

 {/* 6. CONTACT EDITOR */}
 {activeTab === "contact" && (
 <motion.div
 key="contact-editor"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0 }}
 className="space-y-6"
 >
 <div className="border-b pb-3 border-border">
 <h3 className="text-xl font-bold font-outfit text-orange-500">Contact Information Settings</h3>
 <p className="text-xs text-muted-foreground">Update the contact phone, email, address, and operation hours.</p>
 </div>

 <div className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Hero Title</label>
 <Input value={config.contact.heroTitle} onChange={e => handleSaveConfig({...config, contact: {...config.contact, heroTitle: e.target.value}})} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Hero Subtitle</label>
 <Input value={config.contact.heroSubtitle} onChange={e => handleSaveConfig({...config, contact: {...config.contact, heroSubtitle: e.target.value}})} className="rounded-lg text-xs" />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Contact Email Address</label>
 <Input value={config.contact.email} onChange={e => handleSaveConfig({...config, contact: {...config.contact, email: e.target.value}})} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Contact Phone Number</label>
 <Input value={config.contact.phone} onChange={e => handleSaveConfig({...config, contact: {...config.contact, phone: e.target.value}})} className="rounded-lg text-xs" />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Business Office Location Address</label>
 <Input value={config.contact.address} onChange={e => handleSaveConfig({...config, contact: {...config.contact, address: e.target.value}})} className="rounded-lg text-xs" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Business Hours details</label>
 <Textarea value={config.contact.hours} onChange={e => handleSaveConfig({...config, contact: {...config.contact, hours: e.target.value}})} className="rounded-lg text-xs min-h-[60px]" />
 </div>
 </div>
 </motion.div>
 )}

 </AnimatePresence>
 </div>

 </div>

 </div>
 );
}

const SiteCMSPage = nextDynamic(
 () => Promise.resolve(SiteCMSPageComponent),
 { ssr: false }
);

export default SiteCMSPage;
