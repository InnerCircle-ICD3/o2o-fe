import { getCustomerAddress } from "@/apis/ssr/locations";
import { useQuery } from "../utils/useQuery";

const useGetCustomerAddress = (customerId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customerAddress", customerId],
    queryFn: async () => {
      const result = await getCustomerAddress({ customerId });
      if (result.success) return result;
      throw new Error(result.errorMessage ?? "주소 조회 실패");
    },
  });

  return {
    data: data?.data,
    isLoading,
    isError,
  };
};

export default useGetCustomerAddress;
