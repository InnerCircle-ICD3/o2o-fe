"use client";

import ErrorUi from "@/components/common/errorUi";
import OrderInfo from "@/components/common/orderInfo";
import ActionButtons from "@/components/ui/my-orders/actionButtons";
import { useGetOrderDetail } from "@/hooks/api/useGetOrderDetails";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { orderDetail, isError } = useGetOrderDetail(id as string);

  if (isError || !orderDetail) {
    return (
      <ErrorUi
        isButton={false}
        message={"주문 정보를 불러오지 못헀어요! 다시 한번 시도해주세요."}
      />
    );
  }

  return (
    <div>
      <OrderInfo orderDetail={orderDetail} />
      <ActionButtons orderDetail={orderDetail} />
    </div>
  );
};

export default Page;
