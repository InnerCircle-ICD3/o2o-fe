import { create } from "zustand";

interface OwnerState {
  owner: {
    storeOwnerId: string;
    roles: string[];
    nickname: string;
    customerId: number;
  } | null;
  setOwner: (owner: OwnerState["owner"]) => void;
  clearOwner: () => void;
}

export const useOwnerStore = create<OwnerState>((set) => ({
  owner: null,
  setOwner: (owner) => set({ owner }),
  clearOwner: () => set({ owner: null }),
}));
