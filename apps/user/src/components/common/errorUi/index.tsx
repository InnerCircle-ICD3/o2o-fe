"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../button";
import * as style from "./errorUi.css";

interface ErrorUiProps {
  message?: string;
}

const ErrorUi = (props: ErrorUiProps) => {
  const { message = "" } = props;
  const router = useRouter();

  return (
    <div className={style.container}>
      <div className={style.message}>
        <Image src="/images/character4.png" alt="캐릭터" width={240} height={240} />
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
