import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Forces HTTPS in production.
 *
 * Checks the `x-forwarded-proto` header set by Vercel / AWS ALB / CloudFront.
 * Never redirects in development so localhost stays usable.
 *
 * 301 = permanent redirect — browsers and search engines cache this, so
 * subsequent visits go straight to HTTPS without hitting this middleware.
 */
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const proto = request.headers.get("x-forwarded-proto");
    if (proto && proto !== "https") {
      const url = request.nextUrl.clone();
      url.protocol = "https:";
      return NextResponse.redirect(url, { status: 301 });
    }
  }
  return NextResponse.next();
}

export const config = {
  /* Skip static assets and generated files — they don't need redirection */
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
