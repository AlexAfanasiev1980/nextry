import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { login, password } = body;

  if (!login || !password) {
    return NextResponse.json(
      { message: "Требуется ввести логин и пароль" },
      { status: 401 }
    );
  }
}
