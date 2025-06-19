"use client";

import { Header } from "@/components/common/header";
import { Sidebar } from "@/components/common/sidebar";
import { usePathname } from "next/navigation";

const PUBLIC_PATHS = ["/store/login", "/store/register"];

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (isPublicPage) {
    return children;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto min-h-0">{children}</main>
      </div>
    </div>
  );
}
