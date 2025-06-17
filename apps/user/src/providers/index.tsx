"use client";

import type { ReactNode } from "react";
import QueryProvider from "./tanstackQuery";

export default function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
