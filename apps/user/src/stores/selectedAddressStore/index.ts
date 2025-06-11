import type { AddressType, CustomerAddressRequest } from "@/types/locations.type";
import { create } from "zustand";

interface SelectedAddressState {
  selectedAddress: Partial<Record<AddressType, CustomerAddressRequest>>;
  setSelectedAddress: (address: CustomerAddressRequest, type: AddressType) => void;
  clearSelectedAddress: (type: AddressType) => void;
}

export const useSelectedAddressStore = create<SelectedAddressState>((set) => ({
  selectedAddress: {},
  setSelectedAddress: (address, type) =>
    set((state) => ({
      selectedAddress: { ...state.selectedAddress, [type]: address },
    })),
  clearSelectedAddress: (type) =>
    set((state) => {
      const updated = { ...state.selectedAddress };
      delete updated[type];
      return { selectedAddress: updated };
    }),
}));
