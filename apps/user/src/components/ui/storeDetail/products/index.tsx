import * as globalStyle from "@/styles/global.css";
import Image from "next/image";
import * as style from "./products.css";

import StatusLabel from "@/components/common/statusLabel";
import generateProductStatus from "@/utils/productStatus";
import classNames from "classnames";

const PRODUCTS_IMAGE = {
  small: "/images/back_s.png",
  medium: "/images/back_m.png",
  large: "/images/back_l.png",
};

interface ProductItem {
  type: keyof typeof PRODUCTS_IMAGE;
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  variant: number;
  length: number;
}

interface ProductsProps {
  products: ProductItem[];
}

const Products = (props: ProductsProps) => {
  const { products } = props;

  return (
    <ul className={style.container}>
      {products.map((product) => {
        const { status, label } = generateProductStatus(product.length);
        return (
          <li key={product.id} className={style.wrapper}>
            <div className={style.thumbnail}>
              <Image src={PRODUCTS_IMAGE[product.type]} alt={""} width={88} height={105} />

              {status === "soldOut" && <div className={style.shadowLabel} />}

              <div className={style.productLabel}>
                <StatusLabel status={status}>{label}</StatusLabel>
              </div>
            </div>

            <div className={style.infoWrapper}>
              <h3 className={style.strongText}>{product.name}</h3>
              <p className={style.subText}>{product.variant}</p>
              <p className={classNames(style.subText, globalStyle.middleStroke)}>
                {product.originalPrice}
              </p>
              <p className={style.strongText}>{product.discountPrice}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Products;
