"use client";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOrderModalStore } from "@/stores/orderModalStore";
import { useEventSource, useEventSourceListener } from "@react-nano/use-event-source";

export default function OrderSseListener() {
  const openModal = useOrderModalStore((state) => state.openModal);
  const { data: storeData } = useGetOwnerStore();
  const storeId = storeData?.id;

  // EventSource 연결: url, 옵션으로 withCredentials 전달 가능
  const [eventSource, _] = useEventSource(
    `https://store-owner.eatngo.org/api/v1/stores/${storeId}/sse`,
    true,
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
