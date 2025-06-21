"use client";
import { useOrderModalStore } from "@/stores/orderModalStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source";

export default function OrderSseListener() {
  const openModal = useOrderModalStore((state) => state.openModal);
  const owner = useOwnerStore((state) => state.owner);
  const storeId = owner?.userId;

  // EventSource 연결: url, 옵션으로 withCredentials 전달 가능
  const [eventSource, _] = useEventSource(
    `https://ceo.eatngo.org/api/v1/stores/${storeId}/sse`,
    false,
  );

  useEventSourceListener(
    eventSource,
    ["ORDER_READIED"],
    (evt) => {
      const data = JSON.parse(evt.data);
      console.log(data, "data");
      openModal(data);
    },
    [],
  );

  return null;
}
