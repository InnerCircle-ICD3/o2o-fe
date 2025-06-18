"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SOCIAL_PROVIDERS } from "o2o/constants/login";
import type { Provider } from "o2o/types/login";

export default function Login() {
  const router = useRouter();

  const handleSocialLogin = (provider: Provider) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      console.error("환경변수 NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");
      return;
    }

    router.push(`${baseUrl}/oauth2/authorization/${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm flex flex-col items-center space-y-6">
        <Image src="/images/character3.png" alt="캐릭터" width={172} height={136} />
        <Image src="/images/logoTitle.png" alt="로고" width={147} height={62} />
        {Object.entries(SOCIAL_PROVIDERS).map(([provider, { label, iconSrc }]) => (
          <Button
            key={provider}
            className="bg-[#FEE500] text-[#191600] hover:bg-[#FEE500]/90 justify-center w-full h-[60px]"
            variant="ghost"
            onClick={() => handleSocialLogin(provider as Provider)}
          >
            <Image src={`/images/${iconSrc}`} alt={`${label} 아이콘`} width={20} height={20} />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
