"use client";

import { Button } from "@/components/ui/button";
import { useOrderModalStore } from "@/stores/orderModalStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useState } from "react";

export default function SseTestPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const openModal = useOrderModalStore((state) => state.openModal);
  const owner = useOwnerStore((state) => state.owner);

  const testSseMessage = async () => {
    setIsLoading(true);
    console.log("🧪 SSE 테스트 시작...");

    try {
      // API 호출 없이 직접 모달 열기 (MSW 이슈 회피)
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

  const testSseConnection = () => {
    const storeId = owner?.storeOwnerId;
    if (!storeId) {
      console.error("❌ storeId가 없습니다");
      return;
    }

    console.log("🔌 수동 SSE 연결 테스트 시작...");
    const eventSource = new EventSource(`/stores/${storeId}/sse`);

    eventSource.onopen = () => {
      console.log("✅ 수동 SSE 연결 성공");
    };

    eventSource.onmessage = (event) => {
      console.log("📨 수동 SSE 메시지 수신:", event.data);
    };

    eventSource.onerror = (error) => {
      console.error("❌ 수동 SSE 연결 오류:", error);
      eventSource.close();
    };

    // 5초 후 자동 종료
    setTimeout(() => {
      eventSource.close();
      console.log("🔌 수동 SSE 연결 종료 (5초 후)");
    }, 5000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
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

          <Button
            onClick={() => {
              // 다양한 주문 타입 테스트
              const orders = [
                {
                  orderId: Date.now(),
                  customerId: 2001,
                  storeId: 2001,
                  orderStatus: "PENDING" as const,
                  totalAmount: 35000,
                  orderTime: new Date().toISOString(),
                  customerName: "김럭키",
                  customerPhone: "010-1111-2222",
                  items: [
                    { productId: 201, productName: "프리미엄 럭키백", quantity: 1, price: 20000 },
                    { productId: 202, productName: "디저트 세트", quantity: 1, price: 15000 },
                  ],
                },
                {
                  orderId: Date.now() + 1,
                  customerId: 2002,
                  storeId: 2001,
                  orderStatus: "PENDING" as const,
                  totalAmount: 8000,
                  orderTime: new Date().toISOString(),
                  customerName: "박할인",
                  customerPhone: "010-3333-4444",
                  items: [{ productId: 203, productName: "미니 럭키백", quantity: 1, price: 8000 }],
                },
              ];

              orders.forEach((order, index) => {
                setTimeout(() => {
                  openModal(order);
                  console.log(`📦 다중 주문 테스트 ${index + 1}:`, order);
                }, index * 2000);
              });
            }}
            variant="secondary"
            size="sm"
            className="w-full text-xs"
          >
            다중 주문 알림 테스트
          </Button>

          <Button
            onClick={testSseConnection}
            variant="destructive"
            size="sm"
            className="w-full text-xs"
          >
            SSE 연결 직접 테스트
          </Button>

          <Button
            onClick={testSseConnection}
            variant="outline"
            size="sm"
            className="w-full text-xs"
          >
            수동 SSE 연결 테스트
          </Button>
        </div>

        <div className="text-xs text-blue-600 mt-2">버튼을 클릭하여 SSE 동작을 테스트해보세요</div>
      </div>
    </div>
  );
}
