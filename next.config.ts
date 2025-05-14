import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin(
  './locales/request.ts'
)

const nextConfig: NextConfig = {
  output: "standalone"
};

export default withNextIntl(nextConfig);
