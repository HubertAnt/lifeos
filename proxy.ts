import { type NextRequest, NextResponse } from "next/server";
import { unseal, safeEqual, COOKIE_NAME } from "@/lib/auth";

// Paths that never require authentication
const PUBLIC_PREFIXES = ["/login", "/api/auth/", "/api/webhooks/"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    // Fail closed: misconfigured server must not grant access
    return NextResponse.json(
      { error: "Server auth not configured" },
      { status: 500 },
    );
  }

  // Programmatic access via header — API routes only
  if (pathname.startsWith("/api/")) {
    const header = req.headers.get("x-api-secret") ?? "";
    if (header && (await safeEqual(header, authSecret, authSecret))) {
      return NextResponse.next();
    }
  }

  // Cookie-based session
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (token && (await unseal(token, authSecret))) {
    return NextResponse.next();
  }

  // Unauthenticated — API routes return 401, pages redirect to /login
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  // Preserve destination for post-login redirect (relative paths only)
  if (pathname !== "/" && pathname !== "/login") {
    url.searchParams.set("next", pathname);
  }
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
