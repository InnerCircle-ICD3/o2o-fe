"use client";

import { Button } from "@/components/ui/button";
import { useOrderModalStore } from "@/stores/orderModalStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useState } from "react";
import SseStatusIndicator from "./sse-status-indicator";

type TabType = "status" | "test";

export default function SsePanelWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("status");
  const [isLoading, setIsLoading] = useState(false);

  const openModal = useOrderModalStore((state) => state.openModal);
  const owner = useOwnerStore((state) => state.owner);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const testSseMessage = async () => {
    setIsLoading(true);
    console.log("🧪 SSE 테스트 시작...");

    try {
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

      openModal(testOrder);
      console.log("✅ SSE 테스트 메시지 전송 완료:", testOrder);
    } catch (error) {
      console.error("❌ SSE 테스트 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const testRealTimeUpdate = () => {
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

    setTimeout(() => {
      eventSource.close();
      console.log("🔌 수동 SSE 연결 종료 (5초 후)");
    }, 5000);
  };

  const testMultipleOrders = () => {
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
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={handleToggle}
        className="mb-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-200"
        aria-label="SSE 패널 토글"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <title>SSE 패널 아이콘</title>
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* SSE 통합 패널 */}
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg min-w-[350px] max-w-[400px]">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">SSE 관리 패널</h3>
            <button
              type="button"
              onClick={handleToggle}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="패널 닫기"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>닫기 아이콘</title>
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex border-b border-gray-100">
            <button
              type="button"
              onClick={() => setActiveTab("status")}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "status"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              연결 상태
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("test")}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "test"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              테스트
            </button>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="p-4">
            {activeTab === "status" && (
              <div>
                <SseStatusIndicator />
              </div>
            )}

            {activeTab === "test" && (
              <div className="space-y-3">
                <p className="text-xs text-gray-600 mb-3">
                  버튼을 클릭하여 SSE 동작을 테스트해보세요
                </p>

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
                  onClick={testMultipleOrders}
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
