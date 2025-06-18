"use client";

import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";

const PUBLIC_PATHS = ["/store/login", "/store/register"];

export function OwnerInfoProvider() {
  const setOwner = useOwnerStore((state) => state.setOwner);
  const setStore = useOwnerStore((state) => state.setStore);
  const clearOwner = useOwnerStore((state) => state.clearOwner);
  const clearStore = useOwnerStore((state) => state.clearStore);
  
  const router = useRouter();
  const pathname = usePathname();
  
  const { data: storeData, isLoading: isStoreLoading } = useGetOwnerStore();

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
    if (!isStoreLoading && storeData === null && !PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
      // 매장 정보가 없고 공개 페이지가 아닌 경우 register로 리다이렉트
      router.replace("/store/register");
    } else if (storeData) {
      setStore(storeData);
    } else {
      clearStore();
    }
  }, [storeData, isStoreLoading, pathname, router, setStore, clearStore]);

  return null;
}
