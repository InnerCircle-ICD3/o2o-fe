import type { Coordinate } from "@/types/locations.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserLocationStore extends Coordinate {
  updateLocations: (locations: Coordinate) => void;
  resetLocations: () => void;
  getLocations: () => Coordinate;
}

export const useUserLocation = create<UserLocationStore>()(
  persist(
    (set, get) => ({
      lat: 0,
      lng: 0,
      updateLocations: (locations: Coordinate) => set(locations),
      getLocations: () => ({ lat: get().lat, lng: get().lng }),
      resetLocations: () => set({ lat: 0, lng: 0 }),
    }),
    {
      name: "userLocation",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
