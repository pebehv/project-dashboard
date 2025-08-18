// Archivo: next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // serverComponentsExternalPackages: [], // ¡Elimina esta línea!
  },
  output: 'export',
  basePath: '/project-dashboard',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;