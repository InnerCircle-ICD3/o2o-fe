"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import Image from "next/image";
import { useEffect } from "react";

export default function Page() {
  const { data: storeData } = useGetOwnerStore();
  const setStore = useOwnerStore((state) => state.setStore);

  useEffect(() => {
    if (storeData) setStore(storeData);
  }, [storeData, setStore]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-muted/50 py-10">
      <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-primary/30">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            src="/images/logoTitle.png"
            alt="O2O 로고"
            width={120}
            height={40}
            className="mb-2"
            priority
          />
          <CardTitle className="text-2xl font-bold text-primary">점주님 환영합니다!</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base text-center">
            매장 관리 페이지에 오신 것을 환영합니다.
            <br />
            이곳에서 <span className="font-semibold text-foreground">매장 정보, 상품, 주문</span>{" "}
            등을
            <br />
            손쉽게 관리하실 수 있습니다.
            <br />
            <span className="text-primary font-medium">항상 번창하시길 바랍니다 😊</span>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
