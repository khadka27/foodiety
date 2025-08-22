'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Eye, Share2, Clock } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Cooking Tips', 'Travel', 'Seasonal', 'Nutrition', 'Trends'];

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Perfect Pasta: Secrets from Italian Grandmothers',
    excerpt: 'Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-12-15',
    views: 2847,
    category: 'Cooking Tips',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Global Street Food: A Journey Through Authentic Flavors',
    excerpt: 'From Bangkok\'s bustling markets to Mexico City\'s vibrant streets, explore the world through its most beloved street foods.',
    image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-12-12',
    views: 1923,
    category: 'Travel',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Seasonal Cooking: Winter Comfort Foods That Warm the Soul',
    excerpt: 'Embrace the season with hearty stews, roasted vegetables, and warming spices that bring comfort to cold days.',
    image: 'https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-12-10',
    views: 3156,
    category: 'Seasonal',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 4,
    title: 'Plant-Based Revolution: Delicious Vegan Alternatives',
    excerpt: 'Explore how plant-based cooking has evolved to create incredibly satisfying and nutritious meals that everyone can enjoy.',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-12-08',
    views: 2234,
    category: 'Nutrition',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Fermentation Fundamentals: Ancient Techniques for Modern Kitchens',
    excerpt: 'Learn the art of fermentation to create probiotics, enhance flavors, and preserve foods using traditional methods.',
    image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-12-05',
    views: 1567,
    category: 'Cooking Tips',
    readTime: '15 min read',
    featured: false,
  },
  {
    id: 6,
    title: '2025 Food Trends: What\'s Coming to Your Plate',
    excerpt: 'Discover the emerging food trends that will shape dining experiences and home cooking in the coming year.',
    image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-12-03',
    views: 2891,
    category: 'Trends',
    readTime: '7 min read',
    featured: true,
  },
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
              Food Stories & Insights
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto mb-8">
              Dive deep into the world of food with our curated collection of stories, 
              tips, and culinary adventures from passionate food experts.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-full"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'border-red-200 text-red-600 hover:bg-red-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Posts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 flex space-x-2">
                          <Badge className="bg-red-600 text-white">Featured</Badge>
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                          {post.readTime}
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-1 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="hover:text-red-600">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                          <Link href={`/blogs/${post.id}`}>
                            Read Full Article
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">All Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                          {post.readTime}
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="hover:text-red-600">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700">
                          <Link href={`/blogs/${post.id}`}>
                            Read More
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
      </section>
    </div>
  );
}