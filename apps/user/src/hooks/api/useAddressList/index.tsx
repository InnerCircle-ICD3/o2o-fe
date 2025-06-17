import { apiClient } from "@/apis/client";
import type { CustomerAddress } from "@/apis/ssr/locations";
import { useQuery } from "../utils/useQuery";

const getAddressList = () => {
  return apiClient.get<CustomerAddress[]>("customers/address");
};

const ADDRESS_KEY = "address";

const useAddressList = (isLogin: boolean) => {
  const { data, isLoading, isError, error } = useQuery<CustomerAddress[]>({
    queryKey: [ADDRESS_KEY],
    queryFn: getAddressList,
    enabled: isLogin,
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useAddressList;
