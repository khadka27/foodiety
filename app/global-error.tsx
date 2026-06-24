"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  if (!isMounted) {
    return (
      <html>
        <body>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8"
            >
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl mb-6"
              >
                <AlertTriangle className="h-12 w-12 text-white" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Critical Kitchen Error
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Something went seriously wrong in our kitchen! Our entire system
                needs attention.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={reset}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Restart Kitchen</span>
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="border border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/30 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                >
                  <Home className="h-5 w-5" />
                  <span>Go Home</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}
