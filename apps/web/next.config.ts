import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const remotePatterns: RemotePattern[] = [];

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  ? new URL(process.env.NEXT_PUBLIC_STRAPI_URL)
  : null;

if (strapiUrl) {
  const protocol = strapiUrl.protocol.replace(":", "") as "http" | "https";

  remotePatterns.push({
    protocol,
    hostname: strapiUrl.hostname,
    port: strapiUrl.port || undefined,
    pathname: "/uploads/**",
  });

  if (strapiUrl.hostname === "localhost") {
    remotePatterns.push({
      protocol,
      hostname: "127.0.0.1",
      port: strapiUrl.port || undefined,
      pathname: "/uploads/**",
    });
  }
}

remotePatterns.push({
  protocol: "http",
  hostname: "backend",
  port: "1337",
  pathname: "/uploads/**",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
