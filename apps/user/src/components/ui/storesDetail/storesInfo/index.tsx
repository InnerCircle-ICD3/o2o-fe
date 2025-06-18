import Subscribe from "@/components/common/subscribe";
import { userInfoStore } from "@/stores/userInfoStore";
import * as globalStyle from "@/styles/global.css";
import type { StoresDetail } from "@/types/apis/stores.type";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { StoreReview } from "../storeReview";
import * as style from "./storesInfo.css";

interface StoreInfoProps {
  storesDetail: StoresDetail;
}

const StoresInfo = (props: StoreInfoProps) => {
  const { storesDetail } = props;
  const { user } = userInfoStore();
  const isLogin = !!user;

  const joinCategories = (categories: string[]) => {
    return categories.join(" / ");
  };

  return (
    <>
      <div className={style.thumbnail}>
        <Image
          src={storesDetail.mainImageUrl ?? "/images/banner.png"}
          alt={"store thumbnail"}
          fill
          style={{ objectFit: "contain" }}
        />
        {isLogin && (
          <div className={style.subscribeButton}>
            <Subscribe
              isFavorite={storesDetail.isFavorite}
              storeId={storesDetail.id}
              customerId={user.customerId}
            />
          </div>
        )}
      </div>
      <article className={globalStyle.innerPadding}>
        <h2 className={style.title}>
          <span>{storesDetail.name}</span>
          <span className={style.category}>
            {joinCategories([...storesDetail.foodCategory, ...storesDetail.storeCategory])}
          </span>
        </h2>
        <div className={style.reviewAndDistanceWrapper}>
          <Image src={"/icons/star.svg"} alt={"star"} width={16} height={16} />
          <span>
            <strong>4.5</strong> (123) 1km
          </span>
        </div>
        <StoreReview id={storesDetail.id.toString()} />
        <div className={classNames(style.metaSection, globalStyle.grayBackground)}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>픽업 시간</p>
            <strong className={classNames(style.metaValue, globalStyle.primaryColor)}>
              {storesDetail.todayPickupStartTime} ~ {storesDetail.todayPickupEndTime}
            </strong>
          </div>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>매장 소개</p>
            <span className={classNames(style.metaValue, style.description)}>
              {storesDetail.description}
            </span>
          </div>
        </div>
        <div className={classNames(style.metaSection, globalStyle.grayBackground)}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>주소</p>
            <p className={style.metaValue}>{storesDetail.address.roadNameAddress}</p>
            <Link
              href={{
                pathname: "/locations/store-location",
                query: {
                  lat: storesDetail.address.coordinate.latitude,
                  lng: storesDetail.address.coordinate.longitude,
                },
              }}
              style={{ textDecoration: "underline" }}
            >
              지도보기
            </Link>
          </div>

          <div className={style.metaRow}>
            <p className={style.metaLabel}>연락처</p>
            <p className={style.metaValue}>{storesDetail.contact}</p>
          </div>

          <div className={style.metaRow}>
            <p className={style.metaLabel}>카테고리</p>
            <p className={style.metaValue}>김밥</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default StoresInfo;
