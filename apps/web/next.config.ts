import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@rn/forms', '@rn/results', '@rn/visuals'],
  experimental: { typedRoutes: false }
};

export default nextConfig;
