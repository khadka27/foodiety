'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const defaultRestaurants = [
  {
    id: 1,
    name: "Bella Notte",
    category: "restaurant",
    cuisine: "Italian",
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    priceRange: "$$$",
    address: "123 Mission Street, San Francisco",
    description: "Authentic Italian dining with handmade pasta and traditional recipes passed down through generations.",
    distance: "0.5 miles",
    reviewsCount: 127,
  },
  {
    id: 2,
    name: "Sakura Sushi",
    category: "restaurant",
    cuisine: "Asian",
    image: "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    priceRange: "$$$$",
    address: "456 Union Square, San Francisco",
    description: "Premium sushi experience with the freshest fish flown in daily from Tokyo's Toyosu Market.",
    distance: "1.2 miles",
    reviewsCount: 42,
  },
  {
    id: 3,
    name: "Taco Libre",
    category: "restaurant",
    cuisine: "Mexican",
    image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6,
    priceRange: "$",
    address: "789 Valencia Street, San Francisco",
    description: "Vibrant Mexican street food with authentic bold flavors and fresh, locally-sourced ingredients.",
    distance: "2.1 miles",
    reviewsCount: 18,
  },
];

export function TopRestaurantsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [restaurants, setRestaurants] = useState<any[]>(defaultRestaurants);

  useEffect(() => {
    const saved = localStorage.getItem("foodiety_restaurants");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          const onlyRestaurants = parsed.filter((e: any) => e.category === "restaurant");
          if (onlyRestaurants.length > 0) {
            setRestaurants(onlyRestaurants.slice(0, 3));
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-16 relative overflow-hidden bg-background border-t border-border/40">
      <div className="absolute inset-0 bg-dots-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-[#c05c31]/5 to-[#ebc63c]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

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
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c05c31]" />
              <span className="text-label text-[#c05c31] dark:text-[#ebc63c]">Top Restaurants</span>
            </div>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-2 leading-tight">
              Top Rated <span className="text-[#c05c31] dark:text-[#ebc63c]">Restaurants</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-lg">
              Explore the best restaurants in town, handpicked by our passionate community of food lovers.
            </p>
          </div>
          <Button asChild variant="outline" className="flex-shrink-0 rounded-full px-6 border-[#c05c31]/20 dark:border-[#ebc63c]/20 text-[#c05c31] dark:text-[#ebc63c] hover:bg-[#c05c31]/5 dark:hover:bg-[#ebc63c]/5 transition-all">
            <Link href="/restaurants" className="flex items-center gap-2">
              All Restaurants
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.map((est: any, index: number) => (
            <motion.div
              key={est.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-3xl overflow-hidden border border-white/20 dark:border-white/5 h-full flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-400">
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={est.image}
                    alt={est.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="rating-badge flex items-center gap-1 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold border border-white/10 shadow-lg">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      {est.rating}
                    </div>
                  </div>

                  {/* Cuisine Badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-[#c05c31] text-white border-none px-2.5 py-1 text-xs font-semibold shadow-md">
                      {est.cuisine}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-[#c05c31] dark:group-hover:text-[#ebc63c] transition-colors font-playfair">
                      {est.name}
                    </h3>
                    <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                      {est.description}
                    </p>

                    <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-1">
                      <MapPin className="h-3.5 w-3.5 text-[#c05c31]/60 dark:text-[#ebc63c]/60 flex-shrink-0" />
                      <span className="truncate">{est.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-4">
                    <span className="text-xs text-muted-foreground">
                      {est.reviewsCount || (est.reviews ? est.reviews.length : 12)} reviews
                    </span>
                    <span className="text-xs font-bold text-[#c05c31] dark:text-[#ebc63c]">
                      {est.priceRange}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
