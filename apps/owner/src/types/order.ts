export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export interface Order {
  id: number;
  orderNumber: string;
  nickname: string;
  customerId: number;
  storeId: number;
  status: OrderStatus;
  pickupDateTime?: string;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  canceledAt: string;
  confirmedAt: string;
  doneAt: string;
  hasReview: boolean;
  readiedAt: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  options?: OrderItemOption[];
}

export interface OrderItemOption {
  optionId: number;
  optionName: string;
  optionValue: string;
  additionalPrice: number;
}

export interface OrderListResponse {
  contents: Order[];
  lastId: number | null;
}
