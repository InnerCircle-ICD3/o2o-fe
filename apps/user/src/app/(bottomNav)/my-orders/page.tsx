"use client";

import ErrorUi from "@/components/common/errorUi";
import VirtualScroll, { VirtualItem } from "@/components/common/virtualScroll";
import OrderItem from "@/components/ui/my-orders/orderItem";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import { ORDER_STATUS } from "@/constants/my-orders";
import useGetMyOrder from "@/hooks/api/useGetMyOrder";
import { userInfoStore } from "@/stores/userInfoStore";
import * as style from "./myOrders.css";

const Page = () => {
  const { user } = userInfoStore();
  const isLogin = !!user;
  const { data: orders, error, isError, isLoading, fetchNextPage } = useGetMyOrder(1, !isLogin);

  // if (!isLogin) {
  //   return <RequireLogin text="주문 내역" />;
  // }

  if (isError) {
    return <ErrorUi message={error?.message} />;
  }

  const contents = orders?.pages.flatMap((page) => (page.success ? page.data.contents : [])) || [];

  return (
    <div className={style.container}>
      <h2 className={style.title}>나의 주문 내역</h2>
      {isLoading ? (
        <SkeletonStoreCard imagePosition="left" />
      ) : contents.length === 0 ? (
        <ErrorUi type={"order"} message="아직 주문하신 상품이 없어요" />
      ) : (
        <VirtualScroll
          overscan={3}
          heights={{
            "order-item": {
              aspectRatio: 388 / 171,
            },
            "order-item-completed": {
              aspectRatio: 388 / 230,
            },
          }}
          onScrollEnd={fetchNextPage}
        >
          {contents.map((order) => (
            <VirtualItem
              key={order.id}
              name={
                ORDER_STATUS[order.status] === ORDER_STATUS.DONE
                  ? "order-item-completed"
                  : "order-item"
              }
            >
              <OrderItem order={order} />
            </VirtualItem>
          ))}
        </VirtualScroll>
      )}
    </div>
  );
};

export default Page;
