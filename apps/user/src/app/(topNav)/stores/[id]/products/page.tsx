import { getStoresDetailProducts } from "@/apis/ssr/stores";
import StoresProducts from "@/components/ui/storesDetail/storesProducts";

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

  // todo : storeName
  return <StoresProducts storeName={"냠냠"} storesProducts={productsData} />;
};

export default Page;
