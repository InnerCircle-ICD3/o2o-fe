import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useGeolocation } from "../useGeolocation";

describe("useGeolocation", () => {
  const mockPosition = {
    coords: {
      latitude: 37.123456,
      longitude: 127.123456,
    },
  };

  const mockGeolocation = {
    getCurrentPosition: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error 테스트 환경에서만 사용되는 임시 타입
    global.navigator.geolocation = mockGeolocation;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("위치 정보를 성공적으로 가져오면 좌표를 반환한다", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    expect(result.current).toEqual({
      lat: 37.123456,
      lng: 127.123456,
    });
  });

  it("위치 정보 가져오기를 실패하면 기본 좌표를 반환한다", () => {
    mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
      error(new Error("위치 정보를 가져올 수 없습니다."));
    });

    const { result } = renderHook(() => useGeolocation());

    expect(result.current).toEqual({
      lat: 37.123456,
      lng: 127.123456,
    });
  });

  it("geolocation이 지원되지 않으면 기본 좌표를 반환한다", () => {
    // @ts-expect-error 테스트 환경에서만 사용되는 임시 타입
    global.navigator.geolocation = undefined;

    const { result } = renderHook(() => useGeolocation());

    expect(result.current).toEqual({
      lat: 37.123456,
      lng: 127.123456,
    });
  });

  it("위치 정보의 소수점 6자리까지만 사용한다", () => {
    const longPosition = {
      coords: {
        latitude: 37.123456789,
        longitude: 127.123456789,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(longPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    expect(result.current).toEqual({
      lat: 37.123456,
      lng: 127.123456,
    });
  });
});
