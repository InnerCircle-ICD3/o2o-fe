import StoreMap from "@/components/ui/locations/storeMap";

interface PageProps {
  searchParams: { lat: string; lng: string };
}

export default function Page({ searchParams }: PageProps) {
  const { lat, lng } = searchParams;
  return <StoreMap lat={Number(lat)} lng={Number(lng)} />;
}
