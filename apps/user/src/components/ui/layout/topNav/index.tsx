"use client";

import ROUTE from "@/constants/route";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import * as style from "./topNav.css";

const TopNav = (props: PropsWithChildren) => {
  const { children } = props;
  const router = useRouter();
  const pathname = usePathname();

  const isMyLocationPage = pathname === "/locations/my-location";

  const handleBack = () => {
    if (isMyLocationPage) {
      router.push("/mypage");
    } else {
      router.back();
    }
  };

  const sortedNav = Object.values(ROUTE.topNav).sort((a, b) => b.path.length - a.path.length);
  const route = sortedNav.find((item) => pathname.startsWith(item.path));

  if (!route) {
    throw new Error("Route not found");
  }

  return (
    <div className={style.container}>
      <header className={style.topNav}>
        <button className={style.backButton} type={"button"} onClick={handleBack}>
          <Image src={"/icons/chevron_left.svg"} alt="뒤로가기" width={24} height={24} />
        </button>
        <h1 className={style.title}>{route.name}</h1>
        <div className={style.empty} />
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default TopNav;
