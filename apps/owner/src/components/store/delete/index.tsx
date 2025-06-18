"use client";

import { deleteStore } from "@/apis/ssr/stores";
import StoreRegisterLink from "@/components/common/storeRegisterLink";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { STORE_DELETE_NOTICE } from "@/constants/notice";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoreDeleteForm() {
  const router = useRouter();
  const { clearOwner, clearStore } = useOwnerStore();
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const { data: storeData } = useGetOwnerStore();

  const handleDelete = () => {
    if (!agreed) return;
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!storeData?.id) return;
    const result = await deleteStore(storeData.id);

    if (result.success) {
      setOpen(false);
      clearOwner();
      clearStore();
      router.push("/store/login");
    }
  };

  if (!storeData) {
    return <StoreRegisterLink />;
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <div
        className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-sm text-gray-700 whitespace-pre-line"
        style={{ whiteSpace: "pre-line" }}
      >
        <span className="font-bold">매장 삭제 전에 꼭 확인하세요.</span>
        <br />
        {STORE_DELETE_NOTICE}
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
          <span className="font-semibold text-red-600">매장 삭제에 동의합니다.</span>
        </span>
      </label>
      <Button
        variant={agreed ? "destructive" : "outline"}
        disabled={!agreed}
        onClick={handleDelete}
        className="w-full"
      >
        매장 삭제하기
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>매장 삭제 확인</DialogTitle>
            <DialogDescription>
              정말로 매장을 삭제하시겠습니까? <br />
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
