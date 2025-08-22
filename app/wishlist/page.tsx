"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/hooks/use-wishlist";
import { WishlistButton } from "@/components/WishlistButton";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Heart, Clock, Users, Star, MapPin, ChefHat } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { wishlistItems, isLoading, refetch } = useWishlist();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/signin");
      return;
    }
  }, [session, status, router]);

  if (status === "loading" || isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  if (!session) {
    return null;
  }

  const recipeItems = wishlistItems.filter((item) => item.recipe);
  const restaurantItems = wishlistItems.filter((item) => item.restaurant);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="h-16 w-16 mx-auto mb-6 text-red-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">My Wishlist</h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Your saved recipes and restaurants all in one place. Never lose
              track of the dishes and places you want to try!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <Heart className="h-24 w-24 mx-auto mb-6 text-gray-300" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start exploring our recipes and restaurants to build your
                personal collection of favorites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/recipes">Browse Recipes</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Link href="/restaurants">Find Restaurants</Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {/* Saved Recipes */}
              {recipeItems.length > 0 && (
                <div>
                  <div className="flex items-center space-x-3 mb-8">
                    <ChefHat className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Saved Recipes ({recipeItems.length})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipeItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full">
                          <div className="relative overflow-hidden">
                            <img
                              src={
                                item.recipe?.image ||
                                "https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800"
                              }
                              alt={item.recipe?.title}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4">
                              <WishlistButton
                                type="recipe"
                                id={item.recipe!.id}
                                size="sm"
                              />
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium text-gray-700">
                                4.5
                              </span>
                            </div>
                          </div>

                          <CardContent className="p-6 flex-1 flex flex-col">
                            <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                              {item.recipe?.title}
                            </h3>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>30 min</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Easy
                              </Badge>
                            </div>

                            <Button
                              asChild
                              className="w-full bg-red-600 hover:bg-red-700 mt-auto"
                            >
                              <Link href={`/recipes/${item.recipe?.id}`}>
                                View Recipe
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Restaurants */}
              {restaurantItems.length > 0 && (
                <div>
                  <div className="flex items-center space-x-3 mb-8">
                    <MapPin className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Saved Restaurants ({restaurantItems.length})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {restaurantItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full">
                          <div className="relative overflow-hidden">
                            <img
                              src={
                                item.restaurant?.image ||
                                "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
                              }
                              alt={item.restaurant?.name}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 text-gray-700">
                                Restaurant
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <WishlistButton
                                type="restaurant"
                                id={item.restaurant!.id}
                                size="sm"
                              />
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium text-gray-700">
                                4.2
                              </span>
                            </div>
                          </div>

                          <CardContent className="p-6 flex-1 flex flex-col">
                            <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                              {item.restaurant?.name}
                            </h3>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <Badge className="bg-green-100 text-green-800">
                                $$
                              </Badge>
                            </div>

                            <Button
                              asChild
                              className="w-full bg-red-600 hover:bg-red-700 mt-auto"
                            >
                              <Link
                                href={`/restaurants/${item.restaurant?.id}`}
                              >
                                View Restaurant
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
