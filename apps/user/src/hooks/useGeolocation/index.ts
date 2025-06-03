import { useUserLocation } from "@/stores/userLocationStore";
import { useEffect } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

export const useGeolocation = (): Coordinates | null => {
  const { updateLocations, getLocations } = useUserLocation();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateLocations({
          lat: Number(position.coords.latitude.toFixed(6)),
          lng: Number(position.coords.longitude.toFixed(6)),
        });
      },
      (error) => {
        console.error("Geolocation error", error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, [updateLocations]);

  const location = getLocations();
  return location || { lat: 33.450705, lng: 126.570677 };
};
