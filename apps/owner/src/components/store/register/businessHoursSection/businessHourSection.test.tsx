import type { CreateStoreRequest } from "@/types/store";
import { fireEvent, render, screen } from "@testing-library/react";
import type { useForm } from "use-form-light";
import { describe, expect, it, vi } from "vitest";
import { BusinessHoursSection } from "./index";

vi.mock("@/hooks/useBusinessHours", () => ({
  useBusinessHours: () => ({
    selectedDays: ["MONDAY", "TUESDAY"],
    businessHours: {
      MONDAY: { openTime: "09:00", closeTime: "18:00" },
      TUESDAY: { openTime: "09:00", closeTime: "18:00" },
      WEDNESDAY: { openTime: "09:00", closeTime: "18:00" },
      THURSDAY: { openTime: "09:00", closeTime: "18:00" },
      FRIDAY: { openTime: "09:00", closeTime: "18:00" },
      SATURDAY: { openTime: "09:00", closeTime: "18:00" },
      SUNDAY: { openTime: "09:00", closeTime: "18:00" },
    },
    toggleDay: vi.fn(),
    handleBusinessHoursChange: vi.fn(),
    applyToAllDays: vi.fn(),
  }),
}));

describe("BusinessHoursSection", () => {
  const mockForm = {
    watch: vi.fn((key) => {
      if (key === "businessHours") {
        return [
          { dayOfWeek: "MONDAY", openTime: "09:00", closeTime: "18:00" },
          { dayOfWeek: "TUESDAY", openTime: "09:00", closeTime: "18:00" },
          { dayOfWeek: "WEDNESDAY", openTime: "09:00", closeTime: "18:00" },
          { dayOfWeek: "THURSDAY", openTime: "09:00", closeTime: "18:00" },
          { dayOfWeek: "FRIDAY", openTime: "09:00", closeTime: "18:00" },
          { dayOfWeek: "SATURDAY", openTime: "09:00", closeTime: "18:00" },
          { dayOfWeek: "SUNDAY", openTime: "09:00", closeTime: "18:00" },
        ];
      }
      return undefined;
    }),
    setValue: vi.fn(),
    errors: {},
    validate: vi.fn(),
    handleSubmit: vi.fn(),
    register: vi.fn(),
  } as unknown as ReturnType<typeof useForm<CreateStoreRequest>>;

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

    const mondayRow = screen.getByText("월요일").closest(".flex");
    expect(mondayRow).not.toBeNull();
    const inputs = mondayRow?.querySelectorAll("input");
    expect(inputs?.length).toBe(2);
    expect(inputs?.[0]).toHaveValue("09:00");
    expect(inputs?.[1]).toHaveValue("18:00");
  });

  it("요일 버튼을 클릭하면 선택 상태가 토글되어야 합니다", () => {
    render(<BusinessHoursSection form={mockForm} />);

    const mondayButton = screen.getByText("월");
    fireEvent.click(mondayButton);
    expect(mondayButton).toHaveClass("bg-[#35a865]");
  });
});
