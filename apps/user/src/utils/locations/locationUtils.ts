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
        latitude: center.getLat(),
        longitude: center.getLng(),
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

const getZoomLevelByRadius = (radius: number): number => {
  if (radius <= 800) return 4;
  if (radius <= 2000) return 5;
  return 6;
};

const getCentroid = (points: kakao.maps.LatLng[]): { lat: number; lng: number } => {
  const total = points.length;
  const sum = points.reduce(
    (acc, cur) => ({
      lat: acc.lat + cur.getLat(),
      lng: acc.lng + cur.getLng(),
    }),
    { lat: 0, lng: 0 },
  );

  return {
    lat: sum.lat / total,
    lng: sum.lng / total,
  };
};

const scalePolygon = (points: kakao.maps.LatLng[], scale: number): kakao.maps.LatLng[] => {
  const center = getCentroid(points);

  return points.map((point) => {
    const latDiff = point.getLat() - center.lat;
    const lngDiff = point.getLng() - center.lng;

    return new window.kakao.maps.LatLng(center.lat + latDiff * scale, center.lng + lngDiff * scale);
  });
};

export const renderMyLocationPolygon = (
  map: kakao.maps.Map,
  basePolygonPath: kakao.maps.LatLng[],
  radius: number,
) => {
  const scale = radius / 500;
  const scaledPath = scalePolygon(basePolygonPath, scale);

  const polygon = new window.kakao.maps.Polygon({
    path: scaledPath,
    strokeWeight: 2,
    strokeColor: "#35A865",
    strokeOpacity: 1,
    fillColor: "#35A865",
    fillOpacity: 0.4,
  });

  polygon.setMap(map);

  const bounds = new window.kakao.maps.LatLngBounds();
  for (const latlng of scaledPath) {
    bounds.extend(latlng);
  }
  map.setBounds(bounds);

  const zoomLevel = getZoomLevelByRadius(radius);
  map.setLevel(zoomLevel);

  return polygon;
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
