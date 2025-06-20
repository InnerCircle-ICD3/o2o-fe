import * as styles from "@/components/ui/locations/myLocation/myLocation.css";
import { RANGE_OPTIONS } from "@/constants/locations";

interface RangeSelectorProps {
  range: number;
  setRange: (value: number) => void;
  isDisabled: boolean;
}

export default function RangeSelector({ range, setRange, isDisabled }: RangeSelectorProps) {
  const selectedIndex = RANGE_OPTIONS.findIndex((option) => option.value === range);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.trackWrapper}>
        <div className={styles.trackBg} />
        <div
          className={styles.trackProgress}
          style={{ width: `${(selectedIndex / (RANGE_OPTIONS.length - 1)) * 100}%` }}
        />
      </div>
      <div className={styles.rangeWrapper}>
        {RANGE_OPTIONS.map(({ value, label }, index) => {
          const isSelected = range === value;
          const isPassed = index < selectedIndex;

          return (
            <label key={value} className={styles.option}>
              <input
                type="radio"
                name="distance"
                value={value}
                checked={isSelected}
                onChange={() => setRange(value)}
                className={styles.input}
                disabled={isDisabled}
              />
              <span
                className={`${styles.circle} ${
                  isSelected
                    ? isDisabled
                      ? styles.circleDisabled
                      : styles.circleSelected
                    : isPassed
                      ? styles.circlePassed
                      : styles.circleInactive
                }`}
              />
              {label && <span className={styles.label}>{label}</span>}
            </label>
          );
        })}
      </div>
    </div>
  );
}
