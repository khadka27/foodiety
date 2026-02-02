/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    // Help with SSR issues in Next.js 15
    forceSwcTransforms: true,
  },
  // Updated property name for Next.js 15
  serverExternalPackages: ['framer-motion'],
  // Disable static optimization for problematic routes
  staticPageGenerationTimeout: 120,
  // Disable static generation
  trailingSlash: false,
  output: 'standalone',
  // Skip build-time page generation
  generateBuildId: async () => {
    return 'foodiety-build'
  },
};

module.exports = nextConfig;
