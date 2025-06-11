import { deleteCustomerAddress } from "@/apis/ssr/locations";
import { useMutation } from "@/hooks/api/utils/useMutation";
import { useQueryClient } from "@tanstack/react-query";

const useDeleteCustomerAddress = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ customerId, addressId }: { customerId?: number; addressId?: number }) => {
      if (!customerId || !addressId) {
        throw new Error("customerId 또는 addressId가 없습니다.");
      }
      return deleteCustomerAddress({ customerId, addressId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerAddress"] });
    },
    onError: (error) => {
      console.error("삭제 실패", error);
    },
  });

  // 커스텀 훅에서 사용할 값과 함수 반환
  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export default useDeleteCustomerAddress;
