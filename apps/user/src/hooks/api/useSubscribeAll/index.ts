import { apiClient } from "@/apis/client";
import type { ResultSuccess } from "@/apis/types";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "../utils/useQuery";

const subscribeAll = () => {
  return apiClient.get<number[]>("store-subscriptions/store-ids");
};

const useSubscribeAll = (isLogin: boolean) => {
  const { data } = useQuery({
    queryKey: ["subscribeAll"],
    queryFn: subscribeAll,
    staleTime: Number.POSITIVE_INFINITY,
    enabled: isLogin,
  });

  const subscribes = data?.data || [];

  return subscribes;
};

export const useSubscribeUpdate = () => {
  const queryClient = useQueryClient();

  const addSubscribe = (id: number) => {
    queryClient.setQueryData(["subscribeAll"], (oldData: ResultSuccess<number[]>) => ({
      ...oldData,
      data: [...(oldData?.data || []), id],
    }));
  };

  const removeSubscribe = (id: number) => {
    queryClient.setQueryData(["subscribeAll"], (oldData: ResultSuccess<number[]>) => ({
      ...oldData,
      data: (oldData?.data || []).filter((item: number) => item !== id),
    }));
  };

  return { addSubscribe, removeSubscribe };
};

export default useSubscribeAll;
