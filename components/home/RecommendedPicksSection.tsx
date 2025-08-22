'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Clock, Users } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Mediterranean Grilled Salmon',
    image: 'https://images.pexels.com/photos/3731337/pexels-photo-3731337.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    cookTime: '25 min',
    servings: 4,
    category: 'Seafood',
    description: 'Fresh salmon with Mediterranean herbs and olive oil',
  },
  {
    id: 2,
    title: 'Authentic Italian Carbonara',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    cookTime: '20 min',
    servings: 2,
    category: 'Pasta',
    description: 'Creamy pasta with pancetta and parmesan',
  },
  {
    id: 3,
    title: 'Japanese Ramen Bowl',
    image: 'https://images.pexels.com/photos/1998925/pexels-photo-1998925.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    cookTime: '45 min',
    servings: 2,
    category: 'Asian',
    description: 'Rich tonkotsu broth with fresh noodles',
  },
  {
    id: 4,
    title: 'Mexican Street Tacos',
    image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    cookTime: '15 min',
    servings: 3,
    category: 'Mexican',
    description: 'Authentic street-style tacos with fresh salsa',
  },
  {
    id: 5,
    title: 'French Chocolate Soufflé',
    image: 'https://images.pexels.com/photos/3992205/pexels-photo-3992205.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    cookTime: '35 min',
    servings: 4,
    category: 'Dessert',
    description: 'Light and airy chocolate dessert perfection',
  },
];

export function RecommendedPicksSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  const visibleItems = 3;
  const getVisibleRecommendations = () => {
    const items = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % recommendations.length;
      items.push(recommendations[index]);
    }
    return items;
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Chef's Recommended Picks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked recipes and dishes that our community absolutely loves. 
            Each one is tested, tasted, and guaranteed to impress.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-6">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="hidden md:flex h-12 w-12 rounded-full border-red-200 hover:border-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-600 dark:hover:bg-red-950/30"
            >
              <ChevronLeft className="h-6 w-6 text-red-600" />
            </Button>

            {/* Carousel Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {getVisibleRecommendations().map((item, index) => (
                <motion.div
                  key={`${item.id}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={index === 1 ? 'md:scale-105' : ''}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border border-border shadow-lg overflow-hidden bg-card">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        {item.category}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{item.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.cookTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{item.servings} servings</span>
                        </div>
                      </div>

                      <Button className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
                        View Recipe
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="hidden md:flex h-12 w-12 rounded-full border-red-200 hover:border-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-600 dark:hover:bg-red-950/30"
            >
              <ChevronRight className="h-6 w-6 text-red-600" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center mt-6 space-x-4">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-red-600 scale-110' : 'bg-muted hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}