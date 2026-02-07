/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignore ESLint during builds to avoid version warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensure TypeScript errors don't block production builds
    ignoreBuildErrors: false,
  },
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
