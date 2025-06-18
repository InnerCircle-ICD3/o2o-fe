import type { MapStore } from "@/types/locations.type";
import { vi } from "vitest";
import {
  calculateMovedDistance,
  createStoreMarker,
  createUserMarker,
  getFullAddressByCoords,
  renderMyLocationCircle,
  renderMyLocationPolygon,
} from ".";

vi.mock("@/hooks/useGeolocation");
vi.mock("@/hooks/useKakaoLoader");

describe("locationUtils", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    globalThis.kakao = {
      maps: {
        Marker: vi.fn().mockImplementation((options) => ({
          ...options,
          setMap: vi.fn(),
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
        services: {
          Geocoder: vi.fn().mockImplementation(() => ({
            coord2Address: vi.fn((lng, lat, callback) => {
              if (lng === 126.570677 && lat === 33.450705) {
                callback(
                  [
                    {
                      // biome-ignore lint/style/useNamingConvention: false
                      road_address: {
                        // biome-ignore lint/style/useNamingConvention: false
                        address_name: "제주특별자치도 제주시 아라동",
                        // biome-ignore lint/style/useNamingConvention: false
                        building_name: "빌딩명",
                        // biome-ignore lint/style/useNamingConvention: false
                        zone_no: "12345",
                        // biome-ignore lint/style/useNamingConvention: false
                        region_1depth_name: "제주특별자치도",
                        // biome-ignore lint/style/useNamingConvention: false
                        region_2depth_name: "제주시",
                        // biome-ignore lint/style/useNamingConvention: false
                        region_3depth_name: "아라동",
                      },
                      address: {
                        // biome-ignore lint/style/useNamingConvention: false
                        address_name: "제주특별자치도 제주시 아라동",
                        // biome-ignore lint/style/useNamingConvention: false
                        region_1depth_name: "제주특별자치도",
                        // biome-ignore lint/style/useNamingConvention: false
                        region_2depth_name: "제주시",
                        // biome-ignore lint/style/useNamingConvention: false
                        region_3depth_name: "아라동",
                      },
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
        MarkerClusterer: vi.fn().mockImplementation(() => ({
          addMarkers: vi.fn(),
          clear: vi.fn(),
        })),
      },
    };
  });

  describe("createStoreMarker()", () => {
    it("가게 마커를 생성해야 합니다", () => {
      const mockStore: MapStore = {
        storeId: 1,
        storeName: "테스트 가게",
        coordinate: {
          latitude: 37.5665,
          longitude: 126.978,
        },
      };

      const map = {} as kakao.maps.Map;
      const onClick = vi.fn();

      createStoreMarker(mockStore, map, onClick, true);

      expect(globalThis.kakao.maps.Marker).toHaveBeenCalledWith(
        expect.objectContaining({
          position: expect.any(Object),
          image: expect.any(Object),
          title: mockStore.storeName,
        }),
      );

      expect(globalThis.kakao.maps.event.addListener).toHaveBeenCalledWith(
        expect.any(Object),
        "click",
        expect.any(Function),
      );
    });

    it("선택된 마커는 '/icons/selected_store_marker.svg' 이미지를 사용해야 한다", () => {
      const mockStore: MapStore = {
        storeId: 1,
        storeName: "테스트 가게",
        coordinate: {
          latitude: 37.5665,
          longitude: 126.978,
        },
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

  describe("getFullAddressByCoords()", () => {
    it("정상 응답이 오면 CustomerAddressRequest 객체를 반환해야 한다.", async () => {
      const result = await getFullAddressByCoords(33.450705, 126.570677);
      expect(result?.address.lotNumberAddress).toBe("제주특별자치도 제주시 아라동");
    });

    it("응답이 없으면 null을 반환해야 한다.", async () => {
      const result = await getFullAddressByCoords(0, 0);
      expect(result).toBeNull();
    });
  });

  describe("renderMyLocationCircle()", () => {
    it("원을 지도에 렌더링하고 줌 레벨을 조정해야 한다", () => {
      const setMapMock = vi.fn();
      const setLevelMock = vi.fn();

      globalThis.kakao.maps.Circle = vi.fn().mockImplementation(() => ({
        setMap: setMapMock,
      }));

      const map = { setLevel: setLevelMock } as unknown as kakao.maps.Map;
      const location = { lat: 37.5665, lng: 126.978 };
      const radius = 0.5;

      const circle = renderMyLocationCircle(map, location, radius);

      expect(circle).toBeDefined();
      expect(setMapMock).toHaveBeenCalledWith(map);
      expect(setLevelMock).toHaveBeenCalledWith(expect.any(Number));
    });
  });
});
