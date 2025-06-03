import StoreRegisterForm from "@/components/store/register";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-center text-2xl font-bold">매장 추가 정보 등록</h1>
        <StoreRegisterForm />
      </div>
    </div>
  );
}
