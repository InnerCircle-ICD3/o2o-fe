"use client";

import Button from "@/components/common/button";
import Checkbox from "@/components/common/checkbox";
import { useState } from "react";
import * as style from "./page.css";

// 공용 UI 확인용 컴포넌트입니다.
const CommonUi = () => {
  const [checked, setChecked] = useState(false);

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
    </div>
  );
};

export default CommonUi;
