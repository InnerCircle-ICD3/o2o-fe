"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SOCIAL_PROVIDERS } from "o2o/constants/login";
import type { Provider } from "o2o/types/login";
import * as styles from "./login.css";

export default function Login() {
  const router = useRouter();

  const handleSocialLogin = (provider: Provider) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      console.error("환경변수 NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");
      return;
    }

    router.push(`${baseUrl}/oauth2/authorization/${provider}`);
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
          <Image src={`/icons/${iconSrc}`} alt={`${label} 아이콘`} width={20} height={20} />
          {label}
        </button>
      ))}
    </div>
  );
}
