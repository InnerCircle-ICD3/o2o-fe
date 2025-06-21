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
  nickname: number;
  storeId: number;
  status: OrderStatus;
  totalAmount: number;
  orderTime: string;
  pickupDateTime?: string;
  customerName: string;
  customerPhone: string;
  orderItems: OrderItem[];
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
