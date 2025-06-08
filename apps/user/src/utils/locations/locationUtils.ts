import type { MapStore } from "@/types/searchMap.type";

export const createStoreMarker = (
  store: MapStore,
  map: kakao.maps.Map,
  onMarkerClick: (storeId: number) => void,
  isSelected = false,
) => {
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(store.coordinates.latitude, store.coordinates.longitude),
    map,
    image: new kakao.maps.MarkerImage(
      isSelected ? "/icons/selected_store_marker.svg" : "/icons/store_marker.svg",
      new kakao.maps.Size(48, 48),
      {
        verticalAlign: "bottom",
      },
    ),
    title: store.storeName,
  });

  kakao.maps.event.addListener(marker, "click", () => {
    onMarkerClick(store.storeId);
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
  if (radius <= 1500) return 5;
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

export const renderMyLocationCircle = (
  map: kakao.maps.Map,
  location: { lat: number; lng: number },
  radius: number,
) => {
  const circle = new window.kakao.maps.Circle({
    center: new window.kakao.maps.LatLng(location.lat, location.lng),
    radius: radius,
    strokeWeight: 2,
    strokeColor: "#35A865",
    strokeOpacity: 1,
    fillColor: "#35A865",
    fillOpacity: 0.4,
  });

  circle.setMap(map);

  const zoomLevel = getZoomLevelByRadius(radius);
  map.setLevel(zoomLevel);

  return circle;
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

export async function searchAddress(query: string): Promise<string[]> {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`,
    {
      headers: {
        /* biome-ignore lint/style/useNamingConvention: false */
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    },
  );
  const data = await res.json();
  return data.documents.map((doc: { address: { addressName: string } }) => doc.address.addressName);
}
