import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type BusinessHour, useBusinessHours } from "@/hooks/useBusinessHours";
import type { StoreFormData } from "@/types/store";
import type { useForm } from "use-form-light";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

export function BusinessHoursSection({
  form,
}: { form: ReturnType<typeof useForm<StoreFormData>> }) {
  const { selectedDays, businessHours, toggleDay, handleBusinessHoursChange } =
    useBusinessHours(form);

  return (
    <div className="space-y-6">
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
                value={businessHours.find((h: BusinessHour) => h.dayOfWeek === day)?.openTime || ""}
                onChange={(e) => handleBusinessHoursChange(day, "openTime", e.target.value)}
                className="w-32"
              />
              <span>~</span>
              <Input
                type="time"
                disabled={!selectedDays.includes(day)}
                value={
                  businessHours.find((h: BusinessHour) => h.dayOfWeek === day)?.closeTime || ""
                }
                onChange={(e) => handleBusinessHoursChange(day, "closeTime", e.target.value)}
                className="w-32"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
