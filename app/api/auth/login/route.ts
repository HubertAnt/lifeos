import { type NextRequest, NextResponse } from "next/server";
import { seal, safeEqual, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth";

// Accepts both application/json (programmatic) and multipart/form-data (browser form).
export async function POST(req: NextRequest) {
  const authSecret = process.env.AUTH_SECRET;
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  if (!authSecret || !dashboardPassword) {
    return NextResponse.json(
      { error: "Server auth not configured" },
      { status: 500 },
    );
  }

  const isJson = req.headers.get("content-type")?.includes("application/json");

  let password: string;
  let next = "/";

  if (isJson) {
    const body = (await req.json()) as { password?: string; next?: string };
    password = body.password ?? "";
    next = body.next ?? "/";
  } else {
    const form = await req.formData();
    password = (form.get("password") as string | null) ?? "";
    next = (form.get("next") as string | null) ?? "/";
  }

  // Ensure `next` is a safe relative path to prevent open-redirect
  if (!next.startsWith("/") || next.startsWith("//")) next = "/";

  const valid =
    password.length > 0 &&
    (await safeEqual(password, dashboardPassword, authSecret));

  if (!valid) {
    if (isJson) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL("/login?error=1", req.url);
    if (next !== "/") url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  }

  const token = await seal(authSecret);

  const res = isJson
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL(next, req.url), 303);

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
