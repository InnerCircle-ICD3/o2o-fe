import type { FoodType, PickupTime } from "@/components/ui/filterTab/type";
import { create } from "zustand";

interface FilterTabState {
  selectedFoodType?: FoodType;
  selectedPickupTime?: PickupTime;
  reservable: boolean;
  location?: string;
  search: string;
  onSelectedFoodType: (foodType?: FoodType) => void;
  onResetFoodType: () => void;
  onSelectedPickupTime: (time: PickupTime) => void;
  onResetPickupTime: () => void;
  onToggleReservable: () => void;
  onResetReservable: () => void;
  getPickupTimeString: () => string;
  onLocationChange: (location: string) => void;
  onResetLocation: () => void;
  onSearchChange: (search: string) => void;
  onResetSearch: () => void;
}

export const useFilterTab = create<FilterTabState>((set, get) => {
  const getPickupTimeString = (): string => {
    const state = get();
    if (
      !state.selectedPickupTime ||
      state.selectedPickupTime.hour === undefined ||
      state.selectedPickupTime.minute === undefined
    )
      return "";
    let hour: number = Number(state.selectedPickupTime.hour);
    if (state.selectedPickupTime.day === "오후" && hour < 12) hour += 12;
    if (state.selectedPickupTime.day === "오전" && hour === 12) hour = 0;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(hour)}:${pad(Number(state.selectedPickupTime.minute))}`;
  };

  return {
    selectedFoodType: undefined,
    selectedPickupTime: undefined,
    reservable: false,
    location: undefined,
    search: "",
    onToggleReservable: () => set((state) => ({ reservable: !state.reservable })),
    onResetReservable: () => set({ reservable: false }),
    onSelectedFoodType: (foodType?: FoodType) => {
      set({
        selectedFoodType: foodType,
      });
    },
    onResetFoodType: () => {
      set({ selectedFoodType: undefined });
    },
    onSelectedPickupTime: (time: PickupTime) => {
      set({ selectedPickupTime: time });
    },
    onResetPickupTime: () => {
      set({ selectedPickupTime: undefined });
    },
    getPickupTimeString,
    onLocationChange: (location: string) => {
      set({ location });
    },
    onResetLocation: () => {
      set({ location: undefined });
    },
    onSearchChange: (search: string) => {
      set({ search });
    },
    onResetSearch: () => {
      set({ search: "" });
    },
  };
});
