"use client";

import { getStoresDetailProducts } from "@/apis/ssr/stores";
import StoresProducts from "@/components/ui/storesDetail/storesProducts";
import type { Product } from "@/types/apis/stores.type";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const storesResponse = await getStoresDetailProducts(id as string);
        if (storesResponse.success) {
          setProducts(storesResponse.data);
          setIsError(false);
        } else {
          setIsError(true);
          throw storesResponse;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsError(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      {isError ? (
        <div>
          <h2>상품 정보를 불러오는데 실패했습니다.</h2>
          <p>잠시 후 다시 시도해 주세요.</p>
        </div>
      ) : (
        <StoresProducts storesProducts={products} />
      )}
    </Suspense>
  );
};

export default Page;
