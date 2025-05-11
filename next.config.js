/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    runtime: 'nodejs',
    serverComponents: true,
  }
}

module.exports = nextConfig
