/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'deow9bq0xqvbj.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbcdn1.podbean.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-arch.shenoto.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.pippa.io',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;