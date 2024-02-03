/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_HOST_API,
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
