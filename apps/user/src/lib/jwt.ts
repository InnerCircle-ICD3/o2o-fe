import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface TokenPayload {
  sub: string; // 사용자 ID (문자열)
  roles: string[]; // 권한 목록 (예: ['USER', 'CUSTOMER'])
  customerId: number; // 고객 ID
  nickname: string; // 닉네임
  iat: number; // 발급 시간 (timestamp)
  exp: number; // 만료 시간 (timestamp)
}

/**
 * JWT 토큰을 검증하고 payload를 반환합니다.
 */
export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, SECRET) as TokenPayload;
  } catch (err) {
    throw new Error("Invalid token", { cause: err });
  }
}
