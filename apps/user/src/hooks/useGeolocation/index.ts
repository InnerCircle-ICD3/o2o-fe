import { useUserLocation } from "@/stores/userLocationStore";
import { useEffect } from "react";

interface Coordinate {
  lat: number;
  lng: number;
}

const FALLBACK_COORDINATES: Readonly<Coordinate> = {
  lat: 37.566535,
  lng: 126.977969,
};

function isValidCoordinates(coords: Coordinate | undefined | null): coords is Coordinate {
  return (
    !!coords &&
    typeof coords.lat === "number" &&
    typeof coords.lng === "number" &&
    !(coords.lat === 0 && coords.lng === 0)
  );
}

export const useGeolocation = (): Coordinate => {
  const { updateLocations, getLocations } = useUserLocation();
  const location = getLocations();

  useEffect(() => {
    if (!navigator.geolocation || (location.lat !== 0 && location.lng !== 0)) return;

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
  }, [location]);

  return isValidCoordinates(location) ? location : FALLBACK_COORDINATES;
};
