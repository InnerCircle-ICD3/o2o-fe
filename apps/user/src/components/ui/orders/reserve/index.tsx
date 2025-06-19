"use client";

import { readyToOrder } from "@/apis/ssr/orders";
import Button from "@/components/common/button";
import * as globalStyle from "@/styles/global.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReserveProps {
  id: string;
}

const Reserve = (props: ReserveProps) => {
  const { id } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await readyToOrder(id);
      if (!result.success) throw result;
      router.replace(`/orders/${id}/success`);
    } catch (error) {
      console.error("주문 준비 중 오류가 발생했습니다:", error);
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
