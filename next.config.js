/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "woocommerce-186938-3327038.cloudwaysapps.com",
      "a.storyblok.com",
    ],
  },
  env: {
    APP_KEY: process.env.APP_KEY,
  },
};

module.exports = nextConfig;
