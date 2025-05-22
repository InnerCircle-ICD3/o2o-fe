import type { PropsWithChildren } from "react";

export interface HeightSpec {
  height?: number;
  aspectRatio?: number;
}

export interface VirtualItemProps extends PropsWithChildren {
  name: string;
}
