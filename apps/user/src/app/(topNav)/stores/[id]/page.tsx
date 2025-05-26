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

  const storesData = await getStoresDetail(id);
  const productsData = await getStoresDetailProducts(id);

  if (!storesData.success || !productsData.success) {
    return (
      <div>
        <h2>매장 정보를 불러오는 데 실패했습니다.</h2>
      </div>
    );
  }

  const { data: storesDetail } = storesData;
  const { data: storesProducts } = productsData;

  return (
    <section className={style.container}>
      <StoresInfo storesDetail={storesDetail} />
      <StoresProducts storesDetail={storesDetail} storesProducts={storesProducts} />
      <ProductSelector storesProducts={storesProducts} />
    </section>
  );
};

export default Page;
