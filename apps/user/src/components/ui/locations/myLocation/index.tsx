"use client";

import { postCustomerAddress } from "@/apis/ssr/locations";
import Button from "@/components/common/button";
import ErrorUi from "@/components/common/errorUi";
import { KakaoMap } from "@/components/common/kakaoMap";
import { LoadingMap } from "@/components/ui/locations/loadingMap";
import { ADDRESS_TYPES } from "@/constants/locations";
import useDeleteCustomerAddress from "@/hooks/api/useDeleteCustomerAddress";
import useGetCustomerAddress from "@/hooks/api/useGetCustomerAddress";
import { useKakaoLoader } from "@/hooks/useKakaoLoader";
import { useSelectedAddressStore } from "@/stores/selectedAddressStore";
import { useToastStore } from "@/stores/useToastStore";
import { userInfoStore } from "@/stores/userInfoStore";
import { createUserMarker, renderMyLocationCircle } from "@/utils/locations";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AddressSelector from "../addressSelector";
import RangeSelector from "../rangeSelector";
import * as styles from "./myLocation.css";

export default function MyLocation() {
  const router = useRouter();
  const { user } = userInfoStore();
  const selectedAddressStore = useSelectedAddressStore();
  const { showToast } = useToastStore();
  const isLoaded = useKakaoLoader();
  const [range, setRange] = useState(0.5);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const circleRef = useRef<kakao.maps.Circle | null>(null);

  const {
    data: customerAddress,
    isLoading,
    isError,
    error,
  } = useGetCustomerAddress(user?.customerId);
  const { mutate: deleteCustomerAddress } = useDeleteCustomerAddress();

  const addressMap = useMemo(
    () => ({
      HOME: customerAddress?.find((addr) => addr.customerAddressType === "HOME"),
      WORK: customerAddress?.find((addr) => addr.customerAddressType === "WORK"),
    }),
    [customerAddress],
  );

  const searchParams = useSearchParams();
  const addressType = (searchParams.get("address_type") || "HOME") as "HOME" | "WORK";
  useEffect(() => {
    setSelectedIndex(addressType === "WORK" ? 1 : 0);
  }, [addressType]);

  useEffect(() => {
    if (
      !selectedAddressStore.selectedAddress.HOME &&
      !selectedAddressStore.selectedAddress.WORK &&
      customerAddress
    ) {
      if (customerAddress.find((addr) => addr.customerAddressType === "HOME")) {
        setSelectedIndex(0);
      } else if (customerAddress.find((addr) => addr.customerAddressType === "WORK")) {
        setSelectedIndex(1);
      }
    }
  }, [
    customerAddress,
    selectedAddressStore.selectedAddress.HOME,
    selectedAddressStore.selectedAddress.WORK,
  ]);

  useEffect(() => {
    const type = ADDRESS_TYPES[selectedIndex];
    const selected = selectedAddressStore.selectedAddress[type];

    if (selected?.address?.coordinate) {
      setLocation({
        lat: selected.address.coordinate.latitude,
        lng: selected.address.coordinate.longitude,
      });
      setRange(selected.radiusInKilometers);
    } else if (addressMap[type]) {
      setLocation({
        lat: addressMap[type].latitude,
        lng: addressMap[type].longitude,
      });
      setRange(addressMap[type].radiusInKilometers);
    } else if (
      !selectedAddressStore.selectedAddress.HOME &&
      !selectedAddressStore.selectedAddress.WORK &&
      !addressMap.HOME &&
      !addressMap.WORK
    ) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setRange(0.5);
        });
      }
    }
  }, [selectedIndex, selectedAddressStore.selectedAddress, addressMap]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !location) return;

    markerRef.current?.setMap(null);
    circleRef.current?.setMap(null);

    markerRef.current = createUserMarker(location, mapRef.current);
    circleRef.current = renderMyLocationCircle(mapRef.current, location, range);
    mapRef.current.setCenter(new window.kakao.maps.LatLng(location.lat, location.lng));
  }, [isLoaded, location, range]);

  const handleMapReady = useCallback((map: kakao.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleRegister = async () => {
    const type = ADDRESS_TYPES[selectedIndex];
    const selected = selectedAddressStore.selectedAddress[type];
    if (!user?.customerId || !selected) return;

    const result = await postCustomerAddress({
      customerId: user.customerId,
      address: {
        ...selected,
        customerAddressType: type,
        radiusInKilometers: range,
      },
    });

    if (result.success) {
      showToast("주소가 등록되었습니다.");
      selectedAddressStore.clearSelectedAddress(type);
      router.push("/mypage");
    } else {
      showToast("주소 등록에 실패했습니다.", true);
    }
  };

  if (isError) return <ErrorUi message={error?.message} />;
  if (!location || !isLoaded || isLoading) return <LoadingMap />;

  return (
    <div className={styles.container}>
      <KakaoMap lat={location.lat} lng={location.lng} onMapReady={handleMapReady} />

      <div className={styles.bottomSheetContainer}>
        <div className={styles.bottomSheetHeader}>
          <h3 className={styles.bottomSheetTitle}>내 동네</h3>
        </div>

        <div className={styles.bottomSheetContent}>
          <AddressSelector
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            customerAddress={customerAddress}
            selectedAddress={{
              HOME: selectedAddressStore.selectedAddress.HOME,
              WORK: selectedAddressStore.selectedAddress.WORK,
            }}
            deleteCustomerAddress={deleteCustomerAddress}
            clearSelectedAddress={selectedAddressStore.clearSelectedAddress}
          />

          <RangeSelector
            range={range}
            setRange={setRange}
            isDisabled={!selectedAddressStore.selectedAddress[ADDRESS_TYPES[selectedIndex]]}
          />

          <div className={styles.buttonWrapper}>
            <Button
              status="primary"
              onClick={handleRegister}
              disabled={!selectedAddressStore.selectedAddress[ADDRESS_TYPES[selectedIndex]]}
            >
              <p className={styles.buttonText}>등록하기</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
