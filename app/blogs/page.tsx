"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  Eye,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  TrendingUp,
  Mail,
  Flame,
  Star,
  ChevronRight,
  Tag,
  Users,
  ArrowUpRight,
  ChefHat,
  Compass,
  Leaf,
  Heart,
  Inbox,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  views: number;
  category: string;
  readTime: string;
  featured: boolean;
  author: { name: string; image: string; bio: string };
  tags: string[];
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Perfect Pasta: Secrets from Italian Grandmothers",
    excerpt:
      "Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.",
    content: `<p>There's something magical about watching an Italian grandmother make pasta from scratch...</p><h2>The Foundation: Choosing Your Flour</h2><p>Every great pasta begins with the right flour. Italian grandmothers swear by "00" flour.</p><blockquote>"La pasta è come la vita – serve pazienza e amore." - Nonna Maria, age 84</blockquote><h2>The Kneading Ritual</h2><p>Kneading isn't just about developing gluten – it's a meditative process.</p>`,
    image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-15",
    views: 2847,
    category: "Cooking Tips",
    readTime: "8 min",
    featured: true,
    author: { name: "Isabella Romano", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella", bio: "Food writer & Italian specialist" },
    tags: ["Italian", "Pasta", "Traditional"],
  },
  {
    id: 2,
    title: "Global Street Food: A Journey Through Authentic Flavors",
    excerpt: "From Bangkok's bustling markets to Mexico City's vibrant streets, explore the world through its most beloved street foods.",
    content: `<p>Street food is the raw, unfiltered culinary soul of a culture.</p><h2>Bangkok: Sweet, Spicy & Sour</h2><p>Walking through Yaowarat Road, the aroma of sizzling Pad Thai is intoxicating.</p>`,
    image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-12",
    views: 1923,
    category: "Travel",
    readTime: "12 min",
    featured: false,
    author: { name: "Marco Rodriguez", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco", bio: "Traveler and food journalist" },
    tags: ["Street Food", "Travel", "Tacos"],
  },
  {
    id: 3,
    title: "Seasonal Cooking: Winter Comfort Foods That Warm the Soul",
    excerpt: "Embrace the season with hearty stews, roasted vegetables, and warming spices that bring comfort to cold days.",
    content: `<p>When the temperature drops, our kitchens become warm sanctuaries.</p><h2>Root Vegetables: Nature's Winter Sweetness</h2><p>Parsnips, carrots, and sweet potatoes develop deeper, sweeter flavors when subjected to winter frost.</p>`,
    image: "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-10",
    views: 3156,
    category: "Seasonal",
    readTime: "6 min",
    featured: true,
    author: { name: "Sarah Chen", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", bio: "Head Chef & Blogger" },
    tags: ["Winter", "Comfort", "Stew"],
  },
  {
    id: 4,
    title: "Plant-Based Revolution: 10 Recipes That Will Change Your Mind",
    excerpt: "Vegan cooking has never been this exciting. These innovative plant-based recipes will satisfy even the most devoted carnivores.",
    content: `<p>Plant-based cooking has undergone a revolution in recent years...</p>`,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-08",
    views: 1540,
    category: "Nutrition",
    readTime: "10 min",
    featured: false,
    author: { name: "Alex Kim", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", bio: "Plant-based chef and nutritionist" },
    tags: ["Vegan", "Plant-Based", "Healthy"],
  },
  {
    id: 5,
    title: "The Science of Fermentation: From Kimchi to Kombucha",
    excerpt: "Unlock the ancient art of fermentation and discover how it transforms simple ingredients into complex, probiotic-rich foods.",
    content: `<p>Fermentation is one of humanity's oldest food preservation techniques...</p>`,
    image: "https://images.pexels.com/photos/5945559/pexels-photo-5945559.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-05",
    views: 2210,
    category: "Trends",
    readTime: "9 min",
    featured: false,
    author: { name: "Dr. Maya Patel", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya", bio: "Food scientist and fermentation expert" },
    tags: ["Fermentation", "Probiotics", "Kimchi"],
  },
  {
    id: 6,
    title: "Knife Skills 101: Techniques Every Home Cook Should Master",
    excerpt: "Transform your cooking with professional knife techniques. From julienne to chiffonade, learn the cuts that will elevate every dish.",
    content: `<p>A sharp knife and the skills to use it are a cook's most valuable tools...</p>`,
    image: "https://images.pexels.com/photos/4259707/pexels-photo-4259707.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-02",
    views: 1875,
    category: "Cooking Tips",
    readTime: "7 min",
    featured: false,
    author: { name: "Chef Antoine Dubois", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antoine", bio: "Professional chef & culinary instructor" },
    tags: ["Knife Skills", "Techniques", "Basics"],
  },
];

const categories = ["All", "Cooking Tips", "Travel", "Seasonal", "Nutrition", "Trends"];

const categoryMeta: Record<string, { color: string; bg: string; dot: string }> = {
  "Cooking Tips": { color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", dot: "bg-amber-500" },
  "Travel":       { color: "text-sky-700 dark:text-sky-400",    bg: "bg-sky-500/10 border-sky-500/20",    dot: "bg-sky-500"   },
  "Seasonal":     { color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-500" },
  "Nutrition":    { color: "text-violet-700 dark:text-violet-400", bg: "bg-violet-500/10 border-violet-500/20", dot: "bg-violet-500" },
  "Trends":       { color: "text-rose-700 dark:text-rose-400",  bg: "bg-rose-500/10 border-rose-500/20",  dot: "bg-rose-500"  },
};

function getCategoryIcon(category: string, className?: string) {
  switch (category) {
    case "Cooking Tips": return <ChefHat className={className} />;
    case "Travel": return <Compass className={className} />;
    case "Seasonal": return <Leaf className={className} />;
    case "Nutrition": return <Heart className={className} />;
    case "Trends": return <Flame className={className} />;
    default: return null;
  }
}

function CategoryBadge({ category, size = "sm" }: { category: string; size?: "xs" | "sm" }) {
  const meta = categoryMeta[category];
  if (!meta) return <span className="px-2 py-1 text-xs bg-muted rounded-full">{category}</span>;
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full font-bold uppercase tracking-wider ${meta.bg} ${meta.color} ${size === "xs" ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {category}
    </span>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("foodiety_blogs");
    if (saved) {
      try { setPosts(JSON.parse(saved)); } catch { setPosts(defaultBlogPosts); }
    } else {
      setPosts(defaultBlogPosts);
      localStorage.setItem("foodiety_blogs", JSON.stringify(defaultBlogPosts));
    }
  }, []);

  const filtered = posts.filter((p) => {
    const catOk = selectedCategory === "All" || p.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const searchOk = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    return catOk && searchOk;
  });

  const hero = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== hero?.id);
  const trending = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 pt-20">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-accent/30 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
        </div>
        <p className="text-muted-foreground font-medium animate-pulse font-outfit">Loading stories...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Ambient glow orbs ── */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/4 blur-[180px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/4 blur-[160px] pointer-events-none z-0" />

      {/* ══════════════════════════════════════════════════
          HERO — editorial masthead
      ══════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')] bg-cover bg-center bg-no-repeat transition-colors duration-500 overflow-hidden border-b border-border/40 z-10">
        {/* Texture noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 flex flex-col items-center w-full"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-[10px] font-black uppercase tracking-[0.2em] text-[#c05c31] dark:text-[#ebc63c] w-fit">
              <Sparkles className="h-3 w-3" />
              Foodiety Journal
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-playfair leading-[1.02] tracking-tight text-stone-900 dark:text-white">
              Stories & <span className="text-gradient">Recipes</span>
            </h1>
            <p className="text-stone-700 dark:text-stone-300 text-base md:text-lg leading-relaxed max-w-xl">
              Deep dives into culinary culture, seasonal cooking, and global food adventures — authored by passionate chefs.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 pt-1">
              {[
                { icon: BookOpen, label: `${posts.length} Articles` },
                { icon: Users,    label: "Expert Authors" },
                { icon: Star,     label: "Weekly Picks" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 font-medium">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </div>
              ))}
            </div>

            {/* Search Bar directly below stats */}
            <div className="relative w-full max-w-md group pt-2 mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <Input
                type="text"
                placeholder="Search articles, categories, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-10 h-13 rounded-2xl bg-card border border-border/60 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm shadow-xl transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-muted hover:bg-primary hover:text-white rounded-full text-xs text-muted-foreground transition-all flex items-center justify-center font-bold">✕</button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STICKY CATEGORY FILTER
      ══════════════════════════════════════════════════ */}
      <div className="sticky top-[64px] z-30 bg-background/85 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                const meta = cat !== "All" ? categoryMeta[cat] : null;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black tracking-wide uppercase transition-all duration-300 border ${
                      active 
                        ? "text-primary-foreground border-transparent shadow-lg shadow-primary/20" 
                        : "text-muted-foreground border-border/40 bg-card/30 hover:border-primary/20 hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="cat-pill"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {meta && <span className="text-xs">{getCategoryIcon(cat, "h-3.5 w-3.5")}</span>}
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Compact Search & Results Count */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="relative group w-48 sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-8 h-9 rounded-full bg-card/60 border border-border/50 focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:border-primary text-xs shadow-sm transition-all"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-muted hover:bg-primary hover:text-white rounded-full text-[9px] text-muted-foreground transition-all flex items-center justify-center font-bold">✕</button>
                )}
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold px-1 whitespace-nowrap">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (

              /* ── Empty state ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center space-y-5"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
                  <Inbox className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold font-playfair">Nothing found</h3>
                <p className="text-muted-foreground text-sm">Try a different search or category.</p>
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
                >
                  Reset Filters
                </button>
              </motion.div>

            ) : (
              <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">

                {/* ══════════════════════════════════════
                    CINEMATIC HERO POST
                ══════════════════════════════════════ */}
                {hero && (
                  <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-5">
                      <Flame className="h-4 w-4 text-primary" />
                      <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Cover Story</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
                    </div>

                    <Link href={`/blogs/${hero.id}`}>
                      <div className="group relative rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-2xl hover:shadow-primary/10 cursor-pointer">

                        {/* Background image */}
                        <div className="relative h-[340px] md:h-[400px] w-full overflow-hidden">
                          <img
                            src={hero.image}
                            alt={hero.title}
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                          />
                          {/* Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                          {/* Top badges */}
                          <div className="absolute top-5 left-5 flex gap-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-[0.15em] rounded-full shadow-lg shadow-primary/40">
                              <Star className="h-2.5 w-2.5 fill-current" /> Featured
                            </span>
                            <CategoryBadge category={hero.category} size="xs" />
                          </div>

                          {/* Views top-right */}
                          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[9px] font-semibold rounded-full border border-white/10">
                            <Eye className="h-3 w-3 text-primary" />
                            {hero.views.toLocaleString()} views
                          </div>

                          {/* Bottom content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                            <div className="max-w-3xl space-y-3">

                              {/* Author row */}
                              <div className="flex items-center gap-3">
                                <img src={hero.author.image} alt={hero.author.name} className="w-8 h-8 rounded-full border-2 border-white/30" />
                                <div>
                                  <p className="text-white text-xs font-bold">{hero.author.name}</p>
                                  <p className="text-white/50 text-[9px] hidden sm:block">{hero.author.bio}</p>
                                </div>
                                <div className="h-3 w-px bg-white/20 mx-1" />
                                <div className="flex items-center gap-1 text-white/50 text-[10px]">
                                  <Clock className="h-3 w-3 text-primary" />
                                  {hero.readTime} read
                                </div>
                                <div className="flex items-center gap-1 text-white/50 text-[10px]">
                                  <Calendar className="h-3 w-3 text-primary" />
                                  {formatDate(hero.date)}
                                </div>
                              </div>

                              {/* Title */}
                              <h2 className="text-xl sm:text-2xl md:text-4xl font-black font-outfit text-white leading-tight group-hover:text-primary/90 transition-colors duration-300 line-clamp-2">
                                {hero.title}
                              </h2>

                              {/* Excerpt */}
                              <p className="text-white/65 text-xs md:text-sm leading-relaxed line-clamp-2 max-w-2xl">
                                {hero.excerpt}
                              </p>

                              {/* Tags + CTA */}
                              <div className="flex items-center justify-between pt-1">
                                <div className="flex flex-wrap gap-1.5">
                                  {hero.tags.slice(0, 2).map(t => (
                                    <span key={t} className="px-2.5 py-0.5 bg-white/10 backdrop-blur-sm text-white/80 text-[9px] font-bold rounded-full border border-white/10">
                                      #{t}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 px-4.5 py-2 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-primary/40 group-hover:shadow-primary/60 transition-all duration-300 group-hover:gap-3">
                                  <span>Read Story</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* ══════════════════════════════════════
                    TWO-COLUMN LAYOUT: Grid + Trending
                ══════════════════════════════════════ */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* ── Left: Article Grid (2/3 width) ── */}
                    <div className="lg:col-span-2 space-y-10">

                      {/* Section label */}
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Latest Articles</span>
                        <div className="flex-1 h-px bg-border/40" />
                      </div>

                      {/* First row: Large card + stacked small */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rest.slice(0, 4).map((post, idx) => {
                          const isLarge = idx === 0;
                          return (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, y: 24 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: idx * 0.06 }}
                              className={isLarge ? "md:col-span-2" : ""}
                            >
                              <Link href={`/blogs/${post.id}`}>
                                <article className={`group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all duration-400 cursor-pointer ${isLarge ? "flex flex-col md:flex-row md:h-[300px]" : "flex flex-col"}`}>

                                  {/* Image */}
                                  <div className={`relative overflow-hidden flex-shrink-0 ${isLarge ? "h-52 md:h-full md:w-[340px] lg:w-[400px]" : "h-48"}`}>
                                    <img
                                      src={post.image}
                                      alt={post.title}
                                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                    {/* Category */}
                                    <div className="absolute top-3 left-3">
                                      <CategoryBadge category={post.category} size="xs" />
                                    </div>
                                    {/* Read time */}
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-[9px] font-semibold rounded-full border border-white/10">
                                      <Clock className="h-2.5 w-2.5 text-primary" />
                                      {post.readTime}
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div className={`p-5 flex flex-col flex-1 ${isLarge ? "justify-between gap-0" : "justify-between gap-4"}`}>
                                    <div className="space-y-3">
                                      <h3 className={`font-black font-outfit text-foreground leading-snug group-hover:text-primary transition-colors duration-300 ${isLarge ? "text-xl" : "text-base"} line-clamp-2`}>
                                        {post.title}
                                      </h3>
                                      <p className={`text-muted-foreground text-xs leading-relaxed ${isLarge ? "line-clamp-3" : "line-clamp-2"}`}>
                                        {post.excerpt}
                                      </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                                      <div className="flex items-center gap-2">
                                        <img src={post.author.image} alt={post.author.name} className="w-7 h-7 rounded-full border border-primary/15" />
                                        <div>
                                          <p className="text-[11px] font-bold text-foreground">{post.author.name}</p>
                                          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                                            <Calendar className="h-2.5 w-2.5" />
                                            {formatDate(post.date)}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
                                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                          <ChevronRight className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Remaining posts: 2-col grid */}
                      {rest.slice(4).length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {rest.slice(4).map((post, idx) => (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, y: 24 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: (idx + 4) * 0.06 }}
                            >
                              <Link href={`/blogs/${post.id}`}>
                                <article className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all duration-400 cursor-pointer flex flex-col">
                                  <div className="relative h-44 overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                    <div className="absolute top-3 left-3"><CategoryBadge category={post.category} size="xs" /></div>
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-[9px] font-semibold rounded-full border border-white/10">
                                      <Clock className="h-2.5 w-2.5 text-primary" />{post.readTime}
                                    </div>
                                  </div>
                                  <div className="p-5 flex flex-col gap-3 flex-1">
                                    <h3 className="text-base font-black font-outfit text-foreground line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                                      <div className="flex items-center gap-2">
                                        <img src={post.author.image} alt="" className="w-6 h-6 rounded-full border border-primary/15" />
                                        <span className="text-[11px] font-bold text-foreground">{post.author.name}</span>
                                      </div>
                                      <span className="text-[9px] text-muted-foreground">{formatDate(post.date)}</span>
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ── Right: Sidebar (1/3 width) ── */}
                    <div className="space-y-8">

                      {/* Trending Panel */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm"
                      >
                        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                        <div className="p-5 space-y-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <h3 className="font-black font-outfit text-sm uppercase tracking-wider">Trending Now</h3>
                          </div>
                          <div className="space-y-1">
                            {trending.map((post, i) => (
                              <Link href={`/blogs/${post.id}`} key={post.id}>
                                <div className="group flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
                                  <span className={`text-2xl font-black font-outfit shrink-0 leading-none mt-0.5 ${i === 0 ? "text-primary" : "text-border"}`}>
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <div className="flex-1 min-w-0 space-y-1">
                                    <p className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                      {post.title}
                                    </p>
                                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                                      <Eye className="h-2.5 w-2.5" />
                                      {post.views.toLocaleString()}
                                      <span>·</span>
                                      <Clock className="h-2.5 w-2.5" />
                                      {post.readTime}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Categories Panel */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm"
                      >
                        <div className="h-1 bg-gradient-to-r from-accent to-primary" />
                        <div className="p-5 space-y-4">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-accent" />
                            <h3 className="font-black font-outfit text-sm uppercase tracking-wider">Explore Topics</h3>
                          </div>
                          <div className="space-y-2">
                            {Object.entries(categoryMeta).map(([cat, meta]) => {
                              const count = posts.filter(p => p.category === cat).length;
                              return (
                                <button
                                  key={cat}
                                  onClick={() => setSelectedCategory(cat)}
                                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 ${
                                    selectedCategory === cat
                                      ? `${meta.bg} ${meta.color} border-transparent`
                                      : "border-border/50 text-muted-foreground hover:border-primary/20 hover:bg-muted"
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    {getCategoryIcon(cat, "h-3.5 w-3.5")}
                                    {cat}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${selectedCategory === cat ? "bg-white/30" : "bg-muted"}`}>
                                    {count}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>

                      {/* Newsletter sidebar */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-accent/8 to-primary/5" />
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/15 blur-2xl" />
                        <div className="relative p-5 space-y-4">
                          <div className="text-[#c05c31] dark:text-[#ebc63c]">
                            <Mail className="h-8 w-8" />
                          </div>
                          <div>
                            <h3 className="font-bold font-playfair text-base text-foreground">Weekly Digest</h3>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Fresh recipes & food stories, every Thursday.</p>
                          </div>
                          {!subscribed ? (
                            <div className="space-y-2">
                              <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-3.5 py-2.5 text-xs border border-border/60 bg-background/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c05c31]/30 transition-all"
                              />
                              <button
                                onClick={() => { if (email) setSubscribed(true); }}
                                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-black uppercase tracking-wider py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                              >
                                Subscribe Free →
                              </button>
                            </div>
                          ) : (
                            <div className="py-3 text-center space-y-1">
                              <div className="text-primary flex justify-center">
                                <Sparkles className="h-8 w-8" />
                              </div>
                              <p className="text-xs font-bold text-primary">You're in! Check your inbox.</p>
                            </div>
                          )}
                          <p className="text-[9px] text-muted-foreground">No spam. Unsubscribe anytime.</p>
                        </div>
                      </motion.div>

                    </div>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM NEWSLETTER BANNER
      ══════════════════════════════════════════════════ */}
      <section id="newsletter-section" className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/8 to-primary/5" />
            <div className="absolute inset-0 border border-primary/15 rounded-3xl" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative z-10 py-14 px-8 md:px-14">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                    <Mail className="h-3 w-3" />
                    Newsletter
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black font-outfit text-foreground leading-tight">
                    Never Miss a<br />
                    <span className="text-gradient">Food Story</span>
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Join 12,000+ food lovers who get weekly recipes, chef interviews, and culinary travel guides in their inbox.
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    {["Free forever", "No spam", "Unsubscribe anytime"].map(f => (
                      <span key={f} className="flex items-center gap-1"><span className="text-primary">✓</span> {f}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 text-sm border border-border/60 bg-background/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <button className="px-5 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-black rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                      Join <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    By subscribing you agree to our privacy policy. You can unsubscribe at any time.
                  </p>

                  {/* Social proof */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex -space-x-2">
                      {["seed=A", "seed=B", "seed=C", "seed=D"].map((s, i) => (
                        <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?${s}`} className="w-8 h-8 rounded-full border-2 border-background" alt="" />
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">12,000+ subscribers</p>
                      <div className="flex text-primary gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
