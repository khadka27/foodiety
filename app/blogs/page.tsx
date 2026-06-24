"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Eye, Clock, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering to avoid SSR issues
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
    excerpt: "Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.",
    content: `
      <p>There's something magical about watching an Italian grandmother make pasta from scratch. The way her weathered hands work the dough, the intuitive understanding of texture and timing, the stories shared while rolling each strand – it's a masterclass in both cooking and cultural preservation.</p>
      <h2>The Foundation: Choosing Your Flour</h2>
      <p>Every great pasta begins with the right flour. Italian grandmothers swear by "00" flour (doppio zero), which is milled to an incredibly fine consistency. This creates the perfect texture – smooth yet with enough grip to hold sauce beautifully.</p>
      <blockquote class="border-l-4 border-orange-500 pl-4 italic my-6 text-muted-foreground">"La pasta è come la vita – serve pazienza e amore." (Pasta is like life – it requires patience and love.) - Nonna Maria, age 84</blockquote>
      <h2>The Kneading Ritual</h2>
      <p>Kneading isn't just about developing gluten – it's a meditative process. Italian nonnas knead for exactly 10 minutes, no more, no less. They listen to the dough, feeling when it transforms from rough and shaggy to smooth and elastic.</p>
    `,
    image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    excerpt: "From Bangkok's bustling markets to Mexico City's vibrant streets, explore the world through its most beloved street foods.",
    content: `
      <p>Street food is the raw, unfiltered culinary soul of a culture. It is prepared in the open, enjoyed on busy curbs, and offers a glimpse into the spices and histories that define communities.</p>
      <h2>1. Bangkok: The Sweet, Spicy, & Sour Balance</h2>
      <p>Walking through Yaowarat Road in Bangkok, the aroma of sizzling Pad Thai and coconut pancakes is intoxicating. The key to Thai street food is the delicate balance of five flavors: sweet, salty, spicy, sour, and bitter.</p>
      <h2>2. Mexico City: The Tacos Al Pastor Legacy</h2>
      <p>Pork marinated in dried chilies, spices, and pineapple, slowly cooked on a trompo vertical spit. Shaved directly onto warm corn tortillas with double-quick speed – it is culinary poetry.</p>
    `,
    image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    excerpt: "Embrace the season with hearty stews, roasted vegetables, and warming spices that bring comfort to cold days.",
    content: `
      <p>When the temperature drops, our kitchens become warm sanctuaries. Seasonal winter cooking focuses on slow-braised meats, rich root vegetable bakes, and robust broths packed with immunity-boosting herbs.</p>
      <h2>Root Vegetables: Nature's Winter Sweetness</h2>
      <p>Parsnips, carrots, and sweet potatoes develop deeper, sweeter flavors when subjected to winter frost. Roasting them at high heat caramelizes their natural sugars, making them a perfect pairing for hearty roasts.</p>
    `,
    image: "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800",
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
  }
];

const categories = ["All", "Cooking Tips", "Travel", "Seasonal", "Nutrition", "Trends"];

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Fetch blogs list from localStorage, fallback to seed default list
    const saved = localStorage.getItem("foodiety_blogs");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
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
      post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  // Fallback if no featured post matches filters
  const primaryFeatured = featuredPosts[0] || filteredPosts[0];
  const secondaryPosts = featuredPosts[0]
    ? filteredPosts.filter((p) => p.id !== primaryFeatured?.id)
    : filteredPosts.slice(1);

  if (!isMounted) {
    return (
      <div className="pt-24 min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
        <p className="mt-4 text-muted-foreground font-medium animate-pulse">Loading food stories...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-16">
      
      {/* Background blobs */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute top-[40%] left-1/4 w-[450px] h-[450px] rounded-full bg-red-500/5 blur-[130px] pointer-events-none animate-blob" style={{ animationDelay: "3s" }} />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Food Stories & Insights</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight font-outfit max-w-4xl mx-auto">
            Taste & Read: Our <span className="text-gradient font-outfit">Culinary Blog</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Dive deep into recipes, global food travels, seasonal kitchen guidelines, and food trends authored by passion chefs.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative pt-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles, categories, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 rounded-2xl bg-white/40 dark:bg-black/30 backdrop-blur-md border-border/80 focus-visible:ring-orange-500 focus-visible:border-orange-500 text-sm shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* Main Blog Feed Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-300 ${
                    isSelected
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-orange-500/5 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-blog-cat"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl -z-10 shadow-lg shadow-orange-500/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* If empty grid */}
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-16 text-center max-w-md mx-auto rounded-3xl border border-border/80 space-y-4"
            >
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto text-orange-500">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">No Stories Found</h3>
              <p className="text-muted-foreground text-sm">
                We couldn't find any articles matching your search criteria. Try modifying your filter settings.
              </p>
              <Button
                variant="outline"
                className="rounded-xl border-orange-500/20 text-orange-500 hover:bg-orange-500/5"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Reset Search
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-16">
              
              {/* Primary Highlighted Feature Post Card */}
              {primaryFeatured && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <Link href={`/blogs/${primaryFeatured.id}`}>
                    <div className="glass-card glass-hover rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border/80 shadow-2xl group cursor-pointer">
                      
                      {/* Left cover image */}
                      <div className="relative h-64 lg:h-full lg:min-h-[380px] lg:col-span-7 overflow-hidden">
                        <img
                          src={primaryFeatured.image}
                          alt={primaryFeatured.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:to-black/35" />
                        
                        <div className="absolute top-6 left-6 flex space-x-2">
                          <Badge className="bg-orange-500 border-none text-white px-3 py-1 font-bold text-xs uppercase shadow-md">
                            Featured
                          </Badge>
                          <Badge className="bg-white text-gray-900 border-none px-3 py-1 font-semibold text-xs shadow-md">
                            {primaryFeatured.category}
                          </Badge>
                        </div>

                        <div className="absolute bottom-6 left-6 text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/10">
                          <Clock className="h-3.5 w-3.5 text-orange-400" />
                          <span>{primaryFeatured.readTime}</span>
                        </div>
                      </div>

                      {/* Right metadata description */}
                      <div className="p-8 lg:col-span-5 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Headline Story</span>
                          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight font-outfit text-foreground leading-tight group-hover:text-orange-500 transition-colors">
                            {primaryFeatured.title}
                          </h2>
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                            {primaryFeatured.excerpt}
                          </p>
                        </div>

                        {/* Footer author */}
                        <div className="flex items-center justify-between pt-6 border-t border-border/40">
                          <div className="flex items-center space-x-3">
                            <img
                              src={primaryFeatured.author.image}
                              alt={primaryFeatured.author.name}
                              className="w-10 h-10 rounded-full border border-orange-500/10"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-foreground">{primaryFeatured.author.name}</h4>
                              <div className="flex items-center space-x-1 text-[10px] text-muted-foreground font-medium">
                                <Calendar className="h-3 w-3 text-orange-500/60" />
                                <span>{primaryFeatured.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-2 rounded-full bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>

                      </div>

                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Secondary Grid Feed Card List */}
              {secondaryPosts.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold tracking-tight font-outfit border-b pb-3 border-border/40">More Curated Articles</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {secondaryPosts.map((post, idx) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                      >
                        <Link href={`/blogs/${post.id}`}>
                          <div className="glass-card glass-hover h-full flex flex-col rounded-3xl overflow-hidden group border border-border/60 cursor-pointer">
                            
                            {/* Card Image */}
                            <div className="relative h-48 w-full overflow-hidden">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                              <div className="absolute top-4 left-4">
                                <Badge className="bg-white/95 text-gray-900 border-none backdrop-blur-md px-2.5 py-1 text-xs font-semibold shadow-md">
                                  {post.category}
                                </Badge>
                              </div>

                              <div className="absolute bottom-4 left-4 text-white text-[10px] font-semibold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1.5 border border-white/10">
                                <Clock className="h-3 w-3 text-orange-400" />
                                <span>{post.readTime}</span>
                              </div>

                              <div className="absolute bottom-4 right-4 text-white text-[10px] font-semibold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1 border border-white/10 shadow-md">
                                <Eye className="h-3 w-3 text-amber-400" />
                                <span>{post.views.toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                              <div className="space-y-2">
                                <h4 className="text-lg font-bold tracking-tight text-foreground line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                                  {post.title}
                                </h4>
                                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                                  {post.excerpt}
                                </p>
                              </div>

                              {/* Footer metadata */}
                              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                <div className="flex items-center space-x-2">
                                  <img src={post.author.image} className="w-6 h-6 rounded-full border border-orange-500/10" alt="author" />
                                  <span className="text-[10px] font-bold text-muted-foreground">{post.author.name}</span>
                                </div>
                                <span className="text-[9px] text-muted-foreground">{post.date}</span>
                              </div>

                            </div>

                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </section>

    </div>
  );
}
