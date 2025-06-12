"use client";

import { FormField } from "@/components/common/formField";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { STORE_CATEGORIES, initialUpdateStoreFormData } from "@/constants/store";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import usePatchOwnerStoreStatus from "@/hooks/api/usePatchOwnerStoreStatus";
import usePostFileUpload from "@/hooks/api/usePostFileUpload";
import usePutOwnerStore from "@/hooks/api/usePutOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { UpdateStoreRequest } from "@/types/store";
import { getDefaultStoreFormValues } from "@/utils/stores";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "../register/businessHoursSection";

export default function StoreEdit() {
  const { owner } = useOwnerStore();

  const { data: storeData, isLoading } = useGetOwnerStore(owner?.userId);

  const [isOpen, setIsOpen] = useState(true); // true: 영업중, false: 영업종료
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<UpdateStoreRequest>({
    defaultValues: initialUpdateStoreFormData,
  });

  useEffect(() => {
    if (storeData) {
      const defaultValues = getDefaultStoreFormValues(storeData);

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
  }, [storeData]);

  const { errors, handleSubmit, watch, setValue } = form;

  const updateStoreMutation = usePutOwnerStore(owner?.userId, storeData?.id);
  const patchStoreStatusMutation = usePatchOwnerStoreStatus(owner?.userId, storeData?.id);
  const postFileUploadMutation = usePostFileUpload();

  const onSubmit = async (data: UpdateStoreRequest) => {
    const isValid = await form.validate();
    if (!isValid) return;

    let mainImageUrl = data.mainImageUrl;
    // base64(새로 업로드된 파일)인 경우만 업로드
    if (mainImageUrl?.startsWith("data:") && imageFile) {
      mainImageUrl = await postFileUploadMutation.mutateAsync({
        file: imageFile,
        folderPath: "store",
      });
      if (!mainImageUrl) {
        alert("이미지 업로드 실패");
        return;
      }
    }
    updateStoreMutation.mutate({ ...data, mainImageUrl });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setValue("mainImageUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!owner?.userId) return <div>유저 정보가 없습니다.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-col gap-6 min-h-[600px]" aria-label="매장 수정 폼">
      <div className="flex flex-row justify-end items-center w-full">
        <label className="flex items-center gap-2">
          <span className="ml-2 text-base font-medium select-none">
            {isOpen ? "영업중" : "영업종료"}
          </span>
          <Switch
            checked={isOpen}
            onCheckedChange={(checked: boolean) => {
              setIsOpen(checked);
              patchStoreStatusMutation.mutate({ status: checked ? "OPEN" : "CLOSED" });
            }}
            aria-label="영업 상태 스위치"
          />
        </label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex md:flex-row flex-col gap-8 w-full">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <FormField
            type="input"
            label="매장명"
            name="name"
            value={watch("name") ?? ""}
            onChange={(e) => setValue("name", e.target.value)}
            error={errors.name}
          />
          <FormField
            type="input"
            label="연락처"
            name="contact"
            value={watch("contact") ?? ""}
            onChange={(e) => setValue("contact", e.target.value)}
            error={errors.contact}
          />
          <FormField
            type="textarea"
            label="설명"
            name="description"
            value={watch("description") ?? ""}
            onChange={(e) => setValue("description", e.target.value)}
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
            readOnly
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

          <div className="flex flex-col gap-2">
            <label className="font-medium">대표 이미지</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {previewUrl && (
              <>
                <span className="text-sm text-gray-500">현재 등록된 이미지</span>
                <div className="relative w-[200px] h-[200px] border rounded-lg overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="매장 대표 이미지 미리보기"
                    fill
                    className="object-cover"
                  />
                </div>
              </>
            )}
          </div>

          <Button type="submit" className="w-full mt-4">
            수정하기
          </Button>
        </div>
      </form>
    </section>
  );
}
