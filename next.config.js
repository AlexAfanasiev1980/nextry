/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edc4-109-198-100-196.ngrok-free.app',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
