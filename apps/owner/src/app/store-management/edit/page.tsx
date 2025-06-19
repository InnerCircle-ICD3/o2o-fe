import StoreEdit from "@/components/store/edit";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 min-h-[600px]">
      <h1 className="text-2xl font-bold">매장 수정</h1>
      <StoreEdit />
    </div>
  );
}
