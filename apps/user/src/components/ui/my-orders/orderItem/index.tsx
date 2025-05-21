import StatusLabel from "@/components/common/statusLabel";
import { ORDER_STATUS } from "@/constants/my-orders";
import type { OrderDetail } from "@/types/apis/order.type";
import Image from "next/image";

interface OrderItemProps {
  order: OrderDetail;
}

const ORDER_STATUS_INFO = {
  [ORDER_STATUS.PENDING]: "픽업 대기중",
  [ORDER_STATUS.COMPLATED]: "픽업 완료",
  [ORDER_STATUS.CANCELLED]: "주문 취소",
};

const OrderItem = (props: OrderItemProps) => {
  const { order } = props;

  const orderStatus = ORDER_STATUS[order.status];

  return (
    <div>
      <div>
        <Image src={order.store.mainImageUrl} alt={""} width={120} height={120} />
        <div>
          <StatusLabel status={orderStatus}>{ORDER_STATUS_INFO[orderStatus]}</StatusLabel>
        </div>
      </div>
      <div>
        <h2>{order.store.name}</h2>
        <p>123</p>
        <p>123</p>
        <p>123</p>
      </div>
    </div>
  );
};

export default OrderItem;
