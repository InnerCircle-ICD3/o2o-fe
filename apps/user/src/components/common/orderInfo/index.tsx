import StoreMap from "@/components/ui/locations/storeMap";
import { ORDER_STATUS } from "@/constants/my-orders";
import { useStoreDetail } from "@/hooks/api/useStoreDetail";
import { useToastStore } from "@/stores/useToastStore";
import * as globalStyle from "@/styles/global.css";
import type { OrderDetail } from "@/types/apis/order.type";
import { formatCurrency, formatHourTo12HourText } from "@/utils/format";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as style from "./orderInfo.css";

const paymentLabel = {
  [ORDER_STATUS.CREATED]: "결제 예정 금액",
  [ORDER_STATUS.READY]: "결제 예정 금액",
  [ORDER_STATUS.CONFIRMED]: "결제 예정 금액",
  [ORDER_STATUS.DONE]: "결제 금액",
  [ORDER_STATUS.CANCELED]: "결제 취소 금액",
};

interface OrderInfoProps {
  orderDetail: OrderDetail;
}

const OrderInfo = (props: OrderInfoProps) => {
  const { push } = useRouter();
  const { orderDetail } = props;
  const storeId = orderDetail.storeId;
  const { storeDetail } = useStoreDetail(String(storeId));
  const { showToast } = useToastStore();

  const totalPrice = orderDetail.orderItems.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0,
  );

  useEffect(() => {
    // 결제 취소 상태인 경우 토스트 메시지 표시 및 매장 상세 페이지로 이동
    if (orderDetail.status === ORDER_STATUS.CANCELED) {
      showToast("주문이 취소되었습니다.");

      //   // 일정 시간 후 매장 상세 페이지로 이동
      //   const timer = setTimeout(() => {
      //     push(`/stores/${storeId}`);
      //   }, 2000); // 2초 후 이동

      //   return () => clearTimeout(timer);
    }
  }, [orderDetail.status, showToast, push, storeId]);

  return (
    <>
      <div className={style.map}>
        {storeDetail?.address?.coordinate ? (
          <StoreMap
            lat={storeDetail?.address?.coordinate?.latitude || 37.5665}
            lng={storeDetail?.address?.coordinate?.longitude || 126.978}
          />
        ) : (
          <Image src={"/images/mockOrder.png"} alt={"mock map"} fill />
        )}
      </div>

      <div className={classNames(style.container, globalStyle.innerPadding)}>
        <div className={style.wrapper}>
          <h2 className={style.title}>
            {storeDetail?.name}{" "}
            <span className={style.category}>{storeDetail?.storeCategory.join(", ")}</span>
          </h2>
          <p className={style.location}>
            <Image src={"/icons/place.svg"} alt={"위치: "} width={17} height={17} />
            {storeDetail?.address?.roadNameAddress}
          </p>
        </div>
        <div className={style.wrapper}>
          <h3 className={classNames(style.subTitle, style.marginBottom)}>구매 품목</h3>
          <ul>
            {orderDetail.orderItems.map((item) => {
              return (
                <li key={item.id} className={style.orderList}>
                  <div className={style.thumbnail}>
                    <Image
                      src={item.imageUrl}
                      alt={"상품 이미지"}
                      width={150}
                      height={150}
                      style={{ objectFit: "cover" }}
                    />

                    <div className={style.productLabel}>
                      <p className={style.statusStyle}>{item.quantity} 개</p>
                    </div>
                  </div>

                  <div className={style.infoWrapper} style={{ paddingLeft: "1rem" }}>
                    <h3 className={style.strongText}>{item.productName}</h3>
                    <p className={classNames(style.subText, globalStyle.middleStroke)}>
                      {formatCurrency(item.originPrice)}
                    </p>
                    <p className={style.strongText}>{formatCurrency(item.finalPrice)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.wrapper}>
          <h3 className={classNames(style.subTitle, style.marginBottom)}>매장 픽업 가능 시간</h3>

          <div className={globalStyle.grayBackground}>
            <strong>
              {formatHourTo12HourText(storeDetail?.todayPickupStartTime ?? "0")} ~{" "}
              {formatHourTo12HourText(storeDetail?.todayPickupEndTime ?? "0")}
            </strong>{" "}
            픽업 가능 해요!
          </div>
        </div>

        <div className={classNames(style.wrapper, style.paymentAmount)}>
          <h3 className={style.subTitle}>{paymentLabel[ORDER_STATUS[orderDetail.status]]}</h3>

          <p className={classNames(globalStyle.primaryColor, style.price)}>
            {formatCurrency(totalPrice)}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
