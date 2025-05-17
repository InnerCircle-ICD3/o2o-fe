import { getStoreDetail, getStoreDetailProducts } from "@/apis/ssr/stores";
import ProductSelector from "@/components/ui/storeDetail/productSelector";
import StoreInfo from "@/components/ui/storeDetail/storeInfo";
import StoreProducts from "@/components/ui/storeDetail/storeProducts";
import * as style from "./storeDetail.css";

const Page = async ({ params }: { params: { id: string } }) => {
  const storeDetail = await getStoreDetail(params.id);
  const storeProducts = await getStoreDetailProducts(params.id);

  return (
    <section className={style.container}>
      <StoreInfo storeDetail={storeDetail} />
      <StoreProducts storeDetail={storeDetail} storeProducts={storeProducts} />
      <ProductSelector storeProducts={storeProducts} />
    </section>
  );
};

export default Page;
