"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Eye,
  Share2,
  Heart,
  Bookmark,
  ArrowLeft,
  Clock,
  ChevronRight,
  Mail,
  Twitter,
  Facebook,
  Link2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const dynamic = "force-dynamic";

interface BlogPost {
  id: number;
  slug?: string;
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
    slug: "the-art-of-perfect-pasta-secrets-from-italian-grandmothers",
    title: "The Art of Perfect Pasta: Secrets from Italian Grandmothers",
    excerpt:
      "Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.",
    content: `
      <p>There's something magical about watching an Italian grandmother make pasta from scratch. The way her weathered hands work the dough, the intuitive understanding of texture and timing, the stories shared while rolling each strand – it's a masterclass in both cooking and cultural preservation.</p>
      <h2>The Foundation: Choosing Your Flour</h2>
      <p>Every great pasta begins with the right flour. Italian grandmothers swear by "00" flour (doppio zero), which is milled to an incredibly fine consistency. This creates the perfect texture – smooth yet with enough grip to hold sauce beautifully.</p>
      <blockquote>"La pasta è come la vita – serve pazienza e amore." (Pasta is like life – it requires patience and love.) - Nonna Maria, age 84</blockquote>
      <h2>The Kneading Ritual</h2>
      <p>Kneading isn't just about developing gluten – it's a meditative process. Italian nonnas knead for exactly 10 minutes, no more, no less. They listen to the dough, feeling when it transforms from rough and shaggy to smooth and elastic.</p>
      <h2>The Resting Period</h2>
      <p>After kneading, the dough must rest – a step many impatient cooks skip to their peril. This 30-minute rest allows the gluten strands to relax, making the pasta far easier to roll thin without it springing back.</p>
      <p>Wrap it in plastic and leave it at room temperature. Go have a glass of Chianti. The dough will thank you.</p>
      <h2>Rolling to Perfection</h2>
      <p>Whether you use a rolling pin or a pasta machine, the goal is translucent-thin sheets of even thickness. Hold the sheet up to the light – you should be able to see your hand through it. That's how thin an Italian nonna rolls her pasta.</p>
    `,
    image:
      "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=1600",
    date: "2026-06-15",
    views: 2847,
    category: "Cooking Tips",
    readTime: "8 min read",
    featured: true,
    author: {
      name: "Isabella Romano",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
      bio: "Food writer and Italian specialist with over 15 years of culinary experience across Italy and the Mediterranean.",
    },
    tags: ["Italian", "Pasta", "Traditional"],
  },
  {
    id: 2,
    slug: "global-street-food",
    title: "Global Street Food: A Journey Through Authentic Flavors",
    excerpt:
      "From Bangkok's bustling markets to Mexico City's vibrant streets, explore the world through its most beloved street foods.",
    content: `
      <p>Street food is the raw, unfiltered culinary soul of a culture.</p>
      <h2>Bangkok: The Sweet, Spicy, & Sour Balance</h2>
      <p>Walking through Yaowarat Road in Bangkok, the aroma of sizzling Pad Thai is intoxicating.</p>
      <h2>Mexico City: The Tacos Al Pastor Legacy</h2>
      <p>Pork marinated in dried chilies, spices, and pineapple, slowly cooked on a trompo vertical spit.</p>
    `,
    image:
      "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    slug: "seasonal-winter-comfort-foods",
    title: "Seasonal Cooking: Winter Comfort Foods That Warm the Soul",
    excerpt:
      "Embrace the season with hearty stews, roasted vegetables, and warming spices that bring comfort to cold days.",
    content: `
      <p>When the temperature drops, our kitchens become warm sanctuaries.</p>
      <h2>Root Vegetables: Nature's Winter Sweetness</h2>
      <p>Parsnips, carrots, and sweet potatoes develop deeper, sweeter flavors when subjected to winter frost.</p>
    `,
    image:
      "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Reading progress bar
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left z-[100] shadow-sm shadow-primary/30"
    />
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [email, setEmail] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setLikeCount(Math.floor(Math.random() * 200) + 50);

    const saved = localStorage.getItem("foodiety_blogs");
    let blogList = defaultBlogPosts;

    if (saved) {
      try {
        blogList = JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    const currentSlug = params.slug as string;
    let found = blogList.find(
      (p) => p.slug?.toLowerCase() === currentSlug?.toLowerCase()
    );

    if (!found) {
      const isNumeric = /^\d+$/.test(currentSlug);
      if (isNumeric) {
        found = blogList.find((p) => p.id === parseInt(currentSlug));
      }
    }

    if (found) {
      setPost(found);

      const updatedList = blogList.map((p) =>
        p.id === found!.id ? { ...p, views: p.views + 1 } : p
      );
      localStorage.setItem("foodiety_blogs", JSON.stringify(updatedList));

      const related = blogList
        .filter((p) => p.id !== found!.id && p.category === found!.category)
        .slice(0, 3);

      setRelatedPosts(
        related.length > 0
          ? related
          : blogList.filter((p) => p.id !== found!.id).slice(0, 3)
      );
    } else {
      setPost(blogList[0]);
    }
  }, [params.slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    toast.success(liked ? "Removed like" : "Post liked! Thanks for reading.");
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(
      bookmarked ? "Removed from bookmarks" : "Bookmarked article!"
    );
  };

  if (!isMounted || !post) {
    return (
      <div className="pt-24 min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-accent/30 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
        </div>
        <p className="text-muted-foreground font-medium animate-pulse font-outfit">
          Loading article...
        </p>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* ── Ambient background ── */}
        <div className="fixed top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[150px] pointer-events-none translate-x-1/3 z-0" />
        <div className="fixed bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-accent/4 blur-[130px] pointer-events-none -translate-x-1/3 z-0" />

        {/* ══════════════════════════════════════
            HERO — Full-bleed image with overlay
        ══════════════════════════════════════ */}
        <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
          {/* Hero image */}
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Content overlay on hero */}
          <div className="relative z-10 w-full pb-12 pt-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-5"
              >
                {/* Back button */}
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Stories
                </Link>

                {/* Category badge */}
                <div>
                  <span className="inline-flex px-3.5 py-1.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-black font-outfit text-white leading-tight max-w-3xl">
                  {post.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                    />
                    <span className="font-semibold text-white/90">
                      {post.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    <span>{(post.views + 1).toLocaleString()} views</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MAIN ARTICLE BODY
        ══════════════════════════════════════ */}
        <section className="relative z-10 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* ─── Left: Article Content ─── */}
              <div className="lg:col-span-8 space-y-10">

                {/* Excerpt / Lead */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="p-6 rounded-2xl border border-primary/15 bg-primary/5"
                >
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-light italic">
                    {post.excerpt}
                  </p>
                </motion.div>

                {/* Article Body */}
                <motion.div
                  ref={articleRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div
                    className="blog-prose"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </motion.div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="pt-6 border-t border-border/40">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                      Tagged in
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 bg-primary/8 hover:bg-primary/15 text-primary text-xs font-bold rounded-xl border border-primary/15 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm"
                >
                  <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                      <div className="relative shrink-0">
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          className="w-20 h-20 rounded-2xl border-2 border-primary/20 object-cover"
                        />
                        <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                          <User className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left space-y-2">
                        <div>
                          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                            Written by
                          </p>
                          <h4 className="text-xl font-black font-outfit text-foreground">
                            {post.author.name}
                          </h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {post.author.bio}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={toggleLike}
                          className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                            liked
                              ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/25"
                              : "border-border text-muted-foreground hover:border-red-300 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`h-4 w-4 ${liked ? "fill-white" : ""}`}
                          />
                          <span>{likeCount}</span>
                        </button>
                        <button
                          onClick={toggleBookmark}
                          className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                            bookmarked
                              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`}
                          />
                          <span>{bookmarked ? "Saved" : "Save"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="pt-4 space-y-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-black font-outfit">
                        Related Stories
                      </h3>
                      <div className="flex-1 h-px bg-border/40" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {relatedPosts.map((r) => (
                        <Link href={`/blogs/${r.id}`} key={r.id}>
                          <div className="group rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300 overflow-hidden cursor-pointer">
                            <div className="h-32 overflow-hidden">
                              <img
                                src={r.image}
                                alt={r.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4 space-y-2">
                              <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                                {r.category}
                              </span>
                              <h4 className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                {r.title}
                              </h4>
                              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                                <Clock className="h-2.5 w-2.5" />
                                <span>{r.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Right: Sticky Sidebar ─── */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

                {/* Share Card */}
                <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                  <div className="p-5 space-y-4">
                    <h4 className="font-bold text-foreground font-outfit text-sm">
                      Share This Story
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {
                          icon: Link2,
                          label: "Copy Link",
                          onClick: handleShare,
                          color: "hover:bg-primary/10 hover:text-primary hover:border-primary/30",
                        },
                        {
                          icon: Twitter,
                          label: "Twitter",
                          onClick: handleShare,
                          color: "hover:bg-sky-500/10 hover:text-sky-500 hover:border-sky-500/30",
                        },
                        {
                          icon: Facebook,
                          label: "Facebook",
                          onClick: handleShare,
                          color: "hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30",
                        },
                        {
                          icon: Mail,
                          label: "Email",
                          onClick: handleShare,
                          color: "hover:bg-accent/10 hover:text-accent hover:border-accent/30",
                        },
                      ].map(({ icon: Icon, label, onClick, color }) => (
                        <button
                          key={label}
                          onClick={onClick}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border/60 text-muted-foreground text-xs font-semibold transition-all duration-200 ${color}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Article Info */}
                <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-accent to-primary" />
                  <div className="p-5 space-y-4">
                    <h4 className="font-bold text-foreground font-outfit text-sm">
                      Article Details
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          icon: Calendar,
                          label: "Published",
                          value: formatDate(post.date),
                        },
                        {
                          icon: Clock,
                          label: "Read Time",
                          value: post.readTime,
                        },
                        {
                          icon: Eye,
                          label: "Views",
                          value: (post.views + 1).toLocaleString(),
                        },
                        {
                          icon: Heart,
                          label: "Likes",
                          value: likeCount.toLocaleString(),
                        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div
                          key={label}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Icon className="h-3.5 w-3.5 text-primary/70" />
                            <span>{label}</span>
                          </div>
                          <span className="text-xs font-bold text-foreground">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="relative rounded-2xl border border-primary/20 overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5" />
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-primary/15 blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative p-5 space-y-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                        <Mail className="h-3 w-3" />
                        Weekly Digest
                      </div>
                      <h4 className="text-base font-black font-outfit text-foreground">
                        Join Culinary Feed
                      </h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Fresh recipes, chef secrets, and food stories – every
                        week in your inbox.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-border/60 bg-background/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                      <button
                        onClick={() => {
                          if (email) {
                            toast.success("Subscribed to the newsletter!");
                            setEmail("");
                          } else {
                            toast.error("Please enter your email address.");
                          }
                        }}
                        className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-black py-2.5 text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                      >
                        Subscribe Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Back to blogs */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl border-border/60 hover:bg-primary/5 hover:text-primary hover:border-primary/30 font-bold text-xs uppercase tracking-wider"
                >
                  <Link href="/blogs" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    All Stories
                    <ChevronRight className="h-3.5 w-3.5 ml-auto" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

