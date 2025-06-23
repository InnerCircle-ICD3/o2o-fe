"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Home,
  List,
  MessageCircle,
  Package,
  Plus,
  ShoppingCart,
  Store,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  submenu?: {
    title: string;
    href: string;
    icon: React.ElementType;
  }[];
};

const menuConfig: Record<string, MenuItem> = {
  dashboard: {
    title: "홈",
    href: "/",
    icon: Home,
  },
  storeManagement: {
    title: "매장 관리",
    icon: Store,
    submenu: [
      {
        title: "매장 정보 수정",
        href: "/store-management/edit",
        icon: List,
      },
      {
        title: "매장 삭제",
        href: "/store-management/delete",
        icon: Trash,
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const isSubmenuActive = (menuId: string) => {
    const menu = menuConfig[menuId];
    return menu.submenu?.some((submenu) => pathname.startsWith(submenu.href));
  };

  const handleSubmenuToggle = (menuId: string) => {
    setOpenSubmenu((prev) => (prev === menuId ? null : menuId));
  };

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col border-r bg-background/95 shadow-lg transition-all duration-200",
        isCollapsed ? "w-16" : "w-[240px]",
      )}
    >
      <div className={cn("flex items-center p-6", isCollapsed && "justify-center p-4")}>
        <h2 className={cn("text-lg font-semibold transition-all", isCollapsed && "sr-only")}>
          잇고잇고
        </h2>
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className={cn(
            "ml-auto text-gray-400 hover:text-primary transition-colors p-1 rounded",
            isCollapsed && "ml-0",
          )}
          aria-label={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <ScrollArea className={cn("flex-1 px-3", isCollapsed && "px-0")}>
        <div className="space-y-1 p-2">
          {Object.entries(menuConfig).map(([menuId, menu]) => {
            if (!menu.submenu) {
              if (!menu.href) return null;
              return (
                <Button
                  key={menuId}
                  variant={pathname === menu.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    pathname === menu.href && "bg-secondary",
                    isCollapsed && "px-0 justify-center",
                  )}
                  asChild
                >
                  <Link
                    href={menu.href}
                    className="w-full text-left flex items-center justify-center"
                  >
                    <menu.icon className="h-5 w-5" />
                    {!isCollapsed && <span className="ml-2">{menu.title}</span>}
                  </Link>
                </Button>
              );
            }

            const hasActiveSubmenu = isSubmenuActive(menuId);
            const isOpen = openSubmenu === menuId || hasActiveSubmenu;
            return (
              <div key={menuId}>
                <Button
                  variant={hasActiveSubmenu ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200 group",
                    hasActiveSubmenu && "bg-secondary",
                    isCollapsed && "px-0 justify-center",
                  )}
                  asChild
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (isCollapsed) {
                        if (menu.submenu && menu.submenu.length > 0) {
                          router.push(menu.submenu[0].href);
                        }
                      } else {
                        handleSubmenuToggle(menuId);
                      }
                    }}
                    className="w-full text-left flex items-center justify-center"
                  >
                    <menu.icon className="h-5 w-5" />
                    {!isCollapsed && <span className="ml-2 flex-1 text-left">{menu.title}</span>}
                    {!isCollapsed && (
                      <span className="ml-auto">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </button>
                </Button>

                {menu.submenu && menu.submenu.length > 0 && !isCollapsed && isOpen && (
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
                          {/* <submenu.icon className="mr-2 h-4 w-4" /> */}
                          <span className="flex items-center justify-center text-lg text-gray-400">
                            •
                          </span>
                          {submenu.title}
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
