import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, code } = body;

  if (!email || !code) {
    return NextResponse.json(
      {
        message: "You are required to enter your code",
      },
      {
        status: 400,
      }
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      code,
    }),
  });

  const data = await res.json();

  console.log(data)

  if (res.status !== 201) {
    return NextResponse.json(
      {
        message: data.detail,
      },
      {
        status: res.status,
      }
    );
  }

  const MAX_AGE =
    Date.parse(data.format_expires_in) - Date.parse(new Date().toISOString());

  const serialized = serialize("OutSiteJWT", data.access_token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });


  return new Response(JSON.stringify({ data }), {
    status: 201,
    headers: { "Set-Cookie": serialized, "Cache-Control": "no-store, no-cache, must-revalidate" },
  });

}