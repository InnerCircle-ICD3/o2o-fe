import { fireEvent, render } from "@testing-library/react";
import { vi } from "vitest";
import RangeSelector from "./index";

// RANGE_OPTIONS 모킹 (실제 값에 맞게 조정 필요)
vi.mock("@/constants/locations", () => ({
  RANGE_OPTIONS: [
    { value: 1, label: "1km" },
    { value: 3, label: "3km" },
    { value: 5, label: "5km" },
  ],
}));

describe("RangeSelector", () => {
  const setRange = vi.fn();

  it("옵션 라벨이 모두 렌더링된다", () => {
    const { getByText } = render(
      <RangeSelector range={1} setRange={setRange} isDisabled={false} />,
    );
    expect(getByText("1km")).toBeTruthy();
    expect(getByText("3km")).toBeTruthy();
    expect(getByText("5km")).toBeTruthy();
  });

  it("선택된 값에 해당하는 라디오가 체크된다", () => {
    const { getByDisplayValue } = render(
      <RangeSelector range={3} setRange={setRange} isDisabled={false} />,
    );
    expect(getByDisplayValue("3")).toBeChecked();
  });

  it("라디오 클릭 시 setRange가 호출된다", () => {
    const { getByDisplayValue } = render(
      <RangeSelector range={1} setRange={setRange} isDisabled={false} />,
    );
    fireEvent.click(getByDisplayValue("5"));
    expect(setRange).toHaveBeenCalledWith(5);
  });
});
