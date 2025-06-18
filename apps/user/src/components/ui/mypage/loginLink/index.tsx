import type { Result } from "@/apis/types";
import type { Customer } from "@/types/apis/accounts.type";
import Image from "next/image";
import Link from "next/link";
import * as style from "./loginLink.css";

interface LoginLinkProps {
  userInfo?: Result<Customer> | null;
}

const LoginLink = (props: LoginLinkProps) => {
  const { userInfo } = props;
  const isLoggedIn = userInfo?.success;

  const linkHref = isLoggedIn ? "/mypage/complete-profile" : "/login";
  const heading = isLoggedIn ? userInfo.data.nickname : "로그인";
  const subText = isLoggedIn
    ? userInfo.data.nickname
    : "로그인을 하면 더 많은 서비스를 이용할 수 있어요.";

  return (
    <Link href={linkHref} className={style.loginLink}>
      <span>
        <h3 className={style.loginHeading}>{heading}</h3>
        <p className={style.loginText}>{subText}</p>
      </span>
      <Image src="/icons/right_arrow.svg" alt="" width={20} height={20} />
    </Link>
  );
};

export default LoginLink;
