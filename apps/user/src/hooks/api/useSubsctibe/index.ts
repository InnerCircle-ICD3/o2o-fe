import { apiClient } from "@/apis/client";
import { useQueryParams } from "@/hooks/useQueryParams";
import type { SubscribeSuccess } from "@/types/apis/subscribe.type";
import { useQueryClient } from "@tanstack/react-query";
import { STORE_LIST_QUERY_KEY } from "../useStoreList";
import { MY_SUBSCRIBE_QUERY_KEY } from "../useSubscribeList";
import { useMutation } from "../utils/useMutation";

const subscribe = ({
  storeId,
  params = "",
}: {
  storeId: number;
  params?: string;
}) => {
  return apiClient.post<SubscribeSuccess>(`store-subscriptions/${storeId}?${params}`);
};

const useSubscribe = () => {
  const mutation = useMutation({
    mutationFn: subscribe,
  });
  const queryClient = useQueryClient();
  const { queryParams, setAllQueryParams } = useQueryParams();

  const toggleSubscribe = (storeId: number, customerId: number) => {
    setAllQueryParams({
      customerId: customerId.toString(),
    });

    mutation.mutate(
      {
        storeId,
        params: queryParams.toString(),
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [MY_SUBSCRIBE_QUERY_KEY, res.data.userId],
          });
          queryClient.invalidateQueries({
            queryKey: [STORE_LIST_QUERY_KEY],
          });
        },
        onError: (error) => {
          console.error("Subscription failed:", error);
        },
      },
    );
  };

  return toggleSubscribe;
};

export default useSubscribe;
