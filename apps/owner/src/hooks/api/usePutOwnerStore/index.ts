import { UpdateStoreRequest } from "@/types/store";
import { useMutation } from "../utils/useMutation";
import { putStore } from "@/apis/ssr/stores";
import { useQueryClient } from "@tanstack/react-query";

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
}

export default usePutOwnerStore;
