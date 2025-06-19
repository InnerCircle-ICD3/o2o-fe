import jwt from "jsonwebtoken";

/**
 * JWT 토큰에 포함된 데이터 타입
 * sub: 사용자 ID
 * roles: 권한 목록
 * customerId: 고객 ID
 * nickname: 닉네임
 * iat: 발급 시간
 * exp: 만료 시간
 */
export interface TokenPayload {
  sub: string;
  roles: string[];
  storeOwnerId: number;
  customerId: number;
  nickname: string;
  iat: number;
  exp: number;
}

const base64Secret = process.env.JWT_SECRET || "";
const SECRET = Buffer.from(base64Secret, "base64").toString("utf-8");

/**
 * JWT 토큰을 검증하고 payload를 반환합니다.
 * @param token - 검증할 JWT 토큰
 * @returns 토큰에 포함된 데이터
 */
export function verifyToken(token: string): TokenPayload {
  try {
    const payload = jwt.verify(token, SECRET) as TokenPayload;
    return payload;
  } catch (err) {
    throw new Error("Invalid token", { cause: err });
  }
}
