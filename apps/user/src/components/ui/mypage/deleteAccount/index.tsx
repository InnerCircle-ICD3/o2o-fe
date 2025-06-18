"use client";

import { deleteCustomer } from "@/apis/ssr/customers";
import Button from "@/components/common/button";
import { userInfoStore } from "@/stores/userInfoStore";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as style from "./deleteAccount.css";

const DeleteAccount = () => {
  const router = useRouter();
  const { clearUser } = userInfoStore();
  const [agreed, setAgreed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (!agreed) return;
    setIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    const result = await deleteCustomer();
    if (result.success) {
      clearUser();
      router.push("/");
    }
    setIsOpen(false);
  };

  return (
    <div className={classNames(style.container)}>
      <div className={style.contentWrapper}>
        <label className={style.checkboxLabel}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className={style.checkbox}
          />
          <span>
            위 내용을 모두 확인하였으며, <b>탈퇴에 동의합니다.</b>
          </span>
        </label>
        <Button status={agreed ? "danger" : "disabled"} disabled={!agreed} onClick={handleDelete}>
          잇고잇고 탈퇴하기
        </Button>
        <p className={style.warningText}>
          탈퇴 시 찜, 주문내역 등 모든 정보가 삭제되며 복구가 불가합니다.
        </p>
      </div>

      {isOpen && (
        <>
          <div
            className={style.modalOverlay}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsOpen(false);
              }
            }}
          />
          <div className={style.modalContent}>
            <h2 className={style.modalTitle}>계정 탈퇴 확인</h2>
            <p className={style.modalDescription}>
              {`정말로 탈퇴하시겠습니까? 
              탈퇴 시 모든 정보와 혜택이 삭제됩니다.`}
            </p>
            <div className={style.modalButtons}>
              <Button status="common" onClick={() => setIsOpen(false)}>
                취소
              </Button>
              <Button status="danger" onClick={handleConfirmDelete}>
                탈퇴하기
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteAccount;
