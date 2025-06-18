import ky, { type Options } from "ky";
import { cookies } from "next/headers";
import { toResult } from "./utils/result";

/**
 * SSR 전용 API 클라이언트 (User 앱용)
 *
 * - 직접 백엔드 API 호출 (프록시 안 거침)
 * - 쿠키를 Authorization 헤더로 변환
 * - Server Component 및 Server Action에서만 사용
 */

/**
 * SSR에서 쿠키를 Authorization 헤더로 변환하는 함수
 */
const getServerAuthHeaders = async () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  try {
    // SSR 전용 파일이므로 최상단에서 정적 import 사용
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn("SSR에서 토큰을 가져오는데 실패했습니다:", error);
  }

  return headers;
};

/**
 * SSR 전용 API 인스턴스
 * 직접 백엔드 API 호출 (환경변수에서 실제 백엔드 URL 사용)
 */
const serverApiInstance = ky.create({
  prefixUrl: "https://customer.eatngo.org/api/v1", // 실제 백엔드 URL
});

/**
 * SSR 전용 API 클라이언트
 */
export const serverApiClient = {
  get: async <T>(url: string, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => serverApiInstance.get(url, mergedOptions).json());
  },

  post: async <T>(url: string, data?: unknown, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      json: data,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => serverApiInstance.post(url, mergedOptions).json());
  },

  put: async <T>(url: string, data: unknown, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      json: data,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => serverApiInstance.put(url, mergedOptions).json());
  },

  patch: async <T>(url: string, data: unknown, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      json: data,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => serverApiInstance.patch(url, mergedOptions).json());
  },

  delete: async <T>(url: string, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => serverApiInstance.delete(url, mergedOptions).json());
  },
};
