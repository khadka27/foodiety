import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { ClientToaster } from "@/components/ui/client-toaster";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <main className="min-h-screen bg-background text-foreground">
              {children}
            </main>
          </Suspense>
          <Footer />
          <ClientToaster />
        </Providers>
      </body>
    </html>
  );
}
