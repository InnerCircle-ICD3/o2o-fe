import { confirmOrder } from "@/apis/ssr/orders";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useConfirmOrder = ({ orderId }: { orderId?: number }) => {
  const queryClient = useQueryClient();
  const owner = useOwnerStore((state) => state.owner);
  const storeId = owner?.userId;
  console.log("storeId", storeId);

  const {
    mutate: mutateConfirmOrder,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      if (!storeId || !orderId) {
        throw new Error("storeId 또는 orderId가 없습니다.");
      }
      return confirmOrder(storeId, orderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["confirmOrder", orderId] });
    },
    onError: (error) => {
      console.error("주문 승인 실패", error);
    },
  });

  return {
    mutateConfirmOrder,
    isPending,
    isError,
    error,
  };
};
