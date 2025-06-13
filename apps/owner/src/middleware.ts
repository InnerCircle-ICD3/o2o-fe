import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!_next/|store/login|store/register|favicon.ico|mockServiceWorker.js|fonts/|images/).*)",
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const loginUrl = new URL("/store/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
