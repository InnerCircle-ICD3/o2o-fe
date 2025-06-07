"use client";

import RequireLogin from "@/components/ui/my-orders/requireLogin";
import { useUserStore } from "@/stores/userInfoStore";

export default function Subscribes() {
  const { user } = useUserStore();
  const isLogin = !!user;

  if (!isLogin) {
    return <RequireLogin text="찜" />;
  }

  return <div>찜</div>;
}
