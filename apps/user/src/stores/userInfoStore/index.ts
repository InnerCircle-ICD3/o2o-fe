import { create } from "zustand";

interface UserState {
  user: {
    userId: string;
    roles: string[];
    nickname: string;
    customerId: number;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
}

export const userInfoStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
