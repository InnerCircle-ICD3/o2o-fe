import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import { useFilterTab } from "@/stores/useFilterTab";
import { foodTypeList } from "./constant";
import * as styles from "./filterTab.css";
import type { FoodType } from "./type";

interface FoodTypeFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FoodTypeFilter({ isOpen, onClose }: FoodTypeFilterProps) {
  const { selectedFoodType, onSelectedFoodType, onResetFoodType } = useFilterTab();

  const handleSubmitFoodType = (food: FoodType) => {
    onSelectedFoodType(food);
    onClose();
  };

  const handleResetFoodType = () => {
    onResetFoodType();
  };

  return (
    <BottomSheet type="shadow" isShow={isOpen} title="음식 종류" onClose={onClose}>
      <ul className={styles.filterListStyle}>
        {foodTypeList.map((item) => (
          <li
            className={
              selectedFoodType === item.value
                ? styles.filterListItemSelected
                : styles.filterListItemHover
            }
            key={item.value}
          >
            <button
              aria-label={`${item.label} 선택`}
              className={styles.filterListItemButtonStyle}
              type="button"
              onClick={() => handleSubmitFoodType(item.value)}
            >
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.filterButtonContainer}>
        <Button status="common" onClick={handleResetFoodType}>
          초기화
        </Button>
      </div>
    </BottomSheet>
  );
}
