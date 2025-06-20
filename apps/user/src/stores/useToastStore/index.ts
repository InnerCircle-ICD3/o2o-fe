import { create } from "zustand";

interface ToastState {
  message: string;
  isVisible: boolean;
  isError: boolean;
  showToast: (message: string, isError?: boolean) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  isVisible: false,
  isError: false,
  showToast: (message, isError = false) => {
    set({ message, isVisible: true, isError });
    setTimeout(() => {
      set((state) => ({ ...state, isVisible: false }));
    }, 2000);
  },
  hideToast: () => set({ isVisible: false }),
}));
