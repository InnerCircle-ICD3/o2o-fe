"use client";
import type { Product } from "@/types/apis/stores.type";
import ProductBottomSheet from "../productBottomSheet";

interface ProductSelectorProps {
  storesProducts: Product[];
}

const ProductSelector = (props: ProductSelectorProps) => {
  const { storesProducts } = props;

  return <ProductBottomSheet isShow={false} storesProducts={storesProducts} onClose={() => {}} />;
};

export default ProductSelector;
