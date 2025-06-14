"use client";

import dynamic from "next/dynamic";

const OrderSseListener = dynamic(() => import("@/components/common/order-sse-listener"), {
  ssr: false,
});

export default function OrderSseListenerWrapper() {
  return <OrderSseListener />;
}
