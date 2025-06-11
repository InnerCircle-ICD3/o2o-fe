"use client";

import { getStore, putStore } from "@/apis/ssr/store";
import { FormField } from "@/components/commmon/formField";
import { Button } from "@/components/ui/button";
import { STORE_CATEGORIES } from "@/constants/store";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { UpdateStoreRequest } from "@/types/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "../register/businessHoursSection";

export default function StoreEdit() {
  const { owner } = useOwnerStore();

  const { data: storeData, isLoading } = useQuery({
    queryKey: ["store", owner?.storeOwnerId],
    queryFn: () => {
      if (!owner?.storeOwnerId) throw new Error("사용자 정보가 없습니다");
      return getStore(owner.storeOwnerId);
    },
    enabled: !!owner?.storeOwnerId,
  });

  // storeData가 있을 때만 form을 생성
  const form = useForm<UpdateStoreRequest>({
    defaultValues: useMemo(() => {
      if (!storeData?.success) return {} as UpdateStoreRequest;
      const store = storeData.data;
      // StoreResponse -> UpdateStoreRequest 변환 (필요시 타입 변환)
      return {
        ...store,
        latitude: store.latitude ? Number(store.latitude) : undefined,
        longitude: store.longitude ? Number(store.longitude) : undefined,
      };
    }, [storeData]),
  });

  const { errors, handleSubmit, watch, setValue } = form;

  const updateStoreMutation = useMutation({
    mutationFn: (data: UpdateStoreRequest) => {
      if (!owner?.storeOwnerId) throw new Error("사용자 정보가 없습니다");
      return putStore(owner.storeOwnerId, data);
    },
  });

  const onSubmit = async (data: UpdateStoreRequest) => {
    const isValid = await form.validate();
    if (!isValid || !owner?.storeOwnerId) return;
    updateStoreMutation.mutate(data);
  };

  if (isLoading || !storeData?.success) return <div>Loading...</div>;

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
