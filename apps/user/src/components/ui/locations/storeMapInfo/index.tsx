import type { Store } from "@/types/searchMap.type";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import * as styles from "./storeMapInfo.css";

interface StoreInfoCardProps {
  store: Store;
}

export const StoreInfoCard = ({ store }: StoreInfoCardProps) => {
  return (
    <div className={styles.storeInfoCard}>
      <Image
        className={styles.mainThumbnail}
        src={store.thumbnailUrl || "/images/thumb.png"}
        alt={store.name}
        width={500}
        height={120}
      />
      <div className={styles.statusBadge}>판매중</div>
      <div className={styles.likeButton}>
        <Image src="/icons/favorite.svg" alt="like" width={16} height={16} />
      </div>

      <div className={styles.storeCardContent}>
        <div className={styles.ratingRow}>
          <div className={styles.flexRow}>
            <h3 className={styles.storeCardTitle}>{store.name}</h3>
            <div className={styles.categoryText}>{store.category.split(",").join(" / ")}</div>
          </div>
          <div className={styles.originPrice}>{formatCurrency(store.minPrice * 2)}</div>
        </div>
        <div className={styles.ratingRow}>
          <div className={styles.flexRow}>
            <Image src="/icons/star.svg" alt="review" width={16} height={16} />
            <span>5.0</span>
            <span>(100)</span>
            <span>{store.distance}km</span>
          </div>
          <div className={styles.salePrice}>{formatCurrency(store.minPrice)}</div>
        </div>
      </div>
    </div>
  );
};
