"use client";

import OrderInfo from "@/components/common/orderInfo";
import Reserve from "@/components/ui/orders/reserve";
import { useGetOrderDetail } from "@/hooks/api/useGetOrderDetails";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import * as style from "./orders.css";

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
    <Suspense fallback={<div>Loading...</div>}>
      <section className={style.container}>
        <OrderInfo orderDetail={orderDetail} />
        <Reserve id={id as string} />
      </section>
    </Suspense>
  );
};

export default Page;
