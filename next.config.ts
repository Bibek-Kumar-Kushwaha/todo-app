import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.watchOptions = {
      ignored: [
        '**/node_modules',
        'C:/Users/Bibek/Application Data/**', // 👈 prevent Webpack from scanning this
      ],
    };
    return config;
  },
};

export default nextConfig;
