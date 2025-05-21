import { StoreCard } from "@/components/ui/storeList/storeCard";
import { productTitle } from "@/styles/common.css";
import * as styles from "./page.css";
import React, { useEffect, useState } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface Store {
  id: number;
  name: string;
}

export default async function Home() {
  const size = 10;

  const { data, isFetching, error } = useInfiniteScroll({
    size,
    api: "/api/stores",
  });

  const [storeList, setStoreList] = useState<Store[]>([]);

  useEffect(() => {
    if (data) {
      setStoreList((prev) => [...prev, ...data.contents]);
    }
  }, [data]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.myStyle}>
      <h2 className={productTitle}>우리동네에서 지금 할인중이에요!</h2>
      <StoreCard
        imageUrl="/images/store_1.png"
        title="남남 디저트"
        subtitle="김밥 / 주먹밥 / 가정식"
        originalPrice={10000}
        salePrice={5000}
        rating={4.7}
        reviews={257}
        distance="1km"
      />
    </div>
  );
}
