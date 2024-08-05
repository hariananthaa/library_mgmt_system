/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_API_DOMAIN: process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN,
  },
};

module.exports = nextConfig;
