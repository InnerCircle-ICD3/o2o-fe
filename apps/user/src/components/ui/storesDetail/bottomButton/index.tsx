"use client";

import Button from "@/components/common/button";
import { useState } from "react";
import * as style from "./bottomButton.css";

export const BottomButton = () => {
  const [isShow, setIsShow] = useState(true);

  const handleOpenSelector = () => {
    setIsShow(true);
  };

  // const handleCloseSelector = () => {
  //   setIsShow(false);
  // };

  return (
    isShow && (
      <div className={style.fixedButton}>
        <Button status={"primary"} type={"button"} onClick={handleOpenSelector}>
          주문하기
        </Button>
      </div>
    )
  );
};
