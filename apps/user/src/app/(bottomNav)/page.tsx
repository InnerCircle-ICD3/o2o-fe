"use client";

import StoreListContainer from "@/components/ui/storeList/storeListContainer";
import FilterTab from "../../components/ui/filterTab";
import MainHeader from "../../components/ui/mainHeader";
import * as style from "./page.css";

export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <MainHeader />
        <FilterTab />
      </div>
      <StoreListContainer />
    </div>
  );
}
