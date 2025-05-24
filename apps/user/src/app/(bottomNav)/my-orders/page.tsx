"use client";

import OrderItem from "@/components/ui/my-orders/orderItem";
import useGetMyOrder from "@/hooks/api/useGetMyOrder";
import * as style from "./myOrders.css";

const Page = () => {
  const { data, isSuccess } = useGetMyOrder(1);

  if (!isSuccess) {
    return null;
  }

  if (!data.success) {
    return (
      <div className={style.container}>
        <h2 className={style.title}>주문 내역을 불러오는 데 실패했습니다.</h2>
      </div>
    );
  }

  const { data: orders } = data;

  return (
    <div className={style.container}>
      <h2 className={style.title}>나의 주문 내역</h2>
      <ul>
        {data.success && orders.map((order) => <OrderItem key={order.orderId} order={order} />)}
      </ul>
    </div>
  );
};

export default Page;
