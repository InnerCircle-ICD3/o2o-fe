"use client";

import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import Checkbox from "@/components/common/checkbox";
import { useState } from "react";
import * as style from "./page.css";

// 공용 UI 확인용 컴포넌트입니다.
const CommonUi = () => {
  const [checked, setChecked] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowShadow, setIsShowShadow] = useState(false);

  return (
    <div className={style.container}>
      <h1>Common UI</h1>
      <p>공용 UI 확인용 페이지입니다.</p>

      <div>
        <h2>Button</h2>
        <div className={style.list}>
          <Button>Common</Button>
          <Button variant="common">Common</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="disabled" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h2>CheckBox</h2>
        <div className={style.list}>
          <Checkbox checked={true} onChange={() => {}} />
          <Checkbox checked={false} onChange={() => {}} />

          <Checkbox checked={checked} onChange={setChecked} />
        </div>
      </div>

      <div>
        <h2>BottomSheet - common</h2>
        <div className={style.list}>
          <Button variant="common" onClick={() => setIsShow(true)}>
            BottomSheet
          </Button>

          <BottomSheet
            isShow={isShow}
            title={"BottomSheet"}
            onClose={() => {
              setIsShow(false);
            }}
          >
            <div>하하하하!!!!</div>
          </BottomSheet>
        </div>
      </div>

      <div>
        <h2>BottomSheet - shadow</h2>
        <div className={style.list}>
          <Button variant="common" onClick={() => setIsShowShadow(true)}>
            BottomSheet
          </Button>

          <BottomSheet
            type="shadow"
            isShow={isShowShadow}
            title={"BottomSheet"}
            onClose={() => {
              setIsShowShadow(false);
            }}
          >
            <div>하하하하!!!!</div>
          </BottomSheet>
        </div>
      </div>
    </div>
  );
};

export default CommonUi;
