"use client";

import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useEffect } from "react";

export function OwnerInfoProvider() {
  const setOwner = useOwnerStore((state) => state.setOwner);
  const clearOwner = useOwnerStore((state) => state.clearOwner);

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("access_token="));

    if (!token) {
      clearOwner();
      return;
    }

    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setOwner(res.data);
        } else {
          clearOwner();
        }
      })
      .catch(() => {
        clearOwner();
      });
  }, [clearOwner, setOwner]);

  return null;
}
