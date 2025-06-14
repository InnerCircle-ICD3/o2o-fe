import { getStore } from "@/apis/ssr/stores";
import { useQuery } from "@/hooks/api/utils/useQuery";
import type { StoreResponse } from "@/types/store";

const useGetOwnerStore = (userId?: number) => {
  const { data, isLoading, isError, error } = useQuery<StoreResponse[]>({
    queryKey: ["OwnerStore", userId],
    queryFn: async () => {
      if (!userId) throw new Error("사용자 정보가 없습니다");
      const result = await getStore(userId);
      if (!result.success) {
        throw new Error(result.message || "매장 정보를 불러오지 못했습니다.");
      }
      return result;
    },
    enabled: !!userId,
    retry: false,
  });

  return { data: data?.data[0], isLoading, isError, error };
};

export default useGetOwnerStore;
