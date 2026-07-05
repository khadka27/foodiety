import "./globals.css";
import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/Providers";
import { ClientNavigation, ClientFooter } from "@/components/ClientComponents";
import { ClientToaster } from "@/components/ui/client-toaster";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300", "400", "500", "600", "700", "800", "900"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Foodiety - Discover Amazing Food Experiences",
  description:
    "Your ultimate destination for recipes, restaurant discoveries, food blogs, and culinary inspiration. Join our community of food lovers.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  keywords: "food, recipes, restaurants, blogs, cooking, culinary, dining",
  authors: [{ name: "Foodiety Team" }],
  openGraph: {
    title: "Foodiety - Discover Amazing Food Experiences",
    description:
      "Your ultimate destination for recipes, restaurant discoveries, food blogs, and culinary inspiration.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foodiety - Discover Amazing Food Experiences",
    description:
      "Your ultimate destination for recipes, restaurant discoveries, food blogs, and culinary inspiration.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} ${inter.className}`} suppressHydrationWarning>
        <Providers>
          <ClientNavigation />
          <Suspense fallback={
            <div className="pt-16 min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          }>
            <main className="min-h-screen bg-background text-foreground">
              {children}
            </main>
          </Suspense>
          <ClientFooter />
          <ClientToaster />
        </Providers>
      </body>
    </html>
  );
}
