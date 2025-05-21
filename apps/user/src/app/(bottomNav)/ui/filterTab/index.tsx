"use client";

import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import Image from "next/image";
import { useState } from "react";
import * as styles from "./filterTab.css";

const foodTypeList = ["빵", "디저트", "한식", "과일", "피자", "샐러드"];

export default function FilterTab() {
  const [activeTab, setActiveTab] = useState<string>("reservation");
  const [tempSelectedFoodType, setTempSelectedFoodType] = useState<string>();
  const [selectedFoodType, setSelectedFoodType] = useState<string>();

  const { showBottomSheet, handleShowBottomSheet, handleCloseBottomSheet } = useBottomSheet();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    handleShowBottomSheet("foodType");
  };

  const handleTempFoodTypeClick = (foodType: string) => {
    setTempSelectedFoodType(foodType);
  };

  const handleFoodTypeClick = () => {
    setSelectedFoodType(tempSelectedFoodType);
    handleCloseBottomSheet("foodType");
  };

  const handleResetClick = () => {
    setSelectedFoodType("");
  };

  console.log(selectedFoodType);
  return (
    <>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.tab({ active: activeTab === "reservation" })}
          onClick={() => handleTabClick("reservation")}
        >
          <span
            className={styles.textStyle({ type: "tab", parentActive: activeTab === "reservation" })}
          >
            예약가능만
          </span>
        </button>
        <button
          type="button"
          className={styles.tab({ active: activeTab === "foodType" })}
          onClick={() => handleTabClick("foodType")}
        >
          <span
            className={styles.textStyle({ type: "tab", parentActive: activeTab === "foodType" })}
          >
            {selectedFoodType ? selectedFoodType : "음식 종류"}
          </span>
          <Image
            src="/icons/dropdown_off.svg"
            alt="filter"
            width={16}
            height={16}
            className={styles.imageStyle({ parentActive: activeTab === "foodType" })}
          />
        </button>
        <button
          type="button"
          className={styles.tab({ active: activeTab === "pickupTime" })}
          onClick={() => handleTabClick("pickupTime")}
        >
          <Image
            src="/icons/clock.svg"
            alt="clock"
            width={14}
            height={14}
            className={styles.imageStyle({ parentActive: activeTab === "pickupTime" })}
          />
          <span
            className={styles.textStyle({ type: "tab", parentActive: activeTab === "pickupTime" })}
          >
            픽업 가능시간
          </span>
          <span className={styles.pickupTime}>비어있음</span>
        </button>
      </div>

      {/* 음식 종류 선택 */}
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
    </>
  );
}
