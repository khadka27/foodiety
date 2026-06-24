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
  services: [
    {
      title: "Event Catering",
      description: "Professional catering services for all your special occasions — from intimate gatherings to grand celebrations, we deliver culinary excellence every time.",
      features: ["Custom menu planning", "Professional chefs & servers", "Full setup & breakdown", "Dietary adjustments"],
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      gradient: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/20",
      badge: "Most Popular"
    },
    {
      title: "Personal Chef Service",
      description: "Enjoy restaurant-quality meals in the comfort of your own home. Our personal chefs bring the finest dining experience directly to your table.",
      features: ["Customized meal planning", "Fresh local ingredients", "In-home prep", "Complete cleanup"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
      gradient: "from-amber-500 to-orange-500",
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
  const [newService, setNewService] = useState({ title: "", description: "", features: "", image: "", gradient: "from-orange-500 to-red-500", glow: "shadow-orange-500/20" });

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
    // Load config from localStorage
    const savedConfig = localStorage.getItem("foodiety_site_config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        setConfig(defaultSiteConfig);
      }
    } else {
      setConfig(defaultSiteConfig);
      localStorage.setItem("foodiety_site_config", JSON.stringify(defaultSiteConfig));
    }

    // Load recipes
    const savedRecipes = localStorage.getItem("foodiety_recipes");
    if (savedRecipes) {
      try {
        setRecipes(JSON.parse(savedRecipes));
      } catch (e) {
        setRecipes(defaultRecipes);
      }
    } else {
      setRecipes(defaultRecipes);
      localStorage.setItem("foodiety_recipes", JSON.stringify(defaultRecipes));
    }
  }, []);

  const handleSaveConfig = (updatedConfig: any = config) => {
    setConfig({ ...updatedConfig });
    localStorage.setItem("foodiety_site_config", JSON.stringify(updatedConfig));
    toast.success("Site configuration saved successfully!");
  };

  const handleSaveRecipes = (updatedRecipes: any[]) => {
    setRecipes([...updatedRecipes]);
    localStorage.setItem("foodiety_recipes", JSON.stringify(updatedRecipes));
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
    setNewService({ title: "", description: "", features: "", image: "", gradient: "from-orange-500 to-red-500", glow: "shadow-orange-500/20" });
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
                        <Input placeholder="Slide Title prefix..." value={newSlide.title} onChange={e => setNewSlide({...newSlide, title: e.target.value})} className="rounded-lg text-xs" />
                        <Input placeholder="Slide Title highlight..." value={newSlide.highlight} onChange={e => setNewSlide({...newSlide, highlight: e.target.value})} className="rounded-lg text-xs" />
                        <Input placeholder="Badge / Tag..." value={newSlide.tag} onChange={e => setNewSlide({...newSlide, tag: e.target.value})} className="rounded-lg text-xs" />
                        <Input placeholder="Background Image URL..." value={newSlide.image} onChange={e => setNewSlide({...newSlide, image: e.target.value})} className="rounded-lg text-xs" />
                      </div>
                      <Input placeholder="Slide Subtitle..." value={newSlide.subtitle} onChange={e => setNewSlide({...newSlide, subtitle: e.target.value})} className="rounded-lg text-xs" />
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Story Image URL</label>
                      <Input value={config.home.ourStory.image} onChange={e => handleSaveConfig({...config, home: {...config.home, ourStory: {...config.home.ourStory, image: e.target.value}}})} className="rounded-lg text-xs" />
                    </div>
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
                  <h3 className="text-xl font-bold font-outfit text-orange-500">Services CMS Section</h3>
                  <p className="text-xs text-muted-foreground">Manage service listings, highlight badges, and features checklists.</p>
                </div>

                {/* Services Grid list */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase text-muted-foreground">Active Services</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.services.map((ser: any, idx: number) => (
                      <div key={idx} className="border border-border p-4 rounded-xl space-y-2 relative bg-muted/20">
                        <h5 className="font-bold text-sm text-foreground">{ser.title}</h5>
                        <p className="text-xs text-muted-foreground line-clamp-2">{ser.description}</p>
                        <div className="text-[10px] text-orange-500 font-semibold uppercase">{ser.features.length} Features Loaded</div>
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline" className="text-[10px] rounded-lg" onClick={() => handleEditService(idx)}>Edit</Button>
                          <Button size="sm" variant="ghost" className="text-[10px] text-red-500 rounded-lg" onClick={() => handleDeleteService(idx)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Service Editor Block */}
                  <div className="p-5 border border-orange-500/20 bg-orange-500/5 rounded-2xl space-y-4">
                    <h5 className="text-xs font-bold text-orange-500 uppercase">{editingServiceIndex !== null ? "Modify Service Item" : "Create New Service Card"}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Service Title..." value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="rounded-lg text-xs" />
                      <Input placeholder="Image Cover URL..." value={newService.image} onChange={e => setNewService({...newService, image: e.target.value})} className="rounded-lg text-xs" />
                    </div>
                    <Textarea placeholder="Service Description..." value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="rounded-lg text-xs min-h-[60px]" />
                    <Input placeholder="Features Checklist (Comma separated)..." value={newService.features} onChange={e => setNewService({...newService, features: e.target.value})} className="rounded-lg text-xs" />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleAddOrUpdateService} className="bg-orange-500 text-white text-xs">{editingServiceIndex !== null ? "Update Service Card" : "Add Service Card"}</Button>
                      {editingServiceIndex !== null && (
                        <Button size="sm" variant="ghost" className="text-xs border" onClick={() => {
                          setEditingServiceIndex(null);
                          setNewService({ title: "", description: "", features: "", image: "", gradient: "from-orange-500 to-red-500", glow: "shadow-orange-500/20" });
                        }}>Cancel</Button>
                      )}
                    </div>
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
                  <h3 className="text-xl font-bold font-outfit text-orange-500">Visual Gallery CMS</h3>
                  <p className="text-xs text-muted-foreground">Upload and remove food photos, specify showcase categories, and toggle homepage grids.</p>
                </div>

                <div className="space-y-4">
                  {/* Photo Add Block */}
                  <div className="p-5 border border-orange-500/10 bg-orange-500/5 rounded-2xl space-y-4">
                    <h5 className="text-xs font-bold text-orange-500 uppercase">Upload Gallery Photo Card</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input placeholder="Photo Title..." value={newGalleryItem.title} onChange={e => setNewGalleryItem({...newGalleryItem, title: e.target.value})} className="rounded-lg text-xs" />
                      <Input placeholder="Absolute Image URL..." value={newGalleryItem.src} onChange={e => setNewGalleryItem({...newGalleryItem, src: e.target.value})} className="rounded-lg text-xs" />
                      <Select value={newGalleryItem.category} onValueChange={val => setNewGalleryItem({...newGalleryItem, category: val})}>
                        <SelectTrigger className="rounded-lg text-xs bg-background">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Dishes", "Events", "Behind the Scenes", "Restaurants", "Desserts"].map(c => (
                            <SelectItem key={c} value={c} className="cursor-pointer">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="gallery-feat" checked={newGalleryItem.featured} onChange={e => setNewGalleryItem({...newGalleryItem, featured: e.target.checked})} className="rounded text-orange-500" />
                      <label htmlFor="gallery-feat" className="text-xs font-semibold select-none cursor-pointer">Highlight this image as a featured card in layout listings</label>
                    </div>
                    <Button size="sm" onClick={handleAddGalleryItem} className="bg-orange-500 text-white text-xs">Add Photo to Gallery</Button>
                  </div>

                  {/* Listings Table */}
                  <h4 className="text-sm font-bold uppercase text-muted-foreground pt-4">Existing Photos ({config.gallery.length})</h4>
                  <div className="border border-border rounded-xl overflow-hidden shadow-md">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-3">Thumbnail</th>
                          <th className="p-3">Title</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Showcase</th>
                          <th className="p-3 text-right">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {config.gallery.map((img: any) => (
                          <tr key={img.id} className="hover:bg-muted/40">
                            <td className="p-3">
                              <div className="h-10 w-14 rounded overflow-hidden border">
                                <img src={img.src} className="w-full h-full object-cover" alt="thumb" />
                              </div>
                            </td>
                            <td className="p-3 font-semibold">{img.title}</td>
                            <td className="p-3"><Badge variant="outline">{img.category}</Badge></td>
                            <td className="p-3">{img.featured ? "Featured" : "Standard"}</td>
                            <td className="p-3 text-right">
                              <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500" onClick={() => handleDeleteGalleryItem(img.id)}>
                                <Trash2 className="h-4.5 w-4.5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                  <h3 className="text-xl font-bold font-outfit text-orange-500">Recipes Database CMS</h3>
                  <p className="text-xs text-muted-foreground">Manage the active catalog of recipes, customize cook times, servings, rating stars, and cuisines.</p>
                </div>

                <div className="space-y-4">
                  {/* Recipe Editor Frame */}
                  <div className="p-5 border border-orange-500/20 bg-orange-500/5 rounded-2xl space-y-4">
                    <h5 className="text-xs font-bold text-orange-500 uppercase">{editingRecipeIndex !== null ? "Edit Recipe Card" : "Add New Recipe Card"}</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input placeholder="Recipe Title..." value={newRecipe.title} onChange={e => setNewRecipe({...newRecipe, title: e.target.value})} className="rounded-lg text-xs" />
                      <Input placeholder="Image Source URL..." value={newRecipe.image} onChange={e => setNewRecipe({...newRecipe, image: e.target.value})} className="rounded-lg text-xs" />
                      <Input placeholder="Cuisine Style (e.g. Italian, Thai)..." value={newRecipe.cuisine} onChange={e => setNewRecipe({...newRecipe, cuisine: e.target.value})} className="rounded-lg text-xs" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Select value={newRecipe.difficulty} onValueChange={val => setNewRecipe({...newRecipe, difficulty: val})}>
                        <SelectTrigger className="rounded-lg text-xs bg-background">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Beginner", "Intermediate", "Advanced"].map(d => (
                            <SelectItem key={d} value={d} className="cursor-pointer">{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input placeholder="Cook Time (e.g. '30 min')..." value={newRecipe.cookTime} onChange={e => setNewRecipe({...newRecipe, cookTime: e.target.value})} className="rounded-lg text-xs" />
                      <Input type="number" placeholder="Servings..." value={newRecipe.servings} onChange={e => setNewRecipe({...newRecipe, servings: Number(e.target.value)})} className="rounded-lg text-xs" />
                      <Input type="number" step="0.1" placeholder="Stars (1-5)..." value={newRecipe.rating} onChange={e => setNewRecipe({...newRecipe, rating: Number(e.target.value)})} className="rounded-lg text-xs" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="number" placeholder="Calories count..." value={newRecipe.calories} onChange={e => setNewRecipe({...newRecipe, calories: Number(e.target.value)})} className="rounded-lg text-xs" />
                      <Input placeholder="Tags (Comma separated)..." value={newRecipe.tags} onChange={e => setNewRecipe({...newRecipe, tags: e.target.value})} className="rounded-lg text-xs" />
                    </div>

                    <Textarea placeholder="Recipe Short Description..." value={newRecipe.description} onChange={e => setNewRecipe({...newRecipe, description: e.target.value})} className="rounded-lg text-xs min-h-[60px]" />

                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleAddOrUpdateRecipe} className="bg-orange-500 text-white text-xs">{editingRecipeIndex !== null ? "Update Recipe" : "Publish Recipe"}</Button>
                      {editingRecipeIndex !== null && (
                        <Button size="sm" variant="ghost" className="text-xs border" onClick={() => {
                          setEditingRecipeIndex(null);
                          setNewRecipe({ title: "", image: "", difficulty: "Beginner", cookTime: "30 min", servings: 4, rating: 4.8, cuisine: "Italian", tags: "", description: "", calories: 300 });
                        }}>Cancel</Button>
                      )}
                    </div>
                  </div>

                  {/* Listings Table */}
                  <h4 className="text-sm font-bold uppercase text-muted-foreground pt-4">Published Recipes ({recipes.length})</h4>
                  <div className="border border-border rounded-xl overflow-hidden shadow-md">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-3">Thumbnail</th>
                          <th className="p-3">Title</th>
                          <th className="p-3">Cuisine</th>
                          <th className="p-3">Difficulty</th>
                          <th className="p-3">Time</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {recipes.map((r: any, idx: number) => (
                          <tr key={r.id} className="hover:bg-muted/40">
                            <td className="p-3">
                              <div className="h-10 w-14 rounded overflow-hidden border">
                                <img src={r.image} className="w-full h-full object-cover" alt="recipe" />
                              </div>
                            </td>
                            <td className="p-3 font-semibold">{r.title}</td>
                            <td className="p-3">{r.cuisine}</td>
                            <td className="p-3"><Badge variant="secondary">{r.difficulty}</Badge></td>
                            <td className="p-3">{r.cookTime}</td>
                            <td className="p-3 text-right">
                              <div className="flex justify-end space-x-1.5">
                                <Button size="sm" variant="outline" onClick={() => handleEditRecipe(idx)}>Edit</Button>
                                <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500" onClick={() => handleDeleteRecipe(r.id)}>
                                  <Trash2 className="h-4.5 w-4.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input placeholder="Name..." value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} className="rounded-lg text-xs bg-background" />
                      <Input placeholder="Role..." value={newTeam.role} onChange={e => setNewTeam({...newTeam, role: e.target.value})} className="rounded-lg text-xs bg-background" />
                      <Input placeholder="Avatar Photo URL..." value={newTeam.image} onChange={e => setNewTeam({...newTeam, image: e.target.value})} className="rounded-lg text-xs bg-background" />
                    </div>
                    <Textarea placeholder="Short Biography..." value={newTeam.bio} onChange={e => setNewTeam({...newTeam, bio: e.target.value})} className="rounded-lg text-xs min-h-[50px] bg-background" />
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
