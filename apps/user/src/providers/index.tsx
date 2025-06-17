"use client";

import type { ReactNode } from "react";
import MswProvider from "./msw";
import QueryProvider from "./tanstackQuery";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <MswProvider>{children}</MswProvider>
    </QueryProvider>
  );
}
