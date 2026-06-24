'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, ChevronLeft, ChevronRight, MapPin, ArrowRight, Flame } from 'lucide-react';
import Link from 'next/link';

const defaultRecommendations = [
  {
    id: 1,
    title: 'Mediterranean Grilled Salmon',
    image: 'https://images.pexels.com/photos/3731337/pexels-photo-3731337.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 2847,
    cookTime: '25 min',
    servings: 4,
    cuisine: 'Seafood',
    description: 'Fresh salmon with Mediterranean herbs and extra virgin olive oil',
    calories: 380,
    isHot: true,
    chef: 'Chef Marco',
    location: 'Florence, Italy',
  },
  {
    id: 2,
    title: 'Authentic Italian Carbonara',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 1923,
    cookTime: '20 min',
    servings: 2,
    cuisine: 'Pasta',
    description: 'Silky pasta with guanciale, pecorino, and farm-fresh eggs',
    calories: 620,
    chef: 'Chef Sofia',
    location: 'Rome, Italy',
  },
  {
    id: 3,
    title: 'Japanese Tonkotsu Ramen',
    image: 'https://images.pexels.com/photos/1998925/pexels-photo-1998925.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 3156,
    cookTime: '45 min',
    servings: 2,
    cuisine: 'Asian',
    description: 'Rich 12-hour pork bone broth with fresh ramen noodles',
    calories: 710,
    isHot: true,
    chef: 'Chef Hiroshi',
    location: 'Tokyo, Japan',
  },
  {
    id: 4,
    title: 'Mexican Street Tacos',
    image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 1456,
    cookTime: '15 min',
    servings: 3,
    cuisine: 'Mexican',
    description: 'Authentic al pastor with charred pineapple and fresh salsa',
    calories: 310,
    chef: 'Chef Carlos',
    location: 'Mexico City',
  },
  {
    id: 5,
    title: 'French Chocolate Soufflé',
    image: 'https://images.pexels.com/photos/3992205/pexels-photo-3992205.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 987,
    cookTime: '35 min',
    servings: 4,
    cuisine: 'Dessert',
    description: 'Airy, light-as-cloud chocolate dessert with crème anglaise',
    calories: 420,
    chef: 'Chef Pierre',
    location: 'Paris, France',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 transition-colors ${
            star <= Math.round(rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm font-bold text-foreground">{rating}</span>
    </div>
  );
}

export function RecommendedPicksSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [recommendations, setRecommendations] = useState<any[]>(defaultRecommendations);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("foodiety_recipes");
    if (savedRecipes) {
      try {
        const parsed = JSON.parse(savedRecipes);
        if (parsed && parsed.length > 0) {
          setRecommendations(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(recommendations.map((r: any) => r.cuisine || r.category || 'Other'))).filter(Boolean)];

  const filtered = activeCategory === 'All'
    ? recommendations
    : recommendations.filter((r: any) => (r.cuisine || r.category) === activeCategory);

  const visibleCount = 3;
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < Math.min(visibleCount, filtered.length); i++) {
      items.push(filtered[(currentIndex + i) % filtered.length]);
    }
    return items;
  };

  const next = () => setCurrentIndex(p => (p + 1) % filtered.length);
  const prev = () => setCurrentIndex(p => (p - 1 + filtered.length) % filtered.length);

  return (
    <section ref={ref} className="py-12 md:py-16 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-orange-500/6 to-red-500/6 rounded-full blur-[120px] -z-10 animate-blob pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500" />
            <span className="text-label text-orange-500">Chef's Selection</span>
            <div className="h-px w-12 bg-gradient-to-r from-orange-500 to-transparent" />
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            Recommended <span className="text-[#c05c31] dark:text-[#ebc63c]">Picks</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Handpicked dishes that our community absolutely loves — tested, tasted, and guaranteed to impress.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-2 justify-center flex-wrap mb-10"
        >
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentIndex(0); }}
              className={`category-tab ${activeCategory === cat ? 'active' : 'border border-border text-muted-foreground'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center gap-4">
            {/* Prev Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="hidden md:flex w-11 h-11 rounded-full glass-card border border-orange-200/40 dark:border-orange-800/20 items-center justify-center flex-shrink-0 hover:border-orange-400/60 hover:shadow-lg transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-orange-500" />
            </motion.button>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
              <AnimatePresence mode="popLayout">
                {getVisible().map((item: any, index: number) => {
                  if (!item) return null;
                  const chef = item.chef || 'Chef Sarah';
                  const location = item.location || 'Foodiety Kitchen';
                  const reviews = item.reviews || (((item.id || 0) * 23) % 1500 + 120);
                  const tagsLower = (item.tags || []).map((t: string) => t.toLowerCase());
                  const isHot = item.isHot || tagsLower.some((t: string) => t.includes('spicy') || t.includes('chili') || t.includes('hot'));
                  const category = item.cuisine || item.category || 'Other';

                  return (
                    <motion.div
                      key={`${item.id}-${currentIndex}-${activeCategory}`}
                      initial={{ opacity: 0, scale: 0.92, y: 15 }}
                      animate={{
                        opacity: 1,
                        scale: index === 1 ? 1.03 : 1,
                        y: 0,
                      }}
                      exit={{ opacity: 0, scale: 0.92, y: -15 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="group"
                    >
                      <div className={`glass-card rounded-3xl overflow-hidden border border-white/20 dark:border-white/5 h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-400 ${index === 1 ? 'ring-2 ring-orange-400/30' : ''}`}>
                        {/* Image */}
                        <div className="relative overflow-hidden h-52">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                          {/* Badges overlay */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-gray-700">
                              {category}
                            </span>
                            {isHot && (
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center gap-1">
                                <Flame className="h-3 w-3" /> Hot
                              </span>
                            )}
                          </div>

                          {/* Calories badge */}
                          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-sm text-white">
                            {item.calories} kcal
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          {/* Chef & Location */}
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3 text-orange-400" />
                            <span>{chef} · {location}</span>
                          </div>

                          <h3 className="font-bold text-base text-foreground mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                            {item.title}
                          </h3>

                          <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Star Rating */}
                          <div className="flex items-center justify-between mb-3">
                            <StarRating rating={item.rating} />
                            <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
                          </div>

                          {/* Meta */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-orange-400" />
                              <span>{item.cookTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-orange-400" />
                              <span>{item.servings} servings</span>
                            </div>
                          </div>

                          {/* Button */}
                          <Button className="w-full btn-premium text-sm py-2.5 rounded-xl">
                            <Link href={`/recipes/${item.id}`} className="flex items-center justify-center gap-2">
                              View Recipe
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="hidden md:flex w-11 h-11 rounded-full glass-card border border-orange-200/40 dark:border-orange-800/20 items-center justify-center flex-shrink-0 hover:border-orange-400/60 hover:shadow-lg transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5 text-orange-500" />
            </motion.button>
          </div>

          {/* Mobile Nav Buttons */}
          <div className="flex md:hidden justify-center gap-3 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full glass-card border border-orange-200/40 flex items-center justify-center">
              <ChevronLeft className="h-4 w-4 text-orange-500" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full glass-card border border-orange-200/40 flex items-center justify-center">
              <ChevronRight className="h-4 w-4 text-orange-500" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex % filtered.length
                    ? 'w-6 h-2.5 bg-gradient-to-r from-orange-500 to-red-500'
                    : 'w-2.5 h-2.5 bg-muted hover:bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}