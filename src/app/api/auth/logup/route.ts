import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const body = await request.json();

  const { login, password, name, email } = body;

  if (!login || !password || !name || !email) {
    return NextResponse.json(
      {
        message: "All information is required",
      },
      {
        status: 400,
      }
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
      name,
      email,
    }),
  });

  const data = await res.json();

  if (res.status !== 201) {
    const message = res.status === 422 ? data.detail[0] : data.detail;
    return NextResponse.json(
      { data: message },
      {
        status: res.status,
      }
    );
  }

  return NextResponse.json(
    {
      message: data.message,
      code: data.code,
    },
    {
      status: res.status,
    }
  );
}
