import Image from "next/image";
import * as style from "./storeDetail.css";

const Page = () => {
  return (
    <section>
      <div className={style.thumbnail}>
        <Image src={"/images/thumb.png"} alt={""} fill />
      </div>
      <article className={style.container}>
        <h2 className={style.title}>냠냠 샌드위치</h2>
        <div className={style.reviewAndDistanceWrapper}>
          <Image src={"/icons/review.svg"} alt={""} width={16} height={16} />
          <span>
            <strong>4.5</strong> (123) 1km
          </span>
        </div>

        <div className={style.grayBackground}>
          <div className={style.metaInfo}>
            <p className={style.metaTitle}>픽업 시간</p>
            <strong className={style.metaContent}>픽업 시간</strong>
          </div>
        </div>

        <div className={style.grayBackground}>
          <div className={style.metaInfo}>
            <p className={style.metaTitle}>주소</p>
            <p className={style.metaContent}>픽업 시간</p>
          </div>

          <div className={style.metaInfo}>
            <p className={style.metaTitle}>카테고리</p>
            <p className={style.metaContent}>픽업 시간</p>
          </div>

          <div className={style.metaInfo}>
            <p className={style.metaTitle}>대표메뉴</p>
            <p className={style.metaContent}>픽업 시간</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Page;
