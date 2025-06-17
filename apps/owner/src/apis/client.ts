import ky, { type Options } from "ky";
import { toResult } from "./utils/result";

/**
 * API 클라이언트 설정 파일
 *
 * 두 개의 다른 base URL을 가진 API 클라이언트를 제공합니다:
 * 1. api: 일반 API 호출용 (도메인/api/v1)
 * 2. productApi: Product 관련 API 호출용 (도메인만)
 */

// ========================
// API 인스턴스 생성
// ========================

/**
 * 일반 API 클라이언트 인스턴스
 * Base URL: 도메인/api/v1 (예: https://api.example.com/api/v1)
 */
const apiInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL, // 도메인/api/v1
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // 쿠키 포함하여 요청
});

/**
 * @deprecated
 * Product API 클라이언트 인스턴스
 * Base URL: 도메인만 (예: https://api.example.com)
 * 환경변수에서 /api/v1 부분을 제거하여 도메인만 사용
 */
const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1$/, "") || "";
const productApiInstance = ky.create({
  prefixUrl: baseUrl, // 도메인만
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // 쿠키 포함하여 요청
});

// ========================
// 공통 API 클라이언트 팩토리
// ========================

/**
 * API 클라이언트 생성 함수
 *
 * @param kyInstance - ky 인스턴스
 * @returns HTTP 메서드별 API 클라이언트 객체
 *
 * 모든 API 응답은 toResult로 래핑되어 에러 핸들링이 용이합니다.
 */
const createApiClient = (kyInstance: typeof ky) => ({
  /**
   * GET 요청
   * @param url - 요청할 URL
   * @param options - ky Options (headers, searchParams, timeout 등)
   */
  get: async <T>(url: string, options: Options = {}) => {
    return toResult<T>(() => kyInstance.get(url, options).json());
  },

  /**
   * POST 요청
   * @param url - 요청할 URL
   * @param data - 전송할 데이터
   * @param options - ky Options (headers, timeout 등, json은 자동으로 설정됨)
   */
  post: async <T>(url: string, data?: unknown, options: Options = {}) => {
    return toResult<T>(() => kyInstance.post(url, { json: data, ...options }).json());
  },

  /**
   * PUT 요청
   * @param url - 요청할 URL
   * @param data - 전송할 데이터
   * @param options - ky Options (headers, timeout 등, json은 자동으로 설정됨)
   */
  put: async <T>(url: string, data: unknown, options: Options = {}) => {
    return toResult<T>(() => kyInstance.put(url, { json: data, ...options }).json());
  },

  /**
   * PATCH 요청
   * @param url - 요청할 URL
   * @param data - 전송할 데이터
   * @param options - ky Options (headers, timeout 등, json은 자동으로 설정됨)
   */
  patch: async <T>(url: string, data: unknown, options: Options = {}) => {
    return toResult<T>(() => kyInstance.patch(url, { json: data, ...options }).json());
  },

  /**
   * DELETE 요청
   * @param url - 요청할 URL
   * @param options - ky Options (headers, searchParams, timeout 등)
   */
  delete: async <T>(url: string, options: Options = {}) => {
    return toResult<T>(() => kyInstance.delete(url, options).json());
  },
});

// ========================
// Export API 클라이언트들
// ========================
export const api = createApiClient(apiInstance);

/**
 * @deprecated
 */
export const productApi = createApiClient(productApiInstance);
