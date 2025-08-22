'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, Star, Phone, ExternalLink, Heart } from 'lucide-react';

const cuisineTypes = ['All Cuisines', 'Italian', 'Asian', 'Mexican', 'American', 'French', 'Mediterranean', 'Indian', 'Thai'];
const priceRanges = ['All Prices', '$', '$$', '$$$', '$$$$'];

const restaurants = [
  {
    id: 1,
    name: 'Bella Notte',
    cuisine: 'Italian',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    priceRange: '$$$',
    address: '123 Mission Street, San Francisco',
    phone: '+1 (555) 123-4567',
    hours: 'Mon-Sun: 5:00 PM - 10:00 PM',
    specialties: ['Handmade Pasta', 'Wood-Fired Pizza', 'Italian Wines'],
    description: 'Authentic Italian dining with handmade pasta and traditional recipes passed down through generations.',
    distance: '0.5 miles',
  },
  {
    id: 2,
    name: 'Sakura Sushi',
    cuisine: 'Asian',
    image: 'https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    priceRange: '$$$$',
    address: '456 Union Square, San Francisco',
    phone: '+1 (555) 234-5678',
    hours: 'Tue-Sat: 6:00 PM - 11:00 PM',
    specialties: ['Omakase', 'Fresh Sashimi', 'Sake Selection'],
    description: 'Premium sushi experience with the freshest fish flown in daily from Japan.',
    distance: '1.2 miles',
  },
  {
    id: 3,
    name: 'Taco Libre',
    cuisine: 'Mexican',
    image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    priceRange: '$',
    address: '789 Valencia Street, San Francisco',
    phone: '+1 (555) 345-6789',
    hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
    specialties: ['Street Tacos', 'Fresh Guacamole', 'Mezcal Cocktails'],
    description: 'Vibrant Mexican street food with authentic flavors and fresh, locally-sourced ingredients.',
    distance: '2.1 miles',
  },
  {
    id: 4,
    name: 'Le Petit Bistro',
    cuisine: 'French',
    image: 'https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    priceRange: '$$$',
    address: '321 Nob Hill, San Francisco',
    phone: '+1 (555) 456-7890',
    hours: 'Wed-Sun: 5:30 PM - 9:30 PM',
    specialties: ['Coq au Vin', 'French Pastries', 'Wine Pairings'],
    description: 'Classic French bistro atmosphere with expertly prepared traditional dishes and excellent wines.',
    distance: '0.8 miles',
  },
  {
    id: 5,
    name: 'Green Garden',
    cuisine: 'Mediterranean',
    image: 'https://images.pexels.com/photos/3731337/pexels-photo-3731337.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    priceRange: '$$',
    address: '654 Castro Street, San Francisco',
    phone: '+1 (555) 567-8901',
    hours: 'Mon-Sun: 11:30 AM - 9:00 PM',
    specialties: ['Fresh Seafood', 'Olive Oil Tastings', 'Mezze Platters'],
    description: 'Fresh Mediterranean cuisine focusing on healthy, flavorful dishes with premium olive oils.',
    distance: '1.5 miles',
  },
  {
    id: 6,
    name: 'Spice Route',
    cuisine: 'Indian',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    priceRange: '$$',
    address: '987 Fillmore Street, San Francisco',
    phone: '+1 (555) 678-9012',
    hours: 'Mon-Sun: 12:00 PM - 10:00 PM',
    specialties: ['Tandoor Dishes', 'Curry Selection', 'Naan Breads'],
    description: 'Aromatic Indian cuisine with traditional spices and modern presentation techniques.',
    distance: '3.2 miles',
  },
];

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCuisine = selectedCuisine === 'All Cuisines' || restaurant.cuisine === selectedCuisine;
    const matchesPrice = selectedPrice === 'All Prices' || restaurant.priceRange === selectedPrice;

    return matchesSearch && matchesCuisine && matchesPrice;
  });

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Restaurant Directory
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Discover our carefully curated collection of partner restaurants. 
              Each one is selected for quality, authenticity, and exceptional dining experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <Input
                type="text"
                placeholder="Search restaurants, cuisines, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-full border-gray-200 focus:border-red-500 focus:ring-red-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
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

              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((price) => (
                    <SelectItem key={price} value={price}>
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Found {filteredRestaurants.length} restaurants
            </p>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Badge className="bg-white/90 text-gray-700">{restaurant.cuisine}</Badge>
                      <Badge className="bg-green-600 text-white">{restaurant.priceRange}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-red-600 transition-colors">
                        {restaurant.name}
                      </h3>
                      <span className="text-sm text-gray-500">{restaurant.distance}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-1">
                      {restaurant.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{restaurant.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{restaurant.hours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{restaurant.phone}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-red-600 hover:bg-red-700">
                        View Details
                      </Button>
                      <Button variant="outline" size="icon" className="border-red-200 text-red-600 hover:bg-red-50">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gray-100 h-96 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Interactive Map</p>
                    <p className="text-sm">Map integration would be implemented here with your preferred mapping service</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}