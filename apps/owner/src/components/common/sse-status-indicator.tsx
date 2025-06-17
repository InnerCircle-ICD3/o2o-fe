"use client";

import { useOwnerStore } from "@/stores/ownerInfoStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SseStatus = "disconnected" | "connecting" | "connected" | "error";

export default function SseStatusIndicator() {
  const [status, setStatus] = useState<SseStatus>("disconnected");
  const [lastMessage, setLastMessage] = useState<string>("");
  const [messageCount, setMessageCount] = useState(0);
  const owner = useOwnerStore((state) => state.owner);
  const pathname = usePathname();
  const storeId = owner?.userId;

  useEffect(() => {
    // 로그인하지 않았거나 로그인 페이지에 있는 경우 SSE 연결 시도하지 않음
    if (!owner || pathname.startsWith("/store/login")) {
      setStatus("disconnected");
      console.log("❌ SSE Status: 로그인 전이거나 로그인 페이지에서는 SSE 연결을 시도하지 않음");
      return;
    }

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
  }, [storeId, owner, pathname]);

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
    <div className="flex items-center space-x-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${statusDisplay.color}`} />
      <span className="text-gray-600">
        {statusDisplay.icon} SSE {statusDisplay.text}
      </span>
      {messageCount > 0 && <span className="text-xs text-gray-500">({messageCount}개 메시지)</span>}
      {lastMessage && (
        <span className="text-xs text-gray-400 max-w-[200px] truncate">마지막: {lastMessage}</span>
      )}
    </div>
  );
}
