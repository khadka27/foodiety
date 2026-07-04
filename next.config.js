/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
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
