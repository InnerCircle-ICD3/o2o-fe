import { useAddressToCoordinates } from "@/hooks/useAddressToCoordinates";
import { useDaumPostcode } from "@/hooks/useDaumPostcode";
import type { CreateStoreRequest } from "@/types/store";
import { useState } from "react";
import type { UseFormReturn } from "use-form-light";

export const useStoreAddress = (form: UseFormReturn<CreateStoreRequest>) => {
  const { setValue, watch } = form;
  const [addressType, setAddressType] = useState<"R" | "J" | "">("");

  // 도로명 주소 → 위도/경도 자동 입력
  useAddressToCoordinates({
    address: watch("roadNameAddress") || watch("lotNumberAddress") || "",
    onSuccess: ({ latitude, longitude }) => {
      setValue("latitude", Number.parseFloat(latitude).toFixed(6));
      setValue("longitude", Number.parseFloat(longitude).toFixed(6));
    },
  });

  // 주소 검색 API 연결 (다음 주소 API)
  const openPostcode = useDaumPostcode((data) => {
    setValue("roadNameAddress", data.roadAddress);
    setValue("lotNumberAddress", data.jibunAddress);
    setValue("zipCode", data.zonecode);
    setValue("region1DepthName", data.sido);
    setValue("region2DepthName", data.sigungu);
    setValue("region3DepthName", data.bname);
    setAddressType(data.userSelectedType);
  });

  return {
    openPostcode,
    addressType,
  };
};
