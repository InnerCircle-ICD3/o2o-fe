import { getOrderList } from "@/apis/ssr/myOrders";
import OrderItem from "@/components/ui/my-orders/orderItem";

const Page = async () => {
  const orderList = await getOrderList(1);
  console.log(orderList);

  return (
    <div>
      {orderList.map((order) => (
        <OrderItem key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default Page;
