'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, ArrowRight, BookOpen, Share2, Tag, Star } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
 {
 id: 1,
 title: 'The Art of Perfect Pasta: Secrets from Italian Grandmothers',
 excerpt: 'Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of culinary mastery.',
 image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
 date: '2024-12-15',
 views: 2847,
 category: 'Cooking Tips',
 readTime: '8 min',
 featured: true,
 },
 {
 id: 2,
 title: 'Global Street Food: A Journey Through Authentic Flavors',
 excerpt: "From Bangkok's bustling markets to Mexico City's vibrant streets, explore the world through its most beloved street foods.",
 image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
 date: '2024-12-12',
 views: 1923,
 category: 'Travel',
 readTime: '12 min',
 },
 {
 id: 3,
 title: 'Seasonal Cooking: Winter Comfort Foods That Warm the Soul',
 excerpt: 'Embrace the season with hearty stews, roasted vegetables, and warming spices that bring comfort to cold days.',
 image: 'https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800',
 date: '2024-12-10',
 views: 3156,
 category: 'Seasonal',
 readTime: '6 min',
 },
];

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
 'Cooking Tips': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500' },
 'Travel': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
 'Seasonal': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
};

export function BlogPreviewSection() {
 const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

 return (
 <section ref={ref} className="py-12 md:py-16 relative overflow-hidden bg-background">
 <div className="absolute top-0 right-1/4 w-80 h-80 bg-red-500/6 rounded-full blur-[100px] pointer-events-none" />
 <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/6 rounded-full blur-[100px] pointer-events-none" />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.7 }}
 className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12"
 >
 <div>
 <div className="flex items-center gap-3 mb-3">
 <div className="h-px w-10 " />
 <span className="text-label text-orange-500">Food Stories</span>
 </div>
 <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-2 leading-tight">
 Latest <span className="text-[#c05c31] dark:text-[#ebc63c]">Articles</span>
 </h2>
 <p className="text-base text-muted-foreground max-w-lg">
 Dive into food stories, cooking tips, and culinary adventures from around the world.
 </p>
 </div>
 <Button asChild variant="outline" className="flex-shrink-0 rounded-full px-6 border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:border-orange-400 transition-[background-color,border-color,color]">
 <Link href="/blogs" className="flex items-center gap-2">
 All Articles
		<ArrowRight className="h-4 w-4 transition-colors" />
 </Link>
 </Button>
 </motion.div>

 {/* Blog Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {blogPosts.map((post, index) => {
 const catStyle = categoryColors[post.category] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
 const isFeatured = post.featured;

 return (
 <motion.div
 key={post.id}
 initial={{ opacity: 0, y: 40 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: index * 0.12 }}
 className={`group transition-[box-shadow] duration-300 ${isFeatured ? 'md:col-span-1' : ''}`}
 >
 <article className="glass-card rounded-3xl overflow-hidden border border-white/20 dark:border-white/5 h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
 {/* Image */}
 <div className="relative overflow-hidden h-52">
 <img
 src={post.image}
 alt={post.title}
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 /40 " />

 {/* Category + Read Time badges */}
 <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
 <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${catStyle.bg} ${catStyle.text} backdrop-blur-sm flex items-center gap-1.5`}>
 <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
 {post.category}
 </span>
 <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-700 flex items-center gap-1">
 <BookOpen className="h-3 w-3" />
 {post.readTime}
 </span>
 </div>

 {isFeatured && (
 <div className="absolute bottom-3 left-3">
 <span className="px-2.5 py-1 rounded-full text-xs font-bold from-[#c05c31] to-[#e87a43] text-white flex items-center gap-1">
 <Star className="h-3 w-3 fill-current" /> Featured
 </span>
 </div>
 )}
 </div>

 {/* Content */}
 <div className="p-5 flex flex-col flex-1">
 {/* Date & Views */}
 <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
 <span className="flex items-center gap-1">
 <Calendar className="h-3 w-3 text-orange-400" />
 {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
 </span>
 <span className="flex items-center gap-1">
 <Eye className="h-3 w-3 text-orange-400" />
 {post.views.toLocaleString()}
 </span>
 </div>

 <h3 className="font-bold text-base text-foreground mb-2.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
 {post.title}
 </h3>

 <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
 {post.excerpt}
 </p>

 {/* Footer */}
 <div className="flex items-center justify-between pt-3 border-t border-border/60">
 <Link
 href={`/blogs/${post.id}`}
 className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1.5 group/link"
 >
 Read Article
		<ArrowRight className="h-3.5 w-3.5 transition-colors" />
 </Link>
 <button className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-orange-500 hover:border-orange-300 border border-border transition-[background-color,border-color,color]">
 <Share2 className="h-3.5 w-3.5" />
 </button>
 </div>
 </div>
 </article>
 </motion.div>
 );
 })}
 </div>

 {/* Bottom CTA */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.5 }}
 className="text-center mt-12"
 >
 <p className="text-muted-foreground text-sm mb-4">Discover hundreds of food stories & expert guides</p>
 <Button asChild className="px-8 py-3 rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/25 transition-[background-color,box-shadow,color] duration-200 hover:bg-orange-600 hover:shadow-orange-500/35">
 <Link href="/blogs" className="flex items-center gap-2">
 Explore All Blogs
 <ArrowRight className="h-4 w-4" />
 </Link>
 </Button>
 </motion.div>
 </div>
 </section>
 );
}