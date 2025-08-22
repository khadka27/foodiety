'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ZoomIn, Heart, Share2 } from 'lucide-react';

const categories = ['All', 'Dishes', 'Events', 'Behind the Scenes', 'Restaurants', 'Desserts'];

const galleryImages = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Gourmet Burger Platter',
    category: 'Dishes',
    likes: 124,
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Chef at Work',
    category: 'Behind the Scenes',
    likes: 89,
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Wedding Reception Setup',
    category: 'Events',
    likes: 156,
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/3992205/pexels-photo-3992205.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Chocolate Soufflé',
    category: 'Desserts',
    likes: 203,
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Fresh Pasta Creation',
    category: 'Dishes',
    likes: 167,
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Restaurant Kitchen',
    category: 'Restaurants',
    likes: 92,
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/1998925/pexels-photo-1998925.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Ramen Bowl Artistry',
    category: 'Dishes',
    likes: 134,
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Corporate Event Catering',
    category: 'Events',
    likes: 78,
  },
  {
    id: 9,
    src: 'https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'French Pastries',
    category: 'Desserts',
    likes: 145,
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

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
              Visual Gallery
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Explore our collection of stunning food photography, behind-the-scenes moments, 
              and memorable events that showcase the artistry of culinary excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
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

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div 
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Overlay Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold mb-2">{image.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            {image.category}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-white hover:text-red-300">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <span className="text-sm">{image.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              >
                <X className="h-6 w-6" />
              </Button>
              
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-6 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{selectedImage.title}</h3>
                    <span className="text-sm text-gray-300">{selectedImage.category}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-white hover:text-red-300">
                      <Heart className="h-5 w-5 mr-2" />
                      {selectedImage.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:text-red-300">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}