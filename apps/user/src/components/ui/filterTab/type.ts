import type { foodTypeList } from "./constant";

export type DayType = "오전" | "오후";
export type HourType = number & { __brand: "Hour" };
export type MinuteType = number & { __brand: "Minute" };

export type PickupTime = {
  day?: DayType;
  hour?: HourType;
  minute?: MinuteType;
};

export type Location = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  label: string;
};

export type FoodType = (typeof foodTypeList)[number]["value"];

export type TabKey = "reservation" | "foodType" | "pickupTime" | "reset";
