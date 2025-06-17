"use client";

import { userInfoStore } from "@/stores/userInfoStore";
import Image from "next/image";
import { type PropsWithChildren, useEffect, useState } from "react";
import * as style from "./userInfo.css";

export function UserInfoProvider(props: PropsWithChildren) {
  const { children } = props;
  const setUser = userInfoStore((state) => state.setUser);
  const clearUser = userInfoStore((state) => state.clearUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
        } else {
          clearUser();
        }
      })
      .catch(() => {
        clearUser();
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [clearUser, setUser]);

  return loading ? (
    <div className={style.container}>
      <Image
        src={"/images/loading.png"}
        alt={"로딩중"}
        className={style.image}
        width={200}
        height={200}
      />
    </div>
  ) : (
    children
  );
}
