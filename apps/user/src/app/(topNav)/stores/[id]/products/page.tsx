import { getStoresDetailProducts } from "@/apis/ssr/stores";
import { BottomButton } from "@/components/ui/storesDetail/bottomButton";
import ProductSelector from "@/components/ui/storesDetail/productSelector";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const productsResponse = await getStoresDetailProducts(id);

  if (!productsResponse.success) {
    return (
      <div>
        <h2>상품 정보를 불러오는 데 실패했습니다.</h2>
      </div>
    );
  }

  const { data: productsData } = productsResponse;

  return (
    <>
      <ProductSelector storesProducts={productsData} />
      <BottomButton buttonText="주문하기" />
    </>
  );
};

export default Page;
