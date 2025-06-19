import { getStoresDetail } from "@/apis/ssr/stores";
import { useQuery } from "@/hooks/api/utils/useQuery";

export const STORE_DETAIL_KEY = "storeDetail";

export const useStoreDetail = (storeId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [STORE_DETAIL_KEY],
    queryFn: async () => {
      const result = await getStoresDetail(storeId);
      if (!result.success) {
        throw result;
      }
      return result;
    },
    enabled: !!storeId,
  });

  return {
    storeDetail: data?.data,
    isError,
    isPending,
  };
};
