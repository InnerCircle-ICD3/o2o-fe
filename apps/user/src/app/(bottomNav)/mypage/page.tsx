"use client";

import LoginLink from "@/components/ui/mypage/loginLink";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import useGetCustomer from "@/hooks/api/useGetCustomer";
import usePostLogout from "@/hooks/api/usePostLogout";
import { useToastStore } from "@/stores/toastStore";
import { userInfoStore } from "@/stores/userInfoStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as style from "./mypage.css";

const Page = () => {
  const { user, clearUser } = userInfoStore();
  const isLogin = !!user;
  const router = useRouter();

  const { showToast } = useToastStore();

  const logoutMutation = usePostLogout();

  const { data: userInfo, isLoading } = useGetCustomer();

  const handleLogout = async () => {
    const result = await logoutMutation.mutateAsync({});
    if (result.success) {
      clearUser();
      showToast("로그아웃되었습니다.");
      router.push("/");
    } else {
      showToast("로그아웃에 실패했습니다.", true);
    }
  };

  if (isLoading) {
    return <SkeletonStoreCard imagePosition="left" />;
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>마이페이지</h2>

      <section className={style.wrapper}>
        <LoginLink userInfo={userInfo} />

        {isLogin && userInfo && (
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

              <p>현재 버전 1.0.0</p>
            </div>
          </>
        )}
      </section>
      {isLogin && userInfo && (
        <div className={style.bottomButtons}>
          <button
            className={style.bottomButton}
            type={"button"}
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
          </button>
          |
          <button className={style.bottomButton} type={"button"}>
            회원탈퇴
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
