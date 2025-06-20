import BottomSheet from "@/components/common/bottomSheet";
import { useFilterTab } from "@/stores/useFilterTab";
import { foodTypeList } from "../constant";
import type { FoodType } from "../type";
import * as styles from "./foodTypeFilter.css";

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
    onClose();
  };

  return (
    <BottomSheet type="shadow" isShow={isOpen} title="음식 종류" onClose={onClose}>
      <ul className={styles.filterListStyle}>
        <li
          className={!selectedFoodType ? styles.filterListItemSelected : styles.filterListItemHover}
        >
          <button
            className={styles.filterListItemButtonStyle}
            type="button"
            onClick={handleResetFoodType}
          >
            <span>전체</span>
          </button>
        </li>
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
    </BottomSheet>
  );
}
