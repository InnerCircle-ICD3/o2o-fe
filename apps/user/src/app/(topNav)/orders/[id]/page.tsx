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

  const response = await getOrderDetail(id);

  if (!response.success) {
    return (
      <div>
        <h2>주문 내역을 불러오는 데 실패했습니다.</h2>
      </div>
    );
  }

  const { data } = response;

  return (
    <section className={style.container}>
      <OrderInfo orderDetail={data} />

      <Reserve id={id} />
    </section>
  );
};

export default Page;
