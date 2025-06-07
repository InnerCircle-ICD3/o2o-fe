import { create } from "zustand";

export interface UserState {
  user: {
    userId: string;
    roles: string[];
    nickname: string;
    customerId: number;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
