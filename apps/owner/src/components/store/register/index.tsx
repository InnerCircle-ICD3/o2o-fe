"use client";

import { FormField } from "@/components/common/formField";
import { Stepper } from "@/components/common/stepper";
import { ToastMessage } from "@/components/common/toastMessage";
import { Button } from "@/components/ui/button";
import { STORE_CATEGORIES, VALIDATION_RULES, initialCreateStoreFormData } from "@/constants/store";
import usePostFileUpload from "@/hooks/api/usePostFileUpload";
import usePostOwnerStore from "@/hooks/api/usePostOwnerStore";
import { useStoreAddress } from "@/hooks/useStoreAddress";
import { useToastMessage } from "@/hooks/useToastMessage";
import type { UseFormOptions } from "@/types/form";
import type { CreateStoreRequest } from "@/types/store";
import { formatContactNumber } from "@/utils/stores";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "./businessHoursSection";

const STEP_LABELS = ["가게 등록", "상세 설정", "픽업 설정"];

export default function StoreRegisterForm() {
  const [step, setStep] = useState(1);
  const [addressSearch, setAddressSearch] = useState("");
  const router = useRouter();

  const { toastMessage, isToastVisible, isError, showToast, handleToastClose } = useToastMessage();
  const createStoreMutation = usePostOwnerStore();
  const { mutateAsync: uploadImage, isPending: isUploading } = usePostFileUpload();
  const form = useForm<CreateStoreRequest>({
    defaultValues: initialCreateStoreFormData,
    validationRules: VALIDATION_RULES,
    defaultOptions: {
      transform: (value: string) => value.trim(),
    },
  } as UseFormOptions<CreateStoreRequest>);

  const { errors, handleSubmit, register, watch, setValue } = form;
  const { openPostcode, addressType } = useStoreAddress(form);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

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

  const handleImageUpload = async (file: File) => {
    try {
      setFileName(file.name);
      // 1. presignedUrl 요청
      const presignedUrl = await uploadImage({ file, folderPath: "store" });
      if (!presignedUrl) {
        showToast("이미지 업로드 실패", true);
        setFileName("");
        return "";
      }

      // 2. S3에 PUT 업로드
      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type || "image/jpeg" },
        body: file,
      });
      if (!response.ok) {
        showToast("S3 업로드 실패", true);
        setFileName("");
        return "";
      }

      // 3. S3 URL 추출 (쿼리스트링 제거)
      const s3Url = presignedUrl.split("?")[0];
      setPreviewUrl(s3Url);
      return s3Url;
    } catch {
      showToast("이미지 업로드 중 오류가 발생했습니다.", true);
      setFileName("");
      return "";
    }
  };

  const onSubmit = async (data: CreateStoreRequest) => {
    const isValid = await form.validate();
    if (!isValid) return;

    createStoreMutation.mutate(data, {
      onSuccess: () => {
        showToast("매장 등록이 완료되었습니다.", false, () => router.push("/store-management"));
      },
      onError: () => {
        showToast("매장 등록에 실패했습니다.", true);
      },
    });
  };

  return (
    <section className="flex flex-col gap-6 min-h-[600px]" aria-label="매장 등록 폼">
      <Stepper step={step} labels={STEP_LABELS} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 3) {
            handleSubmit(onSubmit)(e);
          }
        }}
        className="flex flex-col justify-between flex-1"
      >
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
                onChange={(e) => setValue("contact", formatContactNumber(e.target.value))}
                error={errors.contact}
              />
              <FormField
                type="image"
                label="대표 이미지 업로드"
                name="mainImageUrl"
                value={watch("mainImageUrl") || ""}
                onChange={async (value) => {
                  if (value === null) {
                    setValue("mainImageUrl", "");
                    setPreviewUrl("");
                    setFileName("");
                    return;
                  }
                  if (value instanceof File) {
                    const s3Url = await handleImageUpload(value);
                    if (s3Url) {
                      setValue("mainImageUrl", s3Url);
                    }
                  }
                }}
                error={errors.mainImageUrl}
                fileName={fileName}
              />
              <div
                className="flex justify-center items-center border border-input rounded-lg w-full h-[240px] bg-white overflow-hidden mt-2"
                style={{ minHeight: 180 }}
              >
                {previewUrl || watch("mainImageUrl") ? (
                  <img
                    src={previewUrl || watch("mainImageUrl")}
                    alt="미리보기"
                    className="object-contain w-full h-auto"
                  />
                ) : (
                  <span className="text-gray-300 text-sm">이미지 미리보기</span>
                )}
              </div>
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
                    <Button
                      type="button"
                      onClick={() => openPostcode(addressSearch)}
                      className="min-h-[42px]"
                    >
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
                value={watch("buildingName")}
                onChange={(e) => setValue("buildingName", e.target.value)}
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
                label="음식 카테고리 (Enter 구분)"
                name="foodCategory"
                value={watch("foodCategory")}
                onChange={(value: string[]) => setValue("foodCategory", value)}
                error={errors.foodCategory}
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
        </div>

        {step === 3 && <BusinessHoursSection form={form} />}

        <div className="flex justify-center pt-4 gap-2">
          {step > 1 && (
            <Button
              type="button"
              onClick={prevStep}
              className="flex-1 min-h-[42px]"
              disabled={isUploading}
            >
              이전
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                nextStep();
              }}
              className={step > 1 ? "flex-1 min-h-[42px]" : "w-full min-h-[42px]"}
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>이미지 업로드 중...</span>
                </div>
              ) : (
                "다음"
              )}
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex-1 min-h-[42px]"
              disabled={createStoreMutation.isPending || isUploading}
            >
              {createStoreMutation.isPending || isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isUploading ? "이미지 업로드 중..." : "등록 중..."}</span>
                </div>
              ) : (
                "등록하기"
              )}
            </Button>
          )}
        </div>
      </form>
      <ToastMessage
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={handleToastClose}
        isError={isError}
      />
    </section>
  );
}
