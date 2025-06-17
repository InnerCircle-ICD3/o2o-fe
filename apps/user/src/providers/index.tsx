"use client";

import type { ReactNode } from "react";
import MswProvider from "./msw";
import QueryProvider from "./tanstackQuery";
import { UserInfoProvider } from "./userInfo";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <MswProvider>
        <UserInfoProvider>{children}</UserInfoProvider>
      </MswProvider>
    </QueryProvider>
  );
}
