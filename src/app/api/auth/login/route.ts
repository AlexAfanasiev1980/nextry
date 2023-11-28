import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const body = await request.json();

  const { login, password } = body;

  if (!login || !password) {
    return NextResponse.json(
      {
        message: "Требуется ввести логин и пароль",
      },
      {
        status: 400,
      }
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });

  const data = await res.json();

  if (res.status !== 200) {
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
    status: 200,
    headers: { "Set-Cookie": serialized, "Cache-Control": "no-store, no-cache, must-revalidate" },
  });

}
