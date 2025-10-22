import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


// Point to your routing file
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, // ✅ empty object, not `true`
  },
};

export default withNextIntl(nextConfig);
