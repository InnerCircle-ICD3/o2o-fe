import { apiClient } from "@/apis/client";
import type { OrderDetail } from "@/types/apis/order.type";
import { useQuery } from "@tanstack/react-query";

const getMyOrder = (id: number) => {
  return apiClient.get<OrderDetail[]>(`customer/${id}/orders`);
};

const MY_ORDER_QUERY_KEY = "myOrder";

const useGetMyOrder = (id: number) => {
  return useQuery<OrderDetail[]>({
    queryKey: [MY_ORDER_QUERY_KEY, id],
    queryFn: () => getMyOrder(id),
  });
};

export default useGetMyOrder;
