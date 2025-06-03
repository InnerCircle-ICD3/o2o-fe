import StoreRegisterForm from "@/components/store/register";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-2xl font-bold">매장 추가 정보 등록</h1>
        <StoreRegisterForm />
      </div>
    </div>
  );
}
