import * as globalStyle from "@/styles/global.css";
import type { StoresDetail } from "@/types/apis/stores.type";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { StoreReview } from "../storeReview";
import * as style from "./storesInfo.css";

interface StoreInfoProps {
  storeDetail: StoresDetail;
}

const StoresInfo = (props: StoreInfoProps) => {
  const { storeDetail } = props;

  const joinCategories = (categories: string[]) => {
    return categories.join(" / ");
  };

  return (
    <>
      <div className={style.thumbnail}>
        <Image
          src={storeDetail.mainImageUrl ?? "/images/banner.png"}
          alt={"store thumbnail"}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <article className={globalStyle.innerPadding}>
        <h2 className={style.title}>
          <span>{storeDetail.name}</span>
          <span className={style.category}>
            {joinCategories([...storeDetail.foodCategory, ...storeDetail.storeCategory])}
          </span>
        </h2>
        <div className={style.reviewAndDistanceWrapper}>
          <Image src={"/icons/star.svg"} alt={"star"} width={16} height={16} />
          <span>
            <strong>4.5</strong> (123) 1km
          </span>
        </div>
        <StoreReview id={storeDetail.id.toString()} />
        <div className={classNames(style.metaSection, globalStyle.grayBackground)}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>픽업 시간</p>
            <strong className={classNames(style.metaValue, globalStyle.primaryColor)}>
              {storeDetail.todayPickupStartTime} ~ {storeDetail.todayPickupEndTime}
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
            <Link href={"#"} style={{ textDecoration: "underline" }}>
              지도보기
            </Link>
          </div>

          <div className={style.metaRow}>
            <p className={style.metaLabel}>연락처</p>
            <p className={style.metaValue}>{storeDetail.contact}</p>
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
