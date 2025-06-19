import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WEEKDAYS, WEEKDAY_MAP, type WeekdayEng } from "@/constants/store";
import { useBusinessHours } from "@/hooks/useBusinessHours";
import type { useForm } from "use-form-light";

interface WithBusinessHours {
  businessHours?: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }[];
}

export function BusinessHoursSection<T extends WithBusinessHours>({
  form,
}: {
  form: ReturnType<typeof useForm<T>>;
}) {
  const { selectedDays, businessHours, toggleDay, handleBusinessHoursChange, applyToAllDays } =
    useBusinessHours(form);

  const getTime = (day: string, type: "openTime" | "closeTime") =>
    businessHours[day as keyof typeof businessHours]?.[type] || "";

  const handleTimeChange =
    (day: WeekdayEng, type: "openTime" | "closeTime") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleBusinessHoursChange(day, type, e.target.value);
    };

  const handleAllOpenTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const openTime = e.target.value;
    const closeTime = businessHours.MONDAY?.closeTime || "";
    applyToAllDays(openTime, closeTime);
  };

  const handleAllCloseTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const openTime = businessHours.MONDAY?.openTime || "";
    const closeTime = e.target.value;
    applyToAllDays(openTime, closeTime);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap w-full">
          {WEEKDAYS.map((day) => {
            const dayKey = WEEKDAY_MAP[day];
            return (
              <Button
                key={day}
                type="button"
                variant={selectedDays.includes(dayKey) ? "default" : "outline"}
                onClick={() => toggleDay(dayKey)}
                className="flex-1 min-w-0"
              >
                {day}
              </Button>
            );
          })}
        </div>

        <div className="space-y-3">
          {/* 전체 일괄 적용 */}
          <div className="flex items-center gap-2 mb-4 justify-between">
            <span className="w-16 text-sm">전체</span>
            <Input
              type="time"
              className="w-42"
              value={getTime("MONDAY", "openTime").slice(0, 5)}
              onChange={handleAllOpenTimeChange}
              aria-label="전체 영업 시작 시간"
            />
            <span>~</span>
            <Input
              type="time"
              className="w-42"
              value={getTime("MONDAY", "closeTime").slice(0, 5)}
              onChange={handleAllCloseTimeChange}
              aria-label="전체 영업 종료 시간"
            />
          </div>

          {/* 요일별 입력 */}
          {WEEKDAYS.map((day) => {
            const dayKey = WEEKDAY_MAP[day];
            const isSelected = selectedDays.includes(dayKey);
            return (
              <div key={day} className="flex items-center gap-2 justify-between">
                <span className="w-16 text-sm">{day}요일</span>
                <Input
                  type="time"
                  className="w-42"
                  disabled={!isSelected}
                  value={getTime(dayKey, "openTime")}
                  onChange={handleTimeChange(dayKey, "openTime")}
                  aria-label={`${day}요일 영업 시작 시간`}
                />
                <span>~</span>
                <Input
                  type="time"
                  className="w-42"
                  disabled={!isSelected}
                  value={getTime(dayKey, "closeTime")}
                  onChange={handleTimeChange(dayKey, "closeTime")}
                  aria-label={`${day}요일 영업 종료 시간`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
