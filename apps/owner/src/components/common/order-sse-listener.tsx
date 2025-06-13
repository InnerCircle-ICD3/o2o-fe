"use client";

import { useOrderModalStore } from "@/stores/orderModalStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useEffect } from "react";

export default function OrderSseListener() {
  const openModal = useOrderModalStore((state) => state.openModal);
  const owner = useOwnerStore((state) => state.owner);
  const storeId = owner?.storeOwnerId;
  useEffect(() => {
    if (!storeId) {
      console.log("❌ SSE: storeId가 없어서 연결하지 않음");
      return;
    }

    const url = `/stores/${storeId}/sse`;
    console.log(`🔌 SSE 연결 시도: ${url}`);

    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.log("✅ SSE 연결 성공");
    };

    eventSource.onmessage = (event) => {
      console.log("📨 SSE 메시지 수신:", event);
      console.log("📦 메시지 데이터:", event.data);

      try {
        const data = JSON.parse(event.data);
        console.log("✅ 파싱된 주문 데이터:", data);
        openModal(data);
      } catch (err) {
        console.error("❌ 메시지 파싱 실패:", err);
        console.error("원본 데이터:", event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error("❌ SSE 연결 오류:", error);
      console.error("EventSource 상태:", eventSource.readyState);
      console.error("연결 URL:", url);
      eventSource.close();
    };

    return () => {
      console.log("🔌 SSE 연결 종료");
      eventSource.close();
    };
  }, [openModal, storeId]);

  return null;
}
