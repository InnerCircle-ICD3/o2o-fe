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
) => {
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(store.latitude, store.longitude),
    map,
    image: new kakao.maps.MarkerImage("/icons/map_marker.svg", new kakao.maps.Size(36, 36), {
      verticalAlign: "bottom",
    }),
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
    image: new kakao.maps.MarkerImage("/icons/my_marker.svg", new kakao.maps.Size(24, 24), {
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
