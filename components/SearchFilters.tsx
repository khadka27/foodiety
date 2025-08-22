'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, X, Star } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  type: 'recipes' | 'restaurants';
}

export function SearchFilters({ onFiltersChange, type }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [ratingRange, setRatingRange] = useState([0]);
  const [timeRange, setTimeRange] = useState([0, 120]);
  const [difficulty, setDifficulty] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const recipeCategories = [
    'APPETIZER', 'MAIN_COURSE', 'DESSERT', 'BEVERAGE', 'SNACK', 'BREAKFAST', 'LUNCH', 'DINNER'
  ];

  const restaurantCategories = [
    'ITALIAN', 'CHINESE', 'MEXICAN', 'INDIAN', 'AMERICAN', 'FRENCH', 'JAPANESE', 'THAI', 'MEDITERRANEAN', 'FAST_FOOD'
  ];

  const cuisines = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'American', 'French', 'Japanese', 'Thai', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const priceRanges = ['$', '$$', '$$$', '$$$$'];

  const applyFilters = () => {
    const filters = {
      search: searchTerm,
      category: selectedCategory,
      cuisine: selectedCuisine,
      minRating: ratingRange[0],
      ...(type === 'recipes' && {
        minTime: timeRange[0],
        maxTime: timeRange[1],
        difficulty,
      }),
      ...(type === 'restaurants' && {
        priceRange,
      }),
    };

    onFiltersChange(filters);
    updateActiveFilters();
  };

  const updateActiveFilters = () => {
    const filters = [];
    if (searchTerm) filters.push(`Search: ${searchTerm}`);
    if (selectedCategory) filters.push(`Category: ${selectedCategory}`);
    if (selectedCuisine) filters.push(`Cuisine: ${selectedCuisine}`);
    if (ratingRange[0] > 0) filters.push(`Rating: ${ratingRange[0]}+ stars`);
    if (type === 'recipes') {
      if (timeRange[0] > 0 || timeRange[1] < 120) {
        filters.push(`Time: ${timeRange[0]}-${timeRange[1]} min`);
      }
      if (difficulty) filters.push(`Difficulty: ${difficulty}`);
    }
    if (type === 'restaurants' && priceRange) {
      filters.push(`Price: ${priceRange}`);
    }
    setActiveFilters(filters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCuisine('');
    setRatingRange([0]);
    setTimeRange([0, 120]);
    setDifficulty('');
    setPriceRange('');
    setActiveFilters([]);
    onFiltersChange({});
  };

  const removeFilter = (filterToRemove: string) => {
    if (filterToRemove.startsWith('Search:')) setSearchTerm('');
    if (filterToRemove.startsWith('Category:')) setSelectedCategory('');
    if (filterToRemove.startsWith('Cuisine:')) setSelectedCuisine('');
    if (filterToRemove.startsWith('Rating:')) setRatingRange([0]);
    if (filterToRemove.startsWith('Time:')) setTimeRange([0, 120]);
    if (filterToRemove.startsWith('Difficulty:')) setDifficulty('');
    if (filterToRemove.startsWith('Price:')) setPriceRange('');
    
    setTimeout(applyFilters, 100);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Search & Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${type}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {(type === 'recipes' ? recipeCategories : restaurantCategories).map((category) => (
                <SelectItem key={category} value={category}>
                  {category.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger>
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Cuisines</SelectItem>
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {type === 'recipes' && (
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                {difficulties.map((diff) => (
                  <SelectItem key={diff} value={diff}>
                    {diff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {type === 'restaurants' && (
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Prices</SelectItem>
                {priceRanges.map((price) => (
                  <SelectItem key={price} value={price}>
                    {price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center space-x-2">
            <Star className="h-4 w-4" />
            <span>Minimum Rating: {ratingRange[0]} stars</span>
          </label>
          <Slider
            value={ratingRange}
            onValueChange={setRatingRange}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Time Filter for Recipes */}
        {type === 'recipes' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Cooking Time: {timeRange[0]} - {timeRange[1]} minutes
            </label>
            <Slider
              value={timeRange}
              onValueChange={setTimeRange}
              max={120}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button onClick={applyFilters} className="bg-red-600 hover:bg-red-700">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Active Filters:</label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100"
                  onClick={() => removeFilter(filter)}
                >
                  {filter}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}