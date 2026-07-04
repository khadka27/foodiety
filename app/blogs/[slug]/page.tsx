"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
 Calendar, Eye, Share2, Heart, Bookmark, ArrowLeft, Clock,
 ChevronRight, Mail, Twitter, Facebook, Link2, User, Tag, ArrowRight,
 Sparkles,
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
 author: { name: string; image: string; bio: string };
 tags: string[];
}

const defaultBlogPosts: BlogPost[] = [
 {
 id: 1, slug: "the-art-of-perfect-pasta-secrets-",
 title: "The Art of Perfect Pasta: Secrets from Italian Grandmothers",
 excerpt: "Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.",
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
 image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=1600",
 date: "2026-06-15", views: 2847, category: "Cooking Tips", readTime: "8 min", featured: true,
 author: { name: "Isabella Romano", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella", bio: "Food writer and Italian specialist with over 15 years of culinary experience across Italy and the Mediterranean." },
 tags: ["Italian", "Pasta", "Traditional"],
 },
 {
 id: 2, slug: "global-street-food",
 title: "Global Street Food: A Journey Through Authentic Flavors",
 excerpt: "From Bangkok's bustling markets to Mexico City's vibrant streets, explore the world through its most beloved street foods.",
 content: `<p>Street food is the raw, unfiltered culinary soul of a culture.</p><h2>Bangkok: Sweet, Spicy & Sour</h2><p>Walking through Yaowarat Road, the aroma of sizzling Pad Thai is intoxicating.</p><h2>Mexico City: Tacos Al Pastor</h2><p>Pork marinated in dried chilies, slowly cooked on a vertical spit.</p>`,
 image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1600",
 date: "2026-06-12", views: 1923, category: "Travel", readTime: "12 min", featured: false,
 author: { name: "Marco Rodriguez", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco", bio: "Traveler and food journalist covering street food cultures across 40+ countries." },
 tags: ["Street Food", "Travel", "Tacos"],
 },
 {
 id: 3, slug: "seasonal-winter-comfort-foods",
 title: "Seasonal Cooking: Winter Comfort Foods That Warm the Soul",
 excerpt: "Embrace the season with hearty stews, roasted vegetables, and warming spices that bring comfort to cold days.",
 content: `<p>When the temperature drops, our kitchens become warm sanctuaries.</p><h2>Root Vegetables: Nature's Winter Sweetness</h2><p>Parsnips, carrots, and sweet potatoes develop deeper, sweeter flavors in winter frost.</p>`,
 image: "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=1600",
 date: "2026-06-10", views: 3156, category: "Seasonal", readTime: "6 min", featured: true,
 author: { name: "Sarah Chen", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", bio: "Head Chef & Blogger, specializing in seasonal farm- cooking." },
 tags: ["Winter", "Comfort", "Stew"],
 },
];

const categoryMeta: Record<string, { color: string; bg: string }> = {
 "Cooking Tips": { color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
 "Travel": { color: "text-sky-700 dark:text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
 "Seasonal": { color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
 "Nutrition": { color: "text-violet-700 dark:text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
 "Trends": { color: "text-rose-700 dark:text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
};

function formatDate(d: string) {
 return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function ReadingProgress() {
 const { scrollYProgress } = useScroll();
 const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
 return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#c05c31] origin-left z-[100] shadow-sm shadow-primary/40" />;
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
 const [subscribed, setSubscribed] = useState(false);

 useEffect(() => {
 setIsMounted(true);
 setLikeCount(Math.floor(Math.random() * 200) + 50);

 const saved = localStorage.getItem("foodiety_blogs");
 let blogList = defaultBlogPosts;
 if (saved) { try { blogList = JSON.parse(saved); } catch {} }

 const slug = params.slug as string;
 let found = blogList.find(p => p.slug?.toLowerCase() === slug?.toLowerCase());
 if (!found && /^\d+$/.test(slug)) found = blogList.find(p => p.id === parseInt(slug));
 if (!found) found = blogList[0];

 if (found) {
 setPost(found);
 const updated = blogList.map(p => p.id === found!.id ? { ...p, views: p.views + 1 } : p);
 localStorage.setItem("foodiety_blogs", JSON.stringify(updated));
 const related = blogList.filter(p => p.id !== found!.id && p.category === found!.category).slice(0, 3);
 setRelatedPosts(related.length > 0 ? related : blogList.filter(p => p.id !== found!.id).slice(0, 3));
 }
 }, [params.slug]);

 const handleShare = () => {
 if (typeof window !== "undefined") {
 navigator.clipboard.writeText(window.location.href);
 toast.success("Link copied to clipboard!");
 }
 };

 if (!isMounted || !post) {
 return (
 <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 pt-20">
 <div className="relative w-16 h-16">
 <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
 <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-accent/30 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
 </div>
 <p className="text-muted-foreground font-medium animate-pulse font-outfit">Loading article...</p>
 </div>
 );
 }

 const catMeta = categoryMeta[post.category] || { color: "text-primary", bg: "bg-primary/10 border-primary/20" };

 return (
 <>
 <ReadingProgress />

 <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
 {/* Ambient glow */}
 <div className="fixed top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[150px] pointer-events-none translate-x-1/3 z-0" />
 <div className="fixed bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-accent/4 blur-[130px] pointer-events-none -translate-x-1/3 z-0" />

 {/* ══════════════════════════════════════
 CINEMATIC HERO BANNER
 ══════════════════════════════════════ */}
 <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
 <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: "easeOut" }} className="absolute inset-0">
 <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
 </motion.div>

 {/* Multi-layer gradients */}
 <div className="absolute inset-0 /92 /55 /10" />
 <div className="absolute inset-0 /50 " />
 {/* Gold shimmer at bottom */}
 <div className="absolute bottom-0 left-0 right-0 h-1 /50 " />

 <div className="relative z-10 w-full pb-10">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

 {/* Back nav */}
 <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
 <Link href="/blogs" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group">
 <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
 All Stories
 </Link>
 </motion.div>

 <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-4">
 {/* Category */}
 <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-widest ${catMeta.bg} ${catMeta.color}`}>
 {post.category}
 </span>

 {/* Title */}
 <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-playfair text-white leading-tight max-w-4xl">
 {post.title}
 </h1>

 {/* Meta row */}
 <div className="flex flex-wrap items-center gap-4 text-white/65 text-xs">
 <div className="flex items-center gap-2">
 <img src={post.author.image} alt={post.author.name} className="w-8 h-8 rounded-full border-2 border-white/25" />
 <span className="font-bold text-white/90">{post.author.name}</span>
 </div>
 <span className="w-px h-3 bg-white/20" />
 <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" />{formatDate(post.date)}</span>
 <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" />{post.readTime} read</span>
 <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5 text-primary" />{(post.views + 1).toLocaleString()} views</span>
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* ══════════════════════════════════════
 ARTICLE BODY
 ══════════════════════════════════════ */}
 <section className="relative z-10 py-14">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

 {/* ── Main Column ── */}
 <div className="lg:col-span-8 space-y-10">

 {/* Lead / Excerpt */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="relative p-6 md:p-8 rounded-2xl border border-primary/20 overflow-hidden"
 >
 <div className="absolute inset-0 bg-primary/4" />
 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c05c31] rounded-l-2xl" />
 <p className="relative text-base md:text-lg text-foreground/80 leading-relaxed italic font-light">
 {post.excerpt}
 </p>
 </motion.div>

 {/* Article Content */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.7, delay: 0.1 }}
 className="blog-prose"
 dangerouslySetInnerHTML={{ __html: post.content }}
 />

 {/* Tags */}
 {post.tags?.length > 0 && (
 <div className="pt-6 border-t border-border/40">
 <div className="flex items-center gap-2 mb-3">
 <Tag className="h-3.5 w-3.5 text-muted-foreground" />
 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Filed under</p>
 </div>
 <div className="flex flex-wrap gap-2">
 {post.tags.map(tag => (
 <span key={tag} className="px-3.5 py-1.5 bg-primary/8 hover:bg-primary/15 text-primary text-xs font-bold rounded-xl border border-primary/15 cursor-pointer transition-colors">
 #{tag}
 </span>
 ))}
 </div>
 </div>
 )}

 {/* ── Author Bio Card ── */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm"
 >
 <div className="h-1.5 bg-[#c05c31]" />
 <div className="p-6 md:p-8">
 <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">

 {/* Avatar */}
 <div className="relative shrink-0">
 <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/25 ring-4 ring-primary/8">
 <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
 </div>
 <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#c05c31] rounded-full flex items-center justify-center shadow-md">
 <User className="h-3.5 w-3.5 text-white" />
 </div>
 </div>

 {/* Info */}
 <div className="flex-1 text-center sm:text-left space-y-2">
 <div>
 <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Written by</p>
 <h4 className="text-xl font-black font-outfit text-foreground">{post.author.name}</h4>
 </div>
 <p className="text-muted-foreground text-sm leading-relaxed">{post.author.bio}</p>
 </div>

 {/* Interaction buttons */}
 <div className="flex gap-2 shrink-0">
 <button
 onClick={() => { setLiked(!liked); setLikeCount(c => liked ? c - 1 : c + 1); toast.success(liked ? "Removed like" : "Post liked!"); }}
 className={`flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-300 ${liked ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/30" : "border-border text-muted-foreground hover:border-red-300 hover:text-red-500"}`}
 >
 <Heart className={`h-4 w-4 ${liked ? "fill-white" : ""}`} />
 <span>{likeCount}</span>
 </button>
 <button
 onClick={() => { setBookmarked(!bookmarked); toast.success(bookmarked ? "Removed bookmark" : "Bookmarked!"); }}
 className={`flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-300 ${bookmarked ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
 >
 <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
 <span>{bookmarked ? "Saved" : "Save"}</span>
 </button>
 <button
 onClick={handleShare}
 className="flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl border border-border text-muted-foreground hover:border-sky-400 hover:text-sky-500 text-xs font-bold transition-all duration-300"
 >
 <Share2 className="h-4 w-4" />
 <span>Share</span>
 </button>
 </div>
 </div>
 </div>
 </motion.div>

 {/* ── Related Posts ── */}
 {relatedPosts.length > 0 && (
 <div className="space-y-5">
 <div className="flex items-center gap-3">
 <h3 className="text-lg font-black font-outfit">More Stories</h3>
 <div className="flex-1 h-px bg-border/40" />
 <Link href="/blogs" className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
 All Articles <ArrowRight className="h-3 w-3" />
 </Link>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {relatedPosts.map(r => (
 <Link href={`/blogs/${r.id}`} key={r.id}>
 <div className="group rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300 overflow-hidden cursor-pointer">
 <div className="h-32 overflow-hidden">
 <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 </div>
 <div className="p-4 space-y-2">
 <p className="text-[9px] font-black text-primary uppercase tracking-widest">{r.category}</p>
 <h4 className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">{r.title}</h4>
 <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
 <Clock className="h-2.5 w-2.5" />{r.readTime} read
 </div>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* ── Sticky Sidebar ── */}
 <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">

 {/* Article Details */}
 <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
 <div className="h-1 bg-[#c05c31]" />
 <div className="p-5 space-y-4">
 <h4 className="text-sm font-black font-outfit text-foreground">Article Details</h4>
 <div className="space-y-3">
 {[
 { icon: Calendar, label: "Published", value: formatDate(post.date) },
 { icon: Clock, label: "Read Time", value: post.readTime + " read" },
 { icon: Eye, label: "Views", value: (post.views + 1).toLocaleString() },
 { icon: Heart, label: "Likes", value: likeCount.toLocaleString() },
 ].map(({ icon: Icon, label, value }) => (
 <div key={label} className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-xs text-muted-foreground">
 <Icon className="h-3.5 w-3.5 text-primary/70" />
 {label}
 </div>
 <span className="text-xs font-bold text-foreground">{value}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Share Buttons */}
 <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
 <div className="h-1 bg-[#c05c31]" />
 <div className="p-5 space-y-3">
 <h4 className="text-sm font-black font-outfit text-foreground">Share This Story</h4>
 <div className="grid grid-cols-2 gap-2">
 {[
 { icon: Link2, label: "Copy Link", color: "hover:bg-primary/10 hover:text-primary hover:border-primary/30", onClick: handleShare },
 { icon: Twitter, label: "Twitter", color: "hover:bg-sky-500/10 hover:text-sky-500 hover:border-sky-500/30", onClick: handleShare },
 { icon: Facebook, label: "Facebook", color: "hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30", onClick: handleShare },
 { icon: Mail, label: "Email", color: "hover:bg-accent/10 hover:text-accent hover:border-accent/30", onClick: handleShare },
 ].map(({ icon: Icon, label, color, onClick }) => (
 <button key={label} onClick={onClick} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border/60 text-muted-foreground text-xs font-semibold transition-all duration-200 ${color}`}>
 <Icon className="h-3.5 w-3.5" />{label}
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* Newsletter */}
 <div className="relative rounded-2xl border border-primary/20 overflow-hidden shadow-sm">
 <div className="absolute inset-0 bg-[#c05c31]/10" />
 <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/15 blur-2xl" />
 <div className="relative p-5 space-y-4">
 <div className="text-[#c05c31] dark:text-[#ebc63c]">
 <Mail className="h-8 w-8" />
 </div>
 <div>
 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-widest text-primary mb-2">
 <Mail className="h-2.5 w-2.5" />Weekly Digest
 </div>
 <h4 className="text-base font-bold font-playfair text-foreground">Join Culinary Feed</h4>
 <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Fresh recipes, chef secrets, and food stories every week.</p>
 </div>
 {!subscribed ? (
 <div className="space-y-2">
 <input
 type="email"
 placeholder="your@email.com"
 value={email}
 onChange={e => setEmail(e.target.value)}
 className="w-full px-3.5 py-2.5 text-xs border border-border/60 bg-background/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c05c31]/30 focus:border-primary transition-all"
 />
 <button
 onClick={() => { if (email) { setSubscribed(true); toast.success("Subscribed successfully!"); } else toast.error("Enter your email first"); }}
 className="w-full bg-[#c05c31] hover:bg-[#a64b25] text-primary-foreground text-xs font-black uppercase tracking-wider py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
 >
 Subscribe Now →
 </button>
 </div>
 ) : (
 <div className="py-3 text-center space-y-1">
 <div className="text-primary flex justify-center">
 <Sparkles className="h-8 w-8" />
 </div>
 <p className="text-xs font-bold text-primary">You're subscribed!</p>
 </div>
 )}
 </div>
 </div>

 {/* Back to blogs */}
 <Button asChild variant="outline" className="w-full rounded-xl border-border/60 hover:bg-primary/5 hover:text-primary hover:border-primary/30 font-bold text-xs uppercase tracking-wider h-11">
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
