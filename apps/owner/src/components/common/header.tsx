"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePostLogout from "@/hooks/api/usePostLogout";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToastStore } from "../../../../user/src/stores/toastStore/index";

export function Header() {
  const logoutMutation = usePostLogout();
  const { showToast } = useToastStore();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutMutation.mutateAsync({});
    if (result.success) {
      showToast("로그아웃되었습니다.");
      router.push("/");
    } else {
      showToast("로그아웃에 실패했습니다.", true);
    }
  };
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>프로필</DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
