import Image from "next/image";
import * as styles from "./login.css";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <Image src="/images/character3.png" alt="loading" width={172} height={136} />
      <Image src="/images/logoTitle.png" alt="loading" width={147} height={62} />
      <button type="button" className={styles.kakaoButton}>
        <Image src="/icons/kakao_icon.svg" alt="loading" width={20} height={20} />
        카카오 로그인
      </button>
    </div>
  );
}
