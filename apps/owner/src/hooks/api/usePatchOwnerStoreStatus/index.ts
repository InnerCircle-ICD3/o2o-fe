import { patchStoreStatus } from "@/apis/ssr/stores";
import { useMutation } from "@/hooks/api/utils/useMutation";
import type { StoreStatus } from "@/types/store";
import { useQueryClient } from "@tanstack/react-query";

const usePatchOwnerStoreStatus = (ownerId?: number, storeId?: number) => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: StoreStatus) => {
      if (!ownerId || !storeId) {
        throw new Error("ownerId 또는 storeId가 없습니다.");
      }
      return patchStoreStatus(ownerId, storeId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownerStore"] });
    },
    onError: (error) => {
      console.error("매장 상태 변경 실패", error);
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    isError,
    error,
  };
};

export default usePatchOwnerStoreStatus;
