"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../button";
import * as style from "./errorUi.css";

const imageTypes = {
  error: "/images/character4.png",
  subscribe: "/images/subscribe-error.png",
  order: "/images/my-order.png",
  home: "/images/home.png",
};

interface ErrorUiProps {
  message?: string;
  isButton?: boolean;
  type?: keyof typeof imageTypes;
}

const ErrorUi = (props: ErrorUiProps) => {
  const { type = "error", message = "", isButton = true } = props;
  const router = useRouter();

  return (
    <div className={style.container}>
      <div className={style.message}>
        <Image src={imageTypes[type]} alt="" width={240} height={240} />
        {message}
      </div>

      {isButton && (
        <div className={style.buttons}>
          <Button type={"button"} status={"primary"} onClick={() => router.push("/")}>
            홈으로
          </Button>
          <Button type={"button"} status={"common"} onClick={router.back}>
            돌아가기
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorUi;
