'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, MapPin, Clock, ChevronDown, Play, Utensils, Coffee, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    tag: '🍽️ Premium Dining',
    title: 'Discover Your Next',
    highlight: 'Culinary Adventure',
    subtitle: 'From authentic recipes to hidden restaurant gems — explore a world of flavors.',
  },
  {
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    tag: '☕ Cafe Culture',
    title: 'Experience the',
    highlight: 'Perfect Café Escape',
    subtitle: 'Cozy cafés, artisan coffee, and sweet moments curated just for you.',
  },
  {
    image: 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    tag: '🏨 Hotel Dining',
    title: 'Indulge in',
    highlight: 'World-Class Hotels',
    subtitle: 'Luxury dining experiences and 5-star restaurants reviewed by real food lovers.',
  },
];

const floatingStats = [
  { value: '50K+', label: 'Food Lovers', icon: '❤️' },
  { value: '10K+', label: 'Recipes', icon: '📖' },
  { value: '500+', label: 'Restaurants', icon: '🍴' },
  { value: '4.9★', label: 'Rating', icon: '⭐' },
];

const scrollingTags = [
  '🍕 Italian', '🍜 Asian', '🥗 Healthy', '☕ Cafés', '🏨 Hotels', '🍔 Burgers',
  '🌮 Mexican', '🍣 Sushi', '🥩 Steakhouse', '🎂 Desserts', '🍷 Wine Bar', '🥘 Mediterranean',
  '🍕 Italian', '🍜 Asian', '🥗 Healthy', '☕ Cafés', '🏨 Hotels', '🍔 Burgers',
];

export function HeroSection() {
  const [slides, setSlides] = useState(heroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const savedConfig = localStorage.getItem("foodiety_site_config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.home?.heroSlides && parsed.home.heroSlides.length > 0) {
          setSlides(parsed.home.heroSlides);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 400);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides]);

  const slide = slides[currentSlide] || slides[0] || heroSlides[0];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gray-950">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <img
            src={slide.image}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/60 via-transparent to-red-950/40" />
        </motion.div>
      </AnimatePresence>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px] animate-blob pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/15 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none z-[1]" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              {/* Tag Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${currentSlide}`}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 mb-5"
                >
                  <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-white border border-white/25 backdrop-blur-sm"
                    style={{ background: 'rgba(255,255,255,0.12)' }}>
                    {slide.tag}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Headline */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="heading-hero text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-3"
                >
                  {slide.title}
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`hl-${currentSlide}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="heading-hero text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gradient-hero block mb-6">
                    {slide.highlight}
                  </span>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`sub-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>
              </AnimatePresence>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center mb-10"
              >
                <Link href="/restaurants" className="btn-premium flex items-center gap-2 text-base group">
                  Explore Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/recipes" className="btn-glass flex items-center gap-2 text-base group">
                  <Play className="h-4 w-4 fill-current" />
                  Browse Recipes
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="flex items-center gap-5 sm:gap-8 justify-center lg:justify-start flex-wrap"
              >
                {floatingStats.map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-white">{stat.icon} {stat.value}</div>
                    <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Side — Floating Glass Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="hidden lg:flex flex-col gap-4 w-80 flex-shrink-0"
            >
              {/* Featured Card */}
              <div className="glass rounded-2xl p-5 border border-white/15 animate-float">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.pexels.com/photos/3731337/pexels-photo-3731337.jpeg?auto=compress&cs=tinysrgb&w=100"
                      alt="Featured dish"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">Mediterranean Salmon</div>
                    <div className="text-gray-300 text-xs flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-current" />
                      <span>4.9 · 2.4k reviews</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <Clock className="h-3 w-3" />
                  <span>25 min</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <MapPin className="h-3 w-3" />
                  <span>San Francisco</span>
                </div>
              </div>

              {/* Mini Restaurant Cards */}
              {[
                { name: 'The Golden Spoon', type: 'Fine Dining • $$$$', stars: 4.8, img: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=100' },
                { name: 'Brew & Bean Café', type: 'Café • Brunch • $$', stars: 4.7, img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100' },
              ].map((place, i) => (
                <motion.div
                  key={place.name}
                  className="glass rounded-xl p-3.5 border border-white/10 flex items-center gap-3 cursor-pointer hover:border-orange-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 4 }}
                  style={{ animationDelay: `${(i + 1) * 0.8}s` }}
                >
                  <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold truncate">{place.name}</div>
                    <div className="text-gray-400 text-xs">{place.type}</div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span className="text-white text-sm font-bold">{place.stars}</span>
                  </div>
                </motion.div>
              ))}

              {/* Quick Access */}
              <div className="glass rounded-xl p-3.5 border border-white/10">
                <div className="text-white text-xs font-bold mb-2 uppercase tracking-wider">Quick Access</div>
                <div className="flex gap-2">
                  {[
                    { icon: UtensilsCrossed, label: 'Restaurants', href: '/restaurants' },
                    { icon: Coffee, label: 'Cafés', href: '/restaurants?type=cafe' },
                    { icon: Utensils, label: 'Recipes', href: '/recipes' },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg bg-white/10 hover:bg-orange-500/25 border border-white/10 hover:border-orange-400/30 transition-all duration-200 group"
                    >
                      <Icon className="h-4 w-4 text-orange-400 group-hover:text-orange-300" />
                      <span className="text-[10px] text-gray-300 group-hover:text-white font-medium">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-400 ${
              i === currentSlide ? 'w-8 h-2 bg-orange-400' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scrolling Tag Ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-md border-t border-white/10 overflow-hidden py-3">
        <div className="ticker-wrapper">
          <div className="ticker-content gap-8 items-center">
            {scrollingTags.map((tag, i) => (
              <span key={i} className="text-sm text-gray-200 font-medium mx-6 flex-shrink-0 opacity-80">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 right-8 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/60"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}