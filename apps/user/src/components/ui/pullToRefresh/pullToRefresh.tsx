"use client";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const isRefreshing = externalIsRefreshing ?? internalIsRefreshing;
  const shouldRotate = pullDistance > 25;

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (window.scrollY === 0 && !isRefreshing) {
        setStartY(e.touches[0].clientY);
      }
    },
    [isRefreshing],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (startY === 0) return;

      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;

      if (distance > 0) {
        const pullAmount = Math.min(distance * 0.5, 100);
        setPullDistance(pullAmount);
        e.preventDefault();
      }
    },
    [startY],
  );

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > 25) {
      if (!externalIsRefreshing) {
        setInternalIsRefreshing(true);
      }
      try {
        if (onRefresh) {
          await onRefresh();
        } else {
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
    if (containerRef.current) {
      containerRef.current.addEventListener("touchstart", handleTouchStart);
      containerRef.current.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      containerRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("touchstart", handleTouchStart);
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
        containerRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handleTouchStart, handleTouchEnd, handleTouchMove]);

  return (
    <div ref={containerRef} className={style.container}>
      <div
        className={classNames(style.pullIndicator, {
          [style.refreshing]: isRefreshing,
        })}
        style={{
          transform: isRefreshing ? "translateY(0)" : `translateY(calc(-100% + ${pullDistance}px))`,
        }}
      >
        {isRefreshing ? (
          <>
            <svg
              className={style.loadingIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="새로고침 중"
              role="img"
            >
              <path
                d="M12 4.75V6.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1266 6.87347L16.0659 7.93413"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.25 12L17.75 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1266 17.1265L16.0659 16.0659"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19.25V17.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.9342 17.1265L8.99486 16.0659"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.75 12L6.25 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.9342 6.87347L8.99486 7.93413"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            새로고침 중...
          </>
        ) : (
          <>
            <svg
              className={classNames(style.pullIcon, {
                [style.pullIconRotating]: shouldRotate,
              })}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="당겨서 새로고침"
              role="img"
            >
              <path
                d="M12 4.75V6.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1266 6.87347L16.0659 7.93413"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.25 12L17.75 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1266 17.1265L16.0659 16.0659"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19.25V17.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.9342 17.1265L8.99486 16.0659"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.75 12L6.25 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.9342 6.87347L8.99486 7.93413"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            당겨서 새로고침
          </>
        )}
      </div>
      {children}
    </div>
  );
}
