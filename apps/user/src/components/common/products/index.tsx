import * as globalStyle from "@/styles/global.css";
import Image from "next/image";
import * as style from "./products.css";

import StatusLabel from "@/components/common/statusLabel";
import type { Product } from "@/types/apis/stores.type";
import { formatCurrency } from "@/utils/format";
import generateProductStatus from "@/utils/productStatus";
import classNames from "classnames";

const PRODUCTS_IMAGE = {
  S: "/images/back_s.png",
  M: "/images/back_m.png",
  L: "/images/back_l.png",
};

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
          const { status, label } = generateProductStatus(product.status, product.inventory);
          return (
            <li key={product.id} className={style.wrapper}>
              <div className={style.thumbnail}>
                <Image src={PRODUCTS_IMAGE[product.size]} alt={""} width={88} height={105} />

                {(status === "soldOut" || product.inventory.quantity === 0) && (
                  <div className={style.shadowLabel} />
                )}

                <div className={style.productLabel}>
                  <StatusLabel status={status}>{label}</StatusLabel>
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
