import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable server components by default
    serverComponentsExternalPackages: [],
  },
  output: 'export',
  basePath: '/project-dashboard',
  // Optimize images
  images: {
    domains: [],
    unoptimized: true, // Disable image optimization for development
  },
  // Enable TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configure ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig;
