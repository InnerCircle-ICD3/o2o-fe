import type { Store } from "@/types/searchMap.type";
import { vi } from "vitest";
import {
  calculateMovedDistance,
  createStoreMarker,
  createUserMarker,
  fetchStoresByCenter,
  getRegionByCoords,
  renderMyLocationPolygon,
} from "./locationUtils";

vi.mock("@/hooks/useGeolocation");
vi.mock("@/hooks/useKakaoLoader");

describe("locationUtils", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    globalThis.kakao = {
      maps: {
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
        // biome-ignore lint/style/useNamingConvention: false
        Polygon: vi.fn().mockImplementation(() => ({
          setMap: vi.fn(),
        })),
        // biome-ignore lint/style/useNamingConvention: false
        LatLng: vi.fn().mockImplementation((lat, lng) => ({
          getLat: () => lat,
          getLng: () => lng,
        })),
        // biome-ignore lint/style/useNamingConvention: false
        LatLngBounds: vi.fn().mockImplementation(() => {
          const points: { lat: number; lng: number }[] = [];
          return {
            extend: vi.fn((point) => points.push(point)),
            getBounds: vi.fn(() => points),
          };
        }),
        services: {
          // biome-ignore lint/style/useNamingConvention: false
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

    it("선택된 마커는 '/icons/selected_store_marker.svg' 이미지를 사용해야 한다", () => {
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

      const markerImageSpy = vi.spyOn(globalThis.kakao.maps, "MarkerImage");
      createStoreMarker(mockStore, map, onClick, true);

      expect(markerImageSpy).toHaveBeenCalledWith(
        "/icons/selected_store_marker.svg",
        expect.any(globalThis.kakao.maps.Size),
        expect.anything(),
      );
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

  describe("renderMyLocationPolygon()", () => {
    it("내 위치 표시 영역을 렌더링해야 합니다", () => {
      const map = {
        setBounds: vi.fn(),
        setLevel: vi.fn(),
      } as unknown as kakao.maps.Map;

      const basePolygonPath = [
        new kakao.maps.LatLng(37.5665, 126.978),
        new kakao.maps.LatLng(37.5665, 126.9781),
        new kakao.maps.LatLng(37.5666, 126.9781),
        new kakao.maps.LatLng(37.5666, 126.978),
        new kakao.maps.LatLng(37.5665, 126.978),
      ];

      const radius = 1000;
      const polygon = renderMyLocationPolygon(map, basePolygonPath, radius);
      expect(polygon).toBeDefined();
    });
  });

  describe("getRegionByCoords()", () => {
    it("정상 응답이 오면 해당 지역명을 반환해야 합니다.", async () => {
      const result = await getRegionByCoords(33.450705, 126.570677);
      expect(result).toBe("제주특별자치도 제주시 아라동");
    });

    it("region_type이 'H'가 없으면 null을 반환해야 합니다.", async () => {
      globalThis.kakao.maps.services.Geocoder = vi.fn().mockImplementation(() => ({
        coord2RegionCode: (
          _lng: number,
          _lat: number,
          callback: (
            // biome-ignore lint/style/useNamingConvention: false
            result: Array<{ region_type: string; address_name: string }>,
            status: string,
          ) => void,
        ) => {
          // biome-ignore lint/style/useNamingConvention: false
          callback([{ region_type: "B", address_name: "다른 주소" }], "OK");
        },
      }));

      const result = await getRegionByCoords(33.450705, 126.570677);
      expect(result).toBeNull();
    });

    it("status가 OK가 아니면 null을 반환해야 합니다.", async () => {
      globalThis.kakao.maps.services.Geocoder = vi.fn().mockImplementation(() => ({
        coord2RegionCode: (
          _lng: number,
          _lat: number,
          callback: (
            // biome-ignore lint/style/useNamingConvention: false
            result: Array<{ region_type: string; address_name: string }>,
            status: string,
          ) => void,
        ) => {
          callback([], "ZERO_RESULT");
        },
      }));

      const result = await getRegionByCoords(33.450705, 126.570677);
      expect(result).toBeNull();
    });
  });
});
