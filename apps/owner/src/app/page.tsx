"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { Building2, MessageSquare, PackageCheck, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const quickLinks = [
  {
    title: "매장 관리",
    description: "매장 정보, 운영 시간 등을 수정합니다.",
    href: "/store-management/edit",
    icon: <Building2 className="w-8 h-8 text-primary" />,
  },
  {
    title: "픽업 관리",
    description: "들어온 주문을 확인하고 처리합니다.",
    href: "/pickup-management",
    icon: <PackageCheck className="w-8 h-8 text-primary" />,
  },
  {
    title: "상품 관리",
    description: "새로운 상품을 등록하고 기존 상품을 관리합니다.",
    href: "/product-management",
    icon: <ShoppingBasket className="w-8 h-8 text-primary" />,
  },
  {
    title: "리뷰 관리",
    description: "고객들이 남긴 소중한 리뷰를 확인하세요.",
    href: "/reviews",
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
  },
];

export default function Page() {
  const { data: storeData } = useGetOwnerStore();
  const setStore = useOwnerStore((state) => state.setStore);

  useEffect(() => {
    if (storeData) setStore(storeData);
  }, [storeData, setStore]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">사장님, 환영합니다!</h2>
      </div>
      <p className="text-muted-foreground">
        오늘도 잇고잇고와 함께 힘찬 하루를 시작해 보세요. 아래에서 주요 기능들을 빠르게 시작할 수
        있습니다.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 pt-4 items-stretch">
        {quickLinks.map((link) => (
          <Link href={link.href} key={link.title} className="h-full">
            <Card className="h-full flex flex-col hover:border-primary/60 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">{link.title}</CardTitle>
                {link.icon}
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Card className="w-full border-none shadow-none">
          <CardContent className="flex items-center justify-center p-6">
            <Image src="/images/character3.png" alt="O2O 로고" width={200} height={60} priority />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
