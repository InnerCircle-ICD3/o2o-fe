import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/orders/:path*", "/locations/my-location", "/mypage/delete-account"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
