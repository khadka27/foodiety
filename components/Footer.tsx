'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChefHat, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FooterLink {
 name: string;
 href: string;
 badge?: string;
}

const footerLinks: Record<string, FooterLink[]> = {
 explore: [
 { name: 'Restaurants', href: '/restaurants' },
 { name: 'Cafés', href: '/restaurants?type=cafe' },
 { name: 'Hotel Dining', href: '/restaurants?type=hotel' },
 { name: 'Food Gallery', href: '/gallery' },
 ],
 content: [
 { name: 'Recipes', href: '/recipes' },
 { name: 'Food Blogs', href: '/blogs' },
 { name: 'Food Reviews', href: '/blogs?cat=reviews' },
 { name: 'Foodiety AI', href: '/ai', badge: 'New' },
 ],
 company: [
 { name: 'About Us', href: '/about' },
 { name: 'Our Services', href: '/services' },
 { name: 'Contact', href: '/contact' },
 { name: 'Careers', href: '/careers' },
 ],
};

const socialLinks = [
 { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30' },
 { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30' },
 { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30' },
 { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30' },
];

export function Footer() {
 const pathname = usePathname();
 const [email, setEmail] = useState('');
 const [subscribed, setSubscribed] = useState(false);

 if (pathname?.startsWith('/admin')) {
 return null;
 }

 const handleSubscribe = (e: React.FormEvent) => {
 e.preventDefault();
 if (email) { setSubscribed(true); setEmail(''); }
 };

 return (
 <footer className="relative bg-background border-t border-border/60 overflow-hidden mt-0">
 {/* Decorative background */}
 <div className="absolute top-0 left-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -z-0" />
 <div className="absolute top-0 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-[100px] pointer-events-none -z-0" />

 {/* Newsletter Banner */}
 <div className="relative z-10 border-b border-border/60 /60 /40 dark:/20 dark:/10">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
 <div className="text-center md:text-left">
 <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
 <Sparkles className="h-4 w-4 text-orange-500" />
 <span className="text-label text-orange-500">Newsletter</span>
 </div>
 <h3 className="text-xl font-bold text-foreground mb-1">Get weekly food inspiration</h3>
 <p className="text-sm text-muted-foreground">Join 50K+ food lovers. New recipes, reviews & deals every week.</p>
 </div>
 <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2 max-w-sm">
 {subscribed ? (
 <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/30 text-green-600 text-sm font-medium w-full justify-center">
 <Heart className="h-4 w-4 fill-current" />
 You're subscribed!
 </div>
 ) : (
 <>
 <input
 type="email"
 value={email}
 onChange={e => setEmail(e.target.value)}
 placeholder="Your email address"
 required
 className="flex-1 px-4 py-2.5 rounded-full text-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
 />
 <button
 type="submit"
 className="btn-premium px-5 py-2.5 text-sm flex items-center gap-1.5 flex-shrink-0"
 >
 Subscribe
 <ArrowRight className="h-3.5 w-3.5" />
 </button>
 </>
 )}
 </form>
 </div>
 </div>
 </div>

 {/* Main Footer Grid */}
 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

 {/* Brand Column */}
 <div className="sm:col-span-2 lg:col-span-2">
 <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
 <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
 <ChefHat className="h-5 w-5 text-white" />
 </div>
 <div>
 <div className="text-xl font-black text-foreground group-hover:text-orange-500 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
 Foodiety
 </div>
 <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-orange-500">Taste & Discover</div>
 </div>
 </Link>

 <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
 Your ultimate destination for restaurant reviews, café discoveries, hotel dining, 
 authentic recipes, and culinary inspiration. Join our community of food lovers.
 </p>

 {/* Contact Info */}
 <div className="space-y-2.5 mb-7">
 {[
 { icon: Mail, text: 'hello@foodiety.com' },
 { icon: Phone, text: '+1 (555) 123-4567' },
 { icon: MapPin, text: 'San Francisco, CA' },
 ].map(({ icon: Icon, text }) => (
 <div key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
 <div className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 dark:group-hover:bg-orange-950/50 transition-colors">
 <Icon className="h-3.5 w-3.5 text-orange-500" />
 </div>
 <span>{text}</span>
 </div>
 ))}
 </div>

 {/* Social Links */}
 <div className="flex gap-2">
 {socialLinks.map((social) => (
 <motion.a
 key={social.name}
 href={social.href}
 target="_blank"
 rel="noopener noreferrer"
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className={`w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground transition-all duration-200 ${social.color}`}
 aria-label={social.name}
 >
 <social.icon className="h-4 w-4" />
 </motion.a>
 ))}
 </div>
 </div>

 {/* Link Columns */}
 {[
 { title: 'Explore', links: footerLinks.explore },
 { title: 'Content', links: footerLinks.content },
 { title: 'Company', links: footerLinks.company },
 ].map(({ title, links }) => (
 <div key={title}>
 <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">{title}</h4>
 <ul className="space-y-2.5">
 {links.map((link) => (
 <li key={link.name}>
 <Link
 href={link.href}
 className="text-sm text-muted-foreground hover:text-orange-500 transition-colors duration-200 flex items-center gap-1 group"
 >
 <span className="w-0 group-hover:w-3 h-px bg-orange-500 transition-all duration-200 overflow-hidden" />
 {link.name}
 {link.badge && (
 <span className="ml-1 px-1.5 py-0.5 text-[8px] font-bold text-white rounded-full uppercase tracking-wide">
 {link.badge}
 </span>
 )}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </div>

 {/* Bottom Bar */}
 <div className="relative z-10 border-t border-border/60 bg-muted/30">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
 <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
 <p className="text-xs text-muted-foreground flex items-center gap-1.5">
 © 2025 Foodiety. Made with
 <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" />
 by the Foodiety Team.
 </p>
 <div className="flex items-center gap-4">
 {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
 <Link
 key={item}
 href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
 className="text-xs text-muted-foreground hover:text-orange-500 transition-colors"
 >
 {item}
 </Link>
 ))}
 </div>
 </div>
 </div>
 </div>
 </footer>
 );
}