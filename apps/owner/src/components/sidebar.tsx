"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Home, List, Package, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuConfig = {
  dashboard: {
    title: "매장 관리",
    href: "/store-management",
    icon: Home,
    submenu: [],
  },
  orders: {
    title: "픽업 관리",
    href: "/pickup-management",
    icon: ShoppingCart,
    submenu: [],
  },
  products: {
    title: "상품 관리",
    href: "/product-management",
    icon: Package,
    submenu: [
      {
        title: "상품 등록",
        href: "/products/register",
        icon: Plus,
      },
      {
        title: "상품 현황",
        href: "/products/list",
        icon: List,
      },
    ],
  },
};

export function Sidebar() {
  const pathname = usePathname();
  const mainMenuPath = `/${pathname.split("/")[1]}`;

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-background">
      <div className="p-6">
        <h2 className="text-lg font-semibold">잇고잇고</h2>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 p-2">
          {Object.values(menuConfig).map((menu) => (
            <div key={menu.href}>
              <Button
                variant={mainMenuPath === menu.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", mainMenuPath === menu.href && "bg-secondary")}
                asChild
              >
                <Link href={menu.href}>
                  <menu.icon className="mr-2 h-4 w-4" />
                  {menu.title}
                </Link>
              </Button>

              {menu.submenu.length > 0 && mainMenuPath === menu.href && (
                <div className="ml-6 mt-1 space-y-1">
                  {menu.submenu.map((submenu) => (
                    <Button
                      key={submenu.href}
                      variant={pathname === submenu.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start text-sm",
                        pathname === submenu.href && "bg-secondary",
                      )}
                      asChild
                    >
                      <Link href={submenu.href}>
                        <submenu.icon className="mr-2 h-4 w-4" />
                        {submenu.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
