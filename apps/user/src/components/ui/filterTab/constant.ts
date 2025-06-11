import type { PickupTime } from "./type";
import { toHourType, toMinuteType } from "./utils";

export const foodTypeList = ["빵", "디저트", "한식", "과일", "피자", "샐러드"];

export const pickupTimeDefaultValue: PickupTime = {
  day: "오전",
  hour: toHourType(0),
  minute: toMinuteType(0),
};
