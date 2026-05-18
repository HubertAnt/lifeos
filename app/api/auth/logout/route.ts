import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const isJson = req.headers.get("content-type")?.includes("application/json");

  const res = isJson
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL("/login", req.url), 303);

  // Expire the cookie immediately
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return res;
}
