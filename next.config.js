/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // External packages for server components (updated syntax for Next.js 15)
  serverExternalPackages: ['node-mailjet'],
}

module.exports = nextConfig