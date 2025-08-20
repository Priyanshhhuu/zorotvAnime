/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.noitatnemucod.net", "cdn.myanimelist.net"],
    unoptimized: true, // don't require Next.js optimization
  },
  experimental: {
    appDir: true, // enable app router
  },
  // Optional: default headers for caching API responses
  async headers() {
    return [
      {
        source: "/(.*)", // all routes
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=86400", // 1 day cache
          },
        ],
      },
    ];
  },
};

export default nextConfig;
