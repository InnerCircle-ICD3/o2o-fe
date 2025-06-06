"use client";

import { useUserStore } from "@/stores/userInfoStore";
import { useEffect } from "react";

export function UserInfoProvider() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

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
      });
  }, [clearUser, setUser]);

  return null;
}
