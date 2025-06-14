export interface Order {
  orderId: number;
  customerId: number;
  storeId: number;
  orderStatus: "PENDING" | "ACCEPTED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
  totalAmount: number;
  orderTime: string;
  pickupTime?: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
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
