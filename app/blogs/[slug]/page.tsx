"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Eye,
  Share2,
  Heart,
  Bookmark,
  ArrowLeft,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

interface BlogPost {
  id: number;
  slug: string;
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
    excerpt: "Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.",
    content: `
      <p>There's something magical about watching an Italian grandmother make pasta from scratch. The way her weathered hands work the dough, the intuitive understanding of texture and timing, the stories shared while rolling each strand – it's a masterclass in both cooking and cultural preservation.</p>
      <h2>The Foundation: Choosing Your Flour</h2>
      <p>Every great pasta begins with the right flour. Italian grandmothers swear by "00" flour (doppio zero), which is milled to an incredibly fine consistency. This creates the perfect texture – smooth yet with enough grip to hold sauce beautifully.</p>
      <blockquote class="border-l-4 border-orange-500 pl-4 italic my-6 text-muted-foreground bg-orange-500/5 py-2 pr-2 rounded-r-lg">"La pasta è come la vita – serve pazienza e amore." (Pasta is like life – it requires patience and love.) - Nonna Maria, age 84</blockquote>
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
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("foodiety_blogs");
    let blogList = defaultBlogPosts;
    
    if (saved) {
      try {
        blogList = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    const currentSlug = params.slug as string;
    // Attempt lookup by slug (case-insensitive) or fallback by id if parameter is numeric
    let found = blogList.find((p) => p.slug?.toLowerCase() === currentSlug?.toLowerCase());
    
    if (!found) {
      const isNumeric = /^\d+$/.test(currentSlug);
      if (isNumeric) {
        const targetId = parseInt(currentSlug);
        found = blogList.find((p) => p.id === targetId);
      }
    }

    if (found) {
      setPost(found);
      
      // Dynamic views counter increment
      const updatedList = blogList.map((p) => {
        if (p.id === found.id) {
          return { ...p, views: p.views + 1 };
        }
        return p;
      });
      localStorage.setItem("foodiety_blogs", JSON.stringify(updatedList));

      // Retrieve related posts
      const related = blogList
        .filter((p) => p.id !== found.id && p.category === found.category)
        .slice(0, 2);
      
      if (related.length > 0) {
        setRelatedPosts(related);
      } else {
        setRelatedPosts(blogList.filter((p) => p.id !== found.id).slice(0, 2));
      }
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
    toast.success(liked ? "Removed like" : "Post liked! Thanks for reading.");
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? "Removed from bookmarks" : "Bookmarked article!");
  };

  if (!isMounted || !post) {
    return (
      <div className="pt-24 min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
        <p className="mt-4 text-muted-foreground font-medium animate-pulse">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-16">
      
      {/* Background radial glow */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-r from-orange-500/5 to-red-500/5 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-orange-500/5 mb-2 rounded-xl border border-border/60"
            >
              <Link href="/blogs" className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider font-outfit">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Stories</span>
              </Link>
            </Button>

            <div className="space-y-4">
              <Badge className="bg-orange-500 text-white border-none px-3.5 py-1 text-xs font-bold uppercase shadow-sm">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight font-outfit">
                {post.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-orange-500/70" />
                <span className="font-medium">{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-orange-500/70" />
                <span>{(post.views + 1).toLocaleString()} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500/70" />
                <span>{post.readTime}</span>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Main content body grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Main Article Col */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Cover Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-96 w-full rounded-3xl overflow-hidden border border-border shadow-xl"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Author Card Info */}
              <Card className="glass border-border/80 shadow-md rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-14 h-14 rounded-full object-cover border border-orange-500/10"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="text-xs font-bold text-orange-500 uppercase tracking-widest">Authored By</div>
                      <h4 className="text-lg font-bold text-foreground font-outfit">{post.author.name}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed font-light">
                        {post.author.bio}
                      </p>
                    </div>
                    
                    {/* Share action buttons */}
                    <div className="flex space-x-2 pt-2 sm:pt-0">
                      <Button
                        variant={liked ? "default" : "outline"}
                        size="sm"
                        onClick={toggleLike}
                        className={`rounded-xl px-4 py-4 text-xs font-semibold ${liked ? "bg-orange-500 text-white" : "border-border"}`}
                      >
                        <Heart className={`h-4 w-4 mr-1.5 ${liked ? "fill-white" : ""}`} />
                        <span>Like</span>
                      </Button>
                      <Button
                        variant={bookmarked ? "default" : "outline"}
                        size="sm"
                        onClick={toggleBookmark}
                        className={`rounded-xl px-4 py-4 text-xs font-semibold ${bookmarked ? "bg-orange-500 text-white" : "border-border"}`}
                      >
                        <Bookmark className={`h-4 w-4 mr-1.5 ${bookmarked ? "fill-white" : ""}`} />
                        <span>Save</span>
                      </Button>
                    </div>

                  </div>
                </CardContent>
              </Card>

              {/* Rich Body Content (WYSIWYG HTML) */}
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-orange dark:prose-invert max-w-none leading-relaxed text-foreground/90 space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags List */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-6 border-t border-border/40">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-orange-500/5 hover:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/10 px-3 py-1 rounded-lg text-xs"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Related posts section */}
              {relatedPosts.length > 0 && (
                <div className="pt-10 space-y-6">
                  <h3 className="text-xl font-bold tracking-tight font-outfit border-b pb-3 border-border/40">Related Stories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((r) => (
                      <Link href={`/blogs/${r.slug}`} key={r.id}>
                        <div className="glass-card glass-hover p-4 rounded-2xl border border-border/60 flex items-center space-x-4 cursor-pointer group">
                          <img
                            src={r.image}
                            alt={r.title}
                            className="w-20 h-20 rounded-xl object-cover border border-border"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-orange-500 uppercase">{r.category}</span>
                            <h4 className="font-bold text-sm text-foreground line-clamp-2 mt-0.5 group-hover:text-orange-500 transition-colors">
                              {r.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sticky Sidebar Col */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              
              {/* Share box */}
              <Card className="glass border-border/80 shadow-md rounded-2xl overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-bold text-foreground font-outfit border-b pb-2">Actions</h4>
                  <div className="space-y-3.5">
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="w-full justify-start rounded-xl py-5 text-xs font-bold uppercase tracking-wider border-border hover:bg-orange-500/5 hover:text-orange-500"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Article link
                    </Button>
                    <Button
                      variant="outline"
                      onClick={toggleBookmark}
                      className="w-full justify-start rounded-xl py-5 text-xs font-bold uppercase tracking-wider border-border hover:bg-orange-500/5 hover:text-orange-500"
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      {bookmarked ? "Saved in Wishlist" : "Save to Wishlist"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter card */}
              <Card className="glass border-border/80 shadow-md rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/5 to-red-500/5">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-bold text-foreground font-outfit">Join Culinary Feed</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Get fresh cooking insights, nonna secrets, and hotel reviews direct to your email inbox weekly.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2 text-xs border border-border dark:border-gray-700 bg-background rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <Button
                      onClick={() => toast.success("Subscribed to the newsletter!")}
                      className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-xl font-bold py-5 text-xs uppercase"
                    >
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
