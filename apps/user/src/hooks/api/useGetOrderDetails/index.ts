import { getOrderDetail } from "@/apis/ssr/orders";
import { useQuery } from "@/hooks/api/utils/useQuery";

export const ORDER_DETAIL_QUERY_KEY = "orderDetail";

export const useGetOrderDetail = (orderId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [ORDER_DETAIL_QUERY_KEY, orderId],
    queryFn: async () => {
      const result = await getOrderDetail(orderId);
      if (!result.success) {
        throw new Error(result.message || "주문 상세 정보를 불러오지 못했습니다.");
      }
      return result;
    },
    enabled: !!orderId,
    retry: 1,
  });

  return {
    orderDetail: data?.data,
    isError,
    isPending,
  };
};
