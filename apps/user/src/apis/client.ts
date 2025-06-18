import ky from "ky";
import { toResult } from "./utils/result";

// API 기본 설정
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // 브라우저가 자동으로 쿠키 포함
});

// API 함수들
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
