"use client";

import { useState, useEffect } from "react";
import { ClientMotionDiv, ClientMotion } from "@/components/ui/client-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Home, RefreshCw, Clock } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

export default function ServiceUnavailable() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent SSR context issues
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
            503
          </div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-red-950/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 503 Animation */}
          <div className="mb-8">
            <ClientMotionDiv
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4"
            >
              503
            </ClientMotionDiv>

            <ClientMotionDiv
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl mb-6"
            >
              <ClientMotionDiv
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Wrench className="h-12 w-12 text-white" />
              </ClientMotionDiv>
            </ClientMotionDiv>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <ClientMotion
                as="h1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Kitchen Under Maintenance
              </ClientMotion>

              <ClientMotion
                as="p"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Our kitchen is temporarily closed for maintenance. We're
                upgrading our equipment to serve you better. Please check back
                in a few minutes!
              </ClientMotion>

              {/* Maintenance Progress */}
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center space-x-2 text-orange-600 dark:text-orange-400 mb-4">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">
                    Estimated completion: 15 minutes
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <ClientMotionDiv
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  ></ClientMotionDiv>
                </div>
              </ClientMotionDiv>

              {/* Action Buttons */}
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  onClick={() => window.location.reload()}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Check Again
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/30 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                >
                  <Link href="/" className="flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span>Visit Later</span>
                  </Link>
                </Button>
              </ClientMotionDiv>
            </CardContent>
          </Card>
        </ClientMotionDiv>
      </div>
    </div>
  );
}
