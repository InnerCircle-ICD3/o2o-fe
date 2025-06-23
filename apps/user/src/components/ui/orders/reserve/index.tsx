"use client";

import { readyToOrder } from "@/apis/ssr/orders";
import Button from "@/components/common/button";
import { useToastStore } from "@/stores/useToastStore";
import * as globalStyle from "@/styles/global.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReserveProps {
  id: string;
}

const Reserve = (props: ReserveProps) => {
  const { id: orderId } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const handleSubmit = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const result = await readyToOrder(orderId);
      if (!result.success) throw result;
      router.replace(`/orders/${orderId}/success`);
    } catch (error) {
      console.error("주문 준비 중 오류가 발생했습니다:", error);
      showToast("주문 준비 중 오류가 발생했습니다! 2초 뒤에 홈으로 이동합니다.", true);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={globalStyle.innerPadding}>
      <Button
        status={isLoading ? "disabled" : "primary"}
        type={"button"}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "처리 중..." : "예약 대기하기"}
      </Button>
    </div>
  );
};

export default Reserve;
