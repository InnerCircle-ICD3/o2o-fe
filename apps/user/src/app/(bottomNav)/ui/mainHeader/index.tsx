"use client";

import { useBottomSheet } from "@/hooks/useBottomSheet";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LocationFilter from "./locationFilter";
import * as styles from "./mainHeader.css";

export default function MainHeader() {
  const { showBottomSheet, handleShowBottomSheet, handleCloseBottomSheet } = useBottomSheet();
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();

  const handleLocationChange = (location?: string) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <header className={styles.mainHeader}>
        <button
          className={styles.mainHeaderLeft}
          onClick={() => handleShowBottomSheet("location")}
          type="button"
        >
          <Image src="/icons/store.svg" alt="store" width={24} height={24} />
          <h1 className={styles.mainTitle}>
            {selectedLocation ? `${selectedLocation}의 가게` : "모든 지역의 가게"}
          </h1>
        </button>
        <div className={styles.mainHeaderRight}>
          <button type="button">
            <Image src="/icons/notice.svg" alt="notice" width={24} height={24} />
          </button>
          <button type="button">
            <Image src="/icons/bookmark.svg" alt="bookmark" width={24} height={24} />
          </button>
          <Link href="/search">
            <Image src="/icons/search.svg" alt="search" width={24} height={24} />
          </Link>
        </div>
      </header>

      <LocationFilter
        isOpen={showBottomSheet.has("location")}
        onChange={handleLocationChange}
        onClose={() => handleCloseBottomSheet("location")}
      />
    </>
  );
}
