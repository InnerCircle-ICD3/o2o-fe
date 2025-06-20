"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import * as styles from "./searchMap.css";

import type { MapStore } from "@/types/locations.type";

import Button from "@/components/common/button";
import { KakaoMap } from "@/components/common/kakaoMap";

import { getStoresByCenter, getStoresByCenterRefresh } from "@/apis/ssr/locations";
import { LoadingMap } from "@/components/ui/locations/loadingMap";
import { StoreInfoCard } from "@/components/ui/locations/storeMapInfo";
import { CLUSTERER_STYLE } from "@/constants/locations";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import {
  calculateMovedDistance,
  createStoreMarker,
  createUserMarker,
  isInBox,
} from "@/utils/locations";

export default function SearchMap() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const boxRef = useRef<{
    topLeft: { longitude: number; latitude: number };
    bottomRight: { longitude: number; latitude: number };
  } | null>(null);

  const storeMarkerMap = useRef<Map<number, kakao.maps.Marker>>(new Map());
  const storeListRef = useRef<MapStore[]>([]);
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);

  const isLoaded = useKakaoLoader();
  const location = useGeolocation();

  const [shouldShowRefetch, setShouldShowRefetch] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  useEffect(() => {
    for (const [storeId, marker] of storeMarkerMap.current) {
      const isSelected = selectedStoreId === storeId;
      const imageUrl = isSelected ? "/icons/selected_store_marker.svg" : "/icons/store_marker.svg";

      const image = new kakao.maps.MarkerImage(imageUrl, new kakao.maps.Size(48, 48), {
        verticalAlign: "bottom",
      });

      marker.setImage(image);
    }
  }, [selectedStoreId]);

  const createStoreMarkers = useCallback((stores: MapStore[], map: kakao.maps.Map) => {
    const markers: kakao.maps.Marker[] = [];
    for (const store of stores) {
      const marker = createStoreMarker(
        store,
        map,
        (storeId) => {
          setSelectedStoreId((prev) => (prev === storeId ? null : storeId));
        },
        false,
      );
      storeMarkerMap.current.set(store.storeId, marker);
      markers.push(marker);
    }
    return markers;
  }, []);

  const handleMapIdle = useCallback(
    async (map: kakao.maps.Map) => {
      if (!location) return;

      const center = map.getCenter();
      const movedDistance = calculateMovedDistance(center, location);
      const level = map.getLevel();

      setShouldShowRefetch(movedDistance > 0.001 && level <= 2);

      if (boxRef.current && !isInBox(center, boxRef.current)) {
        await handleRefetch("REFETCH");
      }
    },
    [location],
  );

  const handleMapReady = useCallback(
    async (map: kakao.maps.Map) => {
      mapRef.current = map;
      const center = map.getCenter();

      const result = await getStoresByCenter(center);
      if (!result.success) return;
      boxRef.current = result.data.box;
      storeListRef.current = result.data.storeList;

      const clusterer = new kakao.maps.MarkerClusterer({
        map,
        averageCenter: true,
        minLevel: 5,
        disableClickZoom: true,
        styles: [CLUSTERER_STYLE],
      });

      clustererRef.current = clusterer;

      const markers: kakao.maps.Marker[] = [];

      for (const store of storeListRef.current) {
        if (!store.coordinate) {
          console.warn("store.coordinate is null", store);
          continue;
        }

        const marker = createStoreMarker(store, map, (storeId) => {
          setSelectedStoreId((prev) => (prev === storeId ? null : storeId));
        });

        storeMarkerMap.current.set(store.storeId, marker);
        markers.push(marker);
      }

      clusterer.addMarkers(markers);

      if (location) {
        createUserMarker(location, map);
      }

      kakao.maps.event.addListener(map, "click", () => {
        setSelectedStoreId(null);
      });
    },
    [location],
  );

  const handleRefetch = async (type: "REFETCH" | "REFRESH") => {
    const map = mapRef.current;
    const clusterer = clustererRef.current;
    if (!map || !clusterer) return;

    // 기존 마커 제거
    const oldMarkers = Array.from(storeMarkerMap.current.values());
    for (const marker of oldMarkers) {
      marker.setMap(null);
    }
    clusterer.removeMarkers(oldMarkers);

    storeMarkerMap.current.clear();
    clusterer.clear(); // 클러스터 정보 초기화

    const center = map.getCenter();
    const result =
      type === "REFETCH" ? await getStoresByCenter(center) : await getStoresByCenterRefresh(center);
    if (!result || !result.success) return;

    storeListRef.current = result.data.storeList;
    boxRef.current = result.data.box;

    // 새로운 마커 추가
    const newMarkers = createStoreMarkers(storeListRef.current, map);
    clusterer.addMarkers(newMarkers);

    setShouldShowRefetch(false);
  };

  const handleResetPosition = () => {
    if (mapRef.current && location) {
      const latLng = new kakao.maps.LatLng(location.lat, location.lng);
      mapRef.current.setCenter(latLng);
      handleRefetch("REFETCH");
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
          onClick={() => handleRefetch("REFRESH")}
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            width: "140px",
            height: "40px",
          }}
          status="primary"
        >
          <span className={styles.buttonText}>
            <Image src="/icons/reload.svg" alt="refresh" width={14} height={14} />현 지도에서 검색
          </span>
        </Button>
      )}

      <button
        type="button"
        onClick={handleResetPosition}
        className={`${styles.resetPositionButtonBase} ${
          selectedStoreId
            ? styles.resetPositionVariants.withStoreInfo
            : styles.resetPositionVariants.default
        }`}
      >
        <Image src="/icons/my_location.svg" alt="" width={24} height={24} />
      </button>

      {selectedStoreId && <StoreInfoCard storeId={selectedStoreId} />}
    </div>
  );
}
