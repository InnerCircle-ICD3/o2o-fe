"use client";

import { getStore, putStore } from "@/apis/ssr/store";
import type { Result } from "@/apis/types";
import { FormField } from "@/components/commmon/formField";
import { Button } from "@/components/ui/button";
import { STORE_CATEGORIES } from "@/constants/store";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import { type StoreResponse, type UpdateStoreRequest, initialStoreFormData } from "@/types/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "../register/businessHoursSection";

export default function StoreEdit() {
  const { owner } = useOwnerStore();

  const form = useForm<UpdateStoreRequest>({
    defaultValues: initialStoreFormData,
  });

  const { errors, handleSubmit, watch, setValue } = form;

  const { isLoading } = useQuery({
    queryKey: ["store", owner?.storeOwnerId],
    queryFn: () => {
      if (!owner?.storeOwnerId) throw new Error("사용자 정보가 없습니다");
      return getStore(owner.storeOwnerId);
    },
    enabled: !!owner?.storeOwnerId,
    onSuccess: (result: Result<StoreResponse>) => {
      if (result.success) {
        const store = result.data;
        for (const [key, value] of Object.entries(store)) {
          if (key in form.values) setValue(key as keyof UpdateStoreRequest, value);
        }
      }
    },
  });

  const updateStoreMutation = useMutation({
    mutationFn: (data: UpdateStoreRequest) => {
      if (!owner?.storeOwnerId) throw new Error("사용자 정보가 없습니다");
      return putStore(owner.storeOwnerId, data);
    },
    onSuccess: () => {
      console.log("매장 수정 성공");
    },
    onError: (err) => {
      console.error("매장 수정 실패:", err);
    },
  });

  const onSubmit = async (data: CreateStoreRequest) => {
    const isValid = await form.validate();
    if (!isValid || !owner?.storeOwnerId) return;
    updateStoreMutation.mutate(data);
  };

  if (!isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-col gap-6 min-h-[600px]" aria-label="매장 수정 폼">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-8 w-full">
        <div className="flex flex-col gap-4 w-1/2">
          <FormField
            type="input"
            label="매장명"
            name="name"
            value={watch("name")}
            onChange={(e) => setValue("name", e.target.value)}
            error={errors.name}
          />
          <FormField
            type="input"
            label="사업자 등록번호"
            name="businessNumber"
            value={watch("businessNumber")}
            onChange={(e) => setValue("businessNumber", e.target.value)}
            error={errors.businessNumber}
          />
          <FormField
            type="input"
            label="연락처"
            name="contact"
            value={watch("contact")}
            onChange={(e) => setValue("contact", e.target.value)}
            error={errors.contact}
          />
          <FormField
            type="input"
            label="대표 이미지 URL"
            name="mainImageUrl"
            value={watch("mainImageUrl")}
            onChange={(e) => setValue("mainImageUrl", e.target.value)}
          />
          <FormField
            type="textarea"
            label="설명"
            name="description"
            value={watch("description")}
            onChange={(e) => setValue("description", e.target.value)}
            error={errors.description}
          />

          <FormField
            type="input"
            label="도로명 주소"
            name="roadNameAddress"
            value={watch("roadNameAddress")}
            onChange={(e) => setValue("roadNameAddress", e.target.value)}
          />
          <FormField
            type="input"
            label="지번 주소"
            name="lotNumberAddress"
            value={watch("lotNumberAddress")}
            onChange={(e) => setValue("lotNumberAddress", e.target.value)}
          />
          <FormField
            type="input"
            label="우편번호"
            name="zipCode"
            value={watch("zipCode")}
            onChange={(e) => setValue("zipCode", e.target.value)}
          />
          <FormField
            type="input"
            label="건물명"
            name="buildingName"
            value={watch("buildingName")}
            onChange={(e) => setValue("buildingName", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 w-1/2">
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
            label="음식 카테고리"
            name="foodCategory"
            value={watch("foodCategory")}
            onChange={(value: string[]) => setValue("foodCategory", value)}
            error={errors.foodCategory}
          />

          <BusinessHoursSection form={form} />

          <Button type="submit" className="w-full mt-4">
            수정하기
          </Button>
        </div>
      </form>
    </section>
  );
}
