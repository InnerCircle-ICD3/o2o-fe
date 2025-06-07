"use client";

import ErrorUi from "@/components/common/errorUi";
import OrderItem from "@/components/ui/my-orders/orderItem";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import useGetMyOrder from "@/hooks/api/useGetMyOrder";
import type { OrderDetail } from "@/types/apis/order.type";
import * as style from "./myOrders.css";

const Page = () => {
  const { data: orderDetails, isError, isLoading } = useGetMyOrder(1);

  if (isError) {
    return <ErrorUi message={"오류 "} />;
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
