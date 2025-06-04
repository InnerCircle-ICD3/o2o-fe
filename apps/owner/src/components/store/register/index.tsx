"use client";

import { postStore } from "@/apis/ssr/store";
import { FormField } from "@/components/store/register/formField";
import { Button } from "@/components/ui/button";
import { useStoreAddress } from "@/hooks/useStoreAddress";
import { useZodValidationResolver } from "@/hooks/useZodValidationResolver";
import type { UseFormOptions } from "@/types/form";
import type { StoreFormData } from "@/types/store";
import { initialStoreFormData } from "@/types/store";
import { storeFormSchema } from "@/types/store";
import { useState } from "react";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "./businessHoursSection";
import { Stepper } from "./stepper";

export default function StoreRegisterFormWizard() {
  const [step, setStep] = useState(1);
  const [addressSearch, setAddressSearch] = useState("");

  const resolver = useZodValidationResolver(storeFormSchema);

  const form = useForm<StoreFormData>({
    defaultValues: initialStoreFormData,
    resolver,
    defaultOptions: {
      transform: (value: string) => value.trim(),
    },
  } as UseFormOptions<StoreFormData>);

  const { errors, handleSubmit, register } = form;
  const { openPostcode, addressType } = useStoreAddress(form);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: StoreFormData) => {
    const result = await postStore(1, data);

    if (result.success) {
      console.log("매장 등록 성공:", result.data);
      // TODO: 성공 시 리다이렉트 또는 성공 메시지 표시
    } else {
      console.error("매장 등록 실패:", {
        errorCode: result.errorCode,
        errorMessage: result.errorMessage,
      });
    }
  };

  return (
    <section className="flex flex-col gap-6 min-h-[600px]" aria-label="매장 등록 폼">
      <Stepper step={step} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between flex-1"
        aria-label="매장 정보 입력"
      >
        <div className="flex flex-col">
          {step === 1 && (
            <fieldset className="space-y-6" aria-label="기본 정보">
              <FormField label="매장명" name="name" {...register("name")} error={errors.name} />
              <FormField
                label="사업자 등록번호"
                name="businessNumber"
                {...register("businessNumber")}
                error={errors.businessNumber}
              />
              <FormField
                label="연락처"
                name="contact"
                {...register("contact")}
                error={errors.contact}
              />
              <FormField
                label="대표 이미지 URL"
                name="mainImageUrl"
                {...register("mainImageUrl")}
              />
              <FormField
                label="설명"
                name="description"
                {...register("description")}
                isTextarea
                className="h-40 resize-none"
              />
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="space-y-6" aria-label="주소 및 카테고리 정보">
              <FormField
                label="주소 검색"
                name="addressSearch"
                placeholder="주소를 검색해주세요"
                readOnly
                value={
                  addressType === "R"
                    ? form.watch("roadNameAddress")
                    : form.watch("lotNumberAddress")
                }
                onChange={(e) => setAddressSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    openPostcode(addressSearch);
                  }
                }}
                rightElement={
                  <div className="flex items-center gap-2">
                    <Button type="button" onClick={() => openPostcode(addressSearch)}>
                      검색
                    </Button>
                  </div>
                }
              />
              <FormField label="우편번호" name="zipCode" {...register("zipCode")} />
              <FormField label="건물명" name="buildingName" {...register("buildingName")} />
              <FormField
                label="음식 카테고리 (쉼표로 구분)"
                name="foodCategory"
                isMultiple
                value={form.watch("foodCategory")}
                onChange={(value: string[]) => form.setValue("foodCategory", value)}
                error={errors.foodCategory}
              />
              <FormField
                label="매장 카테고리 (쉼표로 구분)"
                name="storeCategory"
                isMultiple
                value={form.watch("storeCategory")}
                onChange={(value: string[]) => form.setValue("storeCategory", value)}
                error={errors.storeCategory}
              />
            </fieldset>
          )}
        </div>

        {step === 3 && <BusinessHoursSection form={form} />}
        <div className="flex justify-center pt-4 gap-2">
          {step > 1 ? (
            <Button
              type="button"
              onClick={prevStep}
              className="flex-1"
              aria-label="이전 단계로 이동"
            >
              이전
            </Button>
          ) : null}
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className={step > 1 ? "flex-1" : "w-full"}
              aria-label="다음 단계로 이동"
            >
              다음
            </Button>
          ) : (
            <Button type="submit" className="flex-1" aria-label="매장 정보 등록">
              등록하기
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
