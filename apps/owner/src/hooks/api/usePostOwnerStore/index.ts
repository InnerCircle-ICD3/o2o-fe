import { postStore } from "@/apis/ssr/stores";
import { useMutation } from "@/hooks/api/utils/useMutation";
import type { CreateStoreRequest } from "@/types/store";

const usePostOwnerStore = () => {
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: async (data: CreateStoreRequest) => {
      const result = await postStore(data);

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
