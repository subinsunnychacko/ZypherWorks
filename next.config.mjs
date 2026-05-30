/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    /*
     * Content-Security-Policy — what the browser is allowed to load.
     *
     * 'unsafe-inline' for scripts  → required for the JSON-LD <script> tags
     *                                 rendered via dangerouslySetInnerHTML.
     * 'unsafe-inline' for styles   → required for GSAP's inline style writes
     *                                 and the many style={} props throughout.
     * upgrade-insecure-requests    → browser-level HTTPS enforcement: any
     *                                 http:// URL on the page is upgraded
     *                                 to https:// before the request fires.
     * img-src self data: blob:     → next/image serves via /_next/image (self);
     *                                 data: and blob: for canvas/inline images.
     * form-action self mailto:     → contact form submits to self; mailto:
     *                                 links open the OS mail client.
     */
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      /* ── Security headers on every route ─────────────────────────── */
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",          value: "nosniff" },
          { key: "X-Frame-Options",                  value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",                 value: "1; mode=block" },
          { key: "Referrer-Policy",                  value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",               value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Cross-Origin-Opener-Policy",       value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy",     value: "same-origin" },
          /* CSP and HSTS are production-only.
             - CSP: React dev mode uses eval() for call-stack reconstruction in
               error overlays; blocking it breaks the dev experience entirely.
             - HSTS: telling a browser to only use HTTPS on localhost would
               require clearing HSTS state manually to fix. */
          ...(isProd
            ? [
                { key: "Content-Security-Policy",    value: csp },
                { key: "Strict-Transport-Security",  value: "max-age=31536000; includeSubDomains; preload" },
              ]
            : []),
        ],
      },
      /* ── Immutable cache for hashed static assets (JS / CSS chunks) ─ */
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      /* ── Short-lived cache for OG images (swap when you regenerate) ─ */
      {
        source: "/og/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      /* ── Sitemap & robots: allow CDN caching for 1 hour ─────────── */
      {
        source: "/(sitemap.xml|robots.txt)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
