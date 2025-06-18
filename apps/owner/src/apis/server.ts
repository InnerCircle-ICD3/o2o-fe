import ky, { type Options } from "ky";
import { toResult } from "./utils/result";

/**
 * SSR 전용 API 클라이언트
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
    const { cookies } = await import("next/headers");
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
  prefixUrl: "https://store-owner.eatngo.org/api/v1", // 실제 백엔드 URL
});

/**
 * SSR 전용 API 클라이언트
 */
const createServerApiClient = (kyInstance: typeof ky) => ({
  /**
   * GET 요청 (SSR 전용)
   */
  get: async <T>(url: string, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => kyInstance.get(url, mergedOptions).json());
  },

  /**
   * POST 요청 (SSR 전용)
   */
  post: async <T>(url: string, data?: unknown, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      json: data,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => kyInstance.post(url, mergedOptions).json());
  },

  /**
   * PUT 요청 (SSR 전용)
   */
  put: async <T>(url: string, data: unknown, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      json: data,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => kyInstance.put(url, mergedOptions).json());
  },

  /**
   * PATCH 요청 (SSR 전용)
   */
  patch: async <T>(url: string, data: unknown, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      json: data,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => kyInstance.patch(url, mergedOptions).json());
  },

  /**
   * DELETE 요청 (SSR 전용)
   */
  delete: async <T>(url: string, options: Options = {}) => {
    const authHeaders = await getServerAuthHeaders();
    const mergedOptions = {
      ...options,
      headers: { ...authHeaders, ...options.headers },
    };
    return toResult<T>(() => kyInstance.delete(url, mergedOptions).json());
  },
});

// SSR 전용 API 클라이언트 export
export const serverApi = createServerApiClient(serverApiInstance);
