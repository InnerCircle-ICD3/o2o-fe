"use client";

import { deleteStoreOwner } from "@/apis/ssr/store-owner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OWNER_DELETE_NOTICE } from "@/constants/notice";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OwnerDeleteForm() {
  const { clearOwner, clearStore } = useOwnerStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleDelete = () => {
    if (!agreed) return;
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    const result = await deleteStoreOwner();
    if (result.success) {
      clearOwner();
      clearStore();
      setOpen(false);
      router.push("/store/login");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-sm text-gray-700 whitespace-pre-line">
        <span className="font-bold">점주 계정 삭제 전에 꼭 확인하세요.</span>
        <br />
        {OWNER_DELETE_NOTICE}
      </div>
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-5 h-5 accent-red-500"
        />
        <span>
          위 내용을 모두 확인하였으며,{" "}
          <span className="font-semibold text-red-600">계정 삭제에 동의합니다.</span>
        </span>
      </label>
      <Button
        variant={agreed ? "destructive" : "outline"}
        disabled={!agreed}
        onClick={handleDelete}
        className="w-full"
      >
        점주 계정 삭제하기
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>점주 계정 삭제 확인</DialogTitle>
            <DialogDescription>
              정말로 계정을 삭제하시겠습니까? <br />
              삭제 시 모든 정보가 영구적으로 삭제되며 복구가 불가합니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              삭제하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
