import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KakaoMap } from ".";

// kakao.maps 모킹
const mockMapInstance = {
  setMinLevel: vi.fn(),
  setMaxLevel: vi.fn(),
  setCenter: vi.fn(),
};

const mockKakaoMaps = {
  Map: vi.fn().mockReturnValue(mockMapInstance),
  LatLng: vi.fn(),
  event: {
    addListener: vi.fn(),
  },
};

// 전역 kakao 객체 모킹
global.kakao = {
  maps: mockKakaoMaps,
} as unknown as typeof kakao;

describe("KakaoMap", () => {
  const mockProps = {
    lat: 37.5665,
    lng: 126.978,
    onMapIdle: vi.fn(),
    onMapReady: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("지도가 올바르게 초기화되어야 합니다", () => {
    render(<KakaoMap {...mockProps} />);

    // kakao.maps.Map이 호출되었는지 확인
    expect(mockKakaoMaps.Map).toHaveBeenCalled();

    // kakao.maps.LatLng가 올바른 좌표로 호출되었는지 확인
    expect(mockKakaoMaps.LatLng).toHaveBeenCalledWith(mockProps.lat, mockProps.lng);

    // 지도 레벨 설정이 호출되었는지 확인
    expect(mockMapInstance.setMinLevel).toHaveBeenCalledWith(1);
    expect(mockMapInstance.setMaxLevel).toHaveBeenCalledWith(6);
  });

  it("onMapReady 콜백이 호출되어야 합니다", () => {
    render(<KakaoMap {...mockProps} />);

    // Map 인스턴스가 생성된 후 onMapReady가 호출되었는지 확인
    expect(mockProps.onMapReady).toHaveBeenCalledWith(mockMapInstance);
  });

  it("위치가 변경되면 지도 중심이 업데이트되어야 합니다", () => {
    const { rerender } = render(<KakaoMap {...mockProps} />);

    // 새로운 위치로 props 업데이트
    const newProps = {
      ...mockProps,
      lat: 37.5666,
      lng: 126.9781,
    };

    rerender(<KakaoMap {...newProps} />);

    // setCenter가 새로운 좌표로 호출되었는지 확인
    expect(mockMapInstance.setCenter).toHaveBeenCalled();
    expect(mockKakaoMaps.LatLng).toHaveBeenCalledWith(newProps.lat, newProps.lng);
  });
});
