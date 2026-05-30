/**
 * Single source of truth for the public site URL.
 *
 * Set NEXT_PUBLIC_SITE_URL in your hosting dashboard:
 *   Vercel  → Project Settings → Environment Variables
 *   AWS     → Amplify / ECS task env → NEXT_PUBLIC_SITE_URL=https://yourdomain.com
 *
 * Falls back to the current Vercel preview URL so local dev and PR previews
 * always produce valid absolute URLs without any extra config.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zypher-works.vercel.app";
