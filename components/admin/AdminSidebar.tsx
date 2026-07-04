'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
 LayoutDashboard,
 Users,
 BarChart3,
 Settings,
 ChefHat,
 Menu,
 X,
 BookOpen,
 Utensils,
 Image as ImageIcon,
 Coffee,
 Store,
 Tags,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
 {
 name: 'Dashboard',
 href: '/admin',
 icon: LayoutDashboard,
 },
 {
 name: 'Blog CMS',
 href: '/admin/blogs',
 icon: BookOpen,
 },
 {
 name: 'Site Banners',
 href: '/admin/cms',
 icon: Settings,
 },
 {
 name: 'Services Manager',
 href: '/admin/services',
 icon: Utensils,
 },
 {
 name: 'Gallery Manager',
 href: '/admin/gallery',
 icon: ImageIcon,
 },
 {
 name: 'Recipes Manager',
 href: '/admin/recipes',
 icon: Coffee,
 },
 {
 name: 'Restaurants Manager',
 href: '/admin/restaurants',
 icon: Store,
 },
 {
 name: 'Categories',
 href: '/admin/categories',
 icon: Tags,
 },
];

export function AdminSidebar() {
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const pathname = usePathname();

 return (
 <>
 {/* Mobile menu button */}
 <div className="lg:hidden fixed top-4 left-4 z-50">
 <Button
 variant="outline"
 size="icon"
 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
 className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-800/60 shadow-md text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl"
 >
 {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
 </Button>
 </div>

 {/* Sidebar */}
 <div
 className={cn(
 'fixed inset-y-0 left-0 z-40 w-64 bg-stone-900 dark:bg-stone-950 text-stone-100 border-r border-stone-800/40 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col justify-between',
 isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
 )}
 >
 <div>
 {/* Brand Header */}
 <div className="flex items-center space-x-3 h-20 px-6 border-b border-stone-800/50 bg-stone-950/40">
 <div className="p-2 rounded-xl bg-[#c05c31]/10 border border-[#c05c31]/30 shadow-inner">
 <ChefHat className="h-6 w-6 text-[#c05c31]" />
 </div>
 <div className="flex flex-col">
 <span className="text-sm font-extrabold tracking-wider uppercase font-outfit text-white">Foodiety</span>
 <span className="text-[10px] font-semibold text-[#ebc63c] tracking-widest uppercase opacity-80">Admin Panel</span>
 </div>
 </div>

 {/* Navigation Links */}
 <nav className="mt-8 px-4 space-y-1.5 flex-1">
 {navigation.map((item) => {
 const isActive = pathname === item.href;
 return (
 <Link
 key={item.name}
 href={item.href}
 onClick={() => setIsMobileMenuOpen(false)}
 className={cn(
 'group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 border border-transparent',
 isActive
 ? ' from-[#c05c31]/15 text-[#ebc63c] border-l-4 border-l-[#c05c31] border-r-transparent border-t-transparent border-b-transparent shadow-[inset_1px_0_0_0_rgba(192,92,49,0.3)]'
 : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/30'
 )}
 >
 <item.icon
 className={cn(
 'mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110',
 isActive
 ? 'text-[#ebc63c]'
 : 'text-stone-500 group-hover:text-stone-300'
 )}
 />
 <span className="transition-transform duration-200 group-hover:translate-x-0.5">
 {item.name}
 </span>
 </Link>
 );
 })}
 </nav>
 </div>

 {/* Sidebar Footer info */}
 <div className="p-4 border-t border-stone-800/50 bg-stone-950/20 text-center">
 <p className="text-[10px] text-stone-500 font-medium">Foodiety v0.2.0 • Admin Control</p>
 </div>
 </div>

 {/* Mobile menu overlay */}
 {isMobileMenuOpen && (
 <div
 className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
 onClick={() => setIsMobileMenuOpen(false)}
 />
 )}
 </>
 );
}