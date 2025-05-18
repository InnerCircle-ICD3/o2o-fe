"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

import * as styles from "./explore.css";

import type { Store } from "@/types/searchMap.type";

import { KakaoMap } from "@/components/common/kakaoMap";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { baseUrl } from "@/mocks/utils";
import Button from "@/components/common/button";
import BottomSheet from "@/components/common/bottomSheet";


export default function ExploreMap() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const isLoaded = useKakaoLoader();
  const location = useGeolocation();
  const [shouldShowRefetch, setShouldShowRefetch] = useState(false);
  const [referenceCenter, setReferenceCenter] = useState<kakao.maps.LatLng | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);


  const fetchStoresByCenter = useCallback(async (center: kakao.maps.LatLng): Promise<Store[]> => {
    const response = await fetch(`${baseUrl}/search/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  }, []);

  const renderMarkers = useCallback((map: kakao.maps.Map, stores: Store[]) => {
    const kakaoMaps = kakao.maps;

    for (const store of stores) {
      const marker = new kakaoMaps.Marker({
        position: new kakaoMaps.LatLng(store.latitude, store.longitude),
        map,
        image: new kakaoMaps.MarkerImage(
          "/icons/map_marker.svg",
          new kakaoMaps.Size(36, 36),
          {
            verticalAlign: "bottom",
          }
        ),
        title: store.name,
      });

      kakaoMaps.event.addListener(marker, 'click', () => {
        setSelectedStore(store);
      });
    }
  }, []);

  const handleMapIdle = useCallback(async (map: kakao.maps.Map) => {
    if (!referenceCenter) return;

    const center = map.getCenter();
    const movedDistance = Math.sqrt(
      (center.getLng() - referenceCenter.getLng()) ** 2 +
      (center.getLat() - referenceCenter.getLat()) ** 2
    );

    setShouldShowRefetch(movedDistance > 0.02);
  }, [referenceCenter]);

  const handleMapReady = useCallback(async (map: kakao.maps.Map) => {
    mapRef.current = map;
    const center = map.getCenter();

    setReferenceCenter(prev => prev ? prev : center);
    const storeList = await fetchStoresByCenter(center);
    renderMarkers(map, storeList);

    if (location) {
      new kakao.maps.Marker({
        position: new kakao.maps.LatLng(location.lat, location.lng),
        map,
        image: new kakao.maps.MarkerImage(
          "/icons/my_marker.svg",
          new kakao.maps.Size(24, 24),
          { verticalAlign: "bottom" }
        ),
      });
    }
  }, [renderMarkers, fetchStoresByCenter, location]);

  const handleRefetch = async () => {
    const map = mapRef.current;
    if(!map) return;
    
    const center = map.getCenter();
    const storeList = await fetchStoresByCenter(center);
    renderMarkers(map, storeList);
    setReferenceCenter(center);
    setShouldShowRefetch(false);
  };

  const handleResetPosition = () => {
    if (mapRef.current && location) {
      const latLng = new kakao.maps.LatLng(location.lat, location.lng);
      mapRef.current.setCenter(latLng);
    }
  }

  if (!isLoaded || !location) return <p>지도를 불러오는 중입니다...</p>;

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
            right: "40%",
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
        className={styles.resetPositionButton}
      >
        <Image src={"/icons/my_location.svg"} alt={""} width={24} height={24} />
      </button>

    
      <BottomSheet
        type="shadow"
        isShow={!!selectedStore}
        title={selectedStore?.name || '상호명'}
        onClose={() => setSelectedStore(null)}
      >
        <h3>{selectedStore?.name}</h3>
        <p>{selectedStore?.address}</p>
      </BottomSheet>

    </div>
  )
}