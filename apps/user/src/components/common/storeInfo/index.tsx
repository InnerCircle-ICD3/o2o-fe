import * as commonStyle from "@/styles/common.css";
import type { StoreList } from "@/types/apis/stores.type";
import Image from "next/image";
import * as styles from "./storeInfo.css";

export default function StoreInfo({
  storesDetail,
  showTitle = true,
  showRating = true,
  showDistance = true,
  showCategories = true,
}: {
  storesDetail: StoreList;
  showTitle?: boolean;
  showRating?: boolean;
  showDistance?: boolean;
  showCategories?: boolean;
}) {
  if (!storesDetail) return null;
  const { storeName, reviewScore, reviewCount, distanceKm, category } = storesDetail;
  const categoryText = category.join(" / ");

  return (
    <>
      {/* storeName */}
      {showTitle && (
        <div className={styles.titleWrapper}>
          <h2 className={commonStyle.title}>{storeName}</h2>
          {showCategories && <div className={styles.subtitle}>{categoryText}</div>}
        </div>
      )}
      {/* rating & distance */}
      {showRating && (
        <div className={commonStyle.reviewAndDistanceWrapper}>
          <Image src={"/icons/review.svg"} alt={""} width={16} height={16} />
          {showDistance && (
            <span>
              <strong>{reviewScore ?? 0}</strong> ({reviewCount ?? 0}) {distanceKm ?? 0}km
            </span>
          )}
        </div>
      )}
    </>
  );
}
