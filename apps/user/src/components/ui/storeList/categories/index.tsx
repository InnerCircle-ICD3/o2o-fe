import Image from "next/image";
import * as style from "./categories.css";

const Categories = () => {
  return (
    <div className={style.container}>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/all.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>전체</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/bread.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>베이커리</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/cafe.png"} alt={""} fill className={style.buttonImage} />
        </span>
        <span className={style.buttonText}>카페</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/fruit.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>과일</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/korean.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>한식</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/subscribe.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>찜 목록</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/pizza.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>피자</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/ricecake.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>떡</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/salad.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>샐러드</span>
      </button>
      <button type="button" className={style.button}>
        <span className={style.buttonInner}>
          <Image src={"/images/sandwich.png"} alt={""} fill className={style.buttonImage} />
        </span>

        <span className={style.buttonText}>샌드위치</span>
      </button>
    </div>
  );
};

export default Categories;
