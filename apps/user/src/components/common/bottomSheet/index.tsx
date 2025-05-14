import Image from "next/image";
import type { PropsWithChildren } from "react";
import * as style from "./bottomSheet.css";

interface BottomSheetProps extends PropsWithChildren {
  type?: "common" | "shadow";
  isShow?: boolean;
  title: string;
  onClose: () => void;
}

const BottomSheet = (props: BottomSheetProps) => {
  const { type = "common", isShow, title, children, onClose } = props;

  const isShadow = type === "shadow";

  const innerType = isShadow ? style.shadowInner : style.commonInner;
  const innerStyle = isShow ? innerType.visible : innerType.hidden;

  const containerStyle = isShow ? style.container.visible : style.container.hidden;

  return (
    <div className={containerStyle}>
      {isShadow && isShow && <button className={style.shadow} type={"button"} onClick={onClose} />}
      <div className={innerStyle}>
        <div className={style.wrapper}>
          <h2 className={style.header}>{title}</h2>
          <button className={style.closeButton} type={"button"} onClick={onClose}>
            <Image src={"/icons/btn_close.svg"} alt={""} width={24} height={24} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
