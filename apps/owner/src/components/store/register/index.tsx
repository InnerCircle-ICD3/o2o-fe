"use client";

import { FormField } from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "use-form-light";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

export default function StoreRegisterFormWizard() {
  const [step, setStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [businessHours, setBusinessHours] = useState<
    Array<{
      dayOfWeek: string;
      openTime: string;
      closeTime: string;
    }>
  >([]);

  const { register, errors, validate, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      businessNumber: "",
      roadNameAddress: "",
      lotNumberAddress: "",
      buildingName: "",
      zipCode: "",
      region1DepthName: "",
      region2DepthName: "",
      region3DepthName: "",
      latitude: "",
      longitude: "",
      pickupStartTime: "",
      pickupEndTime: "",
      pickupDay: "TOMORROW",
      contact: "",
      description: "",
      mainImageUrl: "",
      storeCategory: [],
      foodCategory: [],
    },
  });

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleBusinessHoursChange = (
    day: string,
    field: "openTime" | "closeTime",
    value: string,
  ) => {
    setBusinessHours((prev) => {
      const existingDay = prev.find((item) => item.dayOfWeek === day);
      if (existingDay) {
        return prev.map((item) => (item.dayOfWeek === day ? { ...item, [field]: value } : item));
      }
      return [...prev, { dayOfWeek: day, openTime: "", closeTime: "", [field]: value }];
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: FormData) => {
    const isValid = validate();
    if (!isValid) return;
    console.log("최종 제출 데이터:", {
      ...data,
      businessHours,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <div className="space-y-6">
          <FormField label="매장명" name="name" register={register} error={errors.name} />
          <FormField label="대표 이미지 URL" name="mainImageUrl" register={register} />
          <FormField label="연락처" name="contact" register={register} error={errors.contact} />
          <FormField label="설명" name="description" register={register} isTextarea />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <FormField
            label="사업자 등록번호"
            name="businessNumber"
            register={register}
            error={errors.businessNumber}
          />
          <FormField
            label="도로명 주소"
            name="roadNameAddress"
            register={register}
            error={errors.roadNameAddress}
          />
          <FormField
            label="지번 주소"
            name="lotNumberAddress"
            register={register}
            error={errors.lotNumberAddress}
          />
          <FormField label="건물명" name="buildingName" register={register} />
          <FormField label="우편번호" name="zipCode" register={register} error={errors.zipCode} />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="시/도"
              name="region1DepthName"
              register={register}
              error={errors.region1DepthName}
            />
            <FormField
              label="시/군/구"
              name="region2DepthName"
              register={register}
              error={errors.region2DepthName}
            />
            <FormField
              label="읍/면/동"
              name="region3DepthName"
              register={register}
              error={errors.region3DepthName}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="위도" name="latitude" register={register} error={errors.latitude} />
            <FormField label="경도" name="longitude" register={register} error={errors.longitude} />
          </div>

          <div className="space-y-4">
            <Label>영업 시간 설정</Label>
            <div className="flex gap-2 flex-wrap">
              {WEEKDAYS.map((day) => (
                <Button
                  key={day}
                  type="button"
                  variant={selectedDays.includes(day) ? "default" : "outline"}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
            <div className="space-y-3">
              {WEEKDAYS.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <span className="w-16">{day}요일</span>
                  <Input
                    type="time"
                    disabled={!selectedDays.includes(day)}
                    value={businessHours.find((h) => h.dayOfWeek === day)?.openTime || ""}
                    onChange={(e) => handleBusinessHoursChange(day, "openTime", e.target.value)}
                    className="w-32"
                  />
                  <span>~</span>
                  <Input
                    type="time"
                    disabled={!selectedDays.includes(day)}
                    value={businessHours.find((h) => h.dayOfWeek === day)?.closeTime || ""}
                    onChange={(e) => handleBusinessHoursChange(day, "closeTime", e.target.value)}
                    className="w-32"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <FormField
            label="음식 카테고리 (쉼표로 구분)"
            name="foodCategory"
            value={watch("foodCategory").join(", ")}
            onChange={(e) =>
              setValue(
                "foodCategory",
                e.target.value.split(",").map((v) => v.trim()),
              )
            }
          />
          <FormField
            label="매장 카테고리 (쉼표로 구분)"
            name="storeCategory"
            value={watch("storeCategory").join(", ")}
            onChange={(e) =>
              setValue(
                "storeCategory",
                e.target.value.split(",").map((v) => v.trim()),
              )
            }
          />
        </div>
      )}

      <div className="flex justify-between pt-4">
        {step > 1 ? (
          <Button type="button" onClick={prevStep}>
            이전
          </Button>
        ) : (
          <div />
        )}
        {step < 3 ? (
          <Button type="button" onClick={nextStep}>
            다음
          </Button>
        ) : (
          <Button type="submit">제출하기</Button>
        )}
      </div>
    </form>
  );
}
