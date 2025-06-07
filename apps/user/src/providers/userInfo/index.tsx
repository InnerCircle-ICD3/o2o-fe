"use client";

import { useUserStore } from "@/stores/userInfoStore";
import { useEffect } from "react";

export function UserInfoProvider() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("access_token="));

    if (!token) {
      clearUser();
      return;
    }

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
