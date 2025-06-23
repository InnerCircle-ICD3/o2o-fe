import Subscribe from "@/components/common/subscribe";
import { userInfoStore } from "@/stores/userInfoStore";
import * as globalStyle from "@/styles/global.css";
import type { StoresDetail } from "@/types/apis/stores.type";
import { formatTimeToHourMinute } from "@/utils/format";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { foodTypeList } from "../../filterTab/constant";
import { StoreReview } from "../storeReview";
import * as style from "./storesInfo.css";

interface StoreInfoProps {
  storeDetail: StoresDetail;
}

const StoresInfo = (props: StoreInfoProps) => {
  const { storeDetail } = props;
  const { user } = userInfoStore();
  const isLogin = !!user?.customerId;

  const joinCategories = (categories: string[]) => {
    return categories.join(" / ");
  };

  const storeCategory = foodTypeList.find(
    (category) => category.value === storeDetail.storeCategory[0],
  ) || {
    label: "기타",
  };

  return (
    <>
      <div className={style.thumbnail}>
        <Image
          src={storeDetail.mainImageUrl ?? "/images/banner.png"}
          alt={"store thumbnail"}
          fill
          style={{ objectFit: "cover" }}
        />
        {isLogin && (
          <div className={style.subscribeButton}>
            <Subscribe
              isFavorite={storeDetail.isFavorite}
              storeId={storeDetail.id}
              customerId={user.customerId}
            />
          </div>
        )}
      </div>
      <article className={globalStyle.innerPadding}>
        <h2 className={style.title}>
          <span className={style.storeName}>{storeDetail.name}</span>
          <span className={style.category}>{joinCategories([...storeDetail.foodCategory])}</span>
        </h2>
        <div className={style.reviewAndDistanceWrapper}>
          <Image src={"/icons/star.svg"} alt={"star"} width={16} height={16} />
          <span>
            <strong>{storeDetail.ratingAverage}</strong> ({storeDetail.ratingCount})
          </span>
        </div>
        <StoreReview id={storeDetail.id.toString()} />
        <div className={classNames(style.metaSection, globalStyle.grayBackground)}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>픽업 시간</p>
            <strong className={classNames(style.metaValue, globalStyle.primaryColor)}>
              {formatTimeToHourMinute(storeDetail.todayPickupStartTime)} ~{" "}
              {formatTimeToHourMinute(storeDetail.todayPickupEndTime)}
            </strong>
          </div>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>매장 소개</p>
            <span className={classNames(style.metaValue, style.description)}>
              {storeDetail.description}
            </span>
          </div>
        </div>
        <div className={classNames(style.metaSection, globalStyle.grayBackground)}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>주소</p>
            <p className={style.metaValue}>{storeDetail.address.roadNameAddress}</p>
            <Link
              href={{
                pathname: "/locations/store-location",
                query: {
                  lat: storeDetail.address.coordinate.latitude,
                  lng: storeDetail.address.coordinate.longitude,
                },
              }}
              style={{ textDecoration: "underline" }}
            >
              지도보기
            </Link>
          </div>

          <div className={style.metaRow}>
            <p className={style.metaLabel}>연락처</p>
            <p className={style.metaValue}>{storeDetail.contact}</p>
          </div>

          <div className={style.metaRow}>
            <p className={style.metaLabel}>카테고리</p>
            <p className={style.metaValue}>{storeCategory.label}</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default StoresInfo;
