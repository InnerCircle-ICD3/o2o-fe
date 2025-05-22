"use client";

import Button from "@/components/common/button";
import { KakaoMap } from "@/components/common/kakaoMap";
import { LoadingMap } from "@/components/ui/locations/loadingMap";
import { RANGE_OPTIONS } from "@/constants/locations";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { createUserMarker, getRegionByCoords, renderMyLocationPolygon } from "@/utils/locations/locationUtils";
import { useCallback, useMemo, useRef, useState } from "react";
import * as styles from "./myLocation.css";

type RangeOption = 0 | 100 | 500 | 1000;

export default function MyLocation() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const location = useGeolocation();
  const isLoaded = useKakaoLoader();

  const [range, setRange] = useState<RangeOption>(500);
  const selectedIndex = RANGE_OPTIONS.findIndex((option) => option.value === range);

  const districtBoundary = useMemo(() => {
    if (!isLoaded || !window.kakao?.maps) return [];

    return [
      new window.kakao.maps.LatLng(33.4499, 126.5698),
      new window.kakao.maps.LatLng(33.449, 126.571),
      new window.kakao.maps.LatLng(33.4495, 126.5725),
      new window.kakao.maps.LatLng(33.4502, 126.5732),
      new window.kakao.maps.LatLng(33.4512, 126.573),
      new window.kakao.maps.LatLng(33.452, 126.572),
      new window.kakao.maps.LatLng(33.4523, 126.5705),
      new window.kakao.maps.LatLng(33.4517, 126.5692),
      new window.kakao.maps.LatLng(33.4505, 126.5688),
      new window.kakao.maps.LatLng(33.4499, 126.5698),
    ];
  }, [isLoaded]);

  const handleMapReady = useCallback(
    async (map: kakao.maps.Map) => {
      mapRef.current = map;
      if (location) {
        renderMyLocationPolygon(map, districtBoundary, range);
        createUserMarker(location, map);
      }
    },
    [location, range, districtBoundary],
  );

  const handleGetRegion = async () => {
    if (!location) return;
  
    try {
      const region = await getRegionByCoords(location.lat, location.lng);
      if (region) {
        console.log(region, range);
      }
    } catch (error) {
      console.error("지역 정보를 가져오는 데 실패했습니다:", error);
    }
  };

  if (!location || !isLoaded) return <LoadingMap />;

  return (
    <div className={styles.container}>
      <KakaoMap lat={location.lat} lng={location.lng} onMapReady={handleMapReady} />

      <div className={styles.bottomSheetContainer}>
        <div className={styles.bottomSheetHeader}>
          <h3 className={styles.bottomSheetTitle}>내 동네</h3>
        </div>
        <div className={styles.bottomSheetContent}>
          <div className={styles.trackWrapper}>
            <div className={styles.trackBg} />
            <div
              className={styles.trackProgress}
              style={{ width: `${(selectedIndex / (RANGE_OPTIONS.length - 1)) * 100}%` }}
            />
          </div>
          {RANGE_OPTIONS.map(({ value, label }, index) => {
            const isSelected = range === value;
            const isPassed = index < selectedIndex;

            return (
              <label key={value} className={styles.option}>
                <input
                  type="radio"
                  name="distance"
                  value={value}
                  checked={isSelected}
                  onChange={() => setRange(value as RangeOption)}
                  className={styles.input}
                />
                <span
                  className={`${styles.circle} ${isSelected ? styles.circleSelected : isPassed ? styles.circlePassed : styles.circleInactive}`}
                />
                {label && <span className={styles.label}>{label}</span>}
              </label>
            );
          })}
        </div>
        <div className={styles.bottomSheetFooter}>
          <Button status="primary" onClick={() => handleGetRegion()}>
            <span className={styles.buttonText}>설정하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
