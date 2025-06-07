import { verifyToken } from "@/lib/jwt";
import { type NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/(topNav|bottomNav)/mypage", "/(topNav|bottomNav)/my-orders"];

export function middleware(request: NextRequest) {
  console.log("pathname");
  const { pathname } = request.nextUrl;

  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path));

  if (!requiresAuth) return NextResponse.next();

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const loginUrl = new URL("/topNav/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/topNav/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/"],
};
