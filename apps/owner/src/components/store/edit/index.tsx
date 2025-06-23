"use client";

import { FormField } from "@/components/common/formField";
import StoreRegisterLink from "@/components/common/storeRegisterLink";
import { ToastMessage } from "@/components/common/toastMessage";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { STORE_CATEGORIES, VALIDATION_RULES, initialUpdateStoreFormData } from "@/constants/store";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import usePatchOwnerStoreStatus from "@/hooks/api/usePatchOwnerStoreStatus";
import usePostFileUpload from "@/hooks/api/usePostFileUpload";
import usePutOwnerStore from "@/hooks/api/usePutOwnerStore";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { UseFormOptions } from "@/types/form";
import type { UpdateStoreRequest } from "@/types/store";
import { formatContactNumber, getDefaultStoreFormValues } from "@/utils/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "../register/businessHoursSection";

export default function StoreEdit() {
  const { data: storeData, isLoading } = useGetOwnerStore();
  const storeFromZustand = useOwnerStore((state) => state.store);

  const [isOpen, setIsOpen] = useState(true); // true: 영업중, false: 영업종료
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const form = useForm<UpdateStoreRequest>({
    defaultValues: initialUpdateStoreFormData,
    defaultOptions: {
      transform: (value: string) => value.trim(),
    },
  } as UseFormOptions<UpdateStoreRequest>);

  const queryClient = useQueryClient();

  const { toastMessage, isToastVisible, isError, showToast, handleToastClose } = useToastMessage();

  // Zustand store에서 매장 정보를 우선 사용하고, 없으면 API 데이터 사용
  const currentStoreData = storeFromZustand || storeData;

  useEffect(() => {
    if (currentStoreData) {
      const defaultValues = getDefaultStoreFormValues(currentStoreData);

      for (const key of Object.keys(defaultValues) as (keyof typeof defaultValues)[]) {
        if (key !== "status" && key !== "businessNumber") {
          setValue(key, defaultValues[key]);
        }
      }

      setIsOpen(defaultValues.status === "OPEN");
      if (defaultValues.mainImageUrl) {
        setPreviewUrl(defaultValues.mainImageUrl);
      }
    }
  }, [currentStoreData]);

  const { errors, handleSubmit, watch, setValue } = form;

  const updateStoreMutation = usePutOwnerStore(currentStoreData?.id);
  const patchStoreStatusMutation = usePatchOwnerStoreStatus(currentStoreData?.id);
  const postFileUploadMutation = usePostFileUpload();

  const validateSingleField = (name: keyof UpdateStoreRequest, value: string): string => {
    const rule = VALIDATION_RULES[name];
    if (!rule) return "";
    return rule.pattern.test(value) ? "" : rule.message;
  };

  const handleBlur =
    (field: keyof UpdateStoreRequest) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      const error = validateSingleField(field, value);
      setValue(field, value);
      errors[field] = error;
    };

  const handleImagePreview = async (value: string | File | null) => {
    if (value === null) {
      setValue("mainImageUrl", "");
      setPreviewUrl("");
      setFileName("");
      return;
    }
    if (value instanceof File) {
      setImageFile(value);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setValue("mainImageUrl", result);
        setFileName(value.name);
      };
      reader.readAsDataURL(value);
    }
  };

  const handleImageUpload = async (imageFile: File) => {
    try {
      // 1. presignedUrl 요청
      const presignedUrl = await postFileUploadMutation.mutateAsync({
        file: imageFile,
        folderPath: "store",
      });
      if (!presignedUrl) {
        showToast("이미지 업로드 실패", true);
        return;
      }

      // 2. S3에 PUT 업로드
      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": imageFile.type || "image/jpeg" },
        body: imageFile,
      });
      if (!response.ok) {
        showToast("S3 업로드 실패", true);
        return;
      }

      // 3. S3 URL 추출 (쿼리스트링 제거)
      const mainImageUrl = presignedUrl.split("?")[0];
      return mainImageUrl;
    } catch {
      showToast("이미지 업로드 중 오류가 발생했습니다.", true);
      return;
    }
  };

  const onSubmit = async (data: UpdateStoreRequest) => {
    const isValid = await form.validate();
    if (!isValid) {
      showToast("입력 정보를 확인해주세요.", true);
      return;
    }

    let mainImageUrl = data.mainImageUrl;
    if (mainImageUrl?.startsWith("data:") && imageFile) {
      const newMainImageUrl = await handleImageUpload(imageFile);
      if (newMainImageUrl) {
        mainImageUrl = newMainImageUrl;
      }
    }

    // 4. form에 S3 URL 저장 후 업데이트
    updateStoreMutation.mutate(
      { ...data, mainImageUrl },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ownerStore"] });
          showToast("매장 정보가 수정되었습니다.");
        },
        onError: () => {
          showToast("매장 정보 수정에 실패했습니다.", true);
        },
      },
    );
  };

  const handleStatusChange = async (checked: boolean) => {
    const result = await patchStoreStatusMutation.mutateAsync({
      status: checked ? "OPEN" : "CLOSED",
    });

    if (result.success) {
      setIsOpen(checked);
      showToast(checked ? "영업이 시작되었습니다." : "영업이 종료되었습니다.");
    } else {
      showToast(result.message, true);
    }
  };

  if (!storeData) {
    return <StoreRegisterLink />;
  }

  // 로딩 중이거나 매장 데이터가 없는 경우 (Provider에서 리다이렉트 처리됨)
  if (isLoading || !currentStoreData) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">매장 정보를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 min-h-[600px] max-w-[1200px]" aria-label="매장 수정 폼">
      <div className="flex flex-row items-center w-full">
        <div className="w-full">
          <div className="rounded-lg border p-4 shadow-sm flex flex-row items-center justify-between bg-gray-50">
            <div className="space-y-1.5">
              <div className="font-medium text-base">
                현재 영업 상태:{" "}
                <span className={isOpen ? "text-[#35A865]" : "text-[#E53E3E]"}>
                  {isOpen ? "영업중" : "영업종료"}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                이 스위치는 매장의 영업 상태를 나타냅니다. <br />
                <b>영업을 종료하면 고객이 매장을 이용할 수 없습니다.</b>
              </div>
            </div>
            <Switch
              checked={isOpen}
              onCheckedChange={handleStatusChange}
              disabled={patchStoreStatusMutation.isPending}
              aria-label="영업 상태 스위치"
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex md:flex-row flex-col gap-8 w-full">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <FormField
            type="input"
            label="매장명"
            name="name"
            onBlur={handleBlur("name")}
            value={watch("name") ?? ""}
            onChange={(e) => setValue("name", e.target.value)}
            error={errors.name}
          />
          <FormField
            type="input"
            label="연락처"
            name="contact"
            value={watch("contact") ?? ""}
            onChange={(e) => setValue("contact", formatContactNumber(e.target.value))}
            error={errors.contact}
          />
          <FormField
            type="textarea"
            label="설명"
            name="description"
            onBlur={handleBlur("description")}
            value={watch("description") ?? ""}
            onChange={(e) => setValue("description", e.target.value)}
            className="h-30 resize-none max-w-[600px]"
            error={errors.description}
          />
          <FormField
            type="input"
            label="도로명 주소"
            name="roadNameAddress"
            value={watch("roadNameAddress") ?? ""}
            onChange={(e) => setValue("roadNameAddress", e.target.value)}
            readOnly
          />
          <FormField
            type="input"
            label="지번 주소"
            name="lotNumberAddress"
            value={watch("lotNumberAddress") ?? ""}
            onChange={(e) => setValue("lotNumberAddress", e.target.value)}
            readOnly
          />
          <FormField
            type="input"
            label="우편번호"
            name="zipCode"
            value={watch("zipCode") ?? ""}
            onChange={(e) => setValue("zipCode", e.target.value)}
            readOnly
          />
          <FormField
            type="input"
            label="건물명"
            name="buildingName"
            value={watch("buildingName") ?? ""}
            onChange={(e) => setValue("buildingName", e.target.value)}
          />
          <FormField
            type="multiSelect"
            label="매장 카테고리"
            name="storeCategory"
            value={watch("storeCategory") ?? []}
            onChange={(value: string[]) => setValue("storeCategory", value)}
            options={STORE_CATEGORIES || []}
          />
          <FormField
            type="tagInput"
            label="음식 카테고리"
            name="foodCategory"
            value={watch("foodCategory") ?? ""}
            onChange={(value: string[]) => setValue("foodCategory", value)}
            error={errors.foodCategory}
          />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <BusinessHoursSection<UpdateStoreRequest> form={form} />

          <FormField
            type="image"
            label="대표 이미지 업로드"
            name="mainImageUrl"
            value={watch("mainImageUrl") || ""}
            onChange={handleImagePreview}
            fileName={fileName}
            error={errors.mainImageUrl}
          />
          <div
            className="flex justify-center items-center border border-input rounded-lg w-full h-[240px] bg-white overflow-hidden mt-2"
            style={{ minHeight: 180 }}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="미리보기" className="object-contain w-full h-auto" />
            ) : (
              <span className="text-gray-300 text-sm">이미지 미리보기</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-4 min-h-[42px]"
            disabled={updateStoreMutation.isPending || postFileUploadMutation.isPending}
          >
            {updateStoreMutation.isPending || postFileUploadMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{"수정 중..."}</span>
              </div>
            ) : (
              "수정하기"
            )}
          </Button>
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
