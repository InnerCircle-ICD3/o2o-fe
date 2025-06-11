import Button from "@/components/common/button";
import { ORDER_STATUS } from "@/constants/my-orders";
import type { OrderDetail } from "@/types/apis/order.type";
import * as style from "./actionsButtons.css";

interface ActionButtonsProps {
  orderDetail: OrderDetail;
}

const ActionButtons = (props: ActionButtonsProps) => {
  const { orderDetail } = props;

  if (
    ORDER_STATUS[orderDetail.status] !== ORDER_STATUS.READY &&
    ORDER_STATUS[orderDetail.status] !== ORDER_STATUS.CONFIRMED
  ) {
    return null;
  }

  return (
    <div className={style.container}>
      <Button type={"button"}>주문 취소</Button>
      <Button status={"primary"} type={"button"}>
        픽업 완료
      </Button>
    </div>
  );
};

export default ActionButtons;
