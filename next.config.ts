/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // exporta a estático
  basePath: isProd ? '/project-dashboard' : '',
  assetPrefix: isProd ? '/project-dashboard/' : '',
};

module.exports = nextConfig;
