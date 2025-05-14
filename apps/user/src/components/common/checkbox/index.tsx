"use client";

import Image from "next/image";
import { useId } from "react";
import * as style from "./checkbox.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange } = props;
  const id = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className={style.container} htmlFor={id}>
      <input id={id} type={"checkbox"} hidden checked={checked} onChange={handleChange} />
      {checked ? (
        <Image src={"/icons/check_on.svg"} alt={"체크박스 취소"} width={20} height={20} />
      ) : (
        <Image src={"/icons/check_off.svg"} alt={"체크박스 선택"} width={20} height={20} />
      )}
    </label>
  );
};

export default Checkbox;
