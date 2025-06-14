import Button from "@/components/common/button";
import StatusLabel from "@/components/common/statusLabel";
import { ORDER_STATUS } from "@/constants/my-orders";
import * as globalStyle from "@/styles/global.css";
import type { OrderDetail } from "@/types/apis/order.type";
import { formatCurrency } from "@/utils/format";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import * as style from "./orderItem.css";

interface OrderItemProps {
  order: OrderDetail;
}

const ORDER_STATUS_INFO = {
  [ORDER_STATUS.READY]: "픽업 대기중",
  [ORDER_STATUS.DONE]: "픽업 완료",
  [ORDER_STATUS.CANCELED]: "주문 취소",
};

const OrderItem = (props: OrderItemProps) => {
  const { order } = props;

  const orderStatus = ORDER_STATUS[order.status];
  const isCompleted = orderStatus === ORDER_STATUS.DONE;

  const [totalLength, totalPrice, originTotalPrice] = order.orderItems.reduce(
    (acc, item) => [acc[0] + item.quantity, acc[1] + item.finalPrice, acc[2] + item.originPrice],
    [0, 0, 0],
  );

  return (
    <div className={style.container}>
      <Link href={`/my-orders/${order.id}`} className={style.wrapper}>
        <div className={style.titleBox}>
          <h3 className={style.title}>잇고백 {totalLength}개 예약</h3>

          <StatusLabel status={orderStatus}>{ORDER_STATUS_INFO[orderStatus]}</StatusLabel>
        </div>
        <div className={style.infoBox}>
          <Image
            className={style.image}
            src={"/images/thumb.png"}
            alt={""}
            width={90}
            height={90}
          />
          <div className={style.info}>
            <p className={style.storeTitle}>{order.storeName}</p>
            <p className={style.productTitle}>
              {order.orderItems[0].productName}
              {order.orderItems.length > 1 && ` 외 ${order.orderItems.length - 1}개`}
            </p>

            <div className={style.prices}>
              <p className={style.original}>{formatCurrency(originTotalPrice)}</p>
              <p className={classNames(style.discount, globalStyle.primaryColor)}>
                {formatCurrency(totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {isCompleted &&
        (order.hasReview ? (
          <Link href={`/review/${order.id}`}>
            <Button status={"primary"}>리뷰 확인하기</Button>
          </Link>
        ) : (
          <Link href={`/review/register?id=${order.id}`}>
            <Button status={"primary"}>리뷰 작성하기</Button>
          </Link>
        ))}
    </div>
  );
};

export default OrderItem;
