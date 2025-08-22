'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const featuredRecipes = [
  {
    id: 1,
    title: 'Homemade Pizza Margherita',
    image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    cookTime: '30 min',
    servings: 4,
    rating: 4.9,
    tags: ['Italian', 'Vegetarian', 'Quick'],
  },
  {
    id: 2,
    title: 'Thai Green Curry',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Medium',
    cookTime: '45 min',
    servings: 3,
    rating: 4.8,
    tags: ['Thai', 'Spicy', 'Coconut'],
  },
  {
    id: 3,
    title: 'Classic Beef Burger',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Easy',
    cookTime: '20 min',
    servings: 2,
    rating: 4.7,
    tags: ['American', 'Grilled', 'Comfort Food'],
  },
  {
    id: 4,
    title: 'French Croissants',
    image: 'https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Hard',
    cookTime: '4 hours',
    servings: 8,
    rating: 4.9,
    tags: ['French', 'Pastry', 'Breakfast'],
  },
];

export function RecipePreviewSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Recipes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Master these crowd-favorite recipes that our community can't stop making. 
              From simple weeknight dinners to impressive weekend projects.
            </p>
          </div>
          <Button asChild className="mt-6 md:mt-0 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
            <Link href="/recipes" className="flex items-center space-x-2">
              <span>Browse All Recipes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border border-border shadow-lg overflow-hidden h-full bg-card">
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getDifficultyColor(recipe.difficulty)}>
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{recipe.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {recipe.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {recipe.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 mt-auto">
                    <Link href={`/recipes/${recipe.id}`}>
                      View Recipe
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}