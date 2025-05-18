"use client";

import Button from "@/components/common/button";
import * as globalStyle from "@/styles/global.css";

const Reserve = () => {
  return (
    <div className={globalStyle.innerPadding}>
      <Button status={"primary"} type={"button"} onClick={() => {}}>
        예약하기
      </Button>
    </div>
  );
};

export default Reserve;
