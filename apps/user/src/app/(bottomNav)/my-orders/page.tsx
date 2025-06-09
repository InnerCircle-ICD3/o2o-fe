"use client";

import VirtualScroll, { VirtualItem } from "@/components/common/virtualScroll";
import OrderItem from "@/components/ui/my-orders/orderItem";
import SkeletonStoreCard from "@/components/ui/storeList/storeCard/skeletonStoreCard";
import { ORDER_STATUS } from "@/constants/my-orders";
import useGetMyOrder from "@/hooks/api/useGetMyOrder";
import * as style from "./myOrders.css";

const Page = () => {
  const { data: orderDetails, error, isError, isLoading, fetchNextPage } = useGetMyOrder(1);

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
      {isLoading ? (
        <SkeletonStoreCard imagePosition="right" />
      ) : (
        <VirtualScroll
          overscan={3}
          heights={{
            "order-item": {
              aspectRatio: 388 / 171,
            },
            "order-item-completed": {
              aspectRatio: 388 / 241,
            },
          }}
          onScrollEnd={fetchNextPage}
        >
          {orderDetails?.pages.map((page) =>
            page.success
              ? page.data.contents.map((order) => (
                  <VirtualItem
                    key={order.id}
                    name={
                      ORDER_STATUS[order.status] === ORDER_STATUS.COMPLETED
                        ? "order-item"
                        : "order-item-completed"
                    }
                  >
                    <OrderItem order={order} />
                  </VirtualItem>
                ))
              : null,
          )}
        </VirtualScroll>
      )}
    </div>
  );
};

export default Page;
