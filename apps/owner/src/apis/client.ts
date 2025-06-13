import ky from "ky";
import { toResult } from "./utils/result";

// API 클라이언트 인스턴스들
const apiInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL, // 도메인/api/v1
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

// Product API는 도메인만 사용 (api/v1 제외)
const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1$/, "") || "";
const productApiInstance = ky.create({
  prefixUrl: baseUrl, // 도메인만
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

// 공통 API 클라이언트 생성 함수
const createApiClient = (kyInstance: typeof ky) => ({
  get: async <T>(url: string, options = {}) => {
    return toResult<T>(() => kyInstance.get(url, options).json());
  },

  post: async <T>(url: string, data: unknown, options = {}) => {
    return toResult<T>(() => kyInstance.post(url, { json: data, ...options }).json());
  },

  put: async <T>(url: string, data: unknown, options = {}) => {
    return toResult<T>(() => kyInstance.put(url, { json: data, ...options }).json());
  },

  patch: async <T>(url: string, data: unknown, options = {}) => {
    return toResult<T>(() => kyInstance.patch(url, { json: data, ...options }).json());
  },

  delete: async <T>(url: string, options = {}) => {
    return toResult<T>(() => kyInstance.delete(url, options).json());
  },
});

// API 클라이언트들
export const api = createApiClient(apiInstance);
export const productApi = createApiClient(productApiInstance);
