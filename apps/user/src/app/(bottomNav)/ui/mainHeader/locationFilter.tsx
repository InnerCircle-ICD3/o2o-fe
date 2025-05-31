import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import Image from "next/image";
import { useState } from "react";
import * as styles from "./mainHeader.css";

type Location = "강남역" | string;

interface LocationFilterProps {
  isOpen: boolean;
  onChange: (location?: Location) => void;
  onClose: () => void;
}

export default function LocationFilter({ isOpen, onChange, onClose }: LocationFilterProps) {
  const [tempSelectedLocation, setTempSelectedLocation] = useState<Location | undefined>();

  const handleLocationClick = (location: Location) => {
    setTempSelectedLocation(location);
  };

  const handleSelectComplete = () => {
    onChange(tempSelectedLocation);
    onClose();
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
            onClick={() => handleLocationClick("강남역")}
            aria-pressed={tempSelectedLocation === "강남역"}
          >
            <Image src="/icons/pin.svg" alt="store" width={30} height={30} />
            <span>강남역</span>
          </button>
        </li>
        <li className={styles.bottomSheetListItemStyle}>
          <button
            className={styles.bottomSheetListItemButtonStyle}
            type="button"
            onClick={handleAddLocation}
          >
            <Image src="/icons/add.svg" alt="store" width={30} height={30} />
            <span>자주가는 장소 등록</span>
          </button>
        </li>
      </ul>
      <Button status="primary" style={{ marginTop: 20 }} onClick={handleSelectComplete}>
        선택완료
      </Button>
    </BottomSheet>
  );
}
