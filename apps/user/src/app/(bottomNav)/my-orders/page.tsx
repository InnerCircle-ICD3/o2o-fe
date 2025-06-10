"use client";

import ErrorUi from "@/components/common/errorUi";
import OrderItem from "@/components/ui/my-orders/orderItem";
import RequireLogin from "@/components/ui/my-orders/requireLogin";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import useGetMyOrder from "@/hooks/api/useGetMyOrder";
import { userInfoStore } from "@/stores/userInfoStore";
import type { OrderDetail } from "@/types/apis/order.type";
import * as style from "./myOrders.css";

const Page = () => {
  const { data: orderDetails, error, isError, isLoading } = useGetMyOrder(1);

  const { user } = userInfoStore();
  const isLogin = !!user;

  if (!isLogin) {
    return <RequireLogin text="주문 내역" />;
  }

  if (isError) {
    return <ErrorUi message={error?.message} />;
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
