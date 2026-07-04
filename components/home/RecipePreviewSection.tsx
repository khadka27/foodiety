'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ArrowRight, Flame, Leaf, ChefHat } from 'lucide-react';
import Link from 'next/link';

const defaultRecipes = [
 {
 id: 1,
 title: 'Homemade Pizza Margherita',
 image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800',
 difficulty: 'Easy',
 cookTime: '30 min',
 servings: 4,
 rating: 4.9,
 tags: ['Italian', 'Vegetarian'],
 calories: 450,
 },
 {
 id: 2,
 title: 'Thai Green Curry',
 image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
 difficulty: 'Medium',
 cookTime: '45 min',
 servings: 3,
 rating: 4.8,
 tags: ['Thai', 'Spicy'],
 calories: 580,
 },
 {
 id: 3,
 title: 'Classic Beef Burger',
 image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
 difficulty: 'Easy',
 cookTime: '20 min',
 servings: 2,
 rating: 4.7,
 tags: ['American', 'Grilled'],
 calories: 720,
 },
 {
 id: 4,
 title: 'French Croissants',
 image: 'https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg?auto=compress&cs=tinysrgb&w=800',
 difficulty: 'Hard',
 cookTime: '4 hours',
 servings: 8,
 rating: 4.9,
 tags: ['French', 'Pastry'],
 calories: 340,
 },
];

const difficultyConfig = {
 Easy: { classes: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', dot: 'bg-green-500' },
 Beginner: { classes: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', dot: 'bg-green-500' },
 Medium: { classes: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
 Intermediate: { classes: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
 Hard: { classes: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300', dot: 'bg-red-500' },
 Advanced: { classes: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300', dot: 'bg-red-500' },
};

export function RecipePreviewSection() {
 const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
 const [recipes, setRecipes] = useState<any[]>(defaultRecipes);

 useEffect(() => {
 fetch("/api/recipes")
 .then(res => res.json())
 .then(res => {
 if (res.success && res.data && res.data.length > 0) {
 setRecipes(res.data);
 }
 })
 .catch(err => console.error(err));
 }, []);

 const featuredRecipes = recipes.slice(0, 4);

 return (
 <section ref={ref} className="py-12 md:py-16 relative overflow-hidden bg-background">
 <div className="absolute inset-0 bg-dots-pattern opacity-50 pointer-events-none" />
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] /5 /5 rounded-full blur-[100px] -z-10 pointer-events-none" />

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
 <span className="text-label text-orange-500">Top Recipes</span>
 </div>
 <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-2 leading-tight">
 Featured <span className="text-[#c05c31] dark:text-[#ebc63c]">Recipes</span>
 </h2>
 <p className="text-base text-muted-foreground max-w-lg">
 Master these crowd-favorite recipes that our community can't stop making.
 </p>
 </div>
 <Button asChild variant="outline" className="flex-shrink-0 rounded-full px-6 border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:border-orange-400 transition-[background-color,border-color,color]">
 <Link href="/recipes" className="flex items-center gap-2">
 All Recipes
 <ArrowRight className="h-4 w-4" />
 </Link>
 </Button>
 </motion.div>

 {/* Recipe Cards Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
 {featuredRecipes.map((recipe: any, index: number) => {
 const difficultyKey = (recipe.difficulty || 'Easy') as keyof typeof difficultyConfig;
 const diff = difficultyConfig[difficultyKey] || difficultyConfig.Easy;
 const tagsLower = (recipe.tags || []).map((t: string) => t.toLowerCase());
 const isVegetarian = tagsLower.some((t: string) => t.includes('vegetarian') || t.includes('vegan') || t.includes('veg'));
 const isHot = tagsLower.some((t: string) => t.includes('spicy') || t.includes('chili') || t.includes('hot'));

 return (
 <motion.div
 key={recipe.id}
 initial={{ opacity: 0, y: 40 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: index * 0.1 }}
 className="group transition-[box-shadow] duration-300 hover:shadow-lg"
 >
 <div className="glass-card rounded-3xl overflow-hidden border border-white/20 dark:border-white/5 h-full flex flex-col transition-shadow duration-300 hover:shadow-lg">
 {/* Image */}
 <div className="relative overflow-hidden h-48">
 <img
 src={recipe.image}
 alt={recipe.title}
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 /40 " />

 {/* Difficulty Badge */}
 <div className="absolute top-3 left-3">
 <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm ${diff.classes}`}>
 <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
 {recipe.difficulty}
 </span>
 </div>

 {/* Rating Badge */}
 <div className="absolute top-3 right-3">
 <div className="rating-badge">
 <Star className="h-3 w-3 fill-current" />
 {recipe.rating}
 </div>
 </div>

 {/* Dietary icons overlay */}
 <div className="absolute bottom-3 left-3 flex gap-1.5">
 {isVegetarian && (
 <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" title="Vegetarian">
 <Leaf className="h-3 w-3 text-white" />
 </span>
 )}
 {isHot && (
 <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center" title="Spicy">
 <Flame className="h-3 w-3 text-white" />
 </span>
 )}
 </div>
 </div>

 {/* Content */}
 <div className="p-4 flex flex-col flex-1">
 <h3 className="font-bold text-sm text-foreground mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
 {recipe.title}
 </h3>

 {/* Meta row */}
 <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
 <span className="flex items-center gap-1">
 <Clock className="h-3.5 w-3.5 text-orange-400" />
 {recipe.cookTime}
 </span>
 <span className="flex items-center gap-1">
 <Users className="h-3.5 w-3.5 text-orange-400" />
 {recipe.servings}
 </span>
 <span className="ml-auto text-orange-500 font-semibold">{recipe.calories} kcal</span>
 </div>

 {/* Tags */}
 <div className="flex flex-wrap gap-1.5 mb-4">
 {recipe.tags.map((tag: string) => (
 <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-200/40 dark:border-orange-800/20">
 {tag}
 </span>
 ))}
 </div>

 {/* CTA */}
 <Link
 href={`/recipes/${recipe.id}`}
 className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-[background-color,box-shadow] duration-300 text-white bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2"
 >
 <ChefHat className="h-3.5 w-3.5" />
 Cook Now
 </Link>
 </div>
 </div>
 </motion.div>
 );
 })}
 </div>

 {/* Bottom promo strip */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.5 }}
 className="mt-12 glass-card rounded-3xl p-6 md:p-8 border border-orange-200/30 dark:border-orange-800/20 flex flex-col md:flex-row items-center justify-between gap-6"
 >
 <div className="text-center md:text-left">
 <h3 className="text-xl font-bold text-foreground mb-1 flex items-center justify-center md:justify-start gap-2">
 <ChefHat className="h-5 w-5 text-[#c05c31] dark:text-[#ebc63c]" />
 Ready to cook something amazing?
 </h3>
 <p className="text-muted-foreground text-sm">
 Browse our library of 10,000+ recipes from cuisines around the world.
 </p>
 </div>
 <Button asChild className="px-8 py-3 flex-shrink-0 rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/25 transition-[background-color,box-shadow,color] duration-200 hover:bg-orange-600 hover:shadow-orange-500/35">
 <Link href="/recipes" className="flex items-center gap-2">
 Browse All Recipes
 <ArrowRight className="h-4 w-4" />
 </Link>
 </Button>
 </motion.div>
 </div>
 </section>
 );
}