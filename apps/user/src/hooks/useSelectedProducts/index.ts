import type { Product } from "@/types/apis/stores.type";
import type { OrderSummary, SelectedProduct } from "@/types/orders.type";
import { useState } from "react";

const useSelectedProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const orderSummary: OrderSummary = selectedProducts.reduce(
    (acc, product) => ({
      count: acc.count + product.selectedCount,
      originalPrice: acc.originalPrice + product.price.originalPrice * product.selectedCount,
      finalPrice: acc.finalPrice + product.price.finalPrice * product.selectedCount,
    }),
    {
      count: 0,
      originalPrice: 0,
      finalPrice: 0,
    },
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (!existing) {
        const newProduct: SelectedProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          selectedCount: 1,
          quantity: product.inventory.quantity,
        };

        return [...prev, newProduct];
      }

      const nextCount = existing.selectedCount + 1;
      const cappedCount = Math.min(nextCount, product.inventory.quantity);

      return prev.map((item) =>
        item.id === product.id ? { ...item, selectedCount: cappedCount } : item,
      );
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const updateProductCount = (productId: string, delta: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product.id !== productId) return product;

        const updatedCount = product.selectedCount + delta;

        return {
          ...product,
          selectedCount: Math.min(Math.max(updatedCount, 1), product.quantity),
        };
      }),
    );
  };

  return {
    selectedProducts,
    orderSummary,
    handleSelectProduct,
    handleDeleteProduct,
    updateProductCount,
  };
};

export default useSelectedProducts;
