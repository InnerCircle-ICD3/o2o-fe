"use client";

import OrderItem from "@/components/ui/my-orders/orderItem";
import useGetMyOrder from "@/hooks/api/useGetMyOrder";
import * as style from "./myOrders.css";

const Page = () => {
  const { data: response, error, isError, isLoading } = useGetMyOrder(1);

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>주문 내역을 불러오는 데 실패했습니다.</p>
        {<p>{error.message}</p>}
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>나의 주문 내역</h2>
      <ul>
        {response?.data.map((order) => (
          <OrderItem key={order.orderId} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
