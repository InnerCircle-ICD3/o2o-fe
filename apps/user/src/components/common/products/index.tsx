import * as globalStyle from "@/styles/global.css";
import Image from "next/image";
import * as style from "./products.css";

import StatusLabel from "@/components/common/statusLabel";
import type { Product, ProductStatus } from "@/types/apis/stores.type";
import { formatCurrency } from "@/utils/format";
import generateProductStatus from "@/utils/productStatus";
import classNames from "classnames";

interface ProductsProps {
  products: Product[];
}

const Products = (props: ProductsProps) => {
  const { products } = props;

  return (
    <ul className={style.container}>
      {products
        .filter((product) => product.status !== "INACTIVE")
        .map((product) => {
          const { uiStatus, label } = generateProductStatus<ProductStatus>(
            product.status,
            product.inventory,
          );
          return (
            <li key={product.id} className={style.wrapper}>
              <div className={style.thumbnail}>
                <Image
                  className={style.image}
                  src={product.image}
                  alt={"상품 이미지"}
                  width={88}
                  height={105}
                />

                {(uiStatus === "soldOut" || product.inventory.quantity === 0) && (
                  <div className={style.shadowLabel} />
                )}

                <div className={style.productLabel}>
                  <StatusLabel status={uiStatus}>{label}</StatusLabel>
                </div>
              </div>

              <div className={style.infoWrapper}>
                <h3 className={style.strongText}>{product.name}</h3>
                <p className={style.subText}>{product.description}</p>
                <p className={classNames(style.subText, globalStyle.middleStroke)}>
                  {formatCurrency(product.price.originalPrice)}
                </p>
                <p className={style.strongText}>{formatCurrency(product.price.finalPrice)}</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Products;
