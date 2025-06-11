import { WEEKDAYS, WEEKDAY_MAP, type WeekdayEng } from "@/constants/store";
import type { UseFormReturn } from "use-form-light";

interface WithBusinessHours {
  businessHours?: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }[];
}

export type BusinessHours = Record<WeekdayEng, { openTime: string; closeTime: string } | undefined>;

export const useBusinessHours = <T extends WithBusinessHours>(form: UseFormReturn<T>) => {
  const { setValue, watch } = form;

  const rawHours = watch("businessHours") || [];

  const businessHours: BusinessHours = rawHours.reduce((acc, cur) => {
    acc[cur.dayOfWeek as WeekdayEng] = {
      openTime: cur.openTime,
      closeTime: cur.closeTime,
    };
    return acc;
  }, {} as BusinessHours);

  const selectedDays = Object.keys(businessHours) as WeekdayEng[];

  const toggleDay = (day: WeekdayEng) => {
    const updated = { ...businessHours };
    if (businessHours[day]) {
      delete updated[day];
    } else {
      updated[day] = { openTime: "", closeTime: "" };
    }

    setValue(
      "businessHours",
      Object.entries(updated).map(([dayOfWeek, value]) => ({
        dayOfWeek: dayOfWeek as WeekdayEng,
        openTime: value?.openTime ?? "",
        closeTime: value?.closeTime ?? "",
      })),
    );
  };

  const handleBusinessHoursChange = (
    day: WeekdayEng,
    field: "openTime" | "closeTime",
    value: string,
  ) => {
    const formatted = value.length === 5 ? `${value}:00` : value;

    const updated = {
      ...businessHours,
      [day]: {
        openTime: field === "openTime" ? formatted : (businessHours[day]?.openTime ?? ""),
        closeTime: field === "closeTime" ? formatted : (businessHours[day]?.closeTime ?? ""),
      },
    };

    setValue(
      "businessHours",
      Object.entries(updated).map(([dayOfWeek, value]) => ({
        dayOfWeek: dayOfWeek as WeekdayEng,
        openTime: value?.openTime ?? "",
        closeTime: value?.closeTime ?? "",
      })),
    );
  };

  const applyToAllDays = (openTime: string, closeTime: string) => {
    const formattedOpenTime = openTime.length === 5 ? `${openTime}:00` : openTime;
    const formattedCloseTime = closeTime.length === 5 ? `${closeTime}:00` : closeTime;

    const newBusinessHours: BusinessHours = WEEKDAYS.reduce((acc, day) => {
      const key = WEEKDAY_MAP[day];
      acc[key] = {
        openTime: formattedOpenTime,
        closeTime: formattedCloseTime,
      };
      return acc;
    }, {} as BusinessHours);

    setValue(
      "businessHours",
      Object.entries(newBusinessHours).map(([dayOfWeek, value]) => ({
        dayOfWeek: dayOfWeek as WeekdayEng,
        openTime: value?.openTime ?? "",
        closeTime: value?.closeTime ?? "",
      })),
    );
  };

  return {
    selectedDays,
    businessHours,
    toggleDay,
    handleBusinessHoursChange,
    applyToAllDays,
  };
};
