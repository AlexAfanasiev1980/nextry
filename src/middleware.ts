import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("OutSiteJWT");

  if (!cookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/generator/background",
    "/generator/face-swap",
    "/generator/fitting-room",
  ],
};
