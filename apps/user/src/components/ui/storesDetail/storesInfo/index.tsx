import * as globalStyle from "@/styles/global.css";
import type { StoresDetail } from "@/types/apis/stores.type";
import classNames from "classnames";
import Image from "next/image";
import * as style from "./storesInfo.css";

interface StoreInfoProps {
  storesDetail: StoresDetail;
}

const StoresInfo = (props: StoreInfoProps) => {
  const { storesDetail } = props;

  return (
    <>
      <div className={style.thumbnail}>
        <Image src={storesDetail.mainImageUrl} alt={""} fill />
      </div>
      <article className={globalStyle.innerPadding}>
        <h2 className={style.title}>{storesDetail.name}</h2>
        <div className={style.reviewAndDistanceWrapper}>
          <Image src={"/icons/review.svg"} alt={""} width={16} height={16} />
          <span>
            <strong>4.5</strong> (123) 1km
          </span>
        </div>

        <div className={classNames(style.metaSection, globalStyle.grayBackground)}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>픽업 시간</p>
            <strong className={classNames(style.metaValue, globalStyle.primaryColor)}>
              {storesDetail.openTime} ~ {storesDetail.closeTime}
            </strong>
          </div>

          <div className={style.iconDescription}>
            <Image src={"/icons/description.svg"} alt={""} width={15} height={15} />

            <span>{storesDetail.description}</span>
          </div>
        </div>

        <div className={classNames(style.metaSection, globalStyle.grayBackground)}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>주소</p>
            <p className={style.metaValue}>{storesDetail.roadAddress.addressName}</p>
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
