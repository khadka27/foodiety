"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Heart, Share2, Grid3x3, LayoutGrid, Search, Download, Star } from "lucide-react";

export const dynamic = "force-dynamic";

const defaultGalleryImages = [
 { id: 1, src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Gourmet Burger Platter", category: "Dishes", likes: 124, featured: true },
 { id: 2, src: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Chef at Work", category: "Behind the Scenes", likes: 89 },
 { id: 3, src: "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Wedding Reception Setup", category: "Events", likes: 156, featured: true },
 { id: 4, src: "https://images.pexels.com/photos/3992205/pexels-photo-3992205.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Chocolate Soufflé", category: "Desserts", likes: 203 },
 { id: 5, src: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Fresh Pasta Creation", category: "Dishes", likes: 167 },
 { id: 6, src: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Restaurant Kitchen", category: "Restaurants", likes: 92 },
 { id: 7, src: "https://images.pexels.com/photos/1998925/pexels-photo-1998925.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Ramen Bowl Artistry", category: "Dishes", likes: 134 },
 { id: 8, src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Corporate Event Catering", category: "Events", likes: 78 },
 { id: 9, src: "https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg?auto=compress&cs=tinysrgb&w=800", title: "French Pastries", category: "Desserts", likes: 145 },
 { id: 10, src: "https://images.pexels.com/photos/4058419/pexels-photo-4058419.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Rustic Dining Setup", category: "Restaurants", likes: 111 },
 { id: 11, src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Kitchen Prep", category: "Behind the Scenes", likes: 68 },
 { id: 12, src: "https://images.pexels.com/photos/4110541/pexels-photo-4110541.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Street Food Market", category: "Events", likes: 189, featured: true },
];

type GalleryImage = typeof defaultGalleryImages[0];

export default function GalleryPage() {
 const [selectedCategory, setSelectedCategory] = useState("All");
 const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultGalleryImages);
 const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
 const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
 const [isMounted, setIsMounted] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [isCompact, setIsCompact] = useState(false);
 const [banner, setBanner] = useState({
 tag: "Visual Stories",
 title: "Food Gallery",
 subtitle: "Explore stunning food photography, behind-the-scenes moments, and unforgettable dining experiences."
 });
 const [categories, setCategories] = useState<string[]>(["All"]);

 useEffect(() => {
 setIsMounted(true);
 fetch("/api/config")
 .then(res => res.json())
 .then(res => {
 if (res.success && res.data) {
 const parsed = res.data;
 if (parsed.gallery && parsed.gallery.length > 0) {
 setGalleryImages(parsed.gallery);
 }
 if (parsed.galleryPage) {
 setBanner({
 tag: parsed.galleryPage.bannerTag || "Visual Stories",
 title: parsed.galleryPage.bannerTitle || "Food Gallery",
 subtitle: parsed.galleryPage.bannerSubtitle || "Explore stunning food photography, behind-the-scenes moments, and unforgettable dining experiences."
 });
 }
 }
 })
 .catch(err => console.error(err));

 fetch("/api/categories?type=GALLERY")
 .then(res => res.json())
 .then(res => {
 if (res.success && res.data) {
 setCategories(["All", ...res.data.map((c: any) => c.name)]);
 }
 })
 .catch(err => console.error(err));
 }, []);



 const filteredImages = galleryImages.filter(img => {
 const matchesCat = selectedCategory === "All" || img.category === selectedCategory;
 const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
 img.category.toLowerCase().includes(searchQuery.toLowerCase());
 return matchesCat && matchesSearch;
 });

 const toggleLike = (id: number, e: React.MouseEvent) => {
 e.stopPropagation();
 const newLiked = new Set(likedImages);
 if (newLiked.has(id)) {
 newLiked.delete(id);
 } else {
 newLiked.add(id);
 }
 setLikedImages(newLiked);
 };

 if (!isMounted) {
 return (
 <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
 <div className="flex flex-col items-center gap-4">
 <div className="w-12 h-12 rounded-2xl animate-pulse" />
 <p className="text-muted-foreground text-sm">Loading gallery...</p>
 </div>
 </div>
 );
 }

 return (
 <div className="pt-16 overflow-x-hidden">
 {/* Hero */}
 <section className="relative py-20 bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')] bg-cover bg-center bg-no-repeat transition-colors duration-500 overflow-hidden border-b border-border/40">
 {/* Texture noise overlay */}
 <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none pt-8">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7 }}
 >
 <div className="flex items-center justify-center gap-3 mb-5">
 <div className="h-px w-12 bg-stone-300 dark:bg-stone-700" />
 <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d97742] dark:text-[#ebc63c]">{banner.tag}</span>
 <div className="h-px w-12 bg-stone-300 dark:bg-stone-700" />
 </div>
 <h1 className="font-playfair font-bold text-5xl sm:text-6xl md:text-7xl text-stone-900 dark:text-white mb-5 leading-tight">
 {banner.title}
 </h1>
 <p className="text-lg text-stone-700 dark:text-stone-200 max-w-2xl mx-auto leading-relaxed mb-8">
 {banner.subtitle}
 </p>

 {/* Search Bar */}
 <div className="max-w-md mx-auto">
 <div className="relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 dark:text-white/60" />
 <input
 type="text"
 placeholder="Search photos..."
 value={searchQuery}
 onChange={e => setSearchQuery(e.target.value)}
 className="w-full pl-11 pr-4 py-3 rounded-full bg-stone-950/5 dark:bg-white/15 border border-stone-950/10 dark:border-white/25 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c05c31]/30 focus:border-[#c05c31]/50 text-sm transition-all"
 />
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Gallery Section */}
 <section className="py-16 bg-background">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Filters Row */}
 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
 {/* Category Tabs */}
 <div className="flex flex-wrap gap-2">
 {categories.map(cat => (
 <button
 key={cat}
 onClick={() => setSelectedCategory(cat)}
 className={`category-tab ${selectedCategory === cat ? "active" : "border border-border text-muted-foreground"}`}
 >
 {cat}
 </button>
 ))}
 </div>

 {/* Controls */}
 <div className="flex items-center gap-2 flex-shrink-0">
 <span className="text-sm text-muted-foreground mr-1">{filteredImages.length} photos</span>
 <button
 onClick={() => setIsCompact(false)}
 className={`p-2 rounded-lg border transition-all ${!isCompact ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-500' : 'border-border text-muted-foreground hover:border-orange-300'}`}
 title="Grid view"
 >
 <Grid3x3 className="h-4 w-4" />
 </button>
 <button
 onClick={() => setIsCompact(true)}
 className={`p-2 rounded-lg border transition-all ${isCompact ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-500' : 'border-border text-muted-foreground hover:border-orange-300'}`}
 title="Compact view"
 >
 <LayoutGrid className="h-4 w-4" />
 </button>
 </div>
 </div>

 {/* Gallery Grid */}
 <motion.div
 layout
 className={`grid gap-4 ${isCompact ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
 >
 <AnimatePresence>
 {filteredImages.map((image, index) => (
 <motion.div
 key={image.id}
 layout
 initial={{ opacity: 0, scale: 0.9, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.9 }}
 transition={{ duration: 0.4, delay: index * 0.04 }}
 className="group"
 >
 <div
 className="relative overflow-hidden rounded-2xl cursor-pointer glass-card border border-white/15 dark:border-white/5 hover:scale-[1.01] hover:shadow-2xl transition-all duration-400"
 onClick={() => setSelectedImage(image)}
 >
 <img
 src={image.src}
 alt={image.title}
 className={`w-full object-cover group-hover:scale-108 transition-transform duration-500 ${isCompact ? 'h-40' : 'h-64'}`}
 style={{ transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
 />

 {/* Hover Overlay */}
 <div className="absolute inset-0 /70 /20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
 <div className="flex justify-end">
 <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
 <ZoomIn className="h-4 w-4 text-white" />
 </div>
 </div>
 <div>
 <p className="text-white font-semibold text-sm mb-2 line-clamp-1">{image.title}</p>
 <div className="flex items-center justify-between">
 <span className="text-xs bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white">
 {image.category}
 </span>
 <button
 onClick={e => toggleLike(image.id, e)}
 className="flex items-center gap-1.5 text-white text-xs hover:scale-110 transition-transform"
 >
 <Heart className={`h-4 w-4 transition-colors ${likedImages.has(image.id) ? 'fill-red-500 text-red-400' : ''}`} />
 <span>{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
 </button>
 </div>
 </div>
 </div>

 {/* Featured badge */}
 {image.featured && (
 <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold from-[#c05c31] to-[#e87a43] text-white flex items-center gap-1">
 <Star className="h-3 w-3 fill-current" /> Featured
 </div>
 )}
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 </motion.div>

 {filteredImages.length === 0 && (
 <div className="text-center py-20">
 <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
 <h3 className="text-xl font-bold text-foreground mb-2">No photos found</h3>
 <p className="text-muted-foreground text-sm">Try a different category or search term</p>
 </div>
 )}
 </div>
 </section>

 {/* Lightbox */}
 <AnimatePresence>
 {selectedImage && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 backdrop-blur-md"
 onClick={() => setSelectedImage(null)}
 >
 <motion.div
 initial={{ scale: 0.88, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.88, opacity: 0 }}
 transition={{ type: "spring", stiffness: 300, damping: 25 }}
 className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl"
 onClick={e => e.stopPropagation()}
 >
 <img
 src={selectedImage.src}
 alt={selectedImage.title}
 className="w-full max-h-[75vh] object-cover"
 />

 {/* Controls overlay */}
 <div className="absolute top-4 right-4 flex gap-2">
 <button
 onClick={e => toggleLike(selectedImage.id, e)}
 className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
 >
 <Heart className={`h-4 w-4 ${likedImages.has(selectedImage.id) ? 'fill-red-500 text-red-400' : ''}`} />
 </button>
 <button className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors">
 <Share2 className="h-4 w-4" />
 </button>
 <button
 onClick={() => setSelectedImage(null)}
 className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
 >
 <X className="h-4 w-4" />
 </button>
 </div>

 {/* Info bar */}
 <div className="absolute bottom-0 left-0 right-0 glass p-5 flex items-center justify-between">
 <div>
 <h3 className="text-white font-bold text-lg">{selectedImage.title}</h3>
 <span className="text-sm text-gray-300">{selectedImage.category}</span>
 </div>
 <div className="flex items-center gap-1.5 text-white">
 <Heart className={`h-4 w-4 ${likedImages.has(selectedImage.id) ? 'fill-red-500 text-red-400' : ''}`} />
 <span className="font-bold">{selectedImage.likes + (likedImages.has(selectedImage.id) ? 1 : 0)}</span>
 </div>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
}
