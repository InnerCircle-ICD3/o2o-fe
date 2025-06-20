"use client";

import { patchCustomer as defaultPatchCustomer } from "@/apis/ssr/customers";
import Button from "@/components/common/button";
import { useToastStore } from "@/stores/useToastStore";
import { userInfoStore as defaultUseUserStore } from "@/stores/userInfoStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as styles from "./completeProfile.css";

export default function CompleteProfile({
  useUserStore = defaultUseUserStore,
  patchCustomer = defaultPatchCustomer,
}: {
  useUserStore?: typeof defaultUseUserStore;
  patchCustomer?: typeof defaultPatchCustomer;
} = {}) {
  const { user } = useUserStore();
  const [nickname, setNickname] = useState("");
  const { showToast } = useToastStore();
  const router = useRouter();

  const handleCompleteProfile = async () => {
    if (!user?.customerId) return;
    const result = await patchCustomer(user.customerId, nickname);

    if (result.success) {
      showToast("닉네임 변경 완료");
      router.push("/mypage");
    } else {
      showToast("닉네임 변경 실패", true);
    }
  };

  return (
    <div className={styles.completeProfileContainer}>
      <input
        className={styles.input}
        type="text"
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Button status="primary" onClick={handleCompleteProfile}>
        등록하기
      </Button>
    </div>
  );
}
