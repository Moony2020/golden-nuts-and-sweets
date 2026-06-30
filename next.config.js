/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // اسمح بتحميل صور المنتجات من مصادر خارجية. عدّل القائمة حسب مزوّد الصور.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid flaky filesystem cache errors under .next/cache on Windows.
      config.cache = false;
    }

    return config;
  },
};

module.exports = nextConfig;
