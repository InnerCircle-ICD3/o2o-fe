"use client";

import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useEffect } from "react";

export function OwnerInfoProvider() {
  const setOwner = useOwnerStore((state) => state.setOwner);
  const setStore = useOwnerStore((state) => state.setStore);
  const clearOwner = useOwnerStore((state) => state.clearOwner);
  const clearStore = useOwnerStore((state) => state.clearStore);

  const { data: storeData } = useGetOwnerStore();

  useEffect(() => {
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

  useEffect(() => {
    if (storeData) {
      setStore(storeData);
    } else {
      clearStore();
    }
  }, [storeData, setStore, clearStore]);

  return null;
}
