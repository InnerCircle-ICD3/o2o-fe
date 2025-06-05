"use client";

import Button from "@/components/common/button";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import * as style from "./bottomButton.css";

export const BottomButton = ({
  buttonText,
  href,
  onClick = () => {},
}: { buttonText?: React.ReactNode; href?: string; onClick?: () => void }) => {
  return (
    <ButtonWrapper href={href}>
      <Button
        status={"primary"}
        type={"button"}
        onClick={(e) => {
          if (href) {
            e.stopPropagation();
          }
          onClick();
        }}
      >
        {buttonText}
      </Button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = ({ href, children }: PropsWithChildren<{ href?: string }>) => {
  return href ? (
    <Link href={href} className={style.fixedButton}>
      {children}
    </Link>
  ) : (
    <div className={style.fixedButton}>{children}</div>
  );
};
