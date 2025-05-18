import * as globalStyle from "@/styles/global.css";
import type { OrderDetail } from "@/types/apis/order.type";
import { formatCurrency } from "@/utils/format";
import classNames from "classnames";
import Image from "next/image";
import Products from "../products";
import * as style from "./orderInfo.css";

interface OrderInfoProps {
  orderDetail: OrderDetail;
}

const OrderInfo = (props: OrderInfoProps) => {
  const { orderDetail } = props;

  return (
    <>
      <div className={style.map} />

      <div className={classNames(style.container, globalStyle.innerPadding)}>
        <div className={style.wrapper}>
          <h2 className={style.title}>{orderDetail.store.name}</h2>
          <p className={style.location}>
            <Image src={"/icons/place.svg"} alt={"위치: "} width={17} height={17} />
            {orderDetail.store.roadAddress.addressName}
          </p>
        </div>
        <div className={style.wrapper}>
          <h3 className={classNames(style.subTitle, style.marginBottom)}>구매 품목</h3>
          <Products products={orderDetail.products} />
        </div>
        <div className={style.wrapper}>
          <h3 className={classNames(style.subTitle, style.marginBottom)}>매장 픽업 가능 시간</h3>

          <div className={globalStyle.grayBackground}>
            <strong>오후 7시 30분 ~ 오후 9시</strong> 픽업 가능 해요!
          </div>
        </div>

        <div className={classNames(style.wrapper, style.paymentAmount)}>
          <h3 className={style.subTitle}>결제 예정 금액</h3>

          {formatCurrency(20000)}
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
