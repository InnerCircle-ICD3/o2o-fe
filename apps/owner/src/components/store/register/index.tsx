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
  const [pickupTimes, setPickupTimes] = useState<Record<string, { start: string; end: string }>>(
    {},
  );

  const { register, errors, validate, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      mainImageUrl: "",
      contact: "",
      description: "",
      businessNumber: "",
      latitude: "",
      longitude: "",
      pickupStartTime: "",
      pickupEndTime: "",
      pickupDay: "TOMORROW",
      foodCategory: [],
      storeCategory: [],
    },
  });

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setPickupTimes((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: FormData) => {
    const isValid = validate();
    if (!isValid) return;
    console.log("최종 제출 데이터:", {
      ...data,
      pickupSchedule: selectedDays.map((day) => ({
        day,
        ...pickupTimes[day],
      })),
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
          <div className="grid grid-cols-2 gap-4">
            <FormField label="위도" name="latitude" register={register} error={errors.latitude} />
            <FormField label="경도" name="longitude" register={register} error={errors.longitude} />
          </div>

          {/* ✅ 요일별 체크박스 및 시간 설정 추가 */}
          <div className="space-y-4">
            <Label>픽업 요일 및 시간 선택</Label>
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
                    value={pickupTimes[day]?.start || ""}
                    onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                    className="w-32"
                  />
                  <span>~</span>
                  <Input
                    type="time"
                    disabled={!selectedDays.includes(day)}
                    value={pickupTimes[day]?.end || ""}
                    onChange={(e) => handleTimeChange(day, "end", e.target.value)}
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
