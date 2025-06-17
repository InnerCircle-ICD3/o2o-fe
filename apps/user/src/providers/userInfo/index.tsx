"use client";

import { userInfoStore } from "@/stores/userInfoStore";
import { type PropsWithChildren, useEffect, useState } from "react";

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
        setLoading(false);
      });
  }, [clearUser, setUser]);

  return loading ? null : children;
}
