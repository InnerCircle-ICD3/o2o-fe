"use client";

import { productTitle } from "@/components/ui/storesDetail/storesProducts/storesProduct.css";
import * as styles from "./page.css";
import StoreListContainer from "./stores/StoreListContainer";
export default function Home() {
  return (
    <div className={styles.myStyle}>
      <h2 className={productTitle}>우리동네에서 지금 할인중이에요!</h2>
      <StoreListContainer />
    </div>
  );
}
