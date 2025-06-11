"use client";

import { putStore } from "@/apis/ssr/stores";
import { FormField } from "@/components/common/formField";
import { Button } from "@/components/ui/button";
import { STORE_CATEGORIES } from "@/constants/store";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import usePatchOwnerStoreStatus from "@/hooks/api/usePatchOwnerStoreStatus";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { UpdateStoreRequest } from "@/types/store";
import { getDefaultStoreFormValues } from "@/utils/stores";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "use-form-light";
import { BusinessHoursSection } from "../register/businessHoursSection";

export default function StoreEdit() {
  const { owner } = useOwnerStore();

  const { data: storeData, isLoading } = useGetOwnerStore(owner?.userId);

  const [isOpen, setIsOpen] = useState(true); // true: 영업중, false: 영업종료

  const form = useForm<UpdateStoreRequest>({
    defaultValues: useMemo(() => getDefaultStoreFormValues(storeData), [storeData]),
  });

  const { errors, handleSubmit, watch, setValue } = form;

  const updateStoreMutation = useMutation({
    mutationFn: (data: UpdateStoreRequest) => {
      if (!owner?.userId) throw new Error("사용자 정보가 없습니다");
      if (!storeData?.data.id) throw new Error("매장 정보가 없습니다");
      return putStore(Number(owner.userId), Number(storeData.data.id), data);
    },
  });

  const patchStoreStatusMutation = usePatchOwnerStoreStatus(owner?.userId, storeData?.data.id);

  const onSubmit = async (data: UpdateStoreRequest) => {
    const isValid = await form.validate();
    if (!isValid) return;
    updateStoreMutation.mutate(data);
  };

  if (!owner?.userId) return <div>유저 정보가 없습니다.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-col gap-6 min-h-[600px]" aria-label="매장 수정 폼">
      <div className="flex flex-col gap-4 w-full">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={() => {
              setIsOpen((prev) => !prev);
              patchStoreStatusMutation.mutate({ status: isOpen ? "CLOSED" : "OPEN" });
            }}
          />
          {isOpen ? "영업중" : "영업종료"}
        </label>
      </div>
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
            label="사업자 번호"
            name="businessNumber"
            value={watch("businessNumber")}
            onChange={(e) => setValue("businessNumber", e.target.value)}
            error={errors.businessNumber}
            readOnly
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
            readOnly
          />
          <FormField
            type="input"
            label="지번 주소"
            name="lotNumberAddress"
            value={watch("lotNumberAddress")}
            onChange={(e) => setValue("lotNumberAddress", e.target.value)}
            readOnly
          />
          <FormField
            type="input"
            label="우편번호"
            name="zipCode"
            value={watch("zipCode")}
            onChange={(e) => setValue("zipCode", e.target.value)}
            readOnly
          />
          <FormField
            type="input"
            label="건물명"
            name="buildingName"
            value={watch("buildingName")}
            onChange={(e) => setValue("buildingName", e.target.value)}
            readOnly
          />
          <FormField
            type="multiSelect"
            label="매장 카테고리"
            name="storeCategory"
            value={watch("storeCategory") || []}
            onChange={(value: string[]) => setValue("storeCategory", value)}
            options={STORE_CATEGORIES || []}
          />
          <FormField
            type="tagInput"
            label="음식 카테고리"
            name="foodCategory"
            value={watch("foodCategory")}
            onChange={(value: string[]) => setValue("foodCategory", value)}
            error={errors.foodCategory}
          />
        </div>

        <div className="flex flex-col gap-4 w-1/2">
          <BusinessHoursSection<UpdateStoreRequest> form={form} />

          <Button type="submit" className="w-full mt-4">
            수정하기
          </Button>
        </div>
      </form>
    </section>
  );
}
