import Checkbox from "@/components/common/checkbox";
import type { Product } from "@/types/apis/stores.type";
import type { SelectedProduct } from "@/types/orders.type";
import Image from "next/image";
import { useState } from "react";
import * as style from "./select.css";

interface SelectProps {
  storesProducts: Product[];
  selectedProducts: SelectedProduct[];
  onChange: (product: Product) => void;
}

const Select = (props: SelectProps) => {
  const { storesProducts, selectedProducts, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);

  const buttonStyle = isOpen ? style.button.opened : style.button.default;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectProduct = (product: Product) => {
    if (product.status !== "SOLD_OUT" && product.inventory.quantity > 0) {
      onChange(product);
    }

    setIsOpen(false);
  };

  return (
    <div className={style.container}>
      <button className={buttonStyle} type={"button"} onClick={handleToggle}>
        잇고백을 선택해주세요
        <Image src={"/icons/dropdown_off.svg"} alt="dropdown" width={20} height={20} />
      </button>

      {isOpen && (
        <ul className={style.list}>
          {storesProducts.map((product) => {
            const isSoldOut = product.status === "SOLD_OUT";
            const itemStyle = isSoldOut ? style.item.soldOut : style.item.default;
            const leftCount = product.inventory.quantity > 10 ? "+10" : product.inventory.quantity;

            return (
              <li key={product.id}>
                <label className={itemStyle}>
                  <Checkbox
                    checked={selectedProducts.some(
                      (selectedProduct) => selectedProduct.id === product.id,
                    )}
                    disabled={isSoldOut}
                    onChange={() => {
                      handleSelectProduct(product);
                    }}
                  />
                  <span className={style.title}>{product.name}</span>
                  <span className={style.quantity}>
                    {isSoldOut ? "매진" : `${leftCount}개 남음`}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
