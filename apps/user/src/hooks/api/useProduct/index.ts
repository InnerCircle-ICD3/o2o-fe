import { getStoresDetail } from "@/apis/ssr/stores";
import type { StoresDetail } from "@/types/apis/stores.type";
import { useQuery } from "../utils/useQuery";

export const PRODUCT_KEY = "product";

const useProduct = (id: string) => {
  const data = useQuery<StoresDetail>({
    queryKey: [PRODUCT_KEY, id],
    queryFn: () => getStoresDetail(id),
  });

  return data;
};

export default useProduct;
