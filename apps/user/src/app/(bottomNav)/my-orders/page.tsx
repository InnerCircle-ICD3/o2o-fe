"use client";

import OrderItem from "@/components/ui/my-orders/orderItem";
import useGetMyOrder from "@/hooks/api/useGetMyOrder";
import * as style from "./myOrders.css";

const Page = () => {
  const { data, isSuccess } = useGetMyOrder(1);

  if (!isSuccess) {
    return null;
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>나의 주문 내역</h2>
      <ul>
        {data.map((order) => (
          <OrderItem key={order.orderId} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
