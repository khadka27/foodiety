'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Eye, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Perfect Pasta: Secrets from Italian Grandmothers',
    excerpt: 'Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations.',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-12-15',
    views: 2847,
    category: 'Cooking Tips',
    readTime: '8 min read',
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
  },
];

export function BlogPreviewSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Food Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Dive into our collection of food stories, cooking tips, and culinary adventures 
              from around the world.
            </p>
          </div>
          <Button asChild className="mt-6 md:mt-0 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
            <Link href="/blogs" className="flex items-center space-x-2">
              <span>View All Blogs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border border-border shadow-lg overflow-hidden h-full bg-card">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {post.readTime}
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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

                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
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
    </section>
  );
}