"use client";

import { postCustomerAddress } from "@/apis/ssr/locations";
import Button from "@/components/common/button";
import ErrorUi from "@/components/common/errorUi";
import { KakaoMap } from "@/components/common/kakaoMap";
import { LoadingMap } from "@/components/ui/locations/loadingMap";
import { RANGE_OPTIONS } from "@/constants/locations";
import useDeleteCustomerAddress from "@/hooks/api/useDeleteCustomerAddress";
import useGetCustomerAddress from "@/hooks/api/useGetCustomerAddress";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { useSelectedAddressStore } from "@/stores/selectedAddressStore";
import { userInfoStore } from "@/stores/userInfoStore";
import type { AddressType } from "@/types/locations.type";
import {
  createUserMarker,
  getLocationAndRangeFromAddress,
  renderMyLocationCircle,
} from "@/utils/locations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./myLocation.css";

type RangeOption = (typeof RANGE_OPTIONS)[number]["value"];

export default function MyLocation() {
  const { user } = userInfoStore();
  const isLoggedIn = !!user?.customerId;

  const [range, setRange] = useState<RangeOption>(0.5);
  const selectedAddress = useSelectedAddressStore((state) => state.selectedAddress);
  const clearSelectedAddress = useSelectedAddressStore((state) => state.clearSelectedAddress);

  const router = useRouter();

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAddrIndex, setSelectedAddrIndex] = useState(0);
  const isLoaded = useKakaoLoader();
  const selectedIndex = RANGE_OPTIONS.findIndex((option) => option.value === range);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const circleRef = useRef<kakao.maps.Circle | null>(null);

  const {
    data: customerAddress,
    isLoading: customerAddressLoading,
    isError: isCustomerAddressError,
    error: customerAddressError,
  } = useGetCustomerAddress(user?.customerId);

  const {
    deleteCustomerAddress,
    isPending: deleteCustomerAddressLoading,
    isError: isDeleteCustomerAddressError,
    error: deleteCustomerAddressError,
  } = useDeleteCustomerAddress();

  const handleMapReady = useCallback((map: kakao.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const { location: addrLocation, range: addrRange } = getLocationAndRangeFromAddress(
      customerAddress,
      selectedAddrIndex,
    );
    if (addrLocation) {
      setLocation(addrLocation);
      setRange(addrRange as RangeOption);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setRange(0.5 as RangeOption);
      });
    }
  }, [customerAddress, selectedAddrIndex]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !location) return;
    if (markerRef.current) markerRef.current.setMap(null);
    if (circleRef.current) circleRef.current.setMap(null);
    markerRef.current = createUserMarker(location, mapRef.current);
    circleRef.current = renderMyLocationCircle(mapRef.current, location, range);
  }, [isLoaded, location, range]);

  const addressTypes: AddressType[] = ["HOME", "WORK"];

  if (!isLoggedIn) {
    router.push("/login");
  }

  if (isCustomerAddressError || isDeleteCustomerAddressError) {
    return (
      <ErrorUi message={customerAddressError?.message || deleteCustomerAddressError?.message} />
    );
  }

  if (!location || !isLoaded || customerAddressLoading || deleteCustomerAddressLoading)
    return <LoadingMap />;

  return (
    <div className={styles.container}>
      <KakaoMap lat={location.lat} lng={location.lng} onMapReady={handleMapReady} />

      <div className={styles.bottomSheetContainer}>
        <div className={styles.bottomSheetHeader}>
          <h3 className={styles.bottomSheetTitle}>내 동네</h3>
        </div>
        <div className={styles.bottomSheetContent}>
          <div className={styles.buttonWrapper}>
            {addressTypes.map((type, idx) => {
              const tempAddr = selectedAddress[type];
              const addr = tempAddr || customerAddress?.[idx];
              const isSelected = selectedAddrIndex === idx;
              let region2 = "";
              let region3 = "";
              let customerId: number | undefined = undefined;
              let addressId: number | undefined = undefined;
              if (addr) {
                if ("address" in addr) {
                  region2 = addr.address.region2DepthName;
                  region3 = addr.address.region3DepthName;
                } else {
                  region2 = addr.region2DepthName;
                  region3 = addr.region3DepthName;
                  customerId = addr.customerId;
                  addressId = addr.id;
                }
              }
              return addr ? (
                <Button
                  key={type}
                  status={isSelected ? "primary" : "common"}
                  onClick={() => {
                    setSelectedAddrIndex(idx);
                  }}
                >
                  <div className={styles.buttonContent}>
                    {region2} {region3}
                    <Image
                      src="/icons/btn_close_white.svg"
                      alt="close"
                      width={14}
                      height={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (tempAddr) {
                          clearSelectedAddress(type);
                        } else {
                          deleteCustomerAddress({
                            customerId,
                            addressId,
                          });
                        }
                      }}
                    />
                  </div>
                </Button>
              ) : (
                <Button
                  key={type}
                  onClick={() => router.push(`/locations/address-search?address_type=${type}`)}
                >
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

          <div className={styles.buttonWrapper}>
            <Button
              status="primary"
              onClick={async () => {
                const type = addressTypes[selectedAddrIndex];
                const tempAddr = selectedAddress[type];
                if (!user?.customerId || !tempAddr) return;
                const addressWithRange = {
                  ...tempAddr,
                  radiusInKilometers: range,
                };
                const result = await postCustomerAddress({
                  customerId: user.customerId,
                  address: addressWithRange,
                });
                if (result.success) {
                  clearSelectedAddress(type);
                  router.push("/mypage");
                }
              }}
              disabled={!selectedAddress[addressTypes[selectedAddrIndex]]}
            >
              <p className={styles.buttonText}>등록하기</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
