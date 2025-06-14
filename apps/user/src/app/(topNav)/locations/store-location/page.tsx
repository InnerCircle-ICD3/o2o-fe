import StoreMap from "@/components/ui/locations/storeMap";

export default function Page({ searchParams }: { searchParams: { lat: string; lng: string } }) {
  const lat = Number(searchParams.lat);
  const lng = Number(searchParams.lng);

  return <StoreMap lat={lat} lng={lng} />;
}
