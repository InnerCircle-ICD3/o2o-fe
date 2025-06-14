import StoreMap from "@/components/ui/locations/storeMap";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const lat = Number(params.lat);
  const lng = Number(params.lng);

  return <StoreMap lat={lat} lng={lng} />;
}
