"use client";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import * as style from "./pullToRefresh.css";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
}

export default function PullToRefresh({
  children,
  onRefresh,
  isRefreshing: externalIsRefreshing,
}: PullToRefreshProps) {
  const [internalIsRefreshing, setInternalIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);

  // 외부에서 전달된 isRefreshing 상태를 사용하거나 내부 상태를 사용
  const isRefreshing = externalIsRefreshing ?? internalIsRefreshing;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Only trigger when at the top of the page
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (startY === 0) return;

      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;

      // Only allow pulling down
      if (distance > 0) {
        // Add resistance to the pull
        const pullAmount = Math.min(distance * 0.5, 100);
        setPullDistance(pullAmount);
        e.preventDefault();
      }
    },
    [startY],
  );

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > 50) {
      if (!externalIsRefreshing) {
        setInternalIsRefreshing(true);
      }
      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          // Default refresh behavior - 브라우저 전체 새로고침
          window.location.reload();
        }
      } finally {
        if (!externalIsRefreshing) {
          setInternalIsRefreshing(false);
        }
      }
    }
    setPullDistance(0);
    setStartY(0);
  }, [pullDistance, externalIsRefreshing, onRefresh]);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd, handleTouchMove]);

  return (
    <div className={style.container}>
      <div
        className={classNames(style.pullIndicator, {
          [style.refreshing]: isRefreshing,
        })}
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        {isRefreshing ? "새로고침 중..." : "당겨서 새로고침"}
      </div>
      {children}
    </div>
  );
}
