import ky from "ky";
import { toResult } from "./utils/result";

/**
 * CSR 전용 API 클라이언트 (Owner 앱용)
 *
 * - 프록시를 통한 API 호출 (/api 경로)
 * - 브라우저 쿠키 자동 포함
 * - Client Component에서만 사용
 */

// CSR 전용 API 기본 설정
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // 브라우저가 자동으로 쿠키 포함
});

// CSR 전용 API 함수들
export const apiClient = {
  get: async <T>(url: string, options = {}) => {
    return toResult<T>(() => api.get(url, options).json());
  },

  post: async <T>(url: string, data?: unknown, options = {}) => {
    return toResult<T>(() => api.post(url, { json: data, ...options }).json());
  },

  put: async <T>(url: string, data: unknown, options = {}) => {
    return toResult<T>(() => api.put(url, { json: data, ...options }).json());
  },

  delete: async <T>(url: string, options = {}) => {
    return toResult<T>(() => api.delete(url, options).json());
  },

  patch: async <T>(url: string, data: unknown, options = {}) => {
    return toResult<T>(() => api.patch(url, { json: data, ...options }).json());
  },
};
