import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      jwt.verify(token, SECRET);
      return NextResponse.next();
    } catch {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}
