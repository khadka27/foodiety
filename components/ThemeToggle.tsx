'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ActiveThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getNextTheme = () => {
    switch (theme) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
      case 'system':
      default:
        return 'light';
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system';
      case 'system':
      default:
        return 'Switch to light mode';
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(getNextTheme())}
      className="w-9 h-9 p-0 hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors"
      title={getLabel()}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
          className="text-orange-600 dark:text-orange-400"
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0" disabled>
        <div className="h-4 w-4 animate-pulse bg-gray-300 rounded" />
      </Button>
    );
  }

  return <ActiveThemeToggle />;
}