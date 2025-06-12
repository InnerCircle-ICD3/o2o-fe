import { getStoresDetailProducts } from "@/apis/ssr/stores";
import StoresProducts from "@/components/ui/storesDetail/storesProducts";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const productsResponse = await getStoresDetailProducts(id);

  const isError = !productsResponse.success;
  const productsData = isError ? [] : productsResponse.data;

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      {isError ? (
        <div>
          <h2>상품 정보를 불러오는데 실패했습니다.</h2>
          <p>잠시 후 다시 시도해 주세요.</p>
        </div>
      ) : (
        <StoresProducts storesProducts={productsData} />
      )}
    </Suspense>
  );
};

export default Page;
