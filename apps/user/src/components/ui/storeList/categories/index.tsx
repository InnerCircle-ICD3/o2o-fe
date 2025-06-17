import { VirtualScrollContext } from "@/components/common/virtualScroll";
import { useFilterTab } from "@/stores/useFilterTab";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { foodTypeList } from "../../filterTab/constant";
import * as style from "./categories.css";

const Categories = () => {
  const { onSelectedFoodType, onResetFoodType } = useFilterTab();
  const { containerRef } = useContext(VirtualScrollContext);
  const router = useRouter();
  const categoryRef = useRef<HTMLDivElement>(null);
  const foodTypeListTop = foodTypeList.slice(0, 4);
  const foodTypeListBottom = foodTypeList.slice(4, 8);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!categoryRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setOpacity(entry.intersectionRatio);
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
        root: containerRef.current,
      },
    );

    observer.observe(categoryRef.current);
    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return (
    <div
      className={style.container}
      ref={categoryRef}
      style={{ opacity, transition: "opacity 0.2s" }}
    >
      <button type="button" className={style.button} onClick={onResetFoodType}>
        <span className={style.buttonInner}>
          <Image
            src={"/images/all.png"}
            alt={""}
            width={72}
            height={72}
            className={style.buttonImage}
          />
        </span>

        <span className={style.buttonText}>전체</span>
      </button>
      {foodTypeListTop.map((food) => (
        <button
          key={food.value}
          type="button"
          className={style.button}
          onClick={() => onSelectedFoodType(food.value)}
        >
          <span className={style.buttonInner}>
            <Image
              src={`/images/${food.value.toLowerCase()}.png`}
              alt={""}
              width={72}
              height={72}
              className={style.buttonImage}
            />
          </span>

          <span className={style.buttonText}>{food.label}</span>
        </button>
      ))}

      <button type="button" className={style.button} onClick={() => router.push("/subscribes")}>
        <span className={style.buttonInner}>
          <Image
            src={"/images/subscribe.png"}
            alt={""}
            width={72}
            height={72}
            className={style.buttonImage}
          />
        </span>

        <span className={style.buttonText}>찜 목록</span>
      </button>

      {foodTypeListBottom.map((food) => (
        <button
          key={food.value}
          type="button"
          className={style.button}
          onClick={() => onSelectedFoodType(food.value)}
        >
          <span className={style.buttonInner}>
            <Image
              src={`/images/${food.value.toLowerCase()}.png`}
              alt={""}
              width={72}
              height={72}
              className={style.buttonImage}
            />
          </span>

          <span className={style.buttonText}>{food.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Categories;
