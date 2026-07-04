"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Users, Star, Heart, Bookmark } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

const cookingTimes = [
  "Any Time",
  "Under 15 min",
  "15-30 min",
  "30-60 min",
  "Over 1 hour",
];
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const defaultRecipes = [
  {
    id: 1,
    title: "Homemade Pizza Margherita",
    image:
      "https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "Beginner",
    cookTime: "30 min",
    servings: 4,
    rating: 4.9,
    cuisine: "Italian",
    tags: ["Vegetarian", "Quick", "Family-Friendly"],
    description:
      "Classic Italian pizza with fresh tomatoes, mozzarella, and basil",
    calories: 285,
  },
  {
    id: 2,
    title: "Thai Green Curry",
    image:
      "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "Intermediate",
    cookTime: "45 min",
    servings: 3,
    rating: 4.8,
    cuisine: "Thai",
    tags: ["Spicy", "Coconut", "Gluten-Free"],
    description:
      "Aromatic and creamy Thai curry with fresh herbs and vegetables",
    calories: 342,
  },
  {
    id: 3,
    title: "Classic Beef Burger",
    image:
      "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "Beginner",
    cookTime: "20 min",
    servings: 2,
    rating: 4.7,
    cuisine: "American",
    tags: ["Grilled", "Comfort Food", "Weekend"],
    description: "Juicy beef patty with fresh toppings on a toasted bun",
    calories: 456,
  },
  {
    id: 4,
    title: "French Croissants",
    image:
      "https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "Advanced",
    cookTime: "4 hours",
    servings: 8,
    rating: 4.9,
    cuisine: "French",
    tags: ["Pastry", "Breakfast", "Weekend Project"],
    description:
      "Buttery, flaky croissants made from scratch with traditional techniques",
    calories: 231,
  },
  {
    id: 5,
    title: "Mediterranean Salmon",
    image:
      "https://images.pexels.com/photos/3731337/pexels-photo-3731337.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "Intermediate",
    cookTime: "25 min",
    servings: 4,
    rating: 4.8,
    cuisine: "Mediterranean",
    tags: ["Healthy", "Omega-3", "Quick"],
    description: "Fresh salmon with Mediterranean herbs and olive oil",
    calories: 312,
  },
  {
    id: 6,
    title: "Indian Butter Chicken",
    image:
      "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "Intermediate",
    cookTime: "1 hour",
    servings: 4,
    rating: 4.9,
    cuisine: "Indian",
    tags: ["Creamy", "Spiced", "Traditional"],
    description: "Rich and creamy tomato-based curry with tender chicken",
    calories: 398,
  },
];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>(defaultRecipes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
  const [selectedTime, setSelectedTime] = useState("Any Time");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [isMounted, setIsMounted] = useState(false);
  const [banner, setBanner] = useState({
    title: "Recipe Collection",
    subtitle: "Discover amazing recipes from around the world. Filter by cuisine, cooking time, and difficulty to find the perfect dish for any occasion."
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setIsMounted(true);
    fetch("/api/recipes")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data && res.data.length > 0) {
          setRecipes(res.data);
        }
      })
      .catch(err => console.error(err));

    fetch("/api/config")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data && res.data.recipesPage) {
          setBanner({
            title: res.data.recipesPage.bannerTitle || "Recipe Collection",
            subtitle: res.data.recipesPage.bannerSubtitle || "Discover amazing recipes from around the world. Filter by cuisine, cooking time, and difficulty to find the perfect dish for any occasion."
          });
        }
      })
      .catch(err => console.error(err));

    fetch("/api/categories?type=RECIPE")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setCategories(res.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const cuisineTypes = [
    "All Cuisines",
    ...Array.from(new Set(recipes.map((r: any) => r.cuisine))).filter(Boolean),
  ];

  const filteredRecipes = recipes.filter((recipe: any) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCuisine =
      selectedCuisine === "All Cuisines" || recipe.cuisine === selectedCuisine;
    const matchesDifficulty =
      selectedDifficulty === "All Levels" ||
      recipe.difficulty === selectedDifficulty;
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;

    let matchesTime = true;
    if (selectedTime !== "Any Time") {
      const cookTimeMinutes = parseInt(recipe.cookTime);
      switch (selectedTime) {
        case "Under 15 min":
          matchesTime = cookTimeMinutes < 15;
          break;
        case "15-30 min":
          matchesTime = cookTimeMinutes >= 15 && cookTimeMinutes <= 30;
          break;
        case "30-60 min":
          matchesTime = cookTimeMinutes > 30 && cookTimeMinutes <= 60;
          break;
        case "Over 1 hour":
          matchesTime = cookTimeMinutes > 60;
          break;
      }
    }

    return matchesSearch && matchesCuisine && matchesDifficulty && matchesTime && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Intermediate":
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Prevent SSR context issues
  if (!isMounted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')] bg-cover bg-center bg-no-repeat transition-colors duration-500 overflow-hidden">
        {/* Texture noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-stone-900 dark:text-white mb-6 leading-tight">
              {banner.title}
            </h1>
            <p className="text-lg text-stone-700 dark:text-stone-200 max-w-2xl mx-auto leading-relaxed">
              {banner.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <Input
                type="text"
                placeholder="Search recipes, ingredients, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-full border-gray-200 focus-visible:ring-[#c05c31]/30 focus-visible:border-[#c05c31]"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Select
                value={selectedCuisine}
                onValueChange={setSelectedCuisine}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Cuisine Type" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineTypes.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Cooking Time" />
                </SelectTrigger>
                <SelectContent>
                  {cookingTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-200 ${
                  selectedCategory === "All"
                    ? "bg-[#c05c31] text-white border-[#c05c31] shadow-md shadow-orange-500/10"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                All categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-200 ${
                    selectedCategory === cat.slug
                      ? "bg-[#c05c31] text-white border-[#c05c31] shadow-md shadow-orange-500/10"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Showing {filteredRecipes.length} of {recipes.length} recipes
            </p>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe: any, index: number) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full">
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
                    <div className="absolute top-4 right-4 flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-background/90 hover:bg-background text-foreground rounded-full p-2"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-background/90 hover:bg-background text-foreground rounded-full p-2"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-foreground">
                        {recipe.rating}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-[#c05c31] transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {recipe.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.cookTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{recipe.servings}</span>
                        </div>
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        {recipe.calories} cal
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {recipe.tags.slice(0, 2).map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      asChild
                      className="w-full bg-[#c05c31] hover:bg-[#a64b25] text-white"
                    >
                      <Link href={`/recipes/${recipe.id}`}>View Recipe</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {filteredRecipes.length > 0 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-[#c05c31]/20 dark:border-[#c05c31]/30 text-[#c05c31] dark:text-[#ebc63c] hover:bg-[#c05c31]/5 dark:hover:bg-[#ebc63c]/5 px-8 py-3 rounded-full"
              >
                Load More Recipes
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
