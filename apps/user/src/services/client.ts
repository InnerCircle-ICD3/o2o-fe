import ky from "ky";

// API 기본 설정
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API 함수들
export const apiClient = {
  get: async <T>(url: string, options = {}) => {
    return api.get(url, options).json<T>();
  },

  post: async <T>(url: string, data: unknown, options = {}) => {
    return api.post(url, { json: data, ...options }).json<T>();
  },

  put: async <T>(url: string, data: unknown, options = {}) => {
    return api.put(url, { json: data, ...options }).json<T>();
  },

  delete: async <T>(url: string, options = {}) => {
    return api.delete(url, options).json<T>();
  },
};
