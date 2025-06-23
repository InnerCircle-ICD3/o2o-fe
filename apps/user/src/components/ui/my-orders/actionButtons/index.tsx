import { readyToOrder } from "@/apis/ssr/orders";
import Button from "@/components/common/button";
import { ORDER_STATUS } from "@/constants/my-orders";
import useOrderCancel from "@/hooks/api/useOrderCancel";
import useOrderDone from "@/hooks/api/useOrderDone";
import { useToastStore } from "@/stores/useToastStore";
import type { OrderDetail } from "@/types/apis/order.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as style from "./actionsButtons.css";

interface ActionButtonsProps {
  orderDetail: OrderDetail;
}

const ActionButtons = (props: ActionButtonsProps) => {
  const { orderDetail } = props;
  const onCancelOrder = useOrderCancel();
  const onDoneOrder = useOrderDone();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const isConfirmed = ORDER_STATUS[orderDetail.status] === ORDER_STATUS.CONFIRMED;
  const isCreated = ORDER_STATUS[orderDetail.status] === ORDER_STATUS.CREATED;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await readyToOrder(orderDetail.id.toString());
      if (!result.success) throw result;
      router.replace(`/orders/${orderDetail.id}/success`);
    } catch (error) {
      console.error("주문 준비 중 오류가 발생했습니다:", error);
      showToast("주문 준비 중 오류가 발생했습니다! 2초 뒤에 홈으로 이동합니다.", true);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  if (
    ORDER_STATUS[orderDetail.status] !== ORDER_STATUS.READY &&
    ORDER_STATUS[orderDetail.status] !== ORDER_STATUS.CONFIRMED &&
    ORDER_STATUS[orderDetail.status] !== ORDER_STATUS.CREATED
  ) {
    return null;
  }

  return (
    <div className={style.container}>
      {isConfirmed && (
        <Button status={"primary"} type={"button"} onClick={() => onDoneOrder(orderDetail.id)}>
          픽업 완료
        </Button>
      )}
      {isCreated && (
        <Button status={"primary"} type={"button"} disabled={isLoading} onClick={handleSubmit}>
          예약 대기하기
        </Button>
      )}
      <Button type={"button"} onClick={() => onCancelOrder(orderDetail.id)}>
        주문 취소
      </Button>
    </div>
  );
};

export default ActionButtons;
