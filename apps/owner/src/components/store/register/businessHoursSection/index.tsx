import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type BusinessHour, useBusinessHours } from "@/hooks/useBusinessHours";
import type { StoreFormData } from "@/types/store";
import type { useForm } from "use-form-light";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

export function BusinessHoursSection({
  form,
}: { form: ReturnType<typeof useForm<StoreFormData>> }) {
  const { selectedDays, businessHours, toggleDay, handleBusinessHoursChange, applyToAllDays } =
    useBusinessHours(form);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
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
          <div className="flex items-center gap-2 mb-4">
            <span className="w-16">전체</span>
            <Input
              type="time"
              className="w-34"
              value={businessHours.length > 0 ? businessHours[0].openTime?.slice(0, 5) || "" : ""}
              onChange={(e) => {
                const openTime = e.target.value;
                const closeTime = businessHours.length > 0 ? businessHours[0].closeTime : "";
                applyToAllDays(openTime, closeTime);
              }}
              aria-label="전체 영업 시작 시간"
              role="textbox"
            />
            <span>~</span>
            <Input
              type="time"
              className="w-34"
              value={businessHours.length > 0 ? businessHours[0].closeTime?.slice(0, 5) || "" : ""}
              onChange={(e) => {
                const openTime = businessHours.length > 0 ? businessHours[0].openTime : "";
                const closeTime = e.target.value;
                applyToAllDays(openTime, closeTime);
              }}
              aria-label="전체 영업 종료 시간"
              role="textbox"
            />
          </div>
          {WEEKDAYS.map((day) => (
            <div key={day} className="flex items-center gap-2">
              <span className="w-16">{day}요일</span>
              <Input
                type="time"
                disabled={!selectedDays.includes(day)}
                value={businessHours.find((h: BusinessHour) => h.dayOfWeek === day)?.openTime || ""}
                onChange={(e) => handleBusinessHoursChange(day, "openTime", e.target.value)}
                className="w-34"
                aria-label={`${day}요일 영업 시작 시간`}
                role="textbox"
              />
              <span>~</span>
              <Input
                type="time"
                disabled={!selectedDays.includes(day)}
                value={
                  businessHours.find((h: BusinessHour) => h.dayOfWeek === day)?.closeTime || ""
                }
                onChange={(e) => handleBusinessHoursChange(day, "closeTime", e.target.value)}
                className="w-34"
                aria-label={`${day}요일 영업 종료 시간`}
                role="textbox"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
