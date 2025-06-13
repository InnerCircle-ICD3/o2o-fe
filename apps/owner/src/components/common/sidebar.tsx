"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Home, List, MessageCircle, Package, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  submenu: {
    title: string;
    href: string;
    icon: React.ElementType;
  }[];
};

const menuConfig: Record<string, MenuItem> = {
  dashboard: {
    title: "매장 관리",
    icon: Home,
    submenu: [
      {
        title: "매장 목록",
        href: "/store-management",
        icon: List,
      },
    ],
  },
  orders: {
    title: "픽업 관리",
    icon: ShoppingCart,
    submenu: [
      {
        title: "픽업 목록",
        href: "/pickup-management",
        icon: List,
      },
    ],
  },
  products: {
    title: "잇고백 관리",
    icon: Package,
    submenu: [
      {
        title: "잇고백 등록",
        href: "/product-management/new",
        icon: Plus,
      },
      {
        title: "잇고백 목록",
        href: "/product-management",
        icon: List,
      },
    ],
  },
  reviews: {
    title: "리뷰 관리",
    icon: MessageCircle,
    submenu: [
      {
        title: "리뷰 조회",
        href: "/reviews",
        icon: List,
      },
    ],
  },
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isSubmenuActive = (menuId: string) => {
    const menu = menuConfig[menuId];
    return menu.submenu.some((submenu) => pathname.startsWith(submenu.href));
  };

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-background">
      <div className="p-6">
        <h2 className="text-lg font-semibold">잇고잇고</h2>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 p-2">
          {Object.entries(menuConfig).map(([menuId, menu]) => {
            const hasActiveSubmenu = isSubmenuActive(menuId);

            return (
              <div key={menuId}>
                <Button
                  variant={hasActiveSubmenu ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", hasActiveSubmenu && "bg-secondary")}
                  asChild
                >
                  <button
                    type="button"
                    onClick={() => {
                      router.push(menu.submenu[0].href);
                    }}
                    className="w-full text-left"
                  >
                    <div className="flex items-center">
                      <menu.icon className="mr-2 h-4 w-4" />
                      {menu.title}
                    </div>
                  </button>
                </Button>

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
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
