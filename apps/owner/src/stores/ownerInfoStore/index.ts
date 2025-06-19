import type { StoreResponse } from "@/types/store";
import { create } from "zustand";

interface OwnerState {
  owner: {
    storeOwnerId: number;
    roles: string[];
    nickname: string;
    userId: number;
  } | null;
  store: StoreResponse | null;
  setOwner: (owner: OwnerState["owner"]) => void;
  setStore: (store: OwnerState["store"]) => void;
  clearOwner: () => void;
  clearStore: () => void;
}

export const useOwnerStore = create<OwnerState>((set) => ({
  owner: null,
  store: null,
  setOwner: (owner) => set({ owner }),
  setStore: (store) => set({ store }),
  clearOwner: () => set({ owner: null }),
  clearStore: () => set({ store: null }),
}));
