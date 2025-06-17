import type { Order } from "@/types/order";
import { create } from "zustand";

interface OrderModalState {
  isOpen: boolean;
  orderData: Order | null;
  openModal: (orderData: Order) => void;
  closeModal: () => void;
}

export const useOrderModalStore = create<OrderModalState>((set) => ({
  isOpen: false,
  orderData: null,
  openModal: (orderData) => set({ isOpen: true, orderData }),
  closeModal: () => set({ isOpen: false, orderData: null }),
}));
