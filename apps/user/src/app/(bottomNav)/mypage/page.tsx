import { getAuthMe } from "@/apis/ssr/account";
import LoginLink from "@/components/ui/mypage/loginLink";
import Image from "next/image";
import Link from "next/link";
import * as style from "./mypage.css";

const Page = async () => {
  const response = await getAuthMe();
  const isLogin = response.success;

  return (
    <div className={style.container}>
      <h2 className={style.title}>마이페이지</h2>

      <section className={style.wrapper}>
        <LoginLink userInfo={response} />

        {isLogin && (
          <>
            <div className={style.shortcuts}>
              <Link href="/subscribes" className={style.shortcutItem}>
                <Image src={"/icons/subscribe.svg"} alt="" width={24} height={24} />
                <span>찜 목록</span>
              </Link>
              <Link href="/my-orders" className={style.shortcutItem}>
                <Image src={"/icons/order.svg"} alt="" width={24} height={24} />
                <span>주문 내역</span>
              </Link>
              <Link href="/locations/my-location" className={style.shortcutItem}>
                <Image src={"/icons/location.svg"} alt="" width={24} height={24} />
                <span>지역 인증</span>
              </Link>
            </div>

            <div className={style.menus}>
              <Link href={"/mypage/notice"} className={style.menuItem}>
                공지사항
              </Link>

              <Link href={"/mypage/faq"} className={style.menuItem}>
                자주 묻는 질문
              </Link>

              <Link href={"/mypage/terms"} className={style.menuItem}>
                이용 약관
              </Link>

              <Link href={"/mypage/setting"} className={style.menuItem}>
                설정
              </Link>

              <p>현재 버전 1.0.0</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Page;
