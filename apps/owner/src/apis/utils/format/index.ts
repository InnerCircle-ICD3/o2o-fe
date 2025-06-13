// TODO: 테스트를 위해 임시로 추가한 코드
/**
 * 첫 글자를 대문자로 변환합니다.
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 숫자를 통화 형식으로 포맷팅합니다.
 */
export const formatCurrency = (amount: number): string => {
  return `${Math.round(amount).toLocaleString("ko-KR")}₩`;
};

/**
 * YYYY-MM-DD 형식으로 날짜를 포맷팅합니다.
 */
export const formatDate = (date: string): string => {
  const parsedDate = new Date(date);

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * 올해라면 MM월 DD일 (요일) 형식으로 날짜를 포맷팅합니다.
 * 올해가 아니라면 YYYY년 MM월 DD일 (요일) 형식으로 날짜를 포맷팅합니다.
 */
export const formatLocalizedDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const today = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = "일월화수목금토".charAt(date.getDay());

  if (year === today.getFullYear()) {
    return `${month}월 ${day}일 (${dayOfWeek})`;
  }

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};

/**
 * 오후/오전 HH시 형식으로 시간을 포맷팅합니다.
 */
export const formatHourTo12HourText = (time: string) => {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number.parseInt(hourStr, 10);
  const minute = Number.parseInt(minuteStr, 10);

  const period = hour < 12 ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  if (minute === 0) {
    return `${period} ${hour12}시`;
  }

  return `${period} ${hour12}시 ${minute}분`;
};

/**
 * 숫자를 두 자리로 패딩합니다.
 *
 * @param {number} num - 패딩할 숫자
 * @returns {string} 두 자리로 패딩된 문자열
 * @example
 * padTwoDigits(1) // "01"
 * padTwoDigits(10) // "10"
 */
export const padTwoDigits = (num: number): string => {
  return String(num).padStart(2, "0");
};

/**
 * 거리를 소수점 첫째 자리까지 반올림하여 문자열로 반환합니다.
 * @param {number} distance - 거리 (km 단위)
 * @return {string} 소수점 첫째 자리까지 반올림된 거리 문자열
 * @example
 * formatDistance(1.23456) // "1.2km"
 * formatDistance(1.2) // "1.2km"
 * formatDistance(0.01) // "0.1km"
 */
export const formatDistance = (distance: number): string => {
  const roundedDistance = Math.max(Math.round(distance * 10) / 10, 0.1);
  return `${roundedDistance}km`;
};
