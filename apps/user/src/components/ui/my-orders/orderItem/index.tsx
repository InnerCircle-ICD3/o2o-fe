import Button from "@/components/common/button";
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
  const isCompleted = orderStatus !== ORDER_STATUS.COMPLETED;

  const [totalLength, totalPrice] = order.orderItems.reduce(
    (acc, item) => [acc[0] + item.quantity, acc[1] + item.price],
    [0, 0],
  );

  return (
    <li className={style.container}>
      <Link href={`/my-orders/${order.id}`} className={style.wrapper}>
        <div className={style.titleBox}>
          <h3 className={style.title}>잇고백 {totalLength}개 예약</h3>

          <StatusLabel status={orderStatus}>{ORDER_STATUS_INFO[orderStatus]}</StatusLabel>
        </div>
        <div className={style.infoBox}>
          <Image className={style.image} src={"#"} alt={""} width={50} height={50} />
          <div className={style.info}>
            <p className={style.storeTitle}>가게 이름</p>
            <p className={style.productTitle}>
              {order.orderItems[0].productName}
              {order.orderItems.length > 1 && ` 외 ${order.orderItems.length - 1}개`}
            </p>
            <p className={style.time}>주문일: {formatLocalizedDate("2024-01-12")}</p>
            <div>
              <p>{formatCurrency(totalPrice)}</p>
              <p>{formatCurrency(totalPrice)}</p>
            </div>
          </div>
        </div>
      </Link>

      {isCompleted && <Button>리뷰 작성하기</Button>}
    </li>
  );
};

export default OrderItem;
