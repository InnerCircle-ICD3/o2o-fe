import { useOrderModalStore } from "@/stores/orderModalStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useEffect } from "react";

export default function OrderSseListener() {
  const openModal = useOrderModalStore((state) => state.openModal);
  const owner = useOwnerStore((state) => state.owner);
  const storeId = owner?.storeOwnerId;

  useEffect(() => {
    if (!storeId) return;
    const eventSource = new EventSource(`/stores/${storeId}/sse`);
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        openModal(data);
      } catch {
        // 파싱 에러 무시
      }
    };
    eventSource.onerror = () => {
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [openModal, storeId]);

  return null;
}
