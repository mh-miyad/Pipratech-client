/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://industry-portfolio.techelementbd.com/api/v1/:path*",
      },
    ];
  },
}

export default nextConfig
