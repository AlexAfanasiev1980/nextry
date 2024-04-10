import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IPing } from "./components/pages/homePageContainer/HomePageContainer";
import { GET_PING } from "./api";

export async function middleware(request: NextRequest) {
  const res = await fetch(GET_PING);
  const work: IPing | any = await res.json();

  if (!work.message || work.message !== "pong") {
    return NextResponse.redirect(new URL("/error", request.url));
  }

  let cookie = request.cookies.get("OutSiteJWT");

  if (!cookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/generator/background",
    "/generator/face-swap",
    "/generator/perfect-skin",
    "/generator/fitting-room",
    "/generator/funny-clothes",
    "/generator/fashion-swap",
  ],
};
