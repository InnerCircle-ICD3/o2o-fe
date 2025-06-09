import type { Inventory, ProductStatus } from "@/types/apis/stores.type";
import type { StatusLabelType } from "@/types/statusLabel.type";

interface GenerateProductStatusResult {
  status: StatusLabelType;
  label: string;
}

const getLabelOfStatus = (quantity: number) => (status: ProductStatus) => {
  if (status === "INACTIVE") {
    return "pending";
  }

  if (status === "SOLD_OUT") {
    return "soldOut";
  }

  if (quantity === 1) return "endSoon";
  return "sales";
};

const getLabelOfQuantity = (quantity: number) => {
  if (quantity === 0) {
    return "마감";
  }

  if (quantity < 10) {
    return `${quantity}개 남음`;
  }

  return "+10개 남음";
};

const generateProductStatus = (
  status: ProductStatus,
  inventory: Inventory,
): GenerateProductStatusResult => {
  const statusLabel = getLabelOfStatus(inventory.stock)(status);
  const quantityLabel = getLabelOfQuantity(inventory.stock);

  return { status: statusLabel, label: quantityLabel };
};

export default generateProductStatus;
