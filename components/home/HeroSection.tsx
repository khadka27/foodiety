'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sun } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formatted = new Date().toLocaleDateString('en-US', options);
    // Format: "SUNDAY , JUNE 7 , 2026"
    setFormattedDate(formatted.toUpperCase().replace(/,/g, ' ,'));
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')] bg-cover bg-center bg-no-repeat transition-colors duration-500">
      {/* Texture noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none pt-24 pb-16">
        
        {/* Date Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#d97742] dark:text-[#ebc63c] opacity-90">
            {formattedDate || 'SUNDAY , JUNE 7 , 2026'}
          </span>
        </motion.div>

        {/* Editorial Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-playfair font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-900 dark:text-stone-100 leading-[1.1] sm:leading-[1.15] mb-12 max-w-4xl"
        >
          A curated record for{' '}
          <span className="relative inline-block italic font-playfair text-[#c05c31] dark:text-[#ebc63c] mr-1">
            everyth
            <span className="relative inline-block">
              ı
              <span className="absolute -top-[0.25em] left-1/2 -translate-x-1/2 flex items-center justify-center">
                <Sun className="w-[0.26em] h-[0.26em] text-[#c05c31] dark:text-[#ebc63c] stroke-[2.5]" />
              </span>
            </span>
            ng
          </span>{' '}
          worth eating.
        </motion.h1>

        {/* Minimal Sub-Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex items-center justify-center flex-wrap gap-x-2 gap-y-2 mb-16 text-xs sm:text-sm font-semibold tracking-[0.18em] text-stone-500/80 dark:text-stone-400/80 font-outfit"
        >
          <Link href="/blogs" className="hover:text-[#c05c31] dark:hover:text-[#ebc63c] transition-all duration-300 hover:scale-105">
            BLOGS
          </Link>
          <span className="text-stone-300 dark:text-stone-700 mx-2 select-none">/</span>
          <Link href="/recipes" className="hover:text-[#c05c31] dark:hover:text-[#ebc63c] transition-all duration-300 hover:scale-105">
            RECIPES
          </Link>
          <span className="text-stone-300 dark:text-stone-700 mx-2 select-none">/</span>
          <Link href="/restaurants" className="hover:text-[#c05c31] dark:hover:text-[#ebc63c] transition-all duration-300 hover:scale-105">
            RESTAURANTS
          </Link>
          <span className="text-stone-300 dark:text-stone-700 mx-2 select-none">/</span>
          <Link href="/gallery" className="hover:text-[#c05c31] dark:hover:text-[#ebc63c] transition-all duration-300 hover:scale-105">
            GALLERY
          </Link>
        </motion.div>

        {/* Subscribe CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
        >
          <button className="border border-stone-300 dark:border-stone-800 px-7 py-3 text-stone-600 dark:text-stone-400 hover:border-[#c05c31] dark:hover:border-[#ebc63c] hover:text-[#c05c31] dark:hover:text-[#ebc63c] hover:bg-stone-100/50 dark:hover:bg-stone-900/50 rounded-none transition-all duration-300 flex items-center gap-2.5 group text-xs font-bold uppercase tracking-wider font-outfit">
            Subscribe to the Journal
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}