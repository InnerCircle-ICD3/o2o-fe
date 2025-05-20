"use client";

import Button from "@/components/common/button";
import { KakaoMap } from "@/components/common/kakaoMap";
import { LoadingMap } from "@/components/common/skeleton/LoadingMap";
import { RANGE_OPTIONS } from "@/constants/locations";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { createUserMarker, renderMyLocation } from "@/utils/locations/locationUtils";
import { useCallback, useRef, useState } from "react";
import * as styles from "./page.css";

type RangeOption = 0 | 100 | 500 | 1000;

export default function MyLocationPage() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const location = useGeolocation();
  const isLoaded = useKakaoLoader();

  const [range, setRange] = useState<RangeOption>(500);
  const selectedIndex = RANGE_OPTIONS.findIndex((option) => option.value === range);

  const handleMapReady = useCallback(
    async (map: kakao.maps.Map) => {
      mapRef.current = map;
      if (location) {
        renderMyLocation(map, location.lat, location.lng, range);
        createUserMarker(location, map);
      }
    },
    [location, range],
  );

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
          <Button status="primary" onClick={() => {}}>
            <span className={styles.buttonText}>설정하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
