import type { Store } from "@/types/searchMap.type";
import Image from "next/image";
import * as styles from "../explore.css";

interface StoreInfoCardProps {
  store: Store;
}

export const StoreInfoCard = ({ store }: StoreInfoCardProps) => {
  return (
    <div className={styles.storeInfoCard}>
      <div className={styles.flexColumn}>
        <div className={styles.flexRow}>
          <h3 className={styles.storeName}>{store.name}</h3>
        </div>

        <div className={styles.flexRow}>
          <Image
            className={styles.thumbnail}
            src={store.thumbnailUrl || "/images/storeThumbnail.png"}
            alt={store.name}
            width={80}
            height={80}
          />
          <div className={styles.flexColumn}>
            <p className={styles.tagList}>{store.category.split(",").join(" | ")}</p>
            <p className={styles.pickupTime}>픽업 : {store.pickupTime}</p>
            <div className={styles.minPrice}>{store.minPrice}원 ~</div>
          </div>
        </div>
      </div>
    </div>
  );
};
