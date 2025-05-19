import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import * as styles from "./textInput.css";

type InputStatus = keyof typeof styles.inputStatus;

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string | React.ReactNode;
  status?: InputStatus;
  placeholder?: string;
  prefixIcon?: React.ElementType;
  suffixIcon?: React.ElementType;
}

const TextInput = (props: TextInputProps) => {
  const {
    labelText,
    status = "common",
    placeholder,
    prefixIcon: PrefixIcon,
    suffixIcon: SuffixIcon,
    disabled,
    id,
    ...rest
  } = props;

  const inputStyle = styles.inputStatus[disabled ? "disabled" : status];
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div>
      {labelText &&
        (typeof labelText === "string" ? (
          <label htmlFor={inputId} className={styles.labelTextStyle}>
            {labelText}
          </label>
        ) : (
          labelText
        ))}
      <div className={styles.inputContainer}>
        {PrefixIcon && (
          <div className={styles.iconLeft}>
            <PrefixIcon />
          </div>
        )}
        <input
          {...rest}
          id={inputId}
          placeholder={placeholder}
          disabled={disabled || status === "disabled"}
          className={clsx(inputStyle, PrefixIcon && styles.inputWithIcon)}
        />
        {SuffixIcon && (
          <div className={styles.iconRight}>
            <SuffixIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
