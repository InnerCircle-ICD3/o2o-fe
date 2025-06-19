import OwnerDeleteForm from "@/components/storeOwner/delete";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 min-h-[600px]">
      <h1 className="text-2xl font-bold">점주 계정 삭제</h1>
      <OwnerDeleteForm />
    </div>
  );
}
