'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Utensils, Coffee, Star } from 'lucide-react';

interface LoadingScreenProps {
 isLoading: boolean;
 onComplete?: () => void;
}

const floatingIcons = [ChefHat, Utensils, Coffee, Star];

const loadingTexts = [
 'Preparing your culinary journey...',
 'Gathering fresh ingredients...',
 'Setting the perfect table...',
 'Almost ready to serve!',
];

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
 const [progress, setProgress] = useState(0);
 const [textIndex, setTextIndex] = useState(0);

 useEffect(() => {
 if (!isLoading) return;

 const progressInterval = setInterval(() => {
 setProgress(prev => {
 if (prev >= 100) {
 clearInterval(progressInterval);
 setTimeout(() => onComplete?.(), 400);
 return 100;
 }
 return Math.min(prev + Math.random() * 12, 100);
 });
 }, 180);

 const textInterval = setInterval(() => {
 setTextIndex(prev => (prev + 1) % loadingTexts.length);
 }, 900);

 return () => {
 clearInterval(progressInterval);
 clearInterval(textInterval);
 };
 }, [isLoading, onComplete]);

 return (
 <AnimatePresence>
 {isLoading && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0, scale: 0.98 }}
 transition={{ duration: 0.4 }}
 className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
 >
 {/* Layered Background */}
 <div className="absolute inset-0 " />
 <div className="absolute inset-0 bg-dots-pattern opacity-30" />

 {/* Background orbs */}
 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-blob" />
 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] animate-blob animation-delay-4000" />

 {/* Floating Particle Icons */}
 {floatingIcons.map((Icon, i) => (
 <motion.div
 key={i}
 className="absolute text-orange-400/20 pointer-events-none"
 initial={{ opacity: 0 }}
 animate={{
 opacity: [0, 0.4, 0],
 x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
 y: [Math.random() * 600 - 300, Math.random() * 600 - 300],
 rotate: [0, 360],
 }}
 transition={{
 duration: 4 + Math.random() * 3,
 repeat: Infinity,
 delay: i * 0.7,
 ease: 'linear',
 }}
 style={{ left: '50%', top: '50%' }}
 >
 <Icon size={24 + i * 6} />
 </motion.div>
 ))}

 {/* Main Content */}
 <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto px-6">

 {/* Logo + Ring Animation */}
 <motion.div
 initial={{ scale: 0, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
 className="relative mb-8"
 >
 {/* Rotating ring */}
 <motion.div
 animate={{ rotate: 360 }}
 transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
 className="absolute -inset-3 rounded-full border-2 border-transparent"
 style={{
 background: 'conic-gradient(from 0deg, rgba(249,115,22,0.8), rgba(239,68,68,0.8), transparent, rgba(249,115,22,0.8))',
 borderRadius: '50%',
 padding: '2px',
 }}
 >
 <div className="w-full h-full rounded-full bg-transparent" />
 </motion.div>

 {/* Outer ring */}
 <motion.div
 animate={{ rotate: -360 }}
 transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
 className="absolute -inset-6 rounded-full border border-orange-500/20"
 />

 {/* Logo core */}
 <motion.div
 animate={{ scale: [1, 1.05, 1] }}
 transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
 className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40"
 >
 <ChefHat className="h-10 w-10 text-white drop-shadow-lg" />
 </motion.div>
 </motion.div>

 {/* Brand Name */}
 <motion.div
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4 }}
 className="mb-2"
 >
 <h1 className="text-3xl font-black tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
 Foodiety
 </h1>
 <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 mt-0.5">
 Taste & Discover
 </p>
 </motion.div>

 {/* Loading Text */}
 <AnimatePresence mode="wait">
 <motion.p
 key={textIndex}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.35 }}
 className="text-sm text-orange-200/80 mb-8 font-medium"
 >
 {loadingTexts[textIndex]}
 </motion.p>
 </AnimatePresence>

 {/* Progress Container */}
 <div className="w-56 mb-3">
 <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
 <motion.div
 initial={{ width: 0 }}
 animate={{ width: `${Math.min(progress, 100)}%` }}
 transition={{ duration: 0.25, ease: 'easeOut' }}
 className="h-full rounded-full relative"
 >
 {/* Shimmer effect on bar */}
 <div className="absolute inset-0 shimmer opacity-60 rounded-full" />
 </motion.div>
 </div>
 </div>

 {/* Progress Number */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.6 }}
 className="text-xs font-bold text-white/50 tabular-nums"
 >
 {Math.round(progress)}%
 </motion.div>

 {/* Stars decoration */}
 <div className="flex items-center gap-1.5 mt-6">
 {[...Array(5)].map((_, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, scale: 0 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.8 + i * 0.1 }}
 >
 <Star
 className="h-3.5 w-3.5 text-amber-400 fill-current"
 style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))' }}
 />
 </motion.div>
 ))}
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}