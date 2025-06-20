import { apiClient } from "@/apis/client";
import { useMutation } from "@/hooks/api/utils/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { MY_ORDER_QUERY_KEY } from "../useGetMyOrder";
import { ORDER_DETAIL_QUERY_KEY } from "../useGetOrderDetails";

const cancelOrder = (id: number) => {
  return apiClient.post(`orders/${id}/cancel`);
};

const useOrderCancel = () => {
  const mutation = useMutation({
    mutationFn: cancelOrder,
  });

  const queryClient = useQueryClient();

  const successCallback = () => {
    queryClient.invalidateQueries({ queryKey: [MY_ORDER_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [ORDER_DETAIL_QUERY_KEY] });
  };

  const submit = (id: number) => {
    mutation.mutate(id, {
      onSuccess: successCallback,
    });
  };

  return submit;
};

export default useOrderCancel;
