import ky from "ky";
import { toResult } from "./utils/result";

// ownerApi 설정
const ownerApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_OWNER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ownerApi 함수들
export const ownerApiClient = {
  get: async <T>(url: string, options = {}) => {
    return toResult<T>(() => ownerApi.get(url, options).json());
  },

  post: async <T>(url: string, data: unknown, options = {}) => {
    return toResult<T>(() => ownerApi.post(url, { json: data, ...options }).json());
  },

  put: async <T>(url: string, data: unknown, options = {}) => {
    return toResult<T>(() => ownerApi.put(url, { json: data, ...options }).json());
  },

  delete: async <T>(url: string, options = {}) => {
    return toResult<T>(() => ownerApi.delete(url, options).json());
  },
};
