import type { StoreFormData } from "@/types/store";
import type { UseFormReturn } from "use-form-light";

export const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"] as const;
export const WEEKDAY_MAP = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
} as const;

export type BusinessHour = {
  dayOfWeek: (typeof WEEKDAY_MAP)[keyof typeof WEEKDAY_MAP];
  openTime: string;
  closeTime: string;
};

export const useBusinessHours = (form: UseFormReturn<StoreFormData>) => {
  const { setValue, watch } = form;
  const businessHours = watch("businessHours");
  const selectedDays = businessHours.map((hour) => hour.dayOfWeek);

  const toggleDay = (day: (typeof WEEKDAY_MAP)[keyof typeof WEEKDAY_MAP]) => {
    if (businessHours.some((hour) => hour.dayOfWeek === day)) {
      setValue(
        "businessHours",
        businessHours.filter((hour) => hour.dayOfWeek !== day),
      );
    } else {
      setValue("businessHours", [
        ...businessHours,
        { dayOfWeek: day, openTime: "", closeTime: "" },
      ]);
    }
  };

  const handleBusinessHoursChange = (
    day: (typeof WEEKDAY_MAP)[keyof typeof WEEKDAY_MAP],
    field: "openTime" | "closeTime",
    value: string,
  ) => {
    const formatted = value.length === 5 ? `${value}:00` : value;
    const existingDay = businessHours.find((item) => item.dayOfWeek === day);
    if (existingDay) {
      setValue(
        "businessHours",
        businessHours.map((item) =>
          item.dayOfWeek === day ? { ...item, [field]: formatted } : item,
        ),
      );
    } else {
      setValue("businessHours", [
        ...businessHours,
        { dayOfWeek: day, openTime: "", closeTime: "", [field]: formatted },
      ]);
    }
  };

  const applyToAllDays = (openTime: string, closeTime: string) => {
    const formattedOpenTime = openTime.length === 5 ? `${openTime}:00` : openTime;
    const formattedCloseTime = closeTime.length === 5 ? `${closeTime}:00` : closeTime;

    const newBusinessHours = WEEKDAYS.map((day) => ({
      dayOfWeek: WEEKDAY_MAP[day],
      openTime: formattedOpenTime,
      closeTime: formattedCloseTime,
    }));

    setValue("businessHours", newBusinessHours);
  };

  return {
    selectedDays,
    businessHours,
    toggleDay,
    handleBusinessHoursChange,
    applyToAllDays,
  };
};
