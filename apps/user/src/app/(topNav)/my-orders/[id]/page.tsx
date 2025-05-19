import { getOrderDetail } from "@/apis/ssr/orders";
import OrderInfo from "@/components/common/orderInfo";
import ActionButtons from "@/components/ui/my-orders/actionButtons";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const orderDetail = await getOrderDetail(id);

  return (
    <div>
      <OrderInfo orderDetail={orderDetail} />
      <ActionButtons orderDetail={orderDetail} />
    </div>
  );
};

export default Page;
