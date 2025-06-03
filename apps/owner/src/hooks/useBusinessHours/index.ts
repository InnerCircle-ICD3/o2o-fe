import type { StoreFormData } from "@/types/store";
import type { UseFormReturn } from "use-form-light";

export const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

export type BusinessHour = {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
};

export const useBusinessHours = (form: UseFormReturn<StoreFormData>) => {
  const { setValue, watch } = form;
  const businessHours = watch("businessHours");
  const selectedDays = businessHours.map((hour) => hour.dayOfWeek);

  const toggleDay = (day: string) => {
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
    day: string,
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

  return {
    selectedDays,
    businessHours,
    toggleDay,
    handleBusinessHoursChange,
  };
};
