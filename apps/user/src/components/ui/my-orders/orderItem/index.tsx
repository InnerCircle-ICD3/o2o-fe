import StatusLabel from "@/components/common/statusLabel";
import { ORDER_STATUS } from "@/constants/my-orders";
import type { OrderDetail } from "@/types/apis/order.type";
import { formatCurrency, formatLocalizedDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import * as style from "./orderItem.css";

interface OrderItemProps {
  order: OrderDetail;
}

const ORDER_STATUS_INFO = {
  [ORDER_STATUS.PENDING]: "픽업 대기중",
  [ORDER_STATUS.COMPLETED]: "픽업 완료",
  [ORDER_STATUS.CANCELLED]: "주문 취소",
};

const OrderItem = (props: OrderItemProps) => {
  const { order } = props;

  const orderStatus = ORDER_STATUS[order.status];
  const isEnded = orderStatus !== ORDER_STATUS.PENDING;

  return (
    <li className={style.container}>
      <Link href={`/my-orders/${order.orderId}`} className={style.wrapper}>
        <div className={style.info}>
          <h3>{order.store.name}</h3>
          <div>
            <p className={style.dates}>주문 일자: {formatLocalizedDate(order.orderDate)}</p>
            {order.pickupDate && (
              <p className={style.dates}>픽업 완료 일자: {formatLocalizedDate(order.pickupDate)}</p>
            )}
            {order.cancelDate && (
              <p className={style.dates}>주문 취소 일자: {formatLocalizedDate(order.cancelDate)}</p>
            )}
          </div>

          <strong>{formatCurrency(order.totalPrice)}</strong>
        </div>
        <div className={style.thumbnail}>
          <Image className={style.image} src={order.store.mainImageUrl} alt={""} fill />
          <div className={style.label}>
            <StatusLabel status={orderStatus}>{ORDER_STATUS_INFO[orderStatus]}</StatusLabel>
          </div>

          {isEnded && <div className={style.cover} />}
        </div>
      </Link>
    </li>
  );
};

export default OrderItem;
