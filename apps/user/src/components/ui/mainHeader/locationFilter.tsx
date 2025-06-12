import type { CustomerAddress } from "@/apis/ssr/locations";
import BottomSheet from "@/components/common/bottomSheet";
import { useFilterTab } from "@/stores/useFilterTab";
import Image from "next/image";
import * as styles from "./mainHeader.css";

interface LocationFilterProps {
  isOpen: boolean;
  addressList: CustomerAddress[];
  onClose: () => void;
}

export default function LocationFilter({ isOpen, addressList, onClose }: LocationFilterProps) {
  const { onLocationChange, onResetLocation } = useFilterTab();

  const handleSelectLocation = (address: CustomerAddress) => {
    const location = {
      label: address.description,
      coordinate: address.address.coordinate,
    };

    onLocationChange(location);
  };

  const handleAddLocation = () => {
    // TODO: 자주가는 장소 등록 로직
    console.log("자주가는 장소 등록");
  };

  return (
    <BottomSheet type="shadow" isShow={isOpen} title="지역을 선택해주세요" onClose={onClose}>
      <ul className={styles.bottomSheetListStyle}>
        <li className={styles.bottomSheetListItemStyle}>
          <button
            className={styles.bottomSheetListItemButtonStyle}
            type="button"
            onClick={onResetLocation}
          >
            <Image src="/icons/pin.svg" alt="store" width={30} height={30} />
            <span>모든 지역</span>
          </button>
        </li>
        {addressList.map((address, idx) => (
          <li className={styles.bottomSheetListItemStyle} key={`${address.address}-${idx}`}>
            <button
              className={styles.bottomSheetListItemButtonStyle}
              type="button"
              onClick={() => handleSelectLocation(address)}
            >
              <Image src="/icons/pin.svg" alt="store" width={30} height={30} />
              <span>{address.description}</span>
            </button>
          </li>
        ))}
        {addressList.length < 2 && (
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
