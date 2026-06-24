'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, Award, Globe, TrendingUp, Quote } from 'lucide-react';

const defaultStats = [
  { value: '50K+', label: 'Community Members' },
  { value: '10K+', label: 'Recipes Shared' },
  { value: '500+', label: 'Partner Restaurants' },
  { value: '25+', label: 'Countries Reached' },
];

const iconMap = [Users, Heart, Award, Globe];
const colorMap = [
  'from-orange-400 to-red-500',
  'from-red-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-green-400 to-teal-500',
];
const bgMap = [
  'from-orange-50 to-red-50',
  'from-red-50 to-pink-50',
  'from-amber-50 to-orange-50',
  'from-green-50 to-teal-50',
];
const darkBgMap = [
  'dark:from-orange-950/30 dark:to-red-950/30',
  'dark:from-red-950/30 dark:to-pink-950/30',
  'dark:from-amber-950/30 dark:to-orange-950/30',
  'dark:from-green-950/30 dark:to-teal-950/30',
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function OurStorySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [ourStory, setOurStory] = useState({
    title: "Our Story",
    subtitle: "Where Passion Meets Flavor",
    text1: "Founded in 2020 by a group of passionate food enthusiasts, Foodiety began as a simple blog sharing family recipes. Today, we've grown into a thriving community that connects food lovers, chefs, and restaurants from around the world.",
    text2: "Our mission is to make exceptional food accessible to everyone — reviewing restaurants, cafés, hotels, and sharing recipes that inspire the joy of cooking and dining together.",
    image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800",
    statValue: "+28%",
    statLabel: "Crafted with Passion"
  });
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const savedConfig = localStorage.getItem("foodiety_site_config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.home?.ourStory) {
          setOurStory(parsed.home.ourStory);
        }
        if (parsed.home?.floatingStats && parsed.home.floatingStats.length > 0) {
          setStats(parsed.home.floatingStats);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const subtitleWords = ourStory.subtitle.split(' ');
  const midPoint = Math.ceil(subtitleWords.length / 2);
  const subtitleFirst = subtitleWords.slice(0, midPoint).join(' ');
  const subtitleSecond = subtitleWords.slice(midPoint).join(' ');

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-dots-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange-500/8 rounded-full blur-[80px] animate-blob pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-red-500/8 rounded-full blur-[80px] animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Section Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-gradient-to-r from-orange-500 to-transparent" />
              <span className="text-label text-orange-500">{ourStory.title}</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="heading-section text-4xl md:text-5xl text-foreground mb-6"
            >
              {subtitleFirst}{' '}
              <span className="text-gradient block">{subtitleSecond}</span>
            </motion.h2>

            {/* Quote */}
            <motion.div
              variants={itemVariants}
              className="relative pl-5 border-l-2 border-orange-400 mb-6"
            >
              <Quote className="absolute -top-1 -left-2.5 h-4 w-4 text-orange-400 fill-current" />
              <p className="text-base text-muted-foreground italic leading-relaxed">
                "Food is the universal language that brings people together, transcending cultures and creating memories."
              </p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-base text-muted-foreground mb-4 leading-relaxed">
              {ourStory.text1}
            </motion.p>

            <motion.p variants={itemVariants} className="text-base text-muted-foreground mb-10 leading-relaxed">
              {ourStory.text2}
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = iconMap[index % iconMap.length];
                const color = colorMap[index % colorMap.length];
                const bg = bgMap[index % bgMap.length];
                const darkBg = darkBgMap[index % darkBgMap.length];
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`glass-card rounded-2xl p-4 hover:shadow-xl transition-all duration-300 border border-orange-100/30 dark:border-orange-900/20`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} ${darkBg} flex items-center justify-center mb-3`}>
                      <Icon className={`h-5 w-5 bg-gradient-to-br ${color} [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]`} />
                    </div>
                    <div className={`text-2xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent mb-0.5`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right — Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {/* Main large image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-h-[520px]">
              <img
                src={ourStory.image}
                alt="Chef preparing food"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="h-5 w-5 text-white fill-current" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{ourStory.statLabel || 'Crafted with Passion'}</div>
                      <div className="text-gray-300 text-xs">Every recipe, every review, every story</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-xs font-bold">{ourStory.statValue || '15+'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating mini-card top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -top-5 -right-5 w-40 rounded-2xl overflow-hidden shadow-xl animate-float border-2 border-white dark:border-gray-800"
            >
              <img
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Food detail"
                className="w-full h-28 object-cover"
              />
              <div className="p-2 bg-white dark:bg-gray-900">
                <div className="text-xs font-bold text-foreground">Today's Special</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xs">★</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating award badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 border border-orange-200/30 dark:border-orange-800/20 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-black text-foreground">#1 Rated</div>
                  <div className="text-[10px] text-muted-foreground">Food Platform 2024</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}