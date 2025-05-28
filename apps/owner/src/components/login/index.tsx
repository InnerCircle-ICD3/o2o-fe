import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm flex flex-col items-center space-y-6">
        <Image src="/images/character3.png" alt="캐릭터" width={172} height={136} />
        <Image src="/images/logoTitle.png" alt="로고" width={147} height={62} />
        <Button
          className="bg-[#FEE500] text-[#191600] hover:bg-[#FEE500]/90 justify-center w-full h-[60px]"
          variant="ghost"
        >
          <Image src="/icons/kakao_icon.svg" alt="kakao" width={20} height={20} className="mr-2" />
          카카오 로그인
        </Button>
      </div>
    </div>
  );
}
