"use client";

import { getStore } from "@/apis/ssr/store";
import type { Result } from "@/apis/types";
import { FormField } from "@/components/commmon/formField";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { StoreResponse } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "use-form-light";

export default function StoreEdit() {
  const { owner } = useOwnerStore();  
  const { errors, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      contact: "",
    },
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  const getStoreList = useQuery({
    queryKey: ["store", owner?.storeOwnerId],
    queryFn: () => {
      if (!owner?.storeOwnerId) throw new Error("사용자 정보가 없습니다");
      return getStore(owner.storeOwnerId);
    },
    enabled: !!owner?.storeOwnerId,
    onSuccess: (result: Result<StoreResponse>) => {
      if (result.success) {
        const store = result.data;
        setValue("name", store.name || "");
        setValue("description", store.description || "");
        setValue("contact", store.contact || "");
      }
    },
  })

  return(
    <section className="flex flex-col gap-6 min-h-[600px]" aria-label="매장 수정 폼">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center flex-1 gap-6">
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
          type="textarea"
          label="설명"
          name="description"
          value={watch("description")}
          onChange={(e) => setValue("description", e.target.value)}
          error={errors.description}
        />
        <FormField
          type="input"
          label="매장 카테고리"
          name="name"
          value={watch("name")}
          onChange={(e) => setValue("name", e.target.value)}
          error={errors.name}
        />
        <FormField
          type="input"
          label="음식 카테고리"
          name="name"
          value={watch("name")}
          onChange={(e) => setValue("name", e.target.value)}
          error={errors.name}
        />
        <FormField
          type="input"
          label="픽업시간"
          name="name"
          value={watch("name")}
          onChange={(e) => setValue("name", e.target.value)}
          error={errors.name}
        />
      </form>
    </section>
  );
}