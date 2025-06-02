import { getStoresDetail, getStoresDetailProducts } from "@/apis/ssr/stores";
import ProductSelector from "@/components/ui/storesDetail/productSelector";
import StoresInfo from "@/components/ui/storesDetail/storesInfo";
import StoresProducts from "@/components/ui/storesDetail/storesProducts";
import * as style from "./storesDetail.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const storesResponse = await getStoresDetail(id);
  const productsResponse = await getStoresDetailProducts(id);

  console.log(storesResponse, "storesResponse");
  console.log(productsResponse, "productsResponse");

  if (!storesResponse.success || !productsResponse.success) {
    return (
      <div>
        <h2>매장 정보를 불러오는 데 실패했습니다.</h2>
      </div>
    );
  }

  const { data: storesData } = storesResponse;
  const { data: productsData } = productsResponse;

  return (
    <section className={style.container}>
      <StoresInfo storesDetail={storesData} />
      <StoresProducts storesDetail={storesData} storesProducts={productsData} />
      <ProductSelector storesProducts={productsData} />
    </section>
  );
};

export default Page;
