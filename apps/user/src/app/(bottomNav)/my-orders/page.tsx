import { getOrderList } from "@/apis/ssr/myOrders";
import OrderItem from "@/components/ui/my-orders/orderItem";
import * as style from "./myOrders.css";

const Page = async () => {
  const orderList = await getOrderList(1);

  return (
    <div className={style.container}>
      <h2 className={style.title}>나의 주문 내역</h2>
      <ul>
        {orderList.map((order) => (
          <OrderItem key={order.orderId} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
