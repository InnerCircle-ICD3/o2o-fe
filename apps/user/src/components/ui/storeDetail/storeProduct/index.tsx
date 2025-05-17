import * as globalStyle from "@/styles/global.css";
import Products from "../products";
import * as style from "./storeProduct.css";

const PRODUCTS_IMAGE = {
  small: "/images/back_s.png",
  medium: "/images/back_m.png",
  large: "/images/back_l.png",
};

interface StoreProductProps {
  products: {
    type: keyof typeof PRODUCTS_IMAGE;
    id: number;
    name: string;
    originalPrice: number;
    discountPrice: number;
    variant: number;
    length: number;
  }[];
}

const StoreProduct = (props: StoreProductProps) => {
  const { products } = props;

  return (
    <article className={globalStyle.innerPadding}>
      <h2 className={style.productTitle}>
        <span className={globalStyle.primaryColor}>냠냠치킨</span>에서 지금 판매중이에요!
      </h2>

      <Products products={products} />
    </article>
  );
};

export default StoreProduct;
