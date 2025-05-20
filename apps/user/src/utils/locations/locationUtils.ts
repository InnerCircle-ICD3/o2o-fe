import { baseUrl } from "@/mocks/utils";
import type { Store } from "@/types/searchMap.type";

export const fetchStoresByCenter = async (center: kakao.maps.LatLng): Promise<Store[]> => {
  const response = await fetch(`${baseUrl}/search/stores/map`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      viewPoint: {
        lat: center.getLat(),
        lng: center.getLng(),
      },
    }),
  });

  const json = await response.json();
  return json.data.storeList;
};

export const createStoreMarker = (
  store: Store,
  map: kakao.maps.Map,
  onMarkerClick: (store: Store) => void,
  isSelected = false,
) => {
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(store.latitude, store.longitude),
    map,
    image: new kakao.maps.MarkerImage(
      isSelected ? "/icons/selected_store_marker.svg" : "/icons/store_marker.svg",
      new kakao.maps.Size(48, 48),
      {
        verticalAlign: "bottom",
      },
    ),
    title: store.name,
  });

  kakao.maps.event.addListener(marker, "click", () => {
    onMarkerClick(store);
  });

  return marker;
};

export const createUserMarker = (location: { lat: number; lng: number }, map: kakao.maps.Map) => {
  return new kakao.maps.Marker({
    position: new kakao.maps.LatLng(location.lat, location.lng),
    map,
    image: new kakao.maps.MarkerImage("/icons/my_marker.svg", new kakao.maps.Size(48, 48), {
      verticalAlign: "bottom",
    }),
  });
};

export const calculateMovedDistance = (
  center: kakao.maps.LatLng,
  location: { lat: number; lng: number },
) => {
  return Math.sqrt((center.getLng() - location.lng) ** 2 + (center.getLat() - location.lat) ** 2);
};

/**
 * 반경에 따른 카카오 지도 줌 레벨을 반환
 */
const getZoomLevelByRadius = (radius: number): number => {
  if (radius <= 500) return 4;
  if (radius <= 1000) return 5;
  if (radius <= 2000) return 6;
  return 7;
};

export const renderMyLocation = (
  map: kakao.maps.Map,
  lat: number,
  lng: number,
  radius?: number,
) => {
  const circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(lat, lng),
    radius: radius ?? 500,
    map,
    strokeWeight: 2,
    strokeOpacity: 1,
    strokeColor: "#35A865",
    fillColor: "#35A865",
    fillOpacity: 0.1,
  });

  const range = radius ?? 500;
  const level = getZoomLevelByRadius(range);
  map.setLevel(level);

  return circle;
};

export const getRegionByCoords = (lat: number, lng: number): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!window.kakao?.maps) {
      reject(new Error("카카오맵 API가 로드되지 않았습니다."));
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    const coord = new kakao.maps.LatLng(lat, lng);

    geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === "OK" && result.length > 0) {
        const regionInfo = result.find((r) => r.region_type === "H");
        resolve(regionInfo?.address_name || null);
      } else {
        resolve(null);
      }
    });
  });
};
