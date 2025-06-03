"use client";

import { postStore } from "@/apis/ssr/store";
import { FormField } from "@/components/store/register/formField";
import { Button } from "@/components/ui/button";
import { useStoreAddress } from "@/hooks/useStoreAddress";
import type { StoreFormData } from "@/types/store";
import { initialStoreFormData } from "@/types/store";
import { useState } from "react";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "./businessHoursSection";
import { Stepper } from "./stepper";

export default function StoreRegisterFormWizard() {
  const [step, setStep] = useState(1);
  const [addressSearch, setAddressSearch] = useState("");

  const form = useForm<StoreFormData>({
    defaultValues: initialStoreFormData,
  });

  const { errors, validate, handleSubmit, register } = form;
  const { openPostcode } = useStoreAddress(form);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: StoreFormData) => {
    const isValid = validate();
    if (!isValid) return;
    // storeOwnerId 필요
    const result = await postStore(1, data);
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-6 min-h-[600px]">
      <Stepper step={step} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between flex-1">
        <div className="flex flex-col">
          {step === 1 && (
            <div className="space-y-6">
              <FormField label="매장명" name="name" {...register("name")} error={errors.name} />
              <FormField
                label="사업자 등록번호"
                name="businessNumber"
                {...register("businessNumber")}
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
                className="h-25 resize-none"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <FormField
                label="주소 검색"
                name="addressSearch"
                placeholder="주소를 검색해주세요"
                readOnly
                value={
                  form.watch("addressType") === "R"
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
                {...register("foodCategory")}
              />
              <FormField
                label="매장 카테고리 (쉼표로 구분)"
                name="storeCategory"
                {...register("storeCategory")}
              />
            </div>
          )}
        </div>

        {step === 3 && <BusinessHoursSection form={form} />}
        <div className="flex justify-center pt-4 gap-2">
          {step > 1 ? (
            <Button type="button" onClick={prevStep} className="flex-1">
              이전
            </Button>
          ) : null}
          {step < 3 ? (
            <Button type="button" onClick={nextStep} className={step > 1 ? "flex-1" : "w-full"}>
              다음
            </Button>
          ) : (
            <Button type="submit" className="flex-1">
              등록하기
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
