"use client";

import { FormField } from "@/components/common/formField";
import { Stepper } from "@/components/common/stepper";
import { Button } from "@/components/ui/button";
import { STORE_CATEGORIES, VALIDATION_RULES } from "@/constants/store";
import usePostOwnerStore from "@/hooks/api/usePostOwnerStore";
import { useStoreAddress } from "@/hooks/useStoreAddress";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { UseFormOptions } from "@/types/form";
import type { CreateStoreRequest } from "@/types/store";
import { initialStoreFormData } from "@/types/store";
import { useState } from "react";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "./businessHoursSection";

const STEP_LABELS = ["가게 등록", "상세 설정", "픽업 설정"];

export default function StoreRegisterForm() {
  const [step, setStep] = useState(1);
  const [addressSearch, setAddressSearch] = useState("");
  const { owner } = useOwnerStore();

  const form = useForm<CreateStoreRequest>({
    defaultValues: initialStoreFormData,
    validationRules: VALIDATION_RULES,
    defaultOptions: {
      transform: (value: string) => value.trim(),
    },
  } as UseFormOptions<CreateStoreRequest>);

  const { errors, handleSubmit, register, watch, setValue } = form;
  const { openPostcode, addressType } = useStoreAddress(form);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const validateSingleField = (name: keyof CreateStoreRequest, value: string): string => {
    const rule = VALIDATION_RULES[name];
    if (!rule) return "";
    return rule.pattern.test(value) ? "" : rule.message;
  };

  const handleBlur =
    (field: keyof CreateStoreRequest) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      const error = validateSingleField(field, value);
      setValue(field, value);
      errors[field] = error;
    };

  const createStoreMutation = usePostOwnerStore(owner?.userId);

  const onSubmit = async (data: CreateStoreRequest) => {
    const isValid = await form.validate();
    if (!isValid) return;

    createStoreMutation.mutate(data);
  };

  return (
    <section className="flex flex-col gap-6 min-h-[600px]" aria-label="매장 등록 폼">
      <Stepper step={step} labels={STEP_LABELS} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between flex-1">
        <div className="flex flex-col">
          {step === 1 && (
            <fieldset className="space-y-6" aria-label="기본 정보">
              <FormField
                type="input"
                label="매장명"
                name="name"
                onBlur={handleBlur("name")}
                value={watch("name")}
                onChange={(e) => setValue("name", e.target.value)}
                error={errors.name}
              />
              <FormField
                type="input"
                label="사업자 등록번호"
                name="businessNumber"
                onBlur={handleBlur("businessNumber")}
                value={watch("businessNumber")}
                onChange={(e) => setValue("businessNumber", e.target.value)}
                error={errors.businessNumber}
              />
              <FormField
                type="input"
                label="연락처"
                name="contact"
                onBlur={handleBlur("contact")}
                value={watch("contact")}
                onChange={(e) => setValue("contact", e.target.value)}
                error={errors.contact}
              />
              <FormField
                type="input"
                label="대표 이미지 URL"
                name="mainImageUrl"
                {...register("mainImageUrl")}
              />
              <FormField
                type="textarea"
                label="설명"
                name="description"
                onBlur={handleBlur("description")}
                value={watch("description")}
                onChange={(e) => setValue("description", e.target.value)}
                className="h-30 resize-none"
              />
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="space-y-6" aria-label="주소 및 카테고리 정보">
              <FormField
                type="input"
                label="주소 검색"
                name="addressSearch"
                placeholder="주소를 검색해주세요"
                readOnly
                value={addressType === "R" ? watch("roadNameAddress") : watch("lotNumberAddress")}
                onClick={() => openPostcode(addressSearch)}
                onChange={(e) => setAddressSearch(e.target.value)}
                rightElement={
                  <div className="flex items-center gap-2">
                    <Button type="button" onClick={() => openPostcode(addressSearch)}>
                      검색
                    </Button>
                  </div>
                }
              />
              <FormField
                type="input"
                label="우편번호"
                name="zipCode"
                {...register("zipCode")}
                readOnly
              />
              <FormField
                type="input"
                label="건물명"
                name="buildingName"
                {...register("buildingName")}
              />
              <FormField
                type="multiSelect"
                label="매장 카테고리"
                name="storeCategory"
                value={watch("storeCategory")}
                onChange={(value: string[]) => setValue("storeCategory", value)}
                options={STORE_CATEGORIES}
              />

              <FormField
                type="tagInput"
                label="음식 카테고리 (Enter로 구분)"
                name="foodCategory"
                value={watch("foodCategory")}
                onChange={(value: string[]) => setValue("foodCategory", value)}
                error={errors.foodCategory}
              />
            </fieldset>
          )}
        </div>

        {step === 3 && <BusinessHoursSection form={form} />}

        <div className="flex justify-center pt-4 gap-2">
          {step > 1 && (
            <Button type="button" onClick={prevStep} className="flex-1">
              이전
            </Button>
          )}
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
    </section>
  );
}
