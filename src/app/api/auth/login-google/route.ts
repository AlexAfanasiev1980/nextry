import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const body = await request.json();

  const { access_token } = body;

  //   if (!access_token) {
  //     return NextResponse.json(
  //       {
  //         message: "You are required to enter your login and password",
  //       },
  //       {
  //         status: 400,
  //       }
  //     );
  //   }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/auth/google?code=${access_token}`,
    {
      method: "GET",
    }
  );

  console.log(res);

  if (res.status !== 200) {
    return NextResponse.json(
      {
        message: "Authorisation Error",
      },
      {
        status: res.status,
      }
    );
  }

  const data = await res.json();

  console.log(data);

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
    headers: {
      "Set-Cookie": serialized,
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
