"use client";

import OrderInfo from "@/components/common/orderInfo";
import ActionButtons from "@/components/ui/my-orders/actionButtons";
import { useGetOrderDetail } from "@/hooks/api/useGetOrderDetails";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { orderDetail, isError } = useGetOrderDetail(id as string);

  if (isError || !orderDetail) {
    return (
      <div>
        <h2>주문 내역을 불러오는 데 실패했습니다.</h2>
      </div>
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
