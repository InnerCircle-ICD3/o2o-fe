"use client";

import RequireLogin from "@/components/ui/my-orders/requireLogin";
import { userInfoStore } from "@/stores/userInfoStore";

export default function Subscribes() {
  const { user } = userInfoStore();
  const isLogin = !!user;

  if (!isLogin) {
    return <RequireLogin text="찜" />;
  }

  return <div>찜</div>;
}
