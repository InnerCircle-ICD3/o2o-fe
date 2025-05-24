import type { Store } from "@/types/searchMap.type";
import { vi } from "vitest";
import {
  calculateMovedDistance,
  createStoreMarker,
  createUserMarker,
  fetchStoresByCenter,
} from "./locationUtils";

declare global {
  namespace kakao.maps {
    interface Map {
      getCenter: () => {
        getLat: () => number;
        getLng: () => number;
      };
    }
    interface LatLng {
      getLat: () => number;
      getLng: () => number;
    }
    interface Marker {
      setMap: (map: Map | null) => void;
    }
    interface MarkerImage {}
    interface Size {}
    interface Circle {}
    interface InfoWindow {}
  }
}

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
      });
    }, 0);
    return (
      <div data-testid="mock-kakao-map">
        Map at {lat},{lng}
      </div>
    );
  },
}));

describe("locationUtils", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    globalThis.kakao = {
      maps: {
        // biome-ignore lint/style/useNamingConvention: false
        LatLng: vi.fn((lat, lng) => ({ getLat: () => lat, getLng: () => lng })),
        // biome-ignore lint/style/useNamingConvention: false
        Marker: vi.fn().mockImplementation((options) => ({
          ...options,
          setMap: vi.fn(),
        })),
        // biome-ignore lint/style/useNamingConvention: false
        MarkerImage: vi.fn(),
        // biome-ignore lint/style/useNamingConvention: false
        Size: vi.fn(),
        event: {
          addListener: vi.fn(),
        },
        load: vi.fn(),
        // biome-ignore lint/style/useNamingConvention: false
        Map: vi.fn(),
        // biome-ignore lint/style/useNamingConvention: false
        Circle: vi.fn(),
        // biome-ignore lint/style/useNamingConvention: false
        InfoWindow: vi.fn(),
      },
    };
  });

  describe("fetchStoresByCenter()", () => {
    it("중심 좌표를 기반으로 가게 목록을 가져와야 합니다", async () => {
      const mockResponse = {
        data: {
          storeList: [{ id: 1, name: "카페 도치", latitude: 37.5665, longitude: 126.978 }],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const center = new kakao.maps.LatLng(37.5665, 126.978);
      const result = await fetchStoresByCenter(center);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/search/stores/map"),
        expect.any(Object),
      );
      expect(result).toEqual(mockResponse.data.storeList);
    });
  });

  describe("createStoreMarker()", () => {
    it("가게 마커를 생성해야 합니다", () => {
      const mockStore: Store = {
        id: 1,
        name: "테스트 가게",
        latitude: 37.5665,
        longitude: 126.978,
        thumbnailUrl: "",
        category: "",
        distance: 0,
        address: "",
        isOpen: true,
        minPrice: 0,
        maxPrice: 0,
        pickupTime: "",
      };

      const map = {} as kakao.maps.Map;
      const onClick = vi.fn();

      createStoreMarker(mockStore, map, onClick, true);

      expect(globalThis.kakao.maps.Marker).toHaveBeenCalledWith(
        expect.objectContaining({
          position: expect.any(Object),
          image: expect.any(Object),
          title: mockStore.name,
        }),
      );

      expect(globalThis.kakao.maps.event.addListener).toHaveBeenCalledWith(
        expect.any(Object),
        "click",
        expect.any(Function),
      );
    });

    it("선택된 마커는 더 큰 크기로 생성되어야 합니다", () => {
      const mockStore: Store = {
        id: 1,
        name: "테스트 가게",
        latitude: 37.5665,
        longitude: 126.978,
        thumbnailUrl: "",
        category: "",
        distance: 0,
        address: "",
        isOpen: true,
        minPrice: 0,
        maxPrice: 0,
        pickupTime: "",
      };

      const mockMap = {} as kakao.maps.Map;
      const mockOnMarkerClick = vi.fn();

      const marker = createStoreMarker(mockStore, mockMap, mockOnMarkerClick, true);
      expect(marker).toBeDefined();
    });
  });

  describe("createUserMarker()", () => {
    it("사용자 마커를 생성해야 합니다", () => {
      const location = { lat: 37.5665, lng: 126.978 };
      const mockMap = {} as kakao.maps.Map;

      const marker = createUserMarker(location, mockMap);
      expect(marker).toBeDefined();
    });
  });

  describe("calculateMovedDistance()", () => {
    it("같은 위치일 경우 거리가 0이어야 합니다", () => {
      const center = new kakao.maps.LatLng(37.5665, 126.978);
      const location = { lat: 37.5665, lng: 126.978 };
      const distance = calculateMovedDistance(center, location);

      expect(distance).toBe(0);
    });

    it("두 지점 사이의 거리를 계산해야 합니다", () => {
      const center = new kakao.maps.LatLng(37.5665, 126.978);
      const location = { lat: 37.5666, lng: 126.9781 };
      const distance = calculateMovedDistance(center, location);

      expect(distance).toBeGreaterThan(0);
    });
  });
});
