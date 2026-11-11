import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Monorepo: trace dependencies from the repo root so the standalone build is complete.
  outputFileTracingRoot: new URL('..', import.meta.url).pathname,
};

export default nextConfig;
