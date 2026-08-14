import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@rn/forms', '@rn/results', '@rn/visuals'],
  output: 'export',
  trailingSlash: true
};

export default nextConfig;
