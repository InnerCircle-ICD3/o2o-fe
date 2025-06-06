"use client";

import Image from "next/image";
import { useId } from "react";
import * as style from "./checkbox.css";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const checkBoxIcons = {
  checked: { url: "/icons/check_on.svg", alt: "체크박스 선택" },
  unchecked: { url: "/icons/check_off.svg", alt: "체크박스 취소" },
  disabled: { url: "/icons/check_disabled.svg", alt: "체크박스 비활성화" },
} as const;

const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, disabled, ...rest } = props;
  const id = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(event.target.checked);
  };

  const checkState = disabled ? "disabled" : checked ? "checked" : "unchecked";

  return (
    <label className={style.container} htmlFor={id}>
      <input {...rest} id={id} type={"checkbox"} hidden checked={checked} onChange={handleChange} />
      <Image
        src={checkBoxIcons[checkState].url}
        alt={checkBoxIcons[checkState].alt}
        width={20}
        height={20}
      />
    </label>
  );
};

export default Checkbox;
