import Button from "@/components/common/button";
import { ORDER_STATUS } from "@/constants/my-orders";
import useOrderCancel from "@/hooks/api/useOrderCancel";
import useOrderDone from "@/hooks/api/useOrderDone";
import type { OrderDetail } from "@/types/apis/order.type";
import * as style from "./actionsButtons.css";

interface ActionButtonsProps {
  orderDetail: OrderDetail;
}

const ActionButtons = (props: ActionButtonsProps) => {
  const { orderDetail } = props;
  const onCancelOrder = useOrderCancel();
  const onDoneOrder = useOrderDone();

  const isConrfirmed = ORDER_STATUS[orderDetail.status] === ORDER_STATUS.CONFIRMED;

  if (
    ORDER_STATUS[orderDetail.status] !== ORDER_STATUS.READY &&
    ORDER_STATUS[orderDetail.status] !== ORDER_STATUS.CONFIRMED
  ) {
    return null;
  }

  return (
    <div className={style.container}>
      {isConrfirmed && (
        <Button status={"primary"} type={"button"} onClick={() => onDoneOrder(orderDetail.id)}>
          픽업 완료
        </Button>
      )}
      <Button type={"button"} onClick={() => onCancelOrder(orderDetail.id)}>
        주문 취소
      </Button>
    </div>
  );
};

export default ActionButtons;
