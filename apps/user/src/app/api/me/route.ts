import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        errorCode: "UNAUTHORIZED",
        errorMessage: "토큰이 없습니다.",
      },
      { status: 401 },
    );
  }

  try {
    const payload = verifyToken(token);
    console.log("payload", payload);
    return NextResponse.json({
      success: true,
      data: {
        userId: payload.sub,
        roles: payload.roles,
        nickname: payload.nickname,
        customerId: payload.customerId,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        errorCode: "INVALID_TOKEN",
        errorMessage: "토큰이 유효하지 않습니다.",
      },
      { status: 401 },
    );
  }
}
