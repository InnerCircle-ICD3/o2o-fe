"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import * as styles from "./searchMap.css";

import type { Store } from "@/types/searchMap.type";

import Button from "@/components/common/button";
import { KakaoMap } from "@/components/common/kakaoMap";

import { LoadingMap } from "@/components/ui/locations/loadingMap";
import { StoreInfoCard } from "@/components/ui/locations/storeMapInfo";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import {
  calculateMovedDistance,
  createStoreMarker,
  createUserMarker,
  fetchStoresByCenter,
} from "@/utils/locations/locationUtils";

export default function SearchMap() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const storeMarkerMap = useRef<Map<number, kakao.maps.Marker>>(new Map());
  const storeListRef = useRef<Store[]>([]);

  const isLoaded = useKakaoLoader();
  const location = useGeolocation();

  const [shouldShowRefetch, setShouldShowRefetch] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  useEffect(() => {
    storeMarkerMap.current.forEach((marker, storeId) => {
      const isSelected = selectedStore?.id === storeId;
      const imageUrl = isSelected ? "/icons/selected_store_marker.svg" : "/icons/store_marker.svg";

      const image = new kakao.maps.MarkerImage(imageUrl, new kakao.maps.Size(48, 48), {
        verticalAlign: "bottom",
      });

      marker.setImage(image);
    });
  }, [selectedStore]);

  const createStoreMarkers = useCallback((stores: Store[], map: kakao.maps.Map) => {
    for (const store of stores) {
      const marker = createStoreMarker(
        store,
        map,
        (clickedStore) => {
          setSelectedStore((prev) => (prev?.id === clickedStore.id ? null : clickedStore));
        },
        false,
      );
      storeMarkerMap.current.set(store.id, marker);
    }
  }, []);

  const handleMapIdle = useCallback(
    async (map: kakao.maps.Map) => {
      if (!location) return;

      const center = map.getCenter();
      const movedDistance = calculateMovedDistance(center, location);

      setShouldShowRefetch(movedDistance > 0.01);
    },
    [location],
  );

  const handleMapReady = useCallback(
    async (map: kakao.maps.Map) => {
      mapRef.current = map;
      const center = map.getCenter();

      const storeList = await fetchStoresByCenter(center);
      storeListRef.current = storeList;

      createStoreMarkers(storeList, map);

      if (location) {
        createUserMarker(location, map);
      }
    },
    [location, createStoreMarkers],
  );

  const handleRefetch = async () => {
    const map = mapRef.current;
    if (!map) return;

    for (const marker of storeMarkerMap.current.values()) {
      marker.setMap(null);
    }
    storeMarkerMap.current.clear();

    const center = map.getCenter();
    const storeList = await fetchStoresByCenter(center);
    storeListRef.current = storeList;

    createStoreMarkers(storeList, map);

    setShouldShowRefetch(false);
  };

  const handleResetPosition = () => {
    if (mapRef.current && location) {
      const latLng = new kakao.maps.LatLng(location.lat, location.lng);
      mapRef.current.setCenter(latLng);
      handleRefetch();
    }
  };

  if (!isLoaded || !location) return <LoadingMap />;

  return (
    <div className={styles.container}>
      <KakaoMap
        lat={location.lat}
        lng={location.lng}
        onMapIdle={handleMapIdle}
        onMapReady={handleMapReady}
      />

      {shouldShowRefetch && (
        <Button
          type="button"
          onClick={handleRefetch}
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            width: "120px",
            height: "40px",
          }}
          status="primary"
        >
          현 지도에서 검색
        </Button>
      )}

      <button
        type="button"
        onClick={handleResetPosition}
        className={`${styles.resetPositionButtonBase} ${
          selectedStore
            ? styles.resetPositionVariants.withStoreInfo
            : styles.resetPositionVariants.default
        }`}
      >
        <Image src="/icons/my_location.svg" alt="" width={24} height={24} />
      </button>

      {selectedStore && <StoreInfoCard store={selectedStore} />}
    </div>
  );
}
