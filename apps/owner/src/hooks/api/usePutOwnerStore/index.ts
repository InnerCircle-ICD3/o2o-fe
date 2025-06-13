import { putStore } from "@/apis/ssr/stores";
import type { UpdateStoreRequest } from "@/types/store";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "../utils/useMutation";

const usePutOwnerStore = (ownerId?: number, storeId?: number) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: UpdateStoreRequest) => {
      if (!ownerId) throw new Error("사용자 정보가 없습니다");
      if (!storeId) throw new Error("매장 정보가 없습니다");
      return putStore(Number(ownerId), Number(storeId), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownerStore"] });
    },
    onError: (error) => {
      console.error("매장 정보 수정 실패", error);
    },
  });

  return { mutate, isPending, isError, error };
};

export default usePutOwnerStore;
