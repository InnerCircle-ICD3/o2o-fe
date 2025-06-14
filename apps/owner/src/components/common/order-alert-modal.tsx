"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrderModalStore } from "@/stores/orderModalStore";

export default function OrderAlertModal() {
  const { isOpen, orderData, closeModal } = useOrderModalStore();

  if (!orderData) return null;

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
          <Button variant="outline" onClick={closeModal}>
            닫기
          </Button>
          <Button
            onClick={() => {
              // TODO: 주문 상세 페이지로 이동 또는 주문 처리 로직
              closeModal();
            }}
          >
            주문 확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
