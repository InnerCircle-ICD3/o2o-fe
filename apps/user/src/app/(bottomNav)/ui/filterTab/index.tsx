"use client";

import { padTwoDigits } from "@/utils/format";
import classNames from "classnames";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import * as styles from "./filterTab.css";
import FoodTypeFilter from "./foodTypeFilter";
import PickUpTypeFilter from "./pickUpTypeFilter";
import type { FoodType, PickupTime, TabKey } from "./type";

interface FilterTabButtonProps {
  tabKey: TabKey;
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

const FilterTabButton = ({ tabKey, isActive, onClick, children }: FilterTabButtonProps) => {
  return (
    <button
      type="button"
      className={styles.tab({ active: isActive })}
      onClick={onClick}
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${tabKey} 필터 탭`}
    >
      {children}
    </button>
  );
};

export default function FilterTab() {
  const [activeTab, setActiveTab] = useState<TabKey>("reservation");
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | undefined>(undefined);
  const [selectedPickupTime, setSelectedPickupTime] = useState<PickupTime | undefined>(undefined);

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const handleFoodTypeChange = (foodType?: FoodType) => {
    setSelectedFoodType(foodType);
  };

  const handlePickupTimeChange = (time?: PickupTime) => {
    setSelectedPickupTime(time);
  };

  const renderTabContent = (tabKey: TabKey) => {
    switch (tabKey) {
      case "reservation":
        return (
          <span
            className={styles.textStyle({ type: "tab", parentActive: activeTab === "reservation" })}
          >
            예약가능만
          </span>
        );

      case "foodType":
        return (
          <>
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
          </>
        );

      case "pickupTime":
        return (
          <>
            <Image
              src="/icons/clock.svg"
              alt="clock"
              width={14}
              height={14}
              className={styles.imageStyle({ parentActive: activeTab === "pickupTime" })}
            />
            <span
              className={styles.textStyle({
                type: "tab",
                parentActive: activeTab === "pickupTime",
              })}
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
          </>
        );
    }
  };

  const tabs: TabKey[] = ["reservation", "foodType", "pickupTime"];

  return (
    <>
      <div className={styles.container}>
        {tabs.map((tabKey) => (
          <FilterTabButton
            key={tabKey}
            tabKey={tabKey}
            isActive={activeTab === tabKey}
            onClick={() => handleTabClick(tabKey)}
          >
            {renderTabContent(tabKey)}
          </FilterTabButton>
        ))}
      </div>

      {/* 음식 종류 선택 */}
      <FoodTypeFilter
        isOpen={activeTab === "foodType"}
        onChange={handleFoodTypeChange}
        onClose={() => setActiveTab("reservation")}
      />

      {/* 픽업 가능시간 선택 */}
      <PickUpTypeFilter
        isOpen={activeTab === "pickupTime"}
        onChange={handlePickupTimeChange}
        onClose={() => setActiveTab("reservation")}
      />
    </>
  );
}
