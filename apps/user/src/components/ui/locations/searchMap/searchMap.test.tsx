import { getStoresByCenter } from "@/apis/ssr/locations";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import type { MapStore } from "@/types/locations.type";
import { calculateMovedDistance } from "@/utils/locations";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import SearchMap from "../../../../app/(bottomNav)/locations/search/page";

// kakao 객체 mock
globalThis.kakao = {
  maps: {
    Marker: vi.fn().mockImplementation((options) => ({
      ...options,
      setMap: vi.fn(),
      setImage: vi.fn(),
    })),
    MarkerImage: vi.fn(),
    Size: vi.fn(),
    event: {
      addListener: vi.fn(),
    },
    load: vi.fn(),
    Map: vi.fn(),
    Circle: vi.fn(),
    InfoWindow: vi.fn(),
    Polygon: vi.fn().mockImplementation(() => ({
      setMap: vi.fn(),
    })),
    LatLng: vi.fn().mockImplementation((lat, lng) => ({
      getLat: () => lat,
      getLng: () => lng,
    })),
    LatLngBounds: vi.fn().mockImplementation(() => {
      const points: { lat: number; lng: number }[] = [];
      return {
        extend: vi.fn((point) => points.push(point)),
        getBounds: vi.fn(() => points),
      };
    }),
    MarkerClusterer: vi.fn().mockImplementation(() => ({
      addMarkers: vi.fn(),
      clear: vi.fn(),
      removeMarkers: vi.fn(),
    })),
    services: {
      Geocoder: vi.fn().mockImplementation(() => ({
        coord2RegionCode: vi.fn((lng, lat, callback) => {
          if (lng === 126.570677 && lat === 33.450705) {
            callback(
              [
                {
                  // biome-ignore lint/style/useNamingConvention: false
                  region_type: "H",
                  // biome-ignore lint/style/useNamingConvention: false
                  address_name: "제주특별자치도 제주시 아라동",
                },
              ],
              "OK",
            );
          } else {
            callback([], "ZERO_RESULT");
          }
        }),
      })),
    },
  },
};

vi.mock("@/hooks/useGeolocation");
vi.mock("@/hooks/useKakaoLoader");
vi.mock("@/apis/ssr/locations");

vi.mock("@/components/common/kakaoMap", () => ({
  KakaoMap: ({
    lat,
    lng,
    onMapIdle,
    onMapReady,
  }: {
    lat: number;
    lng: number;
    onMapIdle: (map: kakao.maps.Map) => void;
    onMapReady: (map: kakao.maps.Map) => void;
  }) => {
    setTimeout(() => {
      const mockMap = {
        getCenter: () => ({
          getLat: () => lat,
          getLng: () => lng,
        }),
        setMinLevel: () => {},
        setMaxLevel: () => {},
        setCenter: () => {},
        setLevel: () => {},
        setBounds: () => {},
        getLevel: () => 1,
      };
      onMapReady?.(mockMap as kakao.maps.Map);
      onMapIdle?.(mockMap as kakao.maps.Map);
    }, 0);
    return (
      <div data-testid="mock-kakao-map">
        Map at {lat},{lng}
      </div>
    );
  },
}));

vi.mock("@/utils/locations", () => ({
  calculateMovedDistance: vi.fn(),
  createStoreMarker: vi.fn().mockImplementation((store, onMarkerClick) => {
    const marker = {
      setMap: vi.fn(),
      setImage: vi.fn(),
    };
    kakao.maps.event.addListener(marker, "click", () => {
      onMarkerClick(store);
    });
    return marker;
  }),
  createUserMarker: vi.fn(),
}));

describe("SearchMap", () => {
  const mockLocation = { lat: 37.123456, lng: 127.123456 };
  const mockStores: MapStore[] = [
    {
      storeId: 1,
      storeName: "Store 1",
      coordinate: {
        latitude: 37.123456,
        longitude: 127.123456,
      },
    },
    {
      storeId: 2,
      storeName: "Store 2",
      coordinate: {
        latitude: 37.123457,
        longitude: 127.123457,
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (getStoresByCenter as Mock).mockResolvedValue({
      success: true,
      data: { storeList: mockStores },
    });
  });

  it("useKakaoLoader나 useGeolocation이 로드되지 않으면 LoadingMap을 보여준다", () => {
    (useKakaoLoader as Mock).mockReturnValue(false);
    (useGeolocation as Mock).mockReturnValue(null);

    render(<SearchMap />);

    expect(screen.queryByTestId("mock-kakao-map")).not.toBeInTheDocument();
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
    (calculateMovedDistance as Mock).mockReturnValue(0.03);

    render(<SearchMap />);

    const refreshBtn = await screen.findByRole("button", { name: /현 지도에서 검색/i });
    expect(refreshBtn).toBeInTheDocument();
  });

  it("지도가 이동하고 0.02 이상 떨어지지 않으면 '현 지도에서 검색' 버튼이 보이지 않는다", async () => {
    (useGeolocation as Mock).mockReturnValue(mockLocation);
    (useKakaoLoader as Mock).mockReturnValue(true);
    (calculateMovedDistance as Mock).mockReturnValue(0.01);

    render(<SearchMap />);

    const refreshBtn = screen.queryByRole("button", { name: /현 지도에서 검색/i });
    expect(refreshBtn).not.toBeInTheDocument();
  });

  it("현 지도에서 검색 버튼을 클릭하면 새로운 마커가 생성된다", async () => {
    (useGeolocation as Mock).mockReturnValue(mockLocation);
    (useKakaoLoader as Mock).mockReturnValue(true);
    (calculateMovedDistance as Mock).mockReturnValue(0.03);

    render(<SearchMap />);

    const refreshBtn = await screen.findByRole("button", { name: /현 지도에서 검색/i });
    fireEvent.click(refreshBtn);

    await waitFor(() => {
      expect(getStoresByCenter).toHaveBeenCalled();
    });
  });

  it("내 위치로 이동 버튼을 클릭하면 지도가 초기 위치로 이동한다", async () => {
    (useGeolocation as Mock).mockReturnValue(mockLocation);
    (useKakaoLoader as Mock).mockReturnValue(true);

    render(<SearchMap />);

    const resetButton = await screen.findByRole("button", { name: "" });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(getStoresByCenter).toHaveBeenCalled();
    });
  });
});
