/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com']
  }
}

export default nextConfig