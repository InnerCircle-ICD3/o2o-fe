import type { OrderSummary } from "@/types/orders.type";
import { formatCurrency } from "@/utils/format";
import * as style from "./totalPrice.css";

interface TotalPriceProps {
  orderSummary: OrderSummary;
}

const TotalPrice = (props: TotalPriceProps) => {
  const { orderSummary } = props;
  const { count, originalPrice, finalPrice } = orderSummary;

  return (
    <div className={style.container}>
      <p className={style.count}>총 수량 {count}개</p>

      <div className={style.amountWrapper}>
        <div className={style.row}>
          <span className={style.label}>총 금액</span>
          <strong className={style.price}>{formatCurrency(originalPrice)}</strong>
        </div>
        <div className={style.row}>
          <span className={style.label}>나의 할인가</span>
          <strong className={style.price}>{formatCurrency(finalPrice)}</strong>
        </div>
      </div>
    </div>
  );
};

export default TotalPrice;
