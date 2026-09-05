import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Bilder aus dem öffentlichen Supabase-Speicher. Das Muster steht bewusst
    // fest verdrahtet hier: Würde der Hostname aus der Umgebung gelesen,
    // müsste der Server nach jeder Änderung an .env.local neu gestartet werden.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
