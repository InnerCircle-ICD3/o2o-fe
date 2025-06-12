import type { PickupTime } from "./type";

export const foodTypeList = [
  { label: "베이커리", value: "BREAD" },
  { label: "카페", value: "CAFE" },
  { label: "과일", value: "FRUIT" },
  { label: "한식", value: "KOREAN" },
  { label: "피자", value: "PIZZA" },
  { label: "떡", value: "RICECAKE" },
  { label: "샐러드", value: "SALAD" },
  { label: "샌드위치", value: "SANDWICH" },
];

export const pickupTimeDefaultValue: PickupTime = {
  day: undefined,
  hour: undefined,
  minute: undefined,
};
