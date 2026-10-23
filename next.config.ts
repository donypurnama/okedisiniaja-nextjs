import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
   typescript: {
    // Mengizinkan proses build produksi tetap selesai meskipun ada error TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // (Opsional) Mengabaikan error ESLint juga jika diperlukan
    ignoreDuringBuilds: true,
  }, 
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
