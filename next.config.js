/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_HOST_API,
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
