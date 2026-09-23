import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev is bound to 0.0.0.0; browsers that open 127.0.0.1 must be allowed
  // or Next blocks the dev channel and the page never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
