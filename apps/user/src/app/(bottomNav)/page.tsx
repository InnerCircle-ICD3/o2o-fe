"use client";

import StoreListContainer from "@/components/ui/storeList/storeListContainer";
import { productTitle } from "@/styles/common.css";
import * as styles from "./page.css";
import FilterTab from "./ui/filterTab";
import MainHeader from "./ui/mainHeader";

export default function Home() {
  return (
    <>
      <MainHeader />
      <FilterTab />
      <div className={styles.mainStyle}>
        <h2 className={productTitle}>우리동네에서 지금 할인중이에요!</h2>
        <StoreListContainer />
      </div>
    </>
  );
}
