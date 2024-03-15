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
};

export default nextConfig;
