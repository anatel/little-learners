import type { NextConfig } from "next";
import { devOrigins } from "./dev-origins";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: devOrigins(),
};

export default nextConfig;
