import { postStore } from "@/apis/ssr/stores";
import { useMutation } from "@/hooks/api/utils/useMutation";
import type { CreateStoreRequest } from "@/types/store";
import { useQueryClient } from "@tanstack/react-query";

const usePostOwnerStore = (ownerId?: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: (data: CreateStoreRequest) => {
      if (!ownerId) {
        throw new Error("ownerId가 없습니다.");
      }
      return postStore(ownerId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownerStore"] });
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
