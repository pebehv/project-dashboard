const nextConfig = {
  experimental: {
    // Enable server components by default
    serverComponentsExternalPackages: [],
  },
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

module.exports = nextConfig