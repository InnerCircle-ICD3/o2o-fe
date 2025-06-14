import { putStore } from "@/apis/ssr/stores";
import type { UpdateStoreRequest } from "@/types/store";
import { useMutation } from "../utils/useMutation";

const usePutOwnerStore = (ownerId?: number, storeId?: number) => {
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (data: UpdateStoreRequest) => {
      if (!ownerId) throw new Error("사용자 정보가 없습니다");
      if (!storeId) throw new Error("매장 정보가 없습니다");
      const response = await putStore(Number(ownerId), Number(storeId), data);
      if (!response.success) {
        throw new Error(response.message || "매장 정보 수정에 실패했습니다");
      }
      return response;
    },
  });

  return { mutate, mutateAsync, isPending, isError, error };
};

export default usePutOwnerStore;
