import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default nextConfig;
