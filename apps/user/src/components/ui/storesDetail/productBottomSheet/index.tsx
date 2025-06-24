"use client";

import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import usePostOrder from "@/hooks/api/usePostOrder";
import useSelectedProducts from "@/hooks/useSelectedProducts";
import { useToastStore } from "@/stores/useToastStore";
import { userInfoStore } from "@/stores/userInfoStore";
import type { Product } from "@/types/apis/stores.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "../select";
import SelectedItem from "../selectedItem";
import TotalPrice from "../totalPrice";
import * as style from "./productBottomSheet.css";

interface ProductBottomSheetProps {
  isShow: boolean;
  storesProducts: Product[];
  onClose: () => void;
}

const ProductBottomSheet = (props: ProductBottomSheetProps) => {
  const { isShow, storesProducts, onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const submitOrder = usePostOrder();
  const { user } = userInfoStore();
  const isLogin = !!user?.customerId;
  const {
    selectedProducts,
    orderSummary,
    handleSelectProduct,
    handleDeleteProduct,
    updateProductCount,
  } = useSelectedProducts();
  const { showToast } = useToastStore();
  const router = useRouter();

  const handleSubmit = () => {
    if (isLoading) return;
    if (!isLogin) {
      showToast("로그인 후 이용해주세요.");
      router.push("/login");
    } else {
      setIsLoading(true);
      const orderBody = {
        // TODO - 픽업타임 메인에서 설정되면 가지고 와야 할 듯 / 지금은 현재 시간 + 30분 으로 주문 생성함
        pickupDateTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        storeId: storesProducts[0].storeId,
        orderItems: selectedProducts.map((product) => ({
          productId: product.id,
          productName: product.name,
          price: product.price.finalPrice,
          quantity: product.selectedCount,
        })),
      };

      submitOrder(orderBody);
    }
  };

  return (
    <BottomSheet type={"shadow"} isShow={isShow} title={"옵션 선택하기"} onClose={onClose}>
      <div className={style.container}>
        <Select
          storesProducts={storesProducts}
          selectedProducts={selectedProducts}
          onChange={handleSelectProduct}
        />
        {selectedProducts.map((product) => (
          <SelectedItem
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
            onUpdateCount={updateProductCount}
          />
        ))}
        <TotalPrice orderSummary={orderSummary} />

        <Button
          status={selectedProducts.length !== 0 ? "primary" : "disabled"}
          type={"button"}
          onClick={handleSubmit}
        >
          주문하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default ProductBottomSheet;
