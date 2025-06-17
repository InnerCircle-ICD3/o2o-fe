"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { deleteStore } from "@/apis/ssr/stores";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";

export default function StoreDeleteForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { owner } = useOwnerStore();

  const { data: storeData, isLoading } = useGetOwnerStore(owner?.userId);

  const handleDelete = () => {
    if (!agreed) return;
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!storeData?.id) return;
    const result = await deleteStore(storeData.id);
    
    if (result.success) {
      setOpen(false);
      router.push("/store/login");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-sm text-gray-700 whitespace-pre-line">
        {`매장 삭제 전에 꼭 확인하세요.\n\n• 매장 삭제 시 해당 매장에 대한 모든 정보(메뉴, 리뷰, 주문내역 등)가 영구적으로 삭제되며, 복구가 불가능합니다.\n• 매장 삭제 후에는 동일한 정보로 재등록이 불가할 수 있습니다.\n• 매장에 연결된 모든 서비스(예: 주문, 예약 등)도 함께 해지됩니다.\n• 삭제된 데이터는 법령에 따라 일정 기간 보관될 수 있습니다.\n• 자세한 사항은 개인정보 처리방침을 참고해 주세요.`}
      </div>
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="w-5 h-5 accent-red-500"
        />
        <span>
          위 내용을 모두 확인하였으며, <span className="font-semibold text-red-600">매장 삭제에 동의합니다.</span>
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