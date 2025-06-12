import type { HourType, MinuteType } from "./type";

export const toHourType = (value: number): HourType => {
  if (value < 0 || value > 23) {
    throw new RangeError(`Hour must be 0-23, received ${value}`);
  }
  return value as HourType;
};

export const toMinuteType = (value: number): MinuteType => {
  if (value < 0 || value > 59) {
    throw new RangeError(`Minute must be 0-59, received ${value}`);
  }
  return value as MinuteType;
};
