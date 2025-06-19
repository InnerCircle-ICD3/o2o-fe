import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useKakaoLoader } from ".";

describe("useKakaoLoader", () => {
  let originalKey: string | undefined;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (window as Window & { kakao?: unknown }).kakao = undefined;
    document.head.innerHTML = "";
    originalKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  });

  afterEach(() => {
    if (originalKey === undefined) {
      process.env.NEXT_PUBLIC_KAKAO_JS_KEY = "";
    } else {
      process.env.NEXT_PUBLIC_KAKAO_JS_KEY = originalKey;
    }
  });

  it("이미 kakao.maps가 로드되어 있으면 즉시 true를 반환한다", () => {
    (window as Window & { kakao: { maps: unknown } }).kakao = {
      maps: {},
    };

    const { result } = renderHook(() => useKakaoLoader());
    expect(result.current).toBe(true);
  });

  it("환경변수가 없으면 에러를 출력하고 false를 반환한다", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    process.env.NEXT_PUBLIC_KAKAO_JS_KEY = "";

    const { result } = renderHook(() => useKakaoLoader());

    expect(consoleSpy).toHaveBeenCalledWith(
      "환경변수 NEXT_PUBLIC_KAKAO_JS_KEY가 설정되지 않았습니다.",
    );
    expect(result.current).toBe(false);
  });
});
