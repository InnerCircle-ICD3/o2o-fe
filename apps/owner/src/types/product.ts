export interface Product extends ProductFormData {
  id: number;
  storeId: number;
  storeName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: {
    originalPrice: number;
    discountRate: number;
    finalPrice?: number;
  };
  size: "S" | "M" | "L";
  inventory: { quantity: number; stock?: number };
  foodType: string[];
  image: string;
  status: "ACTIVE" | "INACTIVE";
}
