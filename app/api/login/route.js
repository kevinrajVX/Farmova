import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  checkCredentials,
  getCredentials,
  signSession,
} from "@/lib/auth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { username, password } = body || {};
  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  if (!checkCredentials(username, password)) {
    return NextResponse.json(
      { error: "The provided credentials are incorrect." },
      { status: 401 }
    );
  }

  const { tenant } = getCredentials();
  const token = await signSession({
    tenant,
    username,
    iat: Date.now(),
  });

  const res = NextResponse.json({ ok: true, tenant });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
