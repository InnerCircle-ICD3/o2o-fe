"use client";

import { useBottomSheet } from "@/hooks/useBottomSheet";
import { padTwoDigits } from "@/utils/format";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import * as styles from "./filterTab.css";
import FoodTypeFilter from "./foodTypeFilter";
import PickUpTypeFilter from "./pickUpTypeFilter";
import type { FoodType, PickupTime } from "./type";

type TabKey = "reservation" | "foodType" | "pickupTime";

export default function FilterTab() {
  const [activeTab, setActiveTab] = useState<TabKey>("reservation");
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | undefined>(undefined);
  const [selectedPickupTime, setSelectedPickupTime] = useState<PickupTime | undefined>(undefined);

  const { handleShowBottomSheet, showBottomSheet, handleCloseBottomSheet } = useBottomSheet();

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
    handleShowBottomSheet(tab);
  };

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
          <span
            className={classNames(
              styles.pickupTime,
              selectedPickupTime?.day ? styles.pickupTimeActive : "",
            )}
          >
            {selectedPickupTime?.day
              ? `${selectedPickupTime.day} ${padTwoDigits(selectedPickupTime.hour ?? 0)}:${padTwoDigits(selectedPickupTime.minute ?? 0)}`
              : "픽업 가능시간"}
          </span>
        </button>
      </div>

      {/* 음식 종류 선택 */}
      <FoodTypeFilter
        setSelectedFoodType={setSelectedFoodType}
        showBottomSheet={showBottomSheet}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />

      {/* 픽업 가능시간 선택 */}
      <PickUpTypeFilter
        setSelectedPickupTime={setSelectedPickupTime}
        showBottomSheet={showBottomSheet}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    </>
  );
}
