/** @type {import('next').NextConfig} */
const nextConfig = {
  // fix double rendering issue
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/messages/inbox",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
