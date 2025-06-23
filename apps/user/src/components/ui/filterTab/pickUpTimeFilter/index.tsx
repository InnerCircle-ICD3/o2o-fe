import BottomSheet from "@/components/common/bottomSheet";
import Button from "@/components/common/button";
import { useFilterTab } from "@/stores/useFilterTab";
import { padTwoDigits } from "@/utils/format";
import { useEffect, useRef, useState } from "react";
import { pickupTimeDefaultValue } from "../constant";
import type { HourType, MinuteType, PickupTime } from "../type";
import * as styles from "./pickUpTimeFilter.css";

interface PickUpTimeFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PickUpTimeFilter({ isOpen, onClose }: PickUpTimeFilterProps) {
  const { selectedPickupTime, onSelectedPickupTime, onResetPickupTime } = useFilterTab();
  const [tempPickupTime, setTempPickupTime] = useState<PickupTime>(pickupTimeDefaultValue);
  const dayRef = useRef<HTMLUListElement>(null);
  const hourRef = useRef<HTMLUListElement>(null);
  const minuteRef = useRef<HTMLUListElement>(null);

  const handleTempPickupTimeClick = (values: Partial<PickupTime>) => {
    setTempPickupTime((prev) => ({ ...prev, ...values }));
  };

  const handlePickupTimeClick = () => {
    if (tempPickupTime.day && tempPickupTime.hour && Number.isFinite(tempPickupTime.minute)) {
      onSelectedPickupTime(tempPickupTime);
      onClose();
    }
  };

  const handleResetPickupTime = () => {
    dayRef.current?.scrollTo({ top: 0 });
    hourRef.current?.scrollTo({ top: 0 });
    minuteRef.current?.scrollTo({ top: 0 });
    setTempPickupTime(pickupTimeDefaultValue);
    onResetPickupTime();
    onClose();
  };

  useEffect(() => {
    if (!selectedPickupTime) {
      setTempPickupTime(pickupTimeDefaultValue);
    }
  }, [selectedPickupTime]);

  return (
    <BottomSheet type="shadow" isShow={isOpen} title="픽업 가능시간" onClose={onClose}>
      <div className={styles.timePickerContainer}>
        <ul className={styles.timePickerColumn} ref={dayRef}>
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
        <ul className={styles.timePickerColumn} ref={hourRef}>
          {Array.from({ length: 12 }).map((_, index) => (
            /**
             * biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
             * 숫자형 데이터 이므로, 배열의 인덱스를 키로 사용해도 무방하여 린트 주석 처리 했습니다.
             * */
            <li key={index}>
              <button
                type="button"
                className={
                  tempPickupTime.hour === index + 1 ? styles.timeItemSelected : styles.timeItem
                }
                onClick={() => handleTempPickupTimeClick({ hour: (index + 1) as HourType })}
              >
                <span>{padTwoDigits(index + 1)}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className={styles.timePickerColumn} ref={minuteRef}>
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
        <Button status="primary" onClick={handlePickupTimeClick}>
          시간 적용
        </Button>
        <Button status="common" onClick={handleResetPickupTime}>
          초기화
        </Button>
      </div>
    </BottomSheet>
  );
}
