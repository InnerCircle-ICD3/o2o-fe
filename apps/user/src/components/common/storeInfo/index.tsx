import * as commonStyle from "@/styles/common.css";
import type { StoreList } from "@/types/apis/stores.type";
import { formatDistance } from "@/utils/format";
import Image from "next/image";
import * as styles from "./storeInfo.css";

export default function StoreInfo({
  storesDetail,
  showTitle = true,
  showRating = true,
  showDistance = true,
}: {
  storesDetail: StoreList;
  showTitle?: boolean;
  showRating?: boolean;
  showDistance?: boolean;
}) {
  return (
    <>
      {/* storeName */}
      {showTitle && (
        <div className={styles.titleWrapper}>
          <h2 className={commonStyle.title}>{storesDetail.storeName}</h2>
          <div className={styles.subtitle}>{storesDetail.foodCategory.join(" | ")}</div>
        </div>
      )}
      {/* rating & distance */}
      {showRating && (
        <div className={commonStyle.reviewAndDistanceWrapper}>
          <Image src={"/icons/star.svg"} alt={""} width={16} height={16} />
          {showDistance && (
            <span>
              <strong>{storesDetail.ratingAverage}</strong> ({storesDetail.ratingCount}){" "}
              {formatDistance(storesDetail.distanceKm)}
            </span>
          )}
        </div>
      )}
    </>
  );
}
