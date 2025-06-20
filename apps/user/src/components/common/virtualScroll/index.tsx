"use client";

import type { HeightSpec, VirtualItemProps } from "@/types/virtualScroll.type";
import { renderVirtualContent } from "@/utils/virtualScroll";
import classNames from "classnames";
import { Children, createContext, useEffect, useRef, useState } from "react";
import type { PropsWithChildren, ReactElement } from "react";
import * as style from "./virtualScroll.css";

interface VirtualScrollContextType {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const VirtualScrollContext = createContext<VirtualScrollContextType>({
  containerRef: { current: null },
});

interface VirtualScrollProps extends PropsWithChildren {
  overscan?: number;
  heights: Record<string, HeightSpec>;
  onScrollEnd?: () => void;
}

const VirtualScroll = ({ overscan = 2, heights, children, onScrollEnd }: VirtualScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });

  const { totalHeight, translateY, visible } = renderVirtualContent({
    children: Children.toArray(children) as ReactElement<VirtualItemProps>[],
    heights,
    containerSize,
    scrollTop,
    overscan,
  });

  const containerStyle = classNames(style.container, "virtual-scroll");

  // resize 감지
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // scroll 감지
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      setScrollTop(scrollTop);

      // 스크롤이 바닥에 도달한 경우
      if (onScrollEnd && scrollTop + clientHeight >= scrollHeight - 1) {
        onScrollEnd();
      }
    };

    el.addEventListener("scroll", onScroll);
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScrollEnd]);

  return (
    <VirtualScrollContext.Provider value={{ containerRef }}>
      <div ref={containerRef} className={containerStyle}>
        <div style={{ height: totalHeight + 20 }}>
          {containerSize.height !== 0 && containerSize.width !== 0 && (
            <div style={{ transform: `translateY(${translateY}px)` }}>
              {visible}
              <div className={style.padding} />
            </div>
          )}
        </div>
      </div>
    </VirtualScrollContext.Provider>
  );
};

export const VirtualItem = (props: VirtualItemProps) => {
  const { children } = props;
  return children;
};

export default VirtualScroll;
