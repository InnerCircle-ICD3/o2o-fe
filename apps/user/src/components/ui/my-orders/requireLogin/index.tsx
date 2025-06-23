"use client";

import { userInfoStore } from "@/stores/userInfoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as style from "./requireLogin.css";

export default function RequireLogin({ text }: { text: string }) {
  const router = useRouter();
  const { user } = userInfoStore();

  const isLoggedIn = !!user?.customerId;

  if (!isLoggedIn) {
    return (
      <div className={style.container}>
        <h2 className={style.title}>{text}</h2>

        <div className={style.requireLogin}>
          <Image src="/images/character2.png" alt="loading" width={150} height={150} priority />
          <p className={style.requireLoginText}>로그인을 하면 더 많은 서비스를 이용할 수 있어요</p>
        </div>

        <button
          type="button"
          className={style.loginOptionButton}
          onClick={() => router.push("/login")}
        >
          <div className={style.loginOptionTextContainer}>
            <p className={style.loginOptionTitle}>로그인 후 {text} 확인</p>
            <p className={style.loginOptionSub}>내 계정으로 {text}을 확인할 수 있어요</p>
          </div>
          <Image src="/icons/right_arrow.svg" alt="" width={20} height={20} />
        </button>
      </div>
    );
  }
}
