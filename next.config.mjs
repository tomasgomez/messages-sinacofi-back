/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/messages/inbox',
        permanent: true,
      },
    ]
  },
  // Enable standalone mode
  output: 'standalone',
};

export default nextConfig;
