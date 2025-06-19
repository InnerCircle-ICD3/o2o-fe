import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useKakaoLoader } from ".";

const fullKakaoMapsMock = {
  load: vi.fn(),
  services: { Geocoder: vi.fn() },
  MarkerClusterer: vi.fn(),
  Map: vi.fn(),
  LatLng: vi.fn(),
  Marker: vi.fn(),
  MarkerImage: vi.fn(),
  Size: vi.fn(),
  event: { addListener: vi.fn() },
  Circle: vi.fn(),
  InfoWindow: vi.fn(),
  Polygon: vi.fn(),
  LatLngBounds: vi.fn(),
};

type KakaoMapsMock = typeof fullKakaoMapsMock;
interface WindowWithKakao extends Window {
  kakao?: { maps: KakaoMapsMock };
}

declare const window: WindowWithKakao;

describe("useKakaoLoader", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let originalKakao: WindowWithKakao["kakao"];
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    originalEnv = { ...process.env };
    originalKakao = window.kakao;
    originalConsoleError = console.error;
    vi.resetAllMocks();
  });
  afterEach(() => {
    process.env = originalEnv;
    window.kakao = originalKakao;
    console.error = originalConsoleError;
    document.head.innerHTML = "";
  });

  it("이미 kakao.maps가 있으면 바로 true를 반환한다", () => {
    window.kakao = { maps: { ...fullKakaoMapsMock } };
    const { result } = renderHook(() => useKakaoLoader());
    expect(result.current).toBe(true);
  });

  it("환경변수가 없으면 false를 반환하고 콘솔 에러를 출력한다", () => {
    process.env.NEXT_PUBLIC_KAKAO_JS_KEY = undefined;
    window.kakao = undefined;
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => useKakaoLoader());
    expect(result.current).toBe(false);
    expect(errorSpy).toHaveBeenCalledWith(
      "환경변수 NEXT_PUBLIC_KAKAO_JS_KEY가 설정되지 않았습니다.",
    );
  });
});
