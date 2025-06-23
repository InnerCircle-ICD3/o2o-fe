import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({
      success: true,
      data: null,
    });
  }

  try {
    const payload = verifyToken(token);
    return NextResponse.json({
      success: true,
      data: {
        userId: payload.sub,
        storeOwnerId: payload.storeOwnerId,
        roles: payload.roles,
        nickname: payload.nickname,
      },
    });
  } catch {
    return NextResponse.redirect(new URL("/store/login"));
  }
}
