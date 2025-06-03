import { apiClient } from "@/apis/client";
import type { OrderDetail } from "@/types/apis/order.type";
import { useQuery } from "../utils/useQuery";

const getMyOrder = (id: number) => {
  return apiClient.get<OrderDetail[]>(`customer/${id}/orders`);
};

const MY_ORDER_QUERY_KEY = "myOrder";

const useGetMyOrder = (id: number) => {
  const { data, error, isError, isLoading } = useQuery<OrderDetail[]>({
    queryKey: [MY_ORDER_QUERY_KEY, id],
    queryFn: () => getMyOrder(id),
  });

  return {
    data: data?.data,
    error,
    isError,
    isLoading,
  };
};

export default useGetMyOrder;
