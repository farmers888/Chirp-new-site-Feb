import type { NextConfig } from 'next';

import config from './src/configs/website-config';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: config.docs.basePath,
        destination: config.docs.rootPage,
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/webp'],
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
