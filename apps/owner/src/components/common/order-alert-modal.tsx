"use client";

import { cancelOrder, confirmOrder } from "@/apis/ssr/orders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useOrderModalStore } from "@/stores/orderModalStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useState } from "react";

export default function OrderAlertModal() {
  const { isOpen, orderData, closeModal } = useOrderModalStore();
  const { owner } = useOwnerStore();
  const { data: storeData } = useGetOwnerStore(owner?.userId);
  const { showToast } = useToastMessage();
  const [isLoading, setIsLoading] = useState(false);

  if (!orderData) return null;

  const handleConfirmOrder = async () => {
    if (!storeData?.id || !orderData.orderId) {
      showToast("매장 정보 또는 주문 정보가 없습니다.", true);
      return;
    }

    setIsLoading(true);
    try {
      const result = await confirmOrder(storeData.id, orderData.orderId);
      if (result.success) {
        showToast("주문이 수락되었습니다.", false);
        closeModal();
      } else {
        showToast("주문 수락에 실패했습니다.", true);
      }
    } catch (error) {
      console.error("주문 수락 실패:", error);
      showToast("주문 수락 중 오류가 발생했습니다.", true);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleCancelOrder = async () => {
    if (!storeData?.id || !orderData.orderId) {
      showToast("매장 정보 또는 주문 정보가 없습니다.", true);
      return;
    }

    setIsLoading(true);
    try {
      const result = await cancelOrder(storeData.id, orderData.orderId);
      if (result.success) {
        showToast("주문이 취소되었습니다.", false);
        closeModal();
      } else {
        showToast("주문 취소에 실패했습니다.", true);
      }
    } catch (error) {
      console.error("주문 취소 실패:", error);
      showToast("주문 취소 중 오류가 발생했습니다.", true);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>🔔 새 주문이 도착했습니다!</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3">
              <div>
                <strong>주문번호:</strong> {orderData.orderId}
              </div>
              <div>
                <strong>고객명:</strong> {orderData.customerName}
              </div>
              <div>
                <strong>전화번호:</strong> {orderData.customerPhone}
              </div>
              <div>
                <strong>총 금액:</strong> {orderData.totalAmount.toLocaleString()}원
              </div>
              <div>
                <strong>주문시간:</strong> {new Date(orderData.orderTime).toLocaleString()}
              </div>
              <div>
                <strong>주문 항목:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {orderData.items.map((item) => (
                    <li key={`${item.productId}-${item.productName}`}>
                      {item.productName} x {item.quantity} ({item.price.toLocaleString()}원)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancelOrder} disabled={isLoading}>
            주문 취소
          </Button>
          <Button onClick={handleConfirmOrder} disabled={isLoading}>
            주문 수락
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
