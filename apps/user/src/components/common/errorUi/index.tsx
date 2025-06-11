"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../button";
import * as style from "./errorUi.css";

const imageTypes = {
  error: "/images/character4.png",
  subscribe: "/images/character4.png",
};

interface ErrorUiProps {
  message?: string;
  type?: keyof typeof imageTypes;
}

const ErrorUi = (props: ErrorUiProps) => {
  const { type = "error", message = "" } = props;
  const router = useRouter();

  return (
    <div className={style.container}>
      <div className={style.message}>
        <Image src={imageTypes[type]} alt="" width={240} height={240} />
        {message}
      </div>

      <div className={style.buttons}>
        <Button type={"button"} status={"common"} onClick={router.back}>
          돌아가기
        </Button>
        <Button type={"button"} status={"primary"} onClick={() => router.push("/")}>
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default ErrorUi;
