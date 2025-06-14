import { postStore } from "@/apis/ssr/stores";
import { useMutation } from "@/hooks/api/utils/useMutation";
import type { CreateStoreRequest } from "@/types/store";

const usePostOwnerStore = (ownerId?: number) => {
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: async (data: CreateStoreRequest) => {
      if (!ownerId) {
        throw new Error("ownerId가 없습니다.");
      }
      const result = await postStore(ownerId, data);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onError: (error) => {
      console.error("매장 등록 실패", error);
    },
  });

  return {
    mutate,
    isPending,
    isError,
    error,
    data,
  };
};

export default usePostOwnerStore;
