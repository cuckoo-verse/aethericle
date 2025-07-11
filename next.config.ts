import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin(
  './locales/request.ts'
)

const nextConfig: NextConfig = {
  output: process.env.NEXT_PLATFORM === 'web' ? undefined : 'standalone',
  transpilePackages: ['@cuckoo-verse/auth'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webstatic.mihoyo.com',
        port: '',
      }
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
};

export default withNextIntl(nextConfig);
