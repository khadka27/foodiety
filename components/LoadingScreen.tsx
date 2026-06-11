'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Utensils, Coffee } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [ChefHat, Utensils, Coffee];
  const loadingTexts = [
    'Preparing your culinary journey...',
    'Gathering fresh ingredients...',
    'Setting the perfect table...',
    'Almost ready to serve!'
  ];

  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(iconInterval);
    };
  }, [isLoading, onComplete]);

  const getCurrentText = () => {
    if (progress < 25) return loadingTexts[0];
    if (progress < 50) return loadingTexts[1];
    if (progress < 75) return loadingTexts[2];
    return loadingTexts[3];
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950 dark:via-red-950 dark:to-yellow-950"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <ChefHat className="h-8 w-8 text-white" />
                </motion.div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Foodiety
              </h1>
            </motion.div>

            {/* Animated Icons */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                {icons.map((Icon, index) => (
                  currentIcon === index && (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center"
                    >
                      <Icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            {/* Loading Text */}
            <motion.p
              key={getCurrentText()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-medium"
            >
              {getCurrentText()}
            </motion.p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-sm"
              />
            </div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-600 dark:text-gray-400 font-medium"
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Floating Food Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      opacity: 0 
                    }}
                    animate={{ 
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      opacity: [0, 0.3, 0] 
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2 
                    }}
                    className="absolute text-orange-300 dark:text-orange-700"
                  >
                    <Icon size={20} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}