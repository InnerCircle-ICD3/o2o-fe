"use client";

import searchIcon from "@/assets/icon/ic-search.png";
import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import Checkbox from "@/components/common/checkbox";
import StatusLabel from "@/components/common/statusLabel";
import TextInput from "@/components/common/textInput";
import Image from "next/image";
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
        <h2 className={style.header}>Button</h2>
        <div className={style.list}>
          <Button>Common</Button>
          <Button status="common">Common</Button>
          <Button status="primary">Primary</Button>
          <Button status="disabled" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h2 className={style.header}>TextInput</h2>
        <div className={style.list}>
          <TextInput placeholder={"텍스트를 입력해주세요"} />
          <TextInput status="common" />
          <TextInput status="error" />
          <TextInput status="disabled" />
          <TextInput
            status="primary"
            suffixIcon={() => <Image src={searchIcon} alt={"search icon"} width={16} height={16} />}
          />
          <TextInput
            status="primary"
            prefixIcon={() => <Image src={searchIcon} alt={"search icon"} width={16} height={16} />}
          />
        </div>
      </div>
      <div>
        <h2 className={style.header}>CheckBox</h2>
        <div className={style.list}>
          <Checkbox checked={true} onChange={() => {}} />
          <Checkbox checked={false} onChange={() => {}} />

          <Checkbox checked={checked} onChange={setChecked} />
        </div>
      </div>

      <div>
        <h2 className={style.header}>BottomSheet - common</h2>
        <div className={style.list}>
          <Button status="common" onClick={() => setIsShow(true)}>
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
        <h2 className={style.header}>BottomSheet - shadow</h2>
        <div className={style.list}>
          <Button status="common" onClick={() => setIsShowShadow(true)}>
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

      <div>
        <h2 className={style.header}>Status Label</h2>
        <div className={style.list}>
          <StatusLabel status={"sales"}>판매중</StatusLabel>
          <StatusLabel status={"soldOut"}>마감</StatusLabel>
          <StatusLabel status={"endSoon"}>마감임박</StatusLabel>
          <StatusLabel status={"pending"}>픽업대기중</StatusLabel>
          <StatusLabel status={"completed"}>픽업완료</StatusLabel>
          <StatusLabel status={"canceled"}>주문취소</StatusLabel>
        </div>
      </div>
    </div>
  );
};

export default CommonUi;
