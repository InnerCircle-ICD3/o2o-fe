"use client";

import { KakaoMap } from "@/components/common/kakaoMap";
import { LoadingMap } from "@/components/common/skeleton/LoadingMap";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { useCallback, useRef } from "react";
import * as styles from "./page.css";

export default function MyLocationPage() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const location = useGeolocation();
  const isLoaded = useKakaoLoader();

  const handleMapIdle = useCallback(
    async (map: kakao.maps.Map) => {
      if (!location) return;

      const center = map.getCenter();
      console.log(center);
    },
    [location],
  );

  const handleMapReady = useCallback(async (map: kakao.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (!location || !isLoaded) return <LoadingMap />;

  return (
    <div className={styles.container}>
      <KakaoMap
        lat={location.lat}
        lng={location.lng}
        onMapIdle={handleMapIdle}
        onMapReady={handleMapReady}
      />
    </div>
  );
}
