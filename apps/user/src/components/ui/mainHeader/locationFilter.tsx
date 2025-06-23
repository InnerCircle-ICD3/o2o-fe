"use client";

import type { CustomerAddress } from "@/apis/ssr/locations";
import BottomSheet from "@/components/common/bottomSheet";
import { useFilterTab } from "@/stores/useFilterTab";
import { useUserLocation } from "@/stores/userLocationStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as styles from "./mainHeader.css";

interface LocationFilterProps {
  isOpen: boolean;
  locationList: CustomerAddress[];
  onClose: () => void;
}

export default function LocationFilter({ isOpen, locationList, onClose }: LocationFilterProps) {
  const { onLocationChange, onResetLocation } = useFilterTab();
  const { updateLocations, resetLocations } = useUserLocation();

  const router = useRouter();

  const handleSelectLocation = (selectedLocation: CustomerAddress) => {
    const coordinate = {
      lat: selectedLocation.latitude,
      lng: selectedLocation.longitude,
    };

    updateLocations(coordinate);
    onLocationChange(selectedLocation.region3DepthName);
    onClose();
  };

  const handleAddLocation = () => {
    router.push("/locations/my-location");
  };

  const handleResetLocation = () => {
    onResetLocation();
    resetLocations();
    onClose();
  };

  return (
    <BottomSheet type="shadow" isShow={isOpen} title="지역을 선택해주세요" onClose={onClose}>
      <ul className={styles.bottomSheetListStyle}>
        <li className={styles.bottomSheetListItemStyle}>
          <button
            className={styles.bottomSheetListItemButtonStyle}
            type="button"
            onClick={handleResetLocation}
          >
            <Image src="/icons/pin.svg" alt="store" width={30} height={30} />
            <span>내 위치</span>
          </button>
        </li>
        {locationList.map((location) => (
          <li className={styles.bottomSheetListItemStyle} key={location.id}>
            <button
              className={styles.bottomSheetListItemButtonStyle}
              type="button"
              onClick={() => handleSelectLocation(location)}
            >
              <Image src="/icons/pin.svg" alt="store" width={30} height={30} />
              <span>{location.region3DepthName}</span>
            </button>
          </li>
        ))}
        {locationList.length < 2 && (
          <li className={styles.bottomSheetListItemStyle}>
            <button
              className={styles.bottomSheetListItemButtonStyle}
              type="button"
              onClick={handleAddLocation}
            >
              <Image src="/icons/add.svg" alt="store" width={30} height={30} />
              <span>장소 등록</span>
            </button>
          </li>
        )}
      </ul>
    </BottomSheet>
  );
}
