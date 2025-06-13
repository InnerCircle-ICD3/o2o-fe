"use client";

import useAddressList from "@/hooks/api/useAddressList";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useFilterTab } from "@/stores/useFilterTab";
import { userInfoStore } from "@/stores/userInfoStore";
import Image from "next/image";
import Link from "next/link";
import LocationFilter from "./locationFilter";
import * as styles from "./mainHeader.css";

export default function MainHeader() {
  const { user } = userInfoStore();
  const isLogin = !!user;

  const { data: addressData, isError } = useAddressList();
  const { location } = useFilterTab();

  const { showBottomSheet, handleShowBottomSheet, handleCloseBottomSheet } = useBottomSheet();

  return (
    <>
      <header className={styles.mainHeader}>
        <button
          className={styles.mainHeaderLeft}
          disabled={isLogin || isError}
          onClick={() => handleShowBottomSheet("location")}
          type="button"
        >
          <Image src="/icons/store.svg" alt="store" width={24} height={24} />
          <h1 className={styles.mainTitle}>
            {location ? `${location.label}의 가게` : "모든 지역의 가게"}
          </h1>
        </button>
        <div className={styles.mainHeaderRight}>
          <Link href="/subscribes">
            <Image src="/icons/subscribe_on.svg" alt="찜" width={24} height={24} />
          </Link>
          <Link href="/search">
            <Image src="/icons/search.svg" alt="search" width={24} height={24} />
          </Link>
        </div>
      </header>

      {addressData?.success && (
        <LocationFilter
          isOpen={showBottomSheet.has("location")}
          addressList={addressData.data}
          onClose={() => handleCloseBottomSheet("location")}
        />
      )}
    </>
  );
}
