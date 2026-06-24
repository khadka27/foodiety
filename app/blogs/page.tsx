"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  ChevronRight,
  Flame,
  Star,
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
  author: {
    name: string;
    image: string;
    bio: string;
  };
  tags: string[];
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Perfect Pasta: Secrets from Italian Grandmothers",
    excerpt:
      "Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.",
    content: `
      <p>There's something magical about watching an Italian grandmother make pasta from scratch. The way her weathered hands work the dough, the intuitive understanding of texture and timing, the stories shared while rolling each strand – it's a masterclass in both cooking and cultural preservation.</p>
      <h2>The Foundation: Choosing Your Flour</h2>
      <p>Every great pasta begins with the right flour. Italian grandmothers swear by "00" flour (doppio zero), which is milled to an incredibly fine consistency. This creates the perfect texture – smooth yet with enough grip to hold sauce beautifully.</p>
      <blockquote class="border-l-4 border-orange-500 pl-4 italic my-6 text-muted-foreground bg-orange-500/5 py-2 pr-2 rounded-r-lg">"La pasta è come la vita – serve pazienza e amore." (Pasta is like life – it requires patience and love.) - Nonna Maria, age 84</blockquote>
      <h2>The Kneading Ritual</h2>
      <p>Kneading isn't just about developing gluten – it's a meditative process. Italian nonnas knead for exactly 10 minutes, no more, no less. They listen to the dough, feeling when it transforms from rough and shaggy to smooth and elastic.</p>
    `,
    image:
      "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-15",
    views: 2847,
    category: "Cooking Tips",
    readTime: "8 min read",
    featured: true,
    author: {
      name: "Isabella Romano",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
      bio: "Food writer and Italian specialist",
    },
    tags: ["Italian", "Pasta", "Traditional"],
  },
  {
    id: 2,
    title: "Global Street Food: A Journey Through Authentic Flavors",
    excerpt:
      "From Bangkok's bustling markets to Mexico City's vibrant streets, explore the world through its most beloved street foods.",
    content: `
      <p>Street food is the raw, unfiltered culinary soul of a culture. It is prepared in the open, enjoyed on busy curbs, and offers a glimpse into the spices and histories that define communities.</p>
      <h2>1. Bangkok: The Sweet, Spicy, & Sour Balance</h2>
      <p>Walking through Yaowarat Road in Bangkok, the aroma of sizzling Pad Thai and coconut pancakes is intoxicating.</p>
      <h2>2. Mexico City: The Tacos Al Pastor Legacy</h2>
      <p>Pork marinated in dried chilies, spices, and pineapple, slowly cooked on a trompo vertical spit.</p>
    `,
    image:
      "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-12",
    views: 1923,
    category: "Travel",
    readTime: "12 min read",
    featured: false,
    author: {
      name: "Marco Rodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco",
      bio: "Traveler and food journalist",
    },
    tags: ["Street Food", "Travel", "Tacos"],
  },
  {
    id: 3,
    title: "Seasonal Cooking: Winter Comfort Foods That Warm the Soul",
    excerpt:
      "Embrace the season with hearty stews, roasted vegetables, and warming spices that bring comfort to cold days.",
    content: `
      <p>When the temperature drops, our kitchens become warm sanctuaries. Seasonal winter cooking focuses on slow-braised meats, rich root vegetable bakes, and robust broths packed with immunity-boosting herbs.</p>
      <h2>Root Vegetables: Nature's Winter Sweetness</h2>
      <p>Parsnips, carrots, and sweet potatoes develop deeper, sweeter flavors when subjected to winter frost. Roasting them at high heat caramelizes their natural sugars.</p>
    `,
    image:
      "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-10",
    views: 3156,
    category: "Seasonal",
    readTime: "6 min read",
    featured: true,
    author: {
      name: "Sarah Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Head Chef & Blogger",
    },
    tags: ["Winter", "Comfort", "Stew"],
  },
  {
    id: 4,
    title: "Plant-Based Revolution: 10 Recipes That Will Change Your Mind",
    excerpt:
      "Vegan cooking has never been this exciting. These innovative plant-based recipes will satisfy even the most devoted carnivores.",
    content: `<p>Plant-based cooking has undergone a revolution in recent years...</p>`,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-08",
    views: 1540,
    category: "Nutrition",
    readTime: "10 min read",
    featured: false,
    author: {
      name: "Alex Kim",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      bio: "Plant-based chef and nutritionist",
    },
    tags: ["Vegan", "Plant-Based", "Healthy"],
  },
  {
    id: 5,
    title: "The Science of Fermentation: From Kimchi to Kombucha",
    excerpt:
      "Unlock the ancient art of fermentation and discover how it transforms simple ingredients into complex, probiotic-rich foods.",
    content: `<p>Fermentation is one of humanity's oldest food preservation techniques...</p>`,
    image:
      "https://images.pexels.com/photos/5945559/pexels-photo-5945559.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "2026-06-05",
    views: 2210,
    category: "Trends",
    readTime: "9 min read",
    featured: false,
    author: {
      name: "Dr. Maya Patel",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      bio: "Food scientist and fermentation expert",
    },
    tags: ["Fermentation", "Probiotics", "Kimchi"],
  },
];

const categories = [
  "All",
  "Cooking Tips",
  "Travel",
  "Seasonal",
  "Nutrition",
  "Trends",
];

const categoryConfig: Record<
  string,
  { color: string; dot: string }
> = {
  "Cooking Tips": {
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    dot: "bg-amber-500",
  },
  Travel: {
    color: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
    dot: "bg-sky-500",
  },
  Seasonal: {
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  Nutrition: {
    color: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20",
    dot: "bg-violet-500",
  },
  Trends: {
    color: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    dot: "bg-rose-500",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CategoryPill({ category }: { category: string }) {
  const cfg = categoryConfig[category];
  if (!cfg) return <Badge variant="secondary">{category}</Badge>;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {category}
    </span>
  );
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("foodiety_blogs");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch {
        setPosts(defaultBlogPosts);
      }
    } else {
      setPosts(defaultBlogPosts);
      localStorage.setItem("foodiety_blogs", JSON.stringify(defaultBlogPosts));
    }
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  if (!isMounted) {
    return (
      <div className="pt-24 min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-accent/30 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
        </div>
        <p className="text-muted-foreground font-medium animate-pulse font-outfit">
          Loading food stories...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Ambient Background ── */}
      <div className="fixed top-0 right-0 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[160px] pointer-events-none -translate-y-1/3 translate-x-1/3 z-0" />
      <div className="fixed bottom-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[140px] pointer-events-none -translate-x-1/3 z-0" />

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 overflow-hidden z-10">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-primary animate-ping opacity-60" />
        <div className="absolute top-36 right-16 w-3 h-3 rounded-full bg-accent/50 animate-ping [animation-delay:1s]" />
        <div className="absolute bottom-10 left-1/3 w-1.5 h-1.5 rounded-full bg-primary/60 animate-ping [animation-delay:2s]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            {/* Label badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Food Stories & Insights</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] font-outfit">
              <span className="block text-foreground">Taste & Read:</span>
              <span className="block text-gradient">Our Culinary Blog</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Dive deep into recipes, global food travels, seasonal kitchen
              wisdom, and food trends authored by passionate chefs worldwide.
            </p>

            {/* Search bar */}
            <div className="max-w-lg mx-auto relative pt-2">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                <Input
                  type="text"
                  placeholder="Search articles, recipes, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-4 h-14 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border-border/60 focus-visible:ring-primary focus-visible:border-primary text-sm shadow-xl transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm text-muted-foreground">
              {[
                { icon: BookOpen, label: `${posts.length} Articles` },
                { icon: TrendingUp, label: "Weekly Updates" },
                { icon: Star, label: "Expert Authors" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORY FILTER BAR
      ══════════════════════════════════════ */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative flex-shrink-0 px-5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-300 ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="blog-cat-pill"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl -z-10 shadow-lg shadow-primary/25"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}

            <div className="ml-auto flex-shrink-0 text-xs text-muted-foreground font-medium">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              /* ─── Empty State ─── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-20 text-center max-w-md mx-auto rounded-3xl border border-border/80 space-y-5"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit">
                    No Stories Found
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    We couldn&apos;t find articles matching your criteria.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold"
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-20"
              >
                {/* ─── Featured Hero Card ─── */}
                {featuredPost && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Flame className="h-4 w-4 text-primary" />
                      <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
                        Featured Story
                      </h2>
                      <div className="flex-1 h-px bg-border/40" />
                    </div>

                    <Link href={`/blogs/${featuredPost.id}`}>
                      <div className="group relative grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden border border-border/60 shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 bg-card">
                        {/* Image side */}
                        <div className="relative lg:col-span-3 h-72 lg:h-auto min-h-[360px] overflow-hidden">
                          <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80 hidden lg:block" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:hidden" />

                          {/* Badges on image */}
                          <div className="absolute top-6 left-6 flex gap-2">
                            <span className="px-3 py-1.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                              Featured
                            </span>
                            <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10">
                              {featuredPost.category}
                            </span>
                          </div>

                          {/* Read time */}
                          <div className="absolute bottom-6 left-6 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/10">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            {featuredPost.readTime}
                          </div>
                        </div>

                        {/* Content side */}
                        <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between">
                          <div className="space-y-5">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                Editor&apos;s Pick
                              </p>
                            </div>

                            <h2 className="text-2xl lg:text-3xl font-black font-outfit leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                              {featuredPost.title}
                            </h2>

                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                              {featuredPost.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                              {featuredPost.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-primary/8 text-primary text-[10px] font-bold rounded-md border border-primary/15"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Author + CTA */}
                          <div className="space-y-6 pt-6">
                            <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                              <img
                                src={featuredPost.author.image}
                                alt={featuredPost.author.name}
                                className="w-10 h-10 rounded-full border-2 border-primary/20"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-foreground truncate">
                                  {featuredPost.author.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground truncate">
                                  {featuredPost.author.bio}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{featuredPost.views.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all duration-300">
                              <span>Read Full Story</span>
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* ─── Article Grid ─── */}
                {gridPosts.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        More Curated Articles
                      </h2>
                      <div className="flex-1 h-px bg-border/40" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {gridPosts.map((post, idx) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.07 }}
                        >
                          <Link href={`/blogs/${post.id}`}>
                            <article className="group h-full flex flex-col rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all duration-500 cursor-pointer">
                              {/* Card Image */}
                              <div className="relative h-52 w-full overflow-hidden">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                                {/* Category badge */}
                                <div className="absolute top-4 left-4">
                                  <CategoryPill category={post.category} />
                                </div>

                                {/* View count */}
                                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold rounded-full border border-white/10">
                                  <Eye className="h-3 w-3 text-amber-400" />
                                  <span>{post.views.toLocaleString()}</span>
                                </div>

                                {/* Read time */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold rounded-full border border-white/10">
                                  <Clock className="h-3 w-3 text-primary" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>

                              {/* Card Body */}
                              <div className="p-6 flex-1 flex flex-col gap-4">
                                <div className="flex-1 space-y-3">
                                  <h3 className="text-base font-bold font-outfit text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
                                    {post.title}
                                  </h3>
                                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                  </p>
                                </div>

                                {/* Card Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={post.author.image}
                                      alt={post.author.name}
                                      className="w-7 h-7 rounded-full border border-primary/15"
                                    />
                                    <div>
                                      <p className="text-[11px] font-bold text-foreground">
                                        {post.author.name}
                                      </p>
                                      <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                                        <Calendar className="h-2.5 w-2.5" />
                                        <span>{formatDate(post.date)}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <ChevronRight className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                                  </div>
                                </div>
                              </div>
                            </article>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEWSLETTER CTA
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 dark:from-primary/10 dark:via-accent/8 dark:to-transparent" />
            <div className="absolute inset-0 backdrop-blur-sm border border-primary/20 rounded-3xl" />

            {/* Decorative orbs */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-accent/15 blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 p-12 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <Mail className="h-3.5 w-3.5" />
                Newsletter
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-black font-outfit text-foreground">
                  Never Miss a Food Story
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Get fresh cooking insights, seasonal recipes, and culinary
                  discoveries delivered straight to your inbox every week.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-background/80 border-border/60 focus-visible:ring-primary text-sm flex-1"
                />
                <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold shrink-0 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  Subscribe
                </Button>
              </div>

              <p className="text-[10px] text-muted-foreground">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
