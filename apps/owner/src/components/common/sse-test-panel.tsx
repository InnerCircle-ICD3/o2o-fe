"use client";

import { Button } from "@/components/ui/button";
import { useOrderModalStore } from "@/stores/orderModalStore";
import { useState } from "react";

export default function SseTestPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const openModal = useOrderModalStore((state) => state.openModal);

  const testSseMessage = async () => {
    setIsLoading(true);
    try {
      // 테스트 주문 생성 API 호출
      const response = await fetch("/test/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await response.json();

        // SSE 메시지를 직접 시뮬레이션
        const testOrder = {
          orderId: Date.now(),
          customerId: 1001,
          storeId: 2001,
          orderStatus: "PENDING" as const,
          totalAmount: 25000,
          orderTime: new Date().toISOString(),
          customerName: "테스트 고객",
          customerPhone: "010-1234-5678",
          items: [
            {
              productId: 101,
              productName: "테스트 럭키백",
              quantity: 1,
              price: 25000,
            },
          ],
        };

        // 모달 직접 열기 (SSE 시뮬레이션)
        openModal(testOrder);

        console.log("✅ SSE 테스트 메시지 전송 완료:", testOrder);
      }
    } catch (error) {
      console.error("❌ SSE 테스트 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const testRealTimeUpdate = () => {
    // 실제 SSE 메시지 시뮬레이션 (3초 후)
    setTimeout(() => {
      const lateOrder = {
        orderId: Date.now() + 1000,
        customerId: 1002,
        storeId: 2001,
        orderStatus: "PENDING" as const,
        totalAmount: 15000,
        orderTime: new Date().toISOString(),
        customerName: "늦은 주문 고객",
        customerPhone: "010-9999-8888",
        items: [
          {
            productId: 102,
            productName: "늦은 시간 럭키백",
            quantity: 1,
            price: 15000,
          },
        ],
      };

      openModal(lateOrder);
      console.log("⏰ 지연된 SSE 메시지:", lateOrder);
    }, 3000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg">
        <h3 className="text-sm font-semibold text-blue-800 mb-3">SSE 테스트 패널</h3>

        <div className="space-y-2">
          <Button
            onClick={testSseMessage}
            disabled={isLoading}
            size="sm"
            className="w-full text-xs"
          >
            {isLoading ? "전송 중..." : "즉시 주문 알림 테스트"}
          </Button>

          <Button
            onClick={testRealTimeUpdate}
            variant="outline"
            size="sm"
            className="w-full text-xs"
          >
            3초 후 주문 알림 테스트
          </Button>
        </div>

        <div className="text-xs text-blue-600 mt-2">버튼을 클릭하여 SSE 동작을 테스트해보세요</div>
      </div>
    </div>
  );
}
