"use client";

import Button from "@/components/common/button";
import { KakaoMap } from "@/components/common/kakaoMap";
import { LoadingMap } from "@/components/ui/locations/loadingMap";
import { RANGE_OPTIONS } from "@/constants/locations";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import {
  createUserMarker,
  getRegionByCoords,
  renderMyLocationCircle,
} from "@/utils/locations/locationUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./myLocation.css";

type RangeOption = (typeof RANGE_OPTIONS)[number]["value"];

export default function MyLocation() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const location = useGeolocation();
  const isLoaded = useKakaoLoader();
  const [range, setRange] = useState<RangeOption>(500);
  const selectedIndex = RANGE_OPTIONS.findIndex((option) => option.value === range);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const circleRef = useRef<kakao.maps.Circle | null>(null);

  // 지도 초기화
  const handleMapReady = useCallback((map: kakao.maps.Map) => {
    mapRef.current = map;
  }, []);

  // 위치나 범위가 변경될 때 마커와 원 업데이트
  useEffect(() => {
    if (!mapRef.current || !location) return;

    // 기존 마커와 원 제거
    if (markerRef.current) markerRef.current.setMap(null);
    if (circleRef.current) circleRef.current.setMap(null);

    // 새로운 마커와 원 생성
    markerRef.current = createUserMarker(location, mapRef.current);
    circleRef.current = renderMyLocationCircle(mapRef.current, location, range);
  }, [location, range]);

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
          <Button status="primary" onClick={handleGetRegion}>
            <span className={styles.buttonText}>설정하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
