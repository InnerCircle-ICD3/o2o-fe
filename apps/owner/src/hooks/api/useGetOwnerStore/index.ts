import { getStore } from "@/apis/ssr/stores";
import { useQuery } from "@/hooks/api/utils/useQuery";
import type { StoreResponse } from "@/types/store";

const useGetOwnerStore = () => {
  const { data, isLoading, isError, error } = useQuery<StoreResponse[]>({
    queryKey: ["OwnerStore"],
    queryFn: async () => {
      const result = await getStore();
      if (!result.success) {
        throw new Error(result.message || "매장 정보를 불러오지 못했습니다.");
      }
      return result;
    },
    retry: false,
  });

  // 빈 배열이면 null 반환, 있으면 첫 번째 요소 반환
  return {
    data: data?.data.length === 0 ? null : data?.data[0],
    isLoading,
    isError,
    error,
  };
};

export default useGetOwnerStore;
