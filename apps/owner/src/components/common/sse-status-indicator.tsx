"use client";

import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useEffect, useState } from "react";

type SseStatus = "disconnected" | "connecting" | "connected" | "error";

export default function SseStatusIndicator() {
  const [status, setStatus] = useState<SseStatus>("disconnected");
  const [lastMessage, setLastMessage] = useState<string>("");
  const [messageCount, setMessageCount] = useState(0);
  const owner = useOwnerStore((state) => state.owner);
  const storeId = owner?.userId;

  useEffect(() => {
    if (!storeId) {
      setStatus("disconnected");
      return;
    }

    setStatus("connecting");
    console.log(`🔌 SSE 연결 시도: /stores/${storeId}/sse`);

    const eventSource = new EventSource(`/stores/${storeId}/sse`);

    eventSource.onopen = () => {
      setStatus("connected");
      console.log("✅ SSE 연결 성공");
    };

    eventSource.onmessage = (event) => {
      console.log("📨 SSE 메시지 수신:", event.data);
      setLastMessage(event.data);
      setMessageCount((prev) => prev + 1);
      try {
        const data = JSON.parse(event.data);
        console.log("📦 파싱된 데이터:", data);
      } catch (err) {
        console.error("❌ 메시지 파싱 실패:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("❌ SSE 연결 오류:", error);
      setStatus("error");
      eventSource.close();
    };

    return () => {
      console.log("🔌 SSE 연결 종료");
      eventSource.close();
      setStatus("disconnected");
    };
  }, [storeId]);

  const getStatusDisplay = () => {
    switch (status) {
      case "connected":
        return { text: "연결됨", color: "bg-green-500", icon: "🟢" };
      case "connecting":
        return { text: "연결 중...", color: "bg-yellow-500", icon: "🟡" };
      case "error":
        return { text: "연결 실패", color: "bg-red-500", icon: "🔴" };
      default:
        return { text: "연결 안됨", color: "bg-gray-500", icon: "⚫" };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-3 h-3 rounded-full ${statusDisplay.color}`} />
          <span className="text-sm font-medium">SSE {statusDisplay.text}</span>
        </div>

        {storeId && (
          <div className="text-xs text-gray-600 mb-1">
            Store ID: {storeId} | 메시지: {messageCount}개
          </div>
        )}

        {lastMessage && (
          <div className="text-xs text-gray-500 break-all">
            마지막 메시지: {lastMessage.substring(0, 50)}...
          </div>
        )}

        <div className="text-xs text-gray-400 mt-2">
          개발자 도구 Console에서 자세한 로그 확인 가능
        </div>
      </div>
    </div>
  );
}
