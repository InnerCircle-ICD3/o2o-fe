"use client";

import Button from "@/components/common/button";
import Link from "next/link";
import * as style from "./bottomButton.css";

export const BottomButton = ({
  buttonText,
  href,
}: { buttonText?: React.ReactNode; href: string }) => {
  return (
    <Link href={href} className={style.fixedButton}>
      <Button status={"primary"} type={"button"} onClick={(e) => e.preventDefault()}>
        {buttonText}
      </Button>
    </Link>
  );
};
