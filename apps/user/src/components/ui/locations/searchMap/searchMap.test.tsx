import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { render, screen } from "@testing-library/react";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import SearchMap from "../../../../app/(bottomNav)/locations/search/page";

vi.mock("@/hooks/useGeolocation");
vi.mock("@/hooks/useKakaoLoader");

vi.mock("@/components/common/kakaoMap", () => ({
  // biome-ignore lint/style/useNamingConvention: false
  KakaoMap: ({
    lat,
    lng,
    onMapIdle,
  }: { lat: number; lng: number; onMapIdle: (map: kakao.maps.Map) => void }) => {
    setTimeout(() => {
      onMapIdle?.({
        getCenter: () => ({
          getLat: () => lat,
          getLng: () => lng,
        }),
        setMinLevel: () => {},
        setMaxLevel: () => {},
        setCenter: () => {},
        setLevel: () => {},
        setBounds: () => {},
      });
    }, 0);
    return (
      <div data-testid="mock-kakao-map">
        Map at {lat},{lng}
      </div>
    );
  },
}));

vi.mock("@/utils/locations/locationUtils", async () => {
  return {
    fetchStoresByCenter: vi.fn().mockResolvedValue([]),
    calculateMovedDistance: vi.fn().mockReturnValue(0.03),
    createStoreMarker: vi.fn(),
    createUserMarker: vi.fn(),
  };
});

describe("SearchMap", () => {
  const mockLocation = { lat: 37.123456, lng: 127.123456 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useKakaoLoader나 useGeolocation이 로드되지 않으면 LoadingMap을 보여준다", () => {
    (useKakaoLoader as Mock).mockReturnValue(false);
    (useGeolocation as Mock).mockReturnValue(null);

    render(<SearchMap />);

    expect(screen.queryByTestId("mock-kakao-map")).toBeNull();

    expect(screen.getByText((text) => text.includes("지도를 불러오는 중"))).toBeTruthy();
  });

  it("지도가 렌더링되면 KakaoMap이 좌표에 맞춰 렌더링된다.", () => {
    (useKakaoLoader as Mock).mockReturnValue(true);
    (useGeolocation as Mock).mockReturnValue(mockLocation);

    render(<SearchMap />);

    const map = screen.getByTestId("mock-kakao-map");
    expect(map.textContent).toContain(`${mockLocation.lat},${mockLocation.lng}`);
  });

  it("지도가 이동하고 0.02 이상 떨어지면 '현 지도에서 검색' 버튼이 보인다", async () => {
    (useGeolocation as Mock).mockReturnValue(mockLocation);
    (useKakaoLoader as Mock).mockReturnValue(true);

    render(<SearchMap />);

    const refreshBtn = await screen.findByRole("button", { name: /현 지도에서 검색/i });

    expect(refreshBtn).not.toBeNull();
  });
});
