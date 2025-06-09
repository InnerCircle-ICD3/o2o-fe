"use client";

import { deleteCustomerAddress } from "@/apis/ssr/locations";
import Button from "@/components/common/button";
import { KakaoMap } from "@/components/common/kakaoMap";
import { LoadingMap } from "@/components/ui/locations/loadingMap";
import { RANGE_OPTIONS } from "@/constants/locations";
import useGetCustomerAddress from "@/hooks/api/useGetCustomerAddress";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { createUserMarker, renderMyLocationCircle } from "@/utils/locations/locationUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./myLocation.css";

type RangeOption = (typeof RANGE_OPTIONS)[number]["value"];

export default function MyLocation() {
  const [range, setRange] = useState<RangeOption>(500);

  const router = useRouter();

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const location = useGeolocation();
  const isLoaded = useKakaoLoader();
  const selectedIndex = RANGE_OPTIONS.findIndex((option) => option.value === range);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const circleRef = useRef<kakao.maps.Circle | null>(null);

  const queryClient = useQueryClient();

  const { data: customerAddress, isLoading: customerAddressLoading } = useGetCustomerAddress(5);

  const { mutate: deleteCustomerAddressMutate } = useMutation({
    mutationFn: ({ customerId, addressId }: { customerId: number; addressId: number }) =>
      deleteCustomerAddress({ customerId, addressId }),
    onSuccess: () => {
      // 삭제 성공 시 캐시 무효화 → 데이터 재요청
      queryClient.invalidateQueries({ queryKey: ["customerAddress"] });
    },
    onError: (error) => {
      console.error("삭제 실패", error);
      // 필요시 토스트 알림 등 추가
    },
  });

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

  if (!location || !isLoaded || customerAddressLoading) return <LoadingMap />;

  return (
    <div className={styles.container}>
      <KakaoMap lat={location.lat} lng={location.lng} onMapReady={handleMapReady} />

      <div className={styles.bottomSheetContainer}>
        <div className={styles.bottomSheetHeader}>
          <h3 className={styles.bottomSheetTitle}>내 동네</h3>
        </div>
        <div className={styles.bottomSheetContent}>
          <div className={styles.buttonWrapper}>
            {[0, 1].map((idx) => {
              const addr = customerAddress?.[idx];

              return addr ? (
                <Button key={idx} status="primary">
                  <div className={styles.buttonContent}>
                    {addr.region1DepthName} {addr.region2DepthName} {addr.region3DepthName}
                    <Image
                      src="/icons/btn_close_white.svg"
                      alt="close"
                      width={14}
                      height={14}
                      onClick={() =>
                        deleteCustomerAddressMutate({
                          customerId: addr.customerId,
                          addressId: addr.id,
                        })
                      }
                    />
                  </div>
                </Button>
              ) : (
                <Button key={idx} onClick={() => router.push("/locations/address-search")}>
                  <p className={styles.buttonText}>+</p>
                </Button>
              );
            })}
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
                      className={`${styles.circle} ${
                        isSelected
                          ? styles.circleSelected
                          : isPassed
                            ? styles.circlePassed
                            : styles.circleInactive
                      }`}
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
