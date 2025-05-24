import { getOrderDetail } from "@/apis/ssr/orders";
import OrderInfo from "@/components/common/orderInfo";
import ActionButtons from "@/components/ui/my-orders/actionButtons";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const data = await getOrderDetail(id);

  if (!data.success) {
    return (
      <div>
        <h2>주문 내역을 불러오는 데 실패했습니다.</h2>
      </div>
    );
  }

  const { data: orderDetail } = data;

  return (
    <div>
      <OrderInfo orderDetail={orderDetail} />
      <ActionButtons orderDetail={orderDetail} />
    </div>
  );
};

export default Page;
