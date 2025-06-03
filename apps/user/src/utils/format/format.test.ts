// TODO: 테스트를 위해 임시로 추가한 코드
import { it } from "vitest";
import { capitalize, formatCurrency, formatDate, formatHourTo12HourText } from ".";

describe("capitalize", () => {
  it("첫 글자를 대문자로 변환합니다", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("world")).toBe("World");
  });

  it("빈 문자열이 입력되면 빈 문자열을 반환합니다", () => {
    expect(capitalize("")).toBe("");
  });

  it("이미 첫 글자가 대문자인 경우 변경되지 않습니다", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });
});

describe("formatCurrency", () => {
  it("숫자를 한국 원화 형식으로 포맷팅합니다", () => {
    expect(formatCurrency(1_000)).toBe("1,000₩");
    expect(formatCurrency(1_500_000)).toBe("1,500,000₩");
  });

  it("소수점이 있는 숫자도 올바르게 포맷팅합니다", () => {
    expect(formatCurrency(1_000.5)).toBe("1,001₩");
  });
});

describe("formatDate", () => {
  it("날짜를 YYYY-MM-DD 형식으로 포맷팅합니다", () => {
    const date = "2023-01-15";
    expect(formatDate(date)).toBe("2023-01-15");
  });

  it("한 자리 숫자인 월과 일을 두 자리로 패딩합니다", () => {
    const date = "2023-09-05";
    expect(formatDate(date)).toBe("2023-09-05");
  });
});

describe("formatHourTo12HourText", () => {
  it("정각 시간은 '오전/오후 HH시' 형식으로 출력합니다", () => {
    expect(formatHourTo12HourText("00:00")).toBe("오전 12시");
    expect(formatHourTo12HourText("12:00")).toBe("오후 12시");
    expect(formatHourTo12HourText("09:00")).toBe("오전 9시");
    expect(formatHourTo12HourText("15:00")).toBe("오후 3시");
  });

  it("분이 있는 경우 '오전/오후 HH시 MM분' 형식으로 출력합니다", () => {
    expect(formatHourTo12HourText("00:30")).toBe("오전 12시 30분");
    expect(formatHourTo12HourText("12:45")).toBe("오후 12시 45분");
    expect(formatHourTo12HourText("09:15")).toBe("오전 9시 15분");
    expect(formatHourTo12HourText("19:30")).toBe("오후 7시 30분");
  });
});
