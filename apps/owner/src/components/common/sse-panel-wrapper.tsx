"use client";

import { useState } from "react";
import SseStatusIndicator from "./sse-status-indicator";

export default function SsePanelWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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

      {/* SSE 상태 패널 */}
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg min-w-[300px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">SSE 연결 상태</h3>
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
          <SseStatusIndicator />
        </div>
      )}
    </div>
  );
}
