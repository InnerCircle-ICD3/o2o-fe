"use client";

// import { getCustomerAddress } from "@/apis/ssr/customer";
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
  // searchAddress,
} from "@/utils/locations/locationUtils";
// import { useQuery } from "@tanstack/react-query";
// import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";
import { useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./myLocation.css";

type RangeOption = (typeof RANGE_OPTIONS)[number]["value"];

export default function MyLocation() {
  const [range, setRange] = useState<RangeOption>(500);
  // const [query, setQuery] = useState("");
  // const [searchResults, setSearchResults] = useState<string[]>([]);
  // const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const location = useGeolocation();
  const isLoaded = useKakaoLoader();
  const selectedIndex = RANGE_OPTIONS.findIndex((option) => option.value === range);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const circleRef = useRef<kakao.maps.Circle | null>(null);

  // const { data: customerAddress, isLoading: isCustomerAddressLoading } = useQuery({
  //   queryKey: ["customerAddress"],
  //   queryFn: () => getCustomerAddress({ customerId: 5 }),
  // });

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

  // 카카오 주소 검색
  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     const results = await searchAddress(query);
  //     setSearchResults(results);
  //   }, 300);
  //   return () => clearTimeout(timer);
  // }, [query]);

  const handleGetRegion = async () => {
    if (!location) return;

    try {
      const region = await getRegionByCoords(location.lat, location.lng);
      console.log(region, range);
      if (region) {
        console.log(region, range);
      }
    } catch (error) {
      console.error("지역 정보를 가져오는 데 실패했습니다:", error);
    }
  };

  // const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
  //   const newRegions = [...selectedRegions];
  //   newRegions[index] = e.target.value;
  //   setSelectedRegions(newRegions);
  // };

  // const handleRemoveRegion = (index: number) => {
  //   const newRegions = [...selectedRegions];
  //   newRegions.splice(index, 1);
  //   setSelectedRegions(newRegions);
  // };

  // const handleAddRegion = () => {
  //   setSelectedRegions([...selectedRegions, ""]);
  // };

  if (!location || !isLoaded) return <LoadingMap />;

  return (
    <div className={styles.container}>
      <KakaoMap lat={location.lat} lng={location.lng} onMapReady={handleMapReady} />

      <div className={styles.bottomSheetContainer}>
        <div className={styles.bottomSheetHeader}>
          <h3 className={styles.bottomSheetTitle}>내 동네</h3>
        </div>
        <div className={styles.bottomSheetContent}>
          <div className={styles.buttonWrapper}>
            <Button status="primary" onClick={handleGetRegion}>
              설정하기
            </Button>
            <Button onClick={handleGetRegion}>
              <p className={styles.buttonText}>+</p>
            </Button>
          </div>

          <div className={styles.searchWrapper}>
            <div className={styles.trackWrapper}>
              <div className={styles.trackBg} />
              <div
                className={styles.trackProgress}
                style={{ width: `${(selectedIndex / (RANGE_OPTIONS.length - 1)) * 100}%` }}
              />
            </div>
            <div className={styles.rangeWrapper}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
