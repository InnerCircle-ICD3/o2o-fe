"use client";

import Products from "@/components/common/products";
import { BottomButton } from "@/components/ui/storesDetail/bottomButton";
import ProductSelector from "@/components/ui/storesDetail/productSelector";
import * as globalStyle from "@/styles/global.css";
import type { Product } from "@/types/apis/stores.type";
import classNames from "classnames";
import { useState } from "react";
import * as style from "./storesProduct.css";

interface StoresProductsProps {
  storesProducts: Product[];
}

const StoresProducts = (props: StoresProductsProps) => {
  const { storesProducts } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <article className={classNames(globalStyle.innerPadding, style.container)}>
        <h2 className={style.productTitle}>
          <span className={classNames(globalStyle.primaryColor, style.titleEmp)}>
            {storesProducts.length ? storesProducts[0].storeName : "이 매장"}
          </span>{" "}
          에서 지금 판매중이에요!
        </h2>

        <Products products={storesProducts} />
      </article>

      <ProductSelector
        isShow={isOpen}
        storesProducts={storesProducts}
        onClose={() => setIsOpen(false)}
      />
      <BottomButton buttonText="주문하기" onClick={() => setIsOpen(true)} />
    </>
  );
};

export default StoresProducts;
