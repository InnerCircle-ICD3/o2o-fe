"use client";

import { patchCustomer as defaultPatchCustomer } from "@/apis/ssr/customers";
import Button from "@/components/common/button";
import { userInfoStore as defaultUseUserStore } from "@/stores/userInfoStore";
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

  const handleCompleteProfile = async () => {
    if (!user?.customerId) return;
    const result = await patchCustomer(user.customerId, nickname);

    if (result.success) {
      console.log(result.data);
    } else {
      console.log(result.errorMessage);
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
