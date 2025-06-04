import type { StoreFormData } from "@/types/store";
import { fireEvent, render, screen } from "@testing-library/react";
import type { useForm } from "use-form-light";
import { describe, expect, it, vi } from "vitest";
import { BusinessHoursSection } from "./index";

// Mock the useBusinessHours hook
vi.mock("@/hooks/useBusinessHours", () => ({
  useBusinessHours: () => ({
    selectedDays: ["월", "화"],
    businessHours: [
      { dayOfWeek: "월", openTime: "09:00", closeTime: "18:00" },
      { dayOfWeek: "화", openTime: "09:00", closeTime: "18:00" },
    ],
    toggleDay: vi.fn(),
    handleBusinessHoursChange: vi.fn(),
    applyToAllDays: vi.fn(),
  }),
}));

describe("BusinessHoursSection", () => {
  const mockForm = {
    watch: vi.fn().mockReturnValue({
      businessHours: [
        { dayOfWeek: "월", openTime: "09:00", closeTime: "18:00" },
        { dayOfWeek: "화", openTime: "09:00", closeTime: "18:00" },
        { dayOfWeek: "수", openTime: "09:00", closeTime: "18:00" },
        { dayOfWeek: "목", openTime: "09:00", closeTime: "18:00" },
        { dayOfWeek: "금", openTime: "09:00", closeTime: "18:00" },
        { dayOfWeek: "토", openTime: "09:00", closeTime: "18:00" },
        { dayOfWeek: "일", openTime: "09:00", closeTime: "18:00" },
      ],
    }),
    setValue: vi.fn(),
    errors: {},
    validate: vi.fn(),
    handleSubmit: vi.fn(),
    register: vi.fn(),
  } as unknown as ReturnType<typeof useForm<StoreFormData>>;

  it("요일 버튼이 렌더링되어야 합니다", () => {
    render(<BusinessHoursSection form={mockForm} />);

    expect(screen.getByText("월")).toBeInTheDocument();
    expect(screen.getByText("화")).toBeInTheDocument();
    expect(screen.getByText("수")).toBeInTheDocument();
    expect(screen.getByText("목")).toBeInTheDocument();
    expect(screen.getByText("금")).toBeInTheDocument();
    expect(screen.getByText("토")).toBeInTheDocument();
    expect(screen.getByText("일")).toBeInTheDocument();
  });

  it("전체 시간 입력 필드가 렌더링되어야 합니다", () => {
    render(<BusinessHoursSection form={mockForm} />);

    expect(screen.getByText("전체")).toBeInTheDocument();
    const timeInputs = screen.getByText("전체").parentElement?.querySelectorAll("input");
    expect(timeInputs?.[0]).toHaveValue("09:00");
    expect(timeInputs?.[1]).toHaveValue("18:00");
  });

  it("요일별 시간 입력 필드가 렌더링되어야 합니다", () => {
    render(<BusinessHoursSection form={mockForm} />);

    const mondayInputs = screen.getByText("월요일").parentElement?.querySelectorAll("input");
    expect(mondayInputs?.[0]).toHaveValue("09:00");
    expect(mondayInputs?.[1]).toHaveValue("18:00");
  });

  it("요일 버튼을 클릭하면 선택 상태가 토글되어야 합니다", () => {
    render(<BusinessHoursSection form={mockForm} />);

    const mondayButton = screen.getByText("월");
    fireEvent.click(mondayButton);
    expect(mondayButton).toHaveClass("bg-primary");
  });
});
