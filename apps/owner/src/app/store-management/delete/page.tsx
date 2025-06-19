import StoreDeleteForm from "@/components/store/delete";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 min-h-[600px]">
      <h1 className="text-2xl font-bold">매장 삭제</h1>
      <StoreDeleteForm />
    </div>
  );
}
