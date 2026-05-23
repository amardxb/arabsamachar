/** @type {import('next').NextConfig} */

const nextConfig = {
  /* ─── IMAGE OPTIMISATION ─────────────────────────────────────────────────
     - formats: serve AVIF first, WebP as fallback (browsers that don't
       support AVIF get WebP automatically)
     - deviceSizes / imageSizes: tells Next which widths to pre-generate so
       it never up-scales a tiny thumbnail
     - minimumCacheTTL: cache generated variants for 7 days on Vercel CDN
       (default is only 60 s — causes constant regeneration & cost)       */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200],
    imageSizes: [64, 128, 256, 320, 480],
    minimumCacheTTL: 604800, // 7 days
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },

  /* ─── COMPRESSION ────────────────────────────────────────────────────────
     Gzip/Brotli responses from the Next.js server layer.                  */
  compress: true,

  /* ─── SECURITY + PERFORMANCE HEADERS ────────────────────────────────────
     preconnect / dns-prefetch save 200-400 ms per origin on first load.
     Security headers cost nothing and improve scores.                     */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Preconnect to Sanity image CDN — saves DNS+TLS round-trip
          { key: 'Link', value: '<https://cdn.sanity.io>; rel=preconnect; crossorigin=anonymous' },
          { key: 'Link', value: '<https://cdn.sanity.io>; rel=dns-prefetch' },
          // Preconnect to Google Fonts used by Noto Sans Devanagari
          { key: 'Link', value: '<https://fonts.gstatic.com>; rel=preconnect; crossorigin=anonymous' },
          // Security headers (free Lighthouse points)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Long-lived cache for all static assets (JS/CSS chunks, fonts, images)
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache public folder assets (logos, icons) for 30 days
      {
        source: "/:path*\\.(png|jpg|jpeg|svg|ico|webp|avif|woff2|woff)",
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  /* ─── REDIRECTS ──────────────────────────────────────────────────────────
     Remove the www/non-www split at the edge — avoids an extra redirect
     hop that hurts TTFB and Lighthouse.
     Uncomment the block that matches your canonical domain.               */
  // async redirects() {
  //   return [
  //     // Force www → non-www
  //     {
  //       source: '/(.*)',
  //       has: [{ type: 'host', value: 'www.arabsamachar.com' }],
  //       destination: 'https://arabsamachar.com/:path*',
  //       permanent: true,
  //     },
  //   ];
  // },

  /* ─── EXPERIMENTAL ───────────────────────────────────────────────────────
     optimizePackageImports: tree-shakes large icon/UI libraries so only
     the icons you actually import end up in the bundle.                   */
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react', '@radix-ui/react-tabs'],
  },
};

export default nextConfig;
