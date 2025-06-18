import { getCustomer } from "@/apis/ssr/customers";
import type { Result } from "@/apis/types";
import type { Customer } from "@/types/apis/accounts.type";
import { useQuery } from "@tanstack/react-query";

const CUSTOMER_QUERY_KEY = "customer";

const useGetCustomer = (isLogin: boolean) => {
  const { data, isLoading, isError, error } = useQuery<Result<Customer>>({
    queryKey: [CUSTOMER_QUERY_KEY],
    queryFn: getCustomer,
    enabled: isLogin,
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useGetCustomer;
