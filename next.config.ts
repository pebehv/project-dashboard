// Archivo: next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // serverComponentsExternalPackages: [], // ¡Elimina esta línea!
  },
  output: 'export',
  //basePath: '/project-dashboard',
  trailingSlash: true, 
  images: {
    unoptimized: true,
  },
  assetPrefix: '/project-dashboard/' // Esta línea a veces ayuda con problemas de rutas

};

export default nextConfig;