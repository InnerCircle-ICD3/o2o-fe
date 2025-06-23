"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePostLogout from "@/hooks/api/usePostLogout";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const logoutMutation = usePostLogout();
  const { showToast } = useToastMessage();
  const router = useRouter();
  const { clearOwner, clearStore } = useOwnerStore();

  const handleLogout = async () => {
    const result = await logoutMutation.mutateAsync({});
    if (result.success) {
      clearOwner();
      clearStore();
      showToast("로그아웃되었습니다.");
      router.push("/store/login");
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
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/mypage")}>
                내 계정
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
