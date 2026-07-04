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
 Search,
 MapPin,
 Clock,
 Star,
 Phone,
 ExternalLink,
 Heart,
 Coffee,
 Hotel,
 Utensils,
 X,
 MessageSquare,
 Plus,
 ThumbsUp,
 Sparkles,
 Check,
} from "lucide-react";
import { toast } from "sonner";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

interface Review {
 id: number;
 author: string;
 avatar: string;
 rating: number;
 date: string;
 title: string;
 comment: string;
 likes: number;
 likedByUser?: boolean;
}

interface Establishment {
 id: number;
 name: string;
 category: string;
 cuisine: string; // Style of food or venue
 image: string;
 rating: number;
 priceRange: string;
 address: string;
 phone: string;
 hours: string;
 specialties: string[];
 description: string;
 distance: string;
 reviews: Review[];
}

const initialEstablishments: Establishment[] = [
 {
 id: 1,
 name: "Bella Notte",
 category: "ITALIAN",
 cuisine: "Italian",
 image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
 rating: 4.8,
 priceRange: "$$$",
 address: "123 Mission Street, San Francisco",
 phone: "+1 (555) 123-4567",
 hours: "Mon-Sun: 5:00 PM - 10:00 PM",
 specialties: ["Handmade Pasta", "Wood-Fired Pizza", "Italian Wines"],
 description: "Authentic Italian dining with handmade pasta and traditional recipes passed down through generations.",
 distance: "0.5 miles",
 reviews: [
 {
 id: 101,
 author: "Marco Rossi",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco",
 rating: 5,
 date: "June 18, 2026",
 title: "Just like Rome!",
 comment: "The Carbonara here is the absolute best I have ever had outside of Italy. Flawless service and a cozy glasshouse garden patio.",
 likes: 24,
 },
 {
 id: 102,
 author: "Sarah Jenkins",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
 rating: 4,
 date: "June 14, 2026",
 title: "Splendid Pasta, Great Wine",
 comment: "Excellent list of Chiantis and Barolos. The handmade ravioli was spectacular. It gets quite crowded on weekends, so reserve early!",
 likes: 12,
 }
 ],
 },
 {
 id: 2,
 name: "Sakura Sushi",
 category: "JAPANESE",
 cuisine: "Asian",
 image: "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800",
 rating: 4.9,
 priceRange: "$$$$",
 address: "456 Union Square, San Francisco",
 phone: "+1 (555) 234-5678",
 hours: "Tue-Sat: 6:00 PM - 11:00 PM",
 specialties: ["Omakase", "Fresh Sashimi", "Sake Selection"],
 description: "Premium sushi experience with the freshest fish flown in daily from Tokyo's Toyosu Market.",
 distance: "1.2 miles",
 reviews: [
 {
 id: 201,
 author: "Kenji Sato",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji",
 rating: 5,
 date: "June 19, 2026",
 title: "Masterful Omakase",
 comment: "Chef prepares each piece right in front of you with extreme care. The Otoro melted in my mouth. A must-visit destination.",
 likes: 42,
 }
 ],
 },
 {
 id: 3,
 name: "Taco Libre",
 category: "MEXICAN",
 cuisine: "Mexican",
 image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800",
 rating: 4.6,
 priceRange: "$",
 address: "789 Valencia Street, San Francisco",
 phone: "+1 (555) 345-6789",
 hours: "Mon-Sun: 11:00 AM - 10:00 PM",
 specialties: ["Street Tacos", "Fresh Guacamole", "Mezcal Cocktails"],
 description: "Vibrant Mexican street food with authentic bold flavors and fresh, locally-sourced ingredients.",
 distance: "2.1 miles",
 reviews: [
 {
 id: 301,
 author: "Alex Morgan",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
 rating: 5,
 date: "May 28, 2026",
 title: "Best Tacos in Town!",
 comment: "The Al Pastor tacos are legendary. Incredible salsa bar with ranging spice levels. Highly affordable and super friendly team.",
 likes: 18,
 }
 ],
 },
 {
 id: 4,
 name: "Brew & Bites Glasshouse",
 category: "FAST_FOOD",
 cuisine: "Specialty Cafe",
 image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800",
 rating: 4.7,
 priceRange: "$$",
 address: "888 Battery Street, San Francisco",
 phone: "+1 (555) 888-1234",
 hours: "Mon-Sun: 7:00 AM - 7:00 PM",
 specialties: ["Single-Origin Pour Over", "Avocado Sourdough Toast", "Pistachio Croissant"],
 description: "Sunlit greenhouse cafe offering locally roasted single-origin coffees, matcha specials, and organic bakery delicacies.",
 distance: "0.9 miles",
 reviews: [
 {
 id: 401,
 author: "Chloe Bennett",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe",
 rating: 5,
 date: "June 17, 2026",
 title: "Coffee Heaven & Perfect Light",
 comment: "Absolute aesthetic perfection! Glass ceilings allow so much natural light. The espresso is perfectly balanced and croissants are so flaky.",
 likes: 31,
 },
 {
 id: 402,
 author: "Marcus Aurelius",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
 rating: 4,
 date: "June 11, 2026",
 title: "Great workspace",
 comment: "Wi-Fi is fast and the environment is very peaceful. Coffee is excellent, though it gets quite busy around midday.",
 likes: 19,
 }
 ],
 },
 {
 id: 5,
 name: "The Matcha Room",
 category: "FAST_FOOD",
 cuisine: "Japanese Tea",
 image: "https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800",
 rating: 4.8,
 priceRange: "$$",
 address: "212 Post Street, San Francisco",
 phone: "+1 (555) 212-9876",
 hours: "Wed-Sun: 10:00 AM - 6:00 PM",
 specialties: ["Ceremonial Whisked Matcha", "Strawberry Matcha Latte", "Matcha Mochi Waffle"],
 description: "Serene minimalist matcha bar sourcing premium ceremonial grades directly from Uji, Kyoto.",
 distance: "1.4 miles",
 reviews: [
 {
 id: 501,
 author: "Yuki Tanaka",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
 rating: 5,
 date: "June 05, 2026",
 title: "Authentic Kyoto taste",
 comment: "Whisked to perfection right in front of you. The earthy, sweet umami flavor of their ceremonial grade is truly exceptional.",
 likes: 15,
 }
 ],
 },
 {
 id: 6,
 name: "The Grand Regent Dining",
 category: "MEDITERRANEAN",
 cuisine: "Fine Dining",
 image: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800",
 rating: 4.9,
 priceRange: "$$$$",
 address: "99 Nob Hill Boulevard, San Francisco",
 phone: "+1 (555) 999-0000",
 hours: "Mon-Sun: 6:30 AM - 10:30 PM",
 specialties: ["Seafood Grand Tower", "Wagyu Ribeye", "Champagne Sunday Brunch"],
 description: "Opulent hotel restaurant featuring breathtaking city views, premium live piano music, and award-winning culinary craft.",
 distance: "0.7 miles",
 reviews: [
 {
 id: 601,
 author: "Lady Catherine",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Catherine",
 rating: 5,
 date: "June 16, 2026",
 title: "Unrivaled luxury and flavor",
 comment: "Celebrating our anniversary here was unforgettable. The service is world-class. The lobster thermidor and wagyu steak were masterfully done.",
 likes: 38,
 }
 ],
 },
 {
 id: 7,
 name: "Skyline Vista Lounge",
 category: "MEDITERRANEAN",
 cuisine: "Rooftop Bistro",
 image: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800",
 rating: 4.5,
 priceRange: "$$$",
 address: "555 California Street, San Francisco",
 phone: "+1 (555) 555-4321",
 hours: "Mon-Sun: 4:00 PM - 12:00 AM",
 specialties: ["Smoked Negroni", "Truffle Parm Fries", "Artisanal Seafood Flatbread"],
 description: "High-altitude glass-walled rooftop lounge overlooking the bay, serving molecular cocktails and fusion plates.",
 distance: "1.1 miles",
 reviews: [
 {
 id: 701,
 author: "David G.",
 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
 rating: 4,
 date: "June 02, 2026",
 title: "Views to die for, great drinks",
 comment: "The cocktails are spectacular, especially the smoked ones. Truffle fries are a must. Good ambient beats playing in the background.",
 likes: 27,
 }
 ],
 }
];

const getCategoryIcon = (slug: string) => {
 const s = slug.toLowerCase();
 if (s.includes("cafe") || s.includes("coffee") || s.includes("beverage") || s.includes("fast_food")) return Coffee;
 if (s.includes("hotel") || s.includes("stay") || s.includes("resort")) return Hotel;
 return Utensils;
};

const priceRanges = ["All Prices", "$", "$$", "$$$", "$$$$"];

export default function RestaurantsPage() {
 const [establishments, setEstablishments] = useState<Establishment[]>(initialEstablishments);
 const [selectedCategory, setSelectedCategory] = useState<string>("all");
 const [dbCategories, setDbCategories] = useState<any[]>([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedCuisine, setSelectedCuisine] = useState("All Styles");
 const [selectedPrice, setSelectedPrice] = useState("All Prices");
 const [favorites, setFavorites] = useState<number[]>([]);
 const [selectedItem, setSelectedItem] = useState<Establishment | null>(null);
 
 // Review form states
 const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
 const [formTargetId, setFormTargetId] = useState<number | null>(null);
 const [formAuthor, setFormAuthor] = useState("");
 const [formTitle, setFormTitle] = useState("");
 const [formComment, setFormComment] = useState("");
 const [formRating, setFormRating] = useState(5);
 const [formRatingHover, setFormRatingHover] = useState(0);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
 setIsMounted(true);
 // Load establishments from database
 fetch("/api/restaurants")
 .then(res => res.json())
 .then(res => {
 if (res.success && res.data) {
 const mapped = res.data.map((item: any) => {
 const cat = item.category || "ITALIAN";
 
 let hoursStr = "Mon-Sun: 9:00 AM - 10:00 PM";
 if (item.hours && typeof item.hours === "object") {
 const keys = Object.keys(item.hours);
 if (keys.length > 0) {
 hoursStr = `${keys[0].charAt(0).toUpperCase() + keys[0].slice(1)}-${keys[keys.length - 1].charAt(0).toUpperCase() + keys[keys.length - 1].slice(1)}: ${item.hours[keys[0]]}`;
 }
 } else if (typeof item.hours === "string") {
 hoursStr = item.hours;
 }

 return {
 ...item,
 category: cat,
 cuisine: item.cuisine ? item.cuisine[0] : "Global",
 specialties: item.features || [],
 hours: hoursStr
 };
 });
 if (mapped.length > 0) {
 setEstablishments(mapped);
 }
 }
 })
 .catch(err => console.error(err));

 // Fetch categories
 fetch("/api/categories?type=RESTAURANT")
 .then(res => res.json())
 .then(res => {
 if (res.success && res.data) {
 setDbCategories(res.data);
 }
 })
 .catch(err => console.error(err));

 // Load favorites from local storage if client-side
 const saved = localStorage.getItem("foodiety_favs");
 if (saved) {
 try {
 setFavorites(JSON.parse(saved));
 } catch (e) {
 console.error(e);
 }
 }
 }, []);

 const toggleFavorite = (id: number, e: React.MouseEvent) => {
 e.stopPropagation();
 let updated;
 if (favorites.includes(id)) {
 updated = favorites.filter((f) => f !== id);
 toast.info("Removed from saved list");
 } else {
 updated = [...favorites, id];
 toast.success("Saved to your wishlist!");
 }
 setFavorites(updated);
 localStorage.setItem("foodiety_favs", JSON.stringify(updated));
 };

 // Extract unique cuisines based on active category
 const activeEstablishments = establishments.filter(
 (item) => selectedCategory === "all" || item.category === selectedCategory
 );

 const cuisinesList = [
 "All Styles",
 ...Array.from(new Set(activeEstablishments.map((e) => e.cuisine))),
 ];

 const filteredEstablishments = activeEstablishments.filter((item) => {
 const matchesSearch =
 item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
 item.specialties.some((specialty) =>
 specialty.toLowerCase().includes(searchTerm.toLowerCase())
 ) ||
 item.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

 const matchesCuisine =
 selectedCuisine === "All Styles" || item.cuisine === selectedCuisine;

 const matchesPrice =
 selectedPrice === "All Prices" || item.priceRange === selectedPrice;

 return matchesSearch && matchesCuisine && matchesPrice;
 });

 const handleLikeReview = (establishmentId: number, reviewId: number, e: React.MouseEvent) => {
 e.stopPropagation();
 setEstablishments((prev) =>
 prev.map((est) => {
 if (est.id !== establishmentId) return est;
 const updatedReviews = est.reviews.map((rev) => {
 if (rev.id !== reviewId) return rev;
 const liked = !rev.likedByUser;
 return {
 ...rev,
 likedByUser: liked,
 likes: liked ? rev.likes + 1 : rev.likes - 1,
 };
 });
 
 // Update selectedItem if it's currently open
 if (selectedItem && selectedItem.id === establishmentId) {
 const updatedEst = { ...est, reviews: updatedReviews };
 // Defer update slightly or direct set
 setTimeout(() => setSelectedItem(updatedEst), 0);
 }

 return { ...est, reviews: updatedReviews };
 })
 );
 };

 const handleOpenReviewModal = (id: number, e: React.MouseEvent) => {
 e.stopPropagation();
 setFormTargetId(id);
 setIsReviewModalOpen(true);
 // Reset fields
 setFormAuthor("");
 setFormTitle("");
 setFormComment("");
 setFormRating(5);
 };

 const handleReviewSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!formTargetId) return;

 if (!formAuthor.trim() || !formTitle.trim() || !formComment.trim()) {
 toast.error("Please fill in all fields.");
 return;
 }

 setIsSubmitting(true);
 // Simulate server write
 await new Promise((resolve) => setTimeout(resolve, 1500));

 const newReview: Review = {
 id: Date.now(),
 author: formAuthor,
 avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formAuthor)}`,
 rating: formRating,
 date: new Date().toLocaleDateString("en-US", {
 month: "long",
 day: "numeric",
 year: "numeric",
 }),
 title: formTitle,
 comment: formComment,
 likes: 0,
 };

 setEstablishments((prev) =>
 prev.map((est) => {
 if (est.id !== formTargetId) return est;
 const updatedReviews = [newReview, ...est.reviews];
 // Calculate new rating
 const totalRating = updatedReviews.reduce((acc, cur) => acc + cur.rating, 0);
 const newAverage = parseFloat((totalRating / updatedReviews.length).toFixed(1));

 const updatedEst = {
 ...est,
 reviews: updatedReviews,
 rating: newAverage,
 };

 // If the details drawer is open for this item, update its details
 if (selectedItem && selectedItem.id === est.id) {
 setSelectedItem(updatedEst);
 }

 return updatedEst;
 })
 );

 setIsSubmitting(false);
 setIsSubmittedSuccess(true);

 toast.success("Review posted successfully!");

 setTimeout(() => {
 setIsSubmittedSuccess(false);
 setIsReviewModalOpen(false);
 setFormTargetId(null);
 }, 2000);
 };

 // Prevent SSR context issues
 if (!isMounted) {
 return (
 <div className="pt-24 min-h-screen bg-background flex flex-col items-center justify-center">
 <div className="w-12 h-12 rounded-full border-4 border-[#c05c31]/20 border-t-[#c05c31] animate-spin" />
 <p className="mt-4 text-muted-foreground font-medium animate-pulse">Loading directory...</p>
 </div>
 );
 }

 return (
 <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
 
 {/* Background Decorative Blobs */}
 <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-[#c05c31]/5 blur-[120px] pointer-events-none" />
 <div className="absolute top-[40%] right-1/4 w-[450px] h-[450px] rounded-full bg-[#ebc63c]/5 blur-[130px] pointer-events-none" />

 {/* Hero Section */}
 <section className="relative pt-28 pb-16 bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')] bg-cover bg-center bg-no-repeat transition-colors duration-500 overflow-hidden border-b border-border/40">
 {/* Texture noise overlay */}
 <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 className="space-y-6"
 >
 <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border border-[#c05c31]/20 text-[#c05c31] dark:text-[#ebc63c] text-xs font-semibold uppercase tracking-wider">
 <Sparkles className="h-3.5 w-3.5" />
 <span>Taste, Stay & Discover</span>
 </div>
 
 <h1 className="text-4xl md:text-6xl font-bold font-playfair tracking-tight max-w-4xl mx-auto leading-tight text-stone-900 dark:text-white">
 Hotels, Cafes & Food <span className="">Reviews Hub</span>
 </h1>
 
 <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
 Explore user-rated local destinations. Get real-time honest opinions, submit reviews, and unlock the ultimate culinary and stay map.
 </p>

 {/* Counters */}
 <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
 {[
 { label: "Restaurants", value: establishments.filter(e => {
 const cat = e.category.toLowerCase();
 return !cat.includes("hotel") && !cat.includes("cafe") && !cat.includes("fast_food");
 }).length },
 { label: "Boutique Cafes", value: establishments.filter(e => {
 const cat = e.category.toLowerCase();
 return cat.includes("cafe") || cat.includes("fast_food") || cat.includes("coffee");
 }).length },
 { label: "Luxury Hotels", value: establishments.filter(e => {
 const cat = e.category.toLowerCase();
 return cat.includes("hotel") || cat.includes("stay") || cat.includes("resort");
 }).length },
 { label: "Community Reviews", value: establishments.reduce((acc, cur) => acc + cur.reviews.length, 0) },
 ].map((c, i) => (
 <div key={i} className="glass p-3 rounded-2xl border border-border/60">
 <div className="text-2xl font-bold text-[#c05c31] dark:text-[#ebc63c] font-playfair">{c.value}</div>
 <div className="text-xs text-muted-foreground font-medium">{c.label}</div>
 </div>
 ))}
 </div>
 </motion.div>
 </div>
 </section>

 {/* Main Search, Filter & Grid Area */}
 <section className="pb-24">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 {/* Glass Filter & Search Control Panel */}
 <div className="glass p-6 rounded-3xl border border-[#c05c31]/10 shadow-2xl mb-12 space-y-6">
 
 {/* Search & Select Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
 
 {/* Search input (6/12 cols) */}
 <div className="lg:col-span-6 relative">
 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
 <Input
 type="text"
 placeholder="Search names, culinary styles, specialty dishes..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="pl-11 pr-4 py-6 rounded-2xl bg-background/50 border-border/80 focus-visible:ring-[#c05c31] focus-visible:border-[#c05c31] text-sm"
 />
 </div>

 {/* Style select (3/12 cols) */}
 <div className="lg:col-span-3">
 <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
 <SelectTrigger className="rounded-2xl py-6 bg-background/50 border-border/80 text-sm">
 <SelectValue placeholder="Style/Cuisine" />
 </SelectTrigger>
 <SelectContent className="glass-panel border-border/60">
 {cuisinesList.map((c) => (
 <SelectItem key={c} value={c} className="hover:bg-[#c05c31]/10 focus:bg-[#c05c31]/10 rounded-lg cursor-pointer">
 {c}
 </SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 {/* Price select (3/12 cols) */}
 <div className="lg:col-span-3">
 <Select value={selectedPrice} onValueChange={setSelectedPrice}>
 <SelectTrigger className="rounded-2xl py-6 bg-background/50 border-border/80 text-sm">
 <SelectValue placeholder="Price Range" />
 </SelectTrigger>
 <SelectContent className="glass-panel border-border/60">
 {priceRanges.map((p) => (
 <SelectItem key={p} value={p} className="hover:bg-[#c05c31]/10 focus:bg-[#c05c31]/10 rounded-lg cursor-pointer">
 {p === "All Prices" ? "All Price Levels" : `Price: ${p}`}
 </SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 </div>

 {/* Hub Categories Tab Switcher */}
 <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/40">
 <div className="flex flex-wrap gap-2">
 <button
 onClick={() => {
 setSelectedCategory("all");
 setSelectedCuisine("All Styles");
 }}
 className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
 selectedCategory === "all"
 ? "text-white"
 : "text-muted-foreground hover:text-foreground hover:bg-[#c05c31]/5 bg-transparent"
 }`}
 >
 {selectedCategory === "all" && (
 <motion.div
 layoutId="active-cat-bg"
 className="absolute inset-0 from-[#c05c31] to-[#ebc63c] rounded-xl -z-10 shadow-lg shadow-[#c05c31]/25"
 transition={{ type: "spring", stiffness: 380, damping: 30 }}
 />
 )}
 <Sparkles className="h-4 w-4" />
 <span>All Hubs</span>
 </button>

 {dbCategories.map((cat) => {
 const CatIcon = getCategoryIcon(cat.slug);
 const isSelected = selectedCategory === cat.slug;
 return (
 <button
 key={cat.id}
 onClick={() => {
 setSelectedCategory(cat.slug);
 setSelectedCuisine("All Styles"); // Reset child filters to avoid deadlocks
 }}
 className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
 isSelected
 ? "text-white"
 : "text-muted-foreground hover:text-foreground hover:bg-[#c05c31]/5 bg-transparent"
 }`}
 >
 {/* Active indicator pill background */}
 {isSelected && (
 <motion.div
 layoutId="active-cat-bg"
 className="absolute inset-0 from-[#c05c31] to-[#ebc63c] rounded-xl -z-10 shadow-lg shadow-[#c05c31]/25"
 transition={{ type: "spring", stiffness: 380, damping: 30 }}
 />
 )}
 <CatIcon className="h-4 w-4" />
 <span>{cat.name}</span>
 </button>
 );
 })}
 </div>

 <div className="text-xs text-muted-foreground font-medium">
 Showing {filteredEstablishments.length} matching destinations
 </div>
 </div>

 </div>

 {/* Empty Results State */}
 {filteredEstablishments.length === 0 && (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="glass p-16 text-center max-w-xl mx-auto rounded-3xl border border-border/80 space-y-4"
 >
 <div className="w-16 h-16 bg-[#c05c31]/10 rounded-full flex items-center justify-center mx-auto text-[#c05c31]">
 <Search className="h-8 w-8" />
 </div>
 <h3 className="text-xl font-bold font-playfair">No Hubs Found</h3>
 <p className="text-muted-foreground text-sm">
 We couldn't find any match for your search term or filters. Try adjusting your query or resetting the cuisine selector.
 </p>
 <Button
 variant="outline"
 className="rounded-xl border-[#c05c31]/20 text-[#c05c31] hover:bg-[#c05c31]/5"
 onClick={() => {
 setSearchTerm("");
 setSelectedCuisine("All Styles");
 setSelectedPrice("All Prices");
 setSelectedCategory("all");
 }}
 >
 Clear All Filters
 </Button>
 </motion.div>
 )}

 {/* Grid Layout */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {filteredEstablishments.map((est, index) => {
 const isFav = favorites.includes(est.id);
 return (
 <motion.div
 key={est.id}
 layout
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.9 }}
 transition={{ duration: 0.5, delay: index * 0.05 }}
 onClick={() => setSelectedItem(est)}
 className="cursor-pointer"
 >
 <div className="glass-card glass-hover h-full flex flex-col rounded-3xl overflow-hidden group border border-border/60">
 
 {/* Header Image with badges */}
 <div className="relative h-56 w-full overflow-hidden">
 <img
 src={est.image}
 alt={est.name}
 className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
 />
 {/* Black fade gradient */}
 <div className="absolute inset-0 /60 /20" />
 
 {/* Absolute Top Badges */}
 <div className="absolute top-4 left-4 flex flex-wrap gap-2">
 <Badge className="bg-white/95 text-gray-900 border-none backdrop-blur-md px-2.5 py-1 text-xs font-semibold uppercase flex items-center space-x-1 shadow-md">
 {(() => {
 const Icon = getCategoryIcon(est.category);
 return <Icon className="h-3 w-3 text-[#c05c31]" />;
 })()}
 <span>{est.category.replace("_", " ")}</span>
 </Badge>
 <Badge className="bg-[#c05c31] text-white border-none px-2.5 py-1 text-xs font-semibold shadow-md">
 {est.priceRange}
 </Badge>
 </div>

 {/* Bookmark button */}
 <button
 onClick={(e) => toggleFavorite(est.id, e)}
 className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 dark:bg-black/80 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-md border border-white/20"
 >
 <Heart className={`h-4.5 w-4.5 transition-colors ${isFav ? "fill-red-500 text-red-500" : ""}`} />
 </button>

 {/* Distance overlay */}
 <div className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1.5 border border-white/10">
 <MapPin className="h-3.5 w-3.5 text-[#ebc63c]" />
 <span>{est.distance}</span>
 </div>

 {/* Rating overlay */}
 <div className="absolute bottom-4 right-4 text-white text-xs font-semibold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1 border border-white/10 shadow-lg">
 <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
 <span className="font-bold">{est.rating}</span>
 <span className="text-gray-300 text-[10px]">({est.reviews.length})</span>
 </div>

 </div>

 {/* Content Section */}
 <div className="p-6 flex-1 flex flex-col justify-between">
 <div className="space-y-4">
 <div className="flex items-start justify-between">
 <div>
 <span className="text-xs font-bold text-[#c05c31] dark:text-[#ebc63c] uppercase tracking-widest">{est.cuisine}</span>
 <h3 className="text-xl font-bold font-playfair tracking-tight text-stone-900 dark:text-stone-100 mt-0.5 group-hover:text-[#c05c31] dark:group-hover:text-[#ebc63c] transition-colors">
 {est.name}
 </h3>
 </div>
 </div>

 <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
 {est.description}
 </p>

 {/* Specialties Badges */}
 <div className="flex flex-wrap gap-1.5 pt-1">
 {est.specialties.map((s) => (
 <span
 key={s}
 className="text-[10px] font-semibold bg-[#c05c31]/5 text-[#c05c31] dark:text-[#ebc63c] border border-[#c05c31]/10 px-2 py-0.5 rounded-md"
 >
 {s}
 </span>
 ))}
 </div>

 {/* Quick Contact Details */}
 <div className="pt-3 border-t border-border/40 space-y-2 text-xs text-muted-foreground">
 <div className="flex items-center space-x-2">
 <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#c05c31]/60 dark:text-[#ebc63c]/60" />
 <span className="truncate">{est.address}</span>
 </div>
 <div className="flex items-center space-x-2">
 <Clock className="h-3.5 w-3.5 flex-shrink-0 text-[#c05c31]/60 dark:text-[#ebc63c]/60" />
 <span>{est.hours}</span>
 </div>
 </div>
 </div>

 {/* Action buttons */}
 <div className="flex space-x-3 pt-6">
 <Button
 variant="default"
 className="flex-1 from-[#c05c31] to-[#ebc63c] hover:opacity-90 text-white rounded-xl text-xs font-bold py-5 shadow-md shadow-[#c05c31]/10"
 >
 View Reviews
 </Button>
 <Button
 variant="outline"
 onClick={(e) => handleOpenReviewModal(est.id, e)}
 className="border-[#c05c31]/20 text-[#c05c31] hover:bg-[#c05c31]/5 hover:text-[#a64b25] rounded-xl px-3.5 py-5 flex items-center justify-center transition-all duration-300"
 >
 <Plus className="h-4.5 w-4.5" />
 </Button>
 </div>

 </div>
 </div>
 </motion.div>
 );
 })}
 </div>

 {/* Interactive Map/Footer Banner */}
 <div className="mt-20">
 <div className="glass p-8 rounded-3xl border border-border/80 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
 <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[80px] pointer-events-none" />
 <div className="space-y-3 max-w-xl text-center md:text-left">
 <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mx-auto md:mx-0">
 <MapPin className="h-6 w-6" />
 </div>
 <h3 className="text-2xl font-bold">Interactive Explorer Map</h3>
 <p className="text-muted-foreground text-sm leading-relaxed">
 Foodiety directory incorporates mapped reviews to show real-time dining checkins. Connect your favorite mapping provider to visualize nearby cafes and hotels instantly.
 </p>
 </div>
 <Button className="bg-foreground hover:bg-foreground/90 text-background rounded-2xl font-bold py-6 px-8 shadow-xl">
 Open Explorer Map
 </Button>
 </div>
 </div>

 </div>
 </section>

 {/* Details Slide-out Sheet Panel */}
 <AnimatePresence>
 {selectedItem && (
 <>
 {/* Backdrop filter */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setSelectedItem(null)}
 className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
 />

 {/* Slide-out Panel */}
 <motion.div
 initial={{ x: "100%" }}
 animate={{ x: 0 }}
 exit={{ x: "100%" }}
 transition={{ type: "spring", damping: 25, stiffness: 220 }}
 className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-background/95 backdrop-blur-lg border-l border-border shadow-2xl overflow-y-auto"
 >
 {/* Sticky details header */}
 <div className="relative h-72 w-full">
 <img
 src={selectedItem.image}
 alt={selectedItem.name}
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 /40 " />
 
 {/* Close Button */}
 <button
 onClick={() => setSelectedItem(null)}
 className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/75 backdrop-blur-md transition-all border border-white/15"
 >
 <X className="h-5 w-5" />
 </button>

 {/* Badges on image */}
 <div className="absolute top-4 left-4 flex space-x-2">
 <Badge className="bg-orange-500 border-none text-white px-3 py-1 font-bold text-xs uppercase shadow-md">
 {selectedItem.category.replace("_", " ")}
 </Badge>
 <Badge className="bg-white/95 text-gray-900 border-none px-3 py-1 font-bold text-xs shadow-md">
 {selectedItem.priceRange}
 </Badge>
 </div>

 {/* Details text in overlay */}
 <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
 <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">{selectedItem.cuisine}</span>
 <h2 className="text-3xl font-extrabold tracking-tight font-outfit">{selectedItem.name}</h2>
 <div className="flex items-center space-x-4 text-xs font-medium text-gray-300">
 <div className="flex items-center space-x-1 text-amber-400">
 <Star className="h-4 w-4 fill-amber-400" />
 <span className="font-bold text-sm text-white">{selectedItem.rating}</span>
 </div>
 <span>•</span>
 <span>{selectedItem.reviews.length} reviews</span>
 <span>•</span>
 <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1 text-orange-400" /> {selectedItem.distance}</span>
 </div>
 </div>
 </div>

 {/* Body Content */}
 <div className="p-6 md:p-8 space-y-8">
 
 {/* Info Cards Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="glass p-4 rounded-2xl border border-border/60 space-y-1">
 <div className="text-xs text-muted-foreground font-semibold uppercase flex items-center space-x-1.5">
 <Clock className="h-3.5 w-3.5 text-orange-500" />
 <span>Hours of Operation</span>
 </div>
 <div className="text-sm font-medium text-foreground">{selectedItem.hours}</div>
 </div>

 <div className="glass p-4 rounded-2xl border border-border/60 space-y-1">
 <div className="text-xs text-muted-foreground font-semibold uppercase flex items-center space-x-1.5">
 <Phone className="h-3.5 w-3.5 text-orange-500" />
 <span>Contact Phone</span>
 </div>
 <div className="text-sm font-medium text-foreground">{selectedItem.phone}</div>
 </div>
 </div>

 {/* About Section */}
 <div className="space-y-3">
 <h3 className="text-lg font-bold tracking-tight border-b pb-2 border-border/50">About the Destination</h3>
 <p className="text-muted-foreground text-sm leading-relaxed">{selectedItem.description}</p>
 
 {/* Specialties List */}
 <div className="pt-2">
 <div className="text-xs font-semibold text-muted-foreground mb-2">Specialties & Signature Items:</div>
 <div className="flex flex-wrap gap-2">
 {selectedItem.specialties.map((s) => (
 <Badge key={s} variant="secondary" className="bg-orange-500/5 text-orange-600 dark:text-orange-400 border border-orange-500/10 px-3 py-1 text-xs">
 {s}
 </Badge>
 ))}
 </div>
 </div>
 </div>

 {/* Reviews Header */}
 <div className="space-y-4 pt-4">
 <div className="flex items-center justify-between border-b pb-3 border-border/50">
 <h3 className="text-lg font-bold tracking-tight">Reviews ({selectedItem.reviews.length})</h3>
 <Button
 onClick={(e) => handleOpenReviewModal(selectedItem.id, e)}
 size="sm"
 className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold px-4 py-2"
 >
 <Plus className="h-4 w-4 mr-1" />
 Write Review
 </Button>
 </div>

 {/* Reviews List */}
 {selectedItem.reviews.length === 0 ? (
 <div className="text-center py-10 text-muted-foreground text-sm">
 <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
 No reviews yet. Be the first to share your thoughts!
 </div>
 ) : (
 <div className="space-y-6">
 {selectedItem.reviews.map((rev) => (
 <motion.div
 key={rev.id}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="glass p-5 rounded-2xl border border-border/80 space-y-3"
 >
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-3">
 <img
 src={rev.avatar}
 alt={rev.author}
 className="w-10 h-10 rounded-full border border-orange-500/10 bg-orange-500/5"
 />
 <div>
 <h4 className="text-sm font-bold text-foreground">{rev.author}</h4>
 <span className="text-[10px] text-muted-foreground">{rev.date}</span>
 </div>
 </div>
 
 {/* Stars rating display */}
 <div className="flex items-center gap-0.5">
 {[1, 2, 3, 4, 5].map((s) => (
 <Star
 key={s}
 className={`h-3 w-3 ${
 s <= rev.rating
 ? "text-amber-400 fill-amber-400"
 : "text-gray-300 dark:text-gray-700"
 }`}
 />
 ))}
 </div>
 </div>

 <div className="space-y-1">
 <h5 className="text-sm font-bold text-foreground">{rev.title}</h5>
 <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>
 </div>

 {/* Like review button */}
 <div className="flex items-center justify-between pt-2 border-t border-border/20 text-xs">
 <button
 onClick={(e) => handleLikeReview(selectedItem.id, rev.id, e)}
 className={`flex items-center space-x-1.5 transition-all ${
 rev.likedByUser
 ? "text-orange-500 font-semibold"
 : "text-muted-foreground hover:text-foreground"
 }`}
 >
 <ThumbsUp className={`h-3.5 w-3.5 ${rev.likedByUser ? "fill-orange-500/10" : ""}`} />
 <span>Helpful ({rev.likes})</span>
 </button>
 <span className="text-[10px] text-muted-foreground">Was this review helpful?</span>
 </div>

 </motion.div>
 ))}
 </div>
 )}

 </div>

 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>

 {/* Review Modal Form overlay */}
 <AnimatePresence>
 {isReviewModalOpen && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
 
 {/* Backdrop filter */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => {
 if (!isSubmitting) setIsReviewModalOpen(false);
 }}
 className="absolute inset-0 bg-black/70 backdrop-blur-md"
 />

 {/* Modal Box */}
 <motion.div
 initial={{ opacity: 0, scale: 0.9, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.9, y: 20 }}
 transition={{ type: "spring", duration: 0.5 }}
 className="relative w-full max-w-lg glass border border-orange-500/20 rounded-3xl shadow-2xl overflow-hidden z-10"
 >
 
 {/* Success animation block */}
 {isSubmittedSuccess ? (
 <div className="p-8 text-center flex flex-col items-center justify-center min-h-[350px] space-y-4">
 <div className="w-16 h-16 bg-green-500/10 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center animate-bounce-gentle">
 <Check className="h-8 w-8 stroke-[3]" />
 </div>
 <h3 className="text-2xl font-bold font-outfit">Review Published!</h3>
 <p className="text-muted-foreground text-sm max-w-xs mx-auto">
 Thank you! Your feedback has been verified and added to the establishment's ratings index.
 </p>
 <div className="pt-2 text-xs text-orange-500/60 font-medium">Recalculating score stats...</div>
 </div>
 ) : (
 <div className="p-6 md:p-8 space-y-6">
 
 {/* Modal Header */}
 <div className="flex items-center justify-between border-b pb-4 border-border/50">
 <div>
 <span className="text-xs font-bold text-orange-500 uppercase tracking-widest flex items-center"><Sparkles className="h-3.5 w-3.5 mr-1" /> Add Review</span>
 <h3 className="text-xl font-bold font-outfit text-foreground mt-0.5">
 {establishments.find((e) => e.id === formTargetId)?.name || "Select Destination"}
 </h3>
 </div>
 <button
 disabled={isSubmitting}
 onClick={() => setIsReviewModalOpen(false)}
 className="p-1.5 rounded-full hover:bg-orange-500/5 text-muted-foreground hover:text-foreground transition-all"
 >
 <X className="h-5 w-5" />
 </button>
 </div>

 {/* Review Form */}
 <form onSubmit={handleReviewSubmit} className="space-y-4">
 
 {/* Author input */}
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Your Name *</label>
 <Input
 required
 type="text"
 placeholder="John Doe"
 value={formAuthor}
 onChange={(e) => setFormAuthor(e.target.value)}
 disabled={isSubmitting}
 className="rounded-xl bg-background/50 border-border/80 focus-visible:ring-orange-500 text-sm py-5"
 />
 </div>

 {/* Star Rating Select Grid */}
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase block">Star Rating *</label>
 <div className="flex items-center space-x-2">
 {[1, 2, 3, 4, 5].map((star) => (
 <button
 key={star}
 type="button"
 disabled={isSubmitting}
 onClick={() => setFormRating(star)}
 onMouseEnter={() => setFormRatingHover(star)}
 onMouseLeave={() => setFormRatingHover(0)}
 className="p-1 transition-transform active:scale-90 hover:scale-110"
 >
 <Star
 className={`h-7 w-7 transition-all ${
 star <= (formRatingHover || formRating)
 ? "text-amber-400 fill-amber-400 drop-shadow-md"
 : "text-gray-300 dark:text-gray-700"
 }`}
 />
 </button>
 ))}
 <span className="text-sm font-bold text-foreground ml-3">
 {formRating === 5 && "Excellent (5.0)"}
 {formRating === 4 && "Very Good (4.0)"}
 {formRating === 3 && "Good (3.0)"}
 {formRating === 2 && "Fair (2.0)"}
 {formRating === 1 && "Poor (1.0)"}
 </span>
 </div>
 </div>

 {/* Review Title */}
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Review Headline *</label>
 <Input
 required
 type="text"
 placeholder="e.g. Incredibly delicious pasta!"
 value={formTitle}
 onChange={(e) => setFormTitle(e.target.value)}
 disabled={isSubmitting}
 className="rounded-xl bg-background/50 border-border/80 focus-visible:ring-orange-500 text-sm py-5"
 />
 </div>

 {/* Review Comment */}
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Review Description *</label>
 <Textarea
 required
 placeholder="Share details of your experience regarding food taste, service quality, or general ambiance..."
 value={formComment}
 onChange={(e) => setFormComment(e.target.value)}
 disabled={isSubmitting}
 className="rounded-xl bg-background/50 border-border/80 focus-visible:ring-orange-500 text-sm min-h-[110px]"
 />
 </div>

 {/* Form Actions */}
 <div className="flex space-x-3 pt-4 border-t border-border/30">
 <Button
 type="button"
 variant="outline"
 disabled={isSubmitting}
 onClick={() => setIsReviewModalOpen(false)}
 className="flex-1 rounded-xl py-6 border-border text-foreground hover:bg-orange-500/5 text-xs font-semibold"
 >
 Cancel
 </Button>
 
 <Button
 type="submit"
 disabled={isSubmitting}
 className="flex-1 rounded-xl py-6 hover: hover: text-white text-xs font-bold shadow-lg shadow-orange-500/10"
 >
 {isSubmitting ? (
 <div className="flex items-center justify-center space-x-2">
 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 <span>Publishing...</span>
 </div>
 ) : (
 <span>Submit Online Review</span>
 )}
 </Button>
 </div>

 </form>
 </div>
 )}
 </motion.div>

 </div>
 )}
 </AnimatePresence>

 </div>
 );
}
