import { getOrderDetail } from "@/apis/ssr/orders";
import OrderInfo from "@/components/common/orderInfo";
import Reserve from "@/components/ui/orders/reserve";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const orderDetail = await getOrderDetail(id);

  console.log(orderDetail);

  return (
    <section>
      <OrderInfo orderDetail={orderDetail} />

      <Reserve />
    </section>
  );
};

export default Page;
