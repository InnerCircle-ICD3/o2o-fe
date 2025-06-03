declare global {
  interface Window {
    daum: {
      // biome-ignore lint/style/useNamingConvention: false
      Postcode: {
        new (options: {
          oncomplete: (data: DaumPostcodeData) => void;
          q?: string;
        }): { open: () => void };
      };
    };
  }
}

// 데이터 타입 따로 선언해서 재사용 가능하게
export interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: "R" | "J";
  zonecode: string;
  sido: string;
  sigungu: string;
  bname: string;
}

export const useDaumPostcode = (onComplete: (data: DaumPostcodeData) => void) => {
  const open = (query?: string) => {
    new window.daum.Postcode({
      oncomplete: onComplete,
      ...(query ? { q: query } : {}),
    }).open();
  };
  return open;
};
