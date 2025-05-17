import classNames from "classnames";
import Image from "next/image";
import * as style from "./storeDetail.css";

const Page = () => {
  return (
    <section className={style.container}>
      <div className={style.thumbnail}>
        <Image src={"/images/thumb.png"} alt={""} fill />
      </div>
      <article className={style.wrapper}>
        <h2 className={style.title}>냠냠 샌드위치</h2>
        <div className={style.reviewAndDistanceWrapper}>
          <Image src={"/icons/review.svg"} alt={""} width={16} height={16} />
          <span>
            <strong>4.5</strong> (123) 1km
          </span>
        </div>

        <div className={style.metaSection}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>픽업 시간</p>
            <strong className={classNames(style.metaValue, style.primaryText)}>픽업 시간</strong>
          </div>

          <div className={style.iconDescription}>
            <Image src={"/icons/description.svg"} alt={""} width={15} height={15} />

            <span>
              럭키밀 픽업시간은 어쩌구저쩌구 럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은
              어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀
              픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은
              어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀
              픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은
              어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀
              픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은
              어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀
              픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구럭키밀 픽업시간은 어쩌구저쩌구
            </span>
          </div>
        </div>

        <div className={style.metaSection}>
          <div className={style.metaRow}>
            <p className={style.metaLabel}>주소</p>
            <p className={style.metaValue}>픽업 시간</p>
          </div>

          <div className={style.metaRow}>
            <p className={style.metaLabel}>카테고리</p>
            <p className={style.metaValue}>픽업 시간</p>
          </div>

          <div className={style.metaRow}>
            <p className={style.metaLabel}>대표메뉴</p>
            <p className={style.metaValue}>픽업 시간</p>
          </div>
        </div>
      </article>

      <article className={style.wrapper}>
        <h2 className={style.productTitle}>냠냠치킨에서 지금 판매중이에요!</h2>
      </article>

      <div className={style.fixedButton}>123</div>
    </section>
  );
};

export default Page;
