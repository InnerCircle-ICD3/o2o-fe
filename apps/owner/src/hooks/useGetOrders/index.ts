import { getOrders } from "@/apis/ssr/orders";
import { useQuery } from "@/hooks/api/utils/useQuery";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { OrderListResponse } from "@/types/order";

const useGetOrderList = () => {
  const owner = useOwnerStore((state) => state.owner);
  const storeId = owner?.userId;

  const {
    data: orderList,
    isPending,
    isError,
    error,
  } = useQuery<OrderListResponse>({
    queryKey: ["orderList", storeId],
    queryFn: async () => {
      if (!storeId) throw new Error("점주 정보가 없습니다");
      const result = await getOrders(storeId);
      if (!result.success) {
        throw new Error(result.message || "주문 정보를 불러오지 못했습니다.");
      }
      return result;
    },
    enabled: !!storeId,
    retry: false,
  });

  return {
    orderList,
    isPending,
    isError,
    error,
  };
};

export default useGetOrderList;
