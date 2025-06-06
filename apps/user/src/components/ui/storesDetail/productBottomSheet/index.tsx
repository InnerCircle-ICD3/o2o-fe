import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import usePostOrder from "@/hooks/api/usePostOrder";
import useSelectedProducts from "@/hooks/useSelectedProducts";
import type { Product } from "@/types/apis/stores.type";
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
  const submitOrder = usePostOrder();
  const {
    selectedProducts,
    orderSummary,
    handleSelectProduct,
    handleDeleteProduct,
    updateProductCount,
  } = useSelectedProducts();

  const handleSubmit = () => {
    const orderBody = {
      storeId: storesProducts[0].storeId,
      products: selectedProducts.map((product) => ({
        productId: product.id,
        selectedCount: product.selectedCount,
      })),
    };

    submitOrder(orderBody);
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
