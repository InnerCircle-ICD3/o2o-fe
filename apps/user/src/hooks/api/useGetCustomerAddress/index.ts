import { getCustomerAddress } from "@/apis/ssr/locations";
import type { CustomerAddressResponse } from "@/types/locations.type";
import { useQuery } from "../utils/useQuery";

const useGetCustomerAddress = (customerId?: number) => {
  const { data, isLoading, isError, error } = useQuery<CustomerAddressResponse[]>({
    queryKey: ["customerAddress", customerId],
    queryFn: async () => {
      if (!customerId) throw new Error("고객 ID가 없습니다.");
      const result = await getCustomerAddress({ customerId });
      if (result.success) return result;
      throw new Error(result.message ?? "주소 조회 실패");
    },
    enabled: !!customerId,
  });

  return {
    data: data?.data,
    isLoading,
    isError,
    error,
  };
};

export default useGetCustomerAddress;
