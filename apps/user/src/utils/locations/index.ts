import type { CustomerAddressRequest, MapStore, SearchAddressResult } from "@/types/locations.type";

export const createStoreMarker = (
  store: MapStore,
  map: kakao.maps.Map,
  onMarkerClick: (storeId: number) => void,
  isSelected = false,
) => {
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(store.coordinate.latitude, store.coordinate.longitude),
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
  if (radius <= 0.8) return 4;
  if (radius <= 1.5) return 5;
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
    radius: radius * 1000,
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
  const scale = (radius * 1000) / 500;
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

export const getFullAddressByCoords = (
  lat: number,
  lng: number,
): Promise<CustomerAddressRequest | null> => {
  return new Promise((resolve, reject) => {
    if (!window.kakao?.maps) {
      reject(new Error("카카오맵 API가 로드되지 않았습니다."));
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === "OK" && result.length > 0) {
        const r = result[0];

        const customerAddress: CustomerAddressRequest = {
          address: {
            roadNameAddress: r.road_address?.address_name ?? null,
            lotNumberAddress: r.address?.address_name ?? "",
            buildingName: r.road_address?.building_name ?? null,
            zipCode: r.road_address?.zone_no ?? "00000",
            region1DepthName: r.address?.region_1depth_name ?? "",
            region2DepthName: r.address?.region_2depth_name ?? "",
            region3DepthName: r.address?.region_3depth_name ?? "",
            coordinate: {
              latitude: lat,
              longitude: lng,
            },
          },
          radiusInKilometers: 0.5,
          customerAddressType: "HOME",
          description: "", // 추가 설명은 별도로 입력받거나 비워둠
        };

        resolve(customerAddress);
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * 정규식: 주소처럼 보이면 true
 * 예: 00동 12-3, 강남대로 132, 논현로 100
 */
const isLikelyAddress = (query: string) => {
  return /[가-힣]+(로|길|동|면|읍|구|시|도)\s*\d+(-\d+)?/.test(query);
};

export async function searchAddress(query: string): Promise<SearchAddressResult[]> {
  const endpoint = isLikelyAddress(query) ? "address" : "keyword";

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/${endpoint}.json?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    },
  );
  const data = await res.json();

  /* biome-ignore lint/style/useNamingConvention: false */
  return data.documents.map((doc: { address_name: string; y: string; x: string }) => ({
    address: doc.address_name,
    location: {
      lat: Number(Number.parseFloat(doc.y).toFixed(6)),
      lng: Number(Number.parseFloat(doc.x).toFixed(6)),
    },
  }));
}

export function isInBox(
  point: kakao.maps.LatLng,
  box: {
    topLeft: { longitude: number; latitude: number };
    bottomRight: { longitude: number; latitude: number };
  },
) {
  const lat = point.getLat();
  const lng = point.getLng();

  return (
    lng >= box.topLeft.longitude &&
    lng <= box.bottomRight.longitude &&
    lat <= box.topLeft.latitude &&
    lat >= box.bottomRight.latitude
  );
}
