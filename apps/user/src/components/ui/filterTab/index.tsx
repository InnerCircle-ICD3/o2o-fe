"use client";

import { useFilterTab } from "@/stores/useFilterTab";
import { padTwoDigits } from "@/utils/format";
import classNames from "classnames";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { foodTypeList } from "./constant";
import * as styles from "./filterTab.css";
import FoodTypeFilter from "./foodTypeFilter";
import PickUpTimeFilter from "./pickUpTimeFilter";
import type { TabKey } from "./type";

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
  const {
    reservable,
    selectedFoodType,
    selectedPickupTime,
    onToggleReservable,
    onResetFoodType,
    onResetPickupTime,
    onResetReservable,
  } = useFilterTab();
  const [activeTab, setActiveTab] = useState<TabKey>("reservation");

  const handleTabClick = (tab: TabKey) => {
    if (tab === "reset") {
      handleReset();
    } else {
      setActiveTab(tab);
    }
  };

  const handleReset = () => {
    onResetFoodType();
    onResetPickupTime();
    onResetReservable();
  };

  const renderTabContent = (tabKey: TabKey) => {
    switch (tabKey) {
      case "foodType":
        return (
          <>
            <span
              className={styles.textStyle({ type: "tab", parentActive: activeTab === "foodType" })}
            >
              {foodTypeList.find(
                (f: { label: string; value: string }) => f.value === selectedFoodType,
              )?.label || "음식 종류"}
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

      case "reset":
        return (
          <>
            <Image
              src="/icons/reset.svg"
              alt="clock"
              width={14}
              height={14}
              className={styles.imageStyle({ parentActive: activeTab === "reset" })}
            />
            <span
              className={styles.textStyle({
                type: "tab",
              })}
            >
              초기화
            </span>
          </>
        );
    }
  };

  const tabs: TabKey[] = ["foodType", "pickupTime"];

  if (reservable || selectedFoodType || selectedPickupTime) tabs.push("reset");

  return (
    <>
      <div className={styles.container}>
        <button
          type={"button"}
          className={styles.reservation({ parentActive: reservable })}
          onClick={onToggleReservable}
        >
          예약가능만
        </button>

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
        onClose={() => setActiveTab("reservation")}
      />

      {/* 픽업 가능시간 선택 */}
      <PickUpTimeFilter
        isOpen={activeTab === "pickupTime"}
        onClose={() => setActiveTab("reservation")}
      />
    </>
  );
}
