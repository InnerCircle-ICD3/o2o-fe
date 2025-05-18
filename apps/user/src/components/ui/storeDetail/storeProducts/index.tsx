import Products from "@/components/common/products";
import * as globalStyle from "@/styles/global.css";
import type { Product, StoreDetail } from "@/types/apis/store.type";
import classNames from "classnames";
import * as style from "./storeProduct.css";

interface StoreProductsProps {
  storeDetail: StoreDetail;
  storeProducts: Product[];
}

const StoreProducts = (props: StoreProductsProps) => {
  const { storeDetail, storeProducts } = props;

  return (
    <article className={classNames(globalStyle.innerPadding, style.container)}>
      <h2 className={style.productTitle}>
        <span className={globalStyle.primaryColor}>{storeDetail.name}</span> 에서 지금 판매중이에요!
      </h2>

      <Products products={storeProducts} />
    </article>
  );
};

export default StoreProducts;
