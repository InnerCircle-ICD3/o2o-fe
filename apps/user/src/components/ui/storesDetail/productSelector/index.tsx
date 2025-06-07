"use client";
import type { Product } from "@/types/apis/stores.type";
import ProductBottomSheet from "../productBottomSheet";

interface ProductSelectorProps {
  isShow: boolean;
  onClose: () => void;
  storesProducts: Product[];
}

const ProductSelector = ({ isShow, onClose, storesProducts }: ProductSelectorProps) => {
  return <ProductBottomSheet isShow={isShow} storesProducts={storesProducts} onClose={onClose} />;
};

export default ProductSelector;
