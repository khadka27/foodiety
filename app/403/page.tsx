"use client";

import { ClientMotionDiv } from "@/components/ui/client-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Home, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

export default function Forbidden() {

 return (
 <div className="min-h-screen dark:/20 dark:/20 dark:/20 flex items-center justify-center p-4">
 <div className="max-w-2xl mx-auto text-center">
 <ClientMotionDiv
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 >
 {/* 403 Animation */}
 <div className="mb-8">
 <div className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent mb-4">
 403
 </div>

 <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-xl mb-6">
 <Shield className="h-12 w-12 text-white" />
 </div>
 </div>

 <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
 <CardContent className="p-8">
 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
 Access Denied
 </h1>

 <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
 Sorry, you don't have permission to access this kitchen area.
 This section is reserved for authorized chefs only.
 </p>

 {/* Action Buttons */}
 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
 <Button
 asChild
 size="lg"
 className=" hover: hover: text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
 >
 <Link href="/" className="flex items-center space-x-2">
 <Home className="h-5 w-5" />
 <span>Back to Kitchen</span>
 </Link>
 </Button>

 <Button
 variant="outline"
 size="lg"
 onClick={() => typeof window !== "undefined" && window.history.back()}
 className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/30 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
 >
 <ArrowLeft className="h-5 w-5 mr-2" />
 Go Back
 </Button>
 </div>
 </CardContent>
 </Card>
 </ClientMotionDiv>
 </div>
 </div>
 );
}
