import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import { useState } from "react";
import { foodTypeList } from "./constant";
import * as styles from "./filterTab.css";
import type { FoodType } from "./type";

interface FoodTypeFilterProps {
  setSelectedFoodType: (foodType?: FoodType) => void;
  showBottomSheet: Set<string>;
  handleCloseBottomSheet: (type: string) => void;
}

export default function FoodTypeFilter({
  setSelectedFoodType,
  showBottomSheet,
  handleCloseBottomSheet,
}: FoodTypeFilterProps) {
  const [tempSelectedFoodType, setTempSelectedFoodType] = useState<string>();

  const handleTempFoodTypeClick = (foodType: string) => {
    setTempSelectedFoodType(foodType);
  };

  const handleFoodTypeClick = () => {
    setSelectedFoodType(tempSelectedFoodType);
    handleCloseBottomSheet("foodType");
  };
  const handleResetClick = () => {
    setSelectedFoodType(undefined);
    setTempSelectedFoodType(undefined);
  };

  return (
    <BottomSheet
      type="shadow"
      isShow={showBottomSheet.has("foodType")}
      title="음식 종류"
      onClose={() => handleCloseBottomSheet("foodType")}
    >
      <ul className={styles.filterListStyle}>
        {foodTypeList.map((item) => (
          <li
            className={
              tempSelectedFoodType === item
                ? styles.filterListItemSelected
                : styles.filterListItemHover
            }
            key={item}
          >
            <button
              aria-selected={tempSelectedFoodType === item}
              aria-label={`${item} 선택`}
              className={styles.filterListItemButtonStyle}
              type="button"
              onClick={() => handleTempFoodTypeClick(item)}
            >
              <span>{item}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.filterButtonContainer}>
        <Button status="common" onClick={handleResetClick}>
          초기화
        </Button>
        <Button status="primary" onClick={handleFoodTypeClick}>
          선택완료
        </Button>
      </div>
    </BottomSheet>
  );
}
