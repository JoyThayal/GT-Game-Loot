/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gamerpower.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
