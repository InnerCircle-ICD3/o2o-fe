import { getOrderDetail } from "@/apis/ssr/orders";
import OrderInfo from "@/components/common/orderInfo";
import Reserve from "@/components/ui/orders/reserve";
import * as style from "./orders.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const orderDetail = await getOrderDetail(id);

  return (
    <section className={style.container}>
      <OrderInfo orderDetail={orderDetail} />

      <Reserve id={id} />
    </section>
  );
};

export default Page;
