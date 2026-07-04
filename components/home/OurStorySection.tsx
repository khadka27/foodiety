'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, Globe, TrendingUp, Quote, CheckCircle2, ChefHat, Utensils } from 'lucide-react';

const defaultStats = [
  { value: '50K+', label: 'Food Lovers', icon: Users, color: '#e07b39' },
  { value: '10K+', label: 'Recipes Shared', icon: Heart, color: '#d94f5c' },
  { value: '500+', label: 'Restaurants', icon: Utensils, color: '#c9a227' },
  { value: '25+', label: 'Countries', icon: Globe, color: '#3a9e8f' },
];

const highlights = [
  'Authentic restaurant reviews',
  'Home chef community recipes',
  'Curated food discovery',
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function OurStorySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ourStory, setOurStory] = useState({
    title: 'Our Story',
    subtitle: 'Crafting Culinary Experiences Since 2020',
    text1:
      'Foodiety began as a simple space for sharing home-cooked family recipes. We believed that food was the ultimate connector — transcending borders, languages, and cultures.',
    text2:
      "Today, we've grown into a global community of chefs, writers, and restaurant discoverers dedicated to providing authentic culinary reviews and inspiring the joy of cooking.",
    image:
      'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800',
    statValue: '+28%',
    statLabel: 'Crafted with Passion',
  });
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const parsed = res.data;
          if (parsed.home?.ourStory) setOurStory(parsed.home.ourStory);
          if (parsed.home?.floatingStats?.length > 0) {
            setStats(
              parsed.home.floatingStats.map((s: any, i: number) => ({
                ...s,
                icon: defaultStats[i % defaultStats.length].icon,
                color: defaultStats[i % defaultStats.length].color,
              }))
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden bg-background"
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: '#e07b39', filter: 'blur(120px)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: '#d94f5c', filter: 'blur(100px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ─── LEFT CONTENT ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-7"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{
                  color: '#e07b39',
                  background: 'rgba(224,123,57,0.1)',
                  border: '1px solid rgba(224,123,57,0.25)',
                }}
              >
                <ChefHat className="h-3.5 w-3.5" />
                {ourStory.title}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="font-playfair font-bold leading-[1.15] text-foreground"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Crafting Culinary<br />
              <span style={{ color: '#e07b39' }}>Experiences</span>
              <br />
              <span
                className="relative inline-block"
                style={{ color: '#c9a227' }}
              >
                Since 2020
                {/* Underline accent */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="4"
                  viewBox="0 0 200 4"
                  preserveAspectRatio="none"
                >
                  <rect x="0" y="0" width="200" height="4" rx="2" fill="#c9a227" opacity="0.5" />
                </svg>
              </span>
            </motion.h2>

            {/* Quote block */}
            <motion.div
              variants={itemVariants}
              className="relative pl-5"
              style={{ borderLeft: '3px solid #e07b39' }}
            >
              <Quote
                className="absolute -top-1 -left-3 h-5 w-5"
                style={{ color: '#e07b39', opacity: 0.7, fill: 'currentColor' }}
              />
              <p className="text-base italic leading-relaxed text-muted-foreground">
                "Food is the universal language that brings people together, transcending cultures and creating memories."
              </p>
            </motion.div>

            {/* Body text */}
            <motion.p variants={itemVariants} className="text-base leading-relaxed text-muted-foreground">
              {ourStory.text1}
            </motion.p>
            <motion.p variants={itemVariants} className="text-base leading-relaxed text-muted-foreground">
              {ourStory.text2}
            </motion.p>

            {/* Highlights */}
            <motion.ul variants={containerVariants} className="space-y-2.5">
              {highlights.map((h) => (
                <motion.li
                  key={h}
                  variants={itemVariants}
                  className="flex items-center gap-2.5 text-sm font-medium text-foreground"
                >
                  <CheckCircle2
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: '#3a9e8f' }}
                  />
                  {h}
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {stats.map((stat) => {
                const Icon = stat.icon ?? Users;
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl p-4 border transition-all duration-300"
                    style={{
                      background: 'hsl(var(--card))',
                      borderColor: `${stat.color}33`,
                      boxShadow: `0 4px 20px ${stat.color}15`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${stat.color}18` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: stat.color }} />
                    </div>
                    <div
                      className="text-2xl font-black mb-0.5"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT IMAGE COLLAGE ─── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5', maxHeight: '540px' }}>
              <img
                src={ourStory.image}
                alt="Culinary team"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Dark overlay at bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                }}
              />

              {/* Bottom overlay badge */}
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className="rounded-2xl p-4 backdrop-blur-sm"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(224,123,57,0.9)' }}
                    >
                      <Heart className="h-5 w-5 text-white fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm truncate">
                        {ourStory.statLabel || 'Crafted with Passion'}
                      </div>
                      <div className="text-gray-300 text-xs">
                        Every recipe, every review, every story
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-xs font-bold">
                        {ourStory.statValue || '+15%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>





            {/* Decorative dot cluster */}
            <div
              className="absolute top-1/2 -right-8 -translate-y-1/2 w-16 h-32 opacity-30 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #e07b39 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}