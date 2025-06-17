"use client";

import ErrorUi from "@/components/common/errorUi";
import { KakaoMap } from "@/components/common/kakaoMap";
import { LoadingMap } from "@/components/ui/locations/loadingMap";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { useCallback, useRef } from "react";
import * as styles from "./storeMap.css";

export default function StoreMap({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const isLoaded = useKakaoLoader();

  const handleMapReady = useCallback(
    (map: kakao.maps.Map) => {
      mapRef.current = map;

      // 매장 위치에 마커 생성
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        map: map,
      });

      // 마커 이미지 설정
      const image = new kakao.maps.MarkerImage(
        "/icons/selected_store_marker.svg",
        new kakao.maps.Size(48, 48),
        {
          verticalAlign: "bottom",
        },
      );
      marker.setImage(image);
    },
    [lat, lng],
  );

  if (!lat || !lng) return <ErrorUi message="위치 정보를 불러오는데 실패했습니다." />;

  if (!isLoaded) return <LoadingMap />;

  return (
    <div className={styles.container}>
      <KakaoMap lat={lat} lng={lng} onMapReady={handleMapReady} />
    </div>
  );
}
