/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Disable experimental features that may cause issues with Cloudflare Pages
  experimental: {
    serverComponentsExternalPackages: ['node-mailjet'],
  },
}

module.exports = nextConfig