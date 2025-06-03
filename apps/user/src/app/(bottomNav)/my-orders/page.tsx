"use client";

import OrderItem from "@/components/ui/my-orders/orderItem";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import useGetMyOrder from "@/hooks/api/useGetMyOrder";
import type { OrderDetail } from "@/types/apis/order.type";
import * as style from "./myOrders.css";

const Page = () => {
  const { data: orderDetails, error, isError, isLoading } = useGetMyOrder(1);

  if (isError) {
    return (
      <div>
        <p>주문 내역을 불러오는 데 실패했습니다.</p>
        {<p>{error?.message}</p>}
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>나의 주문 내역</h2>
      <ul>
        {isLoading ? (
          <SkeletonStoreCard imagePosition="right" />
        ) : (
          orderDetails?.map((order: OrderDetail) => <OrderItem key={order.orderId} order={order} />)
        )}
      </ul>
    </div>
  );
};

export default Page;
