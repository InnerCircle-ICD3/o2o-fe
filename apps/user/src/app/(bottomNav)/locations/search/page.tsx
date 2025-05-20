"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import * as styles from "./page.css";

import type { Store } from "@/types/searchMap.type";

import Button from "@/components/common/button";
import { KakaoMap } from "@/components/common/kakaoMap";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import {
  calculateMovedDistance,
  createStoreMarker,
  createUserMarker,
  fetchStoresByCenter,
} from "../../../../utils/locations/locationUtils";
import { LoadingMap } from "./ui/LoadingMap";
import { StoreInfoCard } from "./ui/StoreInfoCard";

export default function ExploreMap() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const isLoaded = useKakaoLoader();
  const location = useGeolocation();
  const [shouldShowRefetch, setShouldShowRefetch] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleMapIdle = useCallback(
    async (map: kakao.maps.Map) => {
      if (!location) return;

      const center = map.getCenter();
      const movedDistance = calculateMovedDistance(center, location);

      setShouldShowRefetch(movedDistance > 0.02);
    },
    [location],
  );

  const handleMapReady = useCallback(
    async (map: kakao.maps.Map) => {
      mapRef.current = map;
      const center = map.getCenter();

      const storeList = await fetchStoresByCenter(center);
      for (const store of storeList) {
        createStoreMarker(
          store,
          map,
          (clickedStore) => {
            setSelectedStore((prev) => (prev?.id === clickedStore.id ? null : clickedStore));
          },
          selectedStore?.id === store.id,
        );
      }

      if (location) {
        createUserMarker(location, map);
      }
    },
    [location, selectedStore],
  );

  const handleRefetch = async () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();
    const storeList = await fetchStoresByCenter(center);
    for (const store of storeList) {
      createStoreMarker(store, map, (clickedStore) => {
        setSelectedStore((prev) => (prev?.id === clickedStore.id ? null : clickedStore));
      });
    }
    setShouldShowRefetch(false);
  };

  const handleResetPosition = () => {
    if (mapRef.current && location) {
      const latLng = new kakao.maps.LatLng(location.lat, location.lng);
      mapRef.current.setCenter(latLng);
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
            width: "100px",
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
