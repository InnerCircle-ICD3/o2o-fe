import Products from "@/components/common/products";
import * as globalStyle from "@/styles/global.css";
import type { Product, StoresDetail } from "@/types/apis/stores.type";
import classNames from "classnames";
import * as style from "./storesProduct.css";

interface StoresProductsProps {
  storesDetail: StoresDetail;
  storesProducts: Product[];
}

const StoresProducts = (props: StoresProductsProps) => {
  const { storesDetail, storesProducts } = props;

  return (
    <article className={classNames(globalStyle.innerPadding, style.container)}>
      <h2 className={style.productTitle}>
        <span className={globalStyle.primaryColor}>{storesDetail.name}</span> 에서 지금
        판매중이에요!
      </h2>

      <Products products={storesProducts} />
    </article>
  );
};

export default StoresProducts;
