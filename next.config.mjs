/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ["files.stripe.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
