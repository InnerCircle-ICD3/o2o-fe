import { getStoresDetail, getStoresDetailProducts } from "@/apis/ssr/stores";
import ProductSelector from "@/components/ui/storesDetail/productSelector";
import StoresInfo from "@/components/ui/storesDetail/storesInfo";
import StoresProducts from "@/components/ui/storesDetail/storesProducts";
import * as style from "./storeDetail.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { id } = await params;

  const storesDetail = await getStoresDetail(id);
  const storesProducts = await getStoresDetailProducts(id);

  return (
    <section className={style.container}>
      <StoresInfo storesDetail={storesDetail} />
      <StoresProducts storesDetail={storesDetail} storesProducts={storesProducts} />
      <ProductSelector storesProducts={storesProducts} />
    </section>
  );
};

export default Page;
