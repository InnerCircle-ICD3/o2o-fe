"use client";

import { SOCIAL_PROVIDERS } from "@/constants/login";
import Image from "next/image";
import * as styles from "./login.css";

type Provider = keyof typeof SOCIAL_PROVIDERS;

export default function Login() {
  const handleSocialLogin = async (provider: Provider) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      console.error("환경변수 NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");
      return;
    }

    window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;
  };

  return (
    <div className={styles.loginContainer}>
      <Image src="/images/character3.png" alt="loading" width={172} height={136} />
      <Image src="/images/logoTitle.png" alt="loading" width={147} height={62} />
      {Object.entries(SOCIAL_PROVIDERS).map(([provider, { label, iconSrc }]) => (
        <button
          key={provider}
          type="button"
          className={styles.kakaoButton}
          onClick={() => handleSocialLogin(provider as Provider)}
        >
          <Image src={iconSrc} alt={`${label} 아이콘`} width={20} height={20} />
          {label}
        </button>
      ))}
    </div>
  );
}
