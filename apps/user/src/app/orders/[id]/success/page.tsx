"use client";

import Button from "@/components/common/button";
import * as globalStyle from "@/styles/global.css";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as style from "./success.css";

const Page = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace("/");
  };

  const handleGoMyOrder = () => {
    router.replace("/my-orders");
  };

  return (
    <div className={classNames(style.container, globalStyle.innerPadding)}>
      <Image src={"/images/character.png"} alt={""} width={178} height={133} />
      <h1 className={style.title}>예약대기가 확정되었습니다.</h1>
      <p className={style.description}>
        예약 확정여부는 주문내역에서
        <br />
        확인 가능합니다.
      </p>

      <div className={style.buttons}>
        <Button status={"primary"} type={"button"} onClick={handleGoMyOrder}>
          주문 내역 보러가기
        </Button>
        <Button type={"button"} onClick={handleGoHome}>
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default Page;
