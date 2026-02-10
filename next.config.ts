import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    };
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': ['@svgr/webpack'],
    },
    resolveAlias: {
      '@': './src',
    },
  },
};

export default nextConfig;
