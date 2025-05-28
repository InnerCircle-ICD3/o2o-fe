import { getOrderDetail } from "@/apis/ssr/orders";
import OrderInfo from "@/components/common/orderInfo";
import ActionButtons from "@/components/ui/my-orders/actionButtons";

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
    <div>
      <OrderInfo orderDetail={data} />
      <ActionButtons orderDetail={data} />
    </div>
  );
};

export default Page;
