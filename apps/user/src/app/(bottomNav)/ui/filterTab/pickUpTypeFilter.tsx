import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import { padTwoDigits } from "@/utils/format";
import { useState } from "react";
import { pickupTimeDefaultValue } from "./constant";
import * as styles from "./filterTab.css";
import type { HourType, MinuteType, PickupTime } from "./type";

interface PickUpTypeFilterProps {
  isOpen: boolean;
  onChange: (time?: PickupTime) => void;
  onClose: () => void;
}

export default function PickUpTypeFilter({ isOpen, onChange, onClose }: PickUpTypeFilterProps) {
  const [tempPickupTime, setTempPickupTime] = useState<PickupTime>(pickupTimeDefaultValue);

  const handleTempPickupTimeClick = (values: Partial<PickupTime>) => {
    setTempPickupTime((prev) => ({ ...prev, ...values }));
  };

  const handlePickupTimeClick = () => {
    onChange(tempPickupTime);
    onClose();
  };

  const handleResetPickupTimeClick = () => {
    onChange(undefined);
    setTempPickupTime(pickupTimeDefaultValue);
  };

  return (
    <BottomSheet type="shadow" isShow={isOpen} title="픽업 가능시간" onClose={onClose}>
      <div className={styles.timePickerContainer}>
        <ul className={styles.timePickerColumn}>
          {["오전", "오후"].map((day) => (
            <li key={day}>
              <button
                type="button"
                className={tempPickupTime.day === day ? styles.timeItemSelected : styles.timeItem}
                onClick={() => handleTempPickupTimeClick({ day: day as "오전" | "오후" })}
              >
                {day}
              </button>
            </li>
          ))}
        </ul>
        <ul className={styles.timePickerColumn}>
          {Array.from({ length: 13 }).map((_, index) => (
            /**
             * biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
             * 숫자형 데이터 이므로, 배열의 인덱스를 키로 사용해도 무방하여 린트 주석 처리 했습니다.
             * */
            <li key={index}>
              <button
                type="button"
                className={
                  tempPickupTime.hour === index ? styles.timeItemSelected : styles.timeItem
                }
                onClick={() => handleTempPickupTimeClick({ hour: index as HourType })}
              >
                <span>{padTwoDigits(index)}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className={styles.timePickerColumn}>
          {Array.from({ length: 12 }).map((_, index) => (
            /**
             * biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
             * 숫자형 데이터 이므로, 배열의 인덱스를 키로 사용해도 무방하여 린트 주석 처리 했습니다.
             * */
            <li key={index}>
              <button
                type="button"
                className={
                  tempPickupTime.minute === 5 * index ? styles.timeItemSelected : styles.timeItem
                }
                onClick={() => handleTempPickupTimeClick({ minute: (5 * index) as MinuteType })}
              >
                <span>{padTwoDigits(5 * index)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.filterButtonContainer}>
        <Button status="common" onClick={handleResetPickupTimeClick}>
          초기화
        </Button>
        <Button status="primary" onClick={handlePickupTimeClick}>
          시간 적용
        </Button>
      </div>
    </BottomSheet>
  );
}
