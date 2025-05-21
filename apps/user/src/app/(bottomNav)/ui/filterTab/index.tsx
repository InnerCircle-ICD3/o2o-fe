"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import * as styles from "./filterTab.css";

export default function FilterTab() {
  const [activeTab, setActiveTab] = useState<string>("reservation");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={clsx(styles.tab, activeTab === "reservation" && styles.active)}
        onClick={() => handleTabClick("reservation")}
      >
        <span className={styles.tabText}>예약가능만</span>
      </button>
      <button
        type="button"
        className={clsx(styles.tab, activeTab === "foodType" && styles.active)}
        onClick={() => handleTabClick("foodType")}
      >
        <span className={styles.tabText}>음식 종류</span>
        <Image src="/icons/dropdown_off.svg" alt="filter" width={16} height={16} />
      </button>
      <button
        type="button"
        className={clsx(styles.tab, activeTab === "pickupTime" && styles.active)}
        onClick={() => handleTabClick("pickupTime")}
      >
        <Image src="/icons/clock.svg" alt="clock" width={14} height={14} />
        <span className={styles.tabText}>픽업 가능시간</span>
        <span className={styles.pickupTime}>비어있음</span>
      </button>
    </div>
  );
}
