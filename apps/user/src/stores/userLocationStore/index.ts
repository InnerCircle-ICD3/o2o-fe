import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Coordinates {
  lat: number;
  lng: number;
}

interface UserLocationStore extends Coordinates {
  updateLocations: (locations: Coordinates) => void;
  resetLocations: () => void;
  getLocations: () => Coordinates;
}

export const useUserLocation = create<UserLocationStore>()(
  persist(
    (set, get) => ({
      lat: 0,
      lng: 0,
      updateLocations: (locations: Coordinates) => set(locations),
      getLocations: () => ({ lat: get().lat, lng: get().lng }),
      resetLocations: () => set({ lat: 0, lng: 0 }),
    }),
    {
      name: "userLocation",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
