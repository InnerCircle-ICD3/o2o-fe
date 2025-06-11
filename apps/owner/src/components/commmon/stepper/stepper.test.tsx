import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stepper } from "./index";

const labels = ["가게 등록", "상세 설정", "픽업 설정"];

describe("Stepper", () => {
  it("모든 단계가 렌더링되어야 합니다", () => {
    render(<Stepper step={1} labels={labels} />);

    expect(screen.getByText("가게 등록")).toBeInTheDocument();
    expect(screen.getByText("상세 설정")).toBeInTheDocument();
    expect(screen.getByText("픽업 설정")).toBeInTheDocument();
  });

  it("현재 단계가 올바르게 표시되어야 합니다", () => {
    render(<Stepper step={2} labels={labels} />);

    const currentStep = screen.getByText("상세 설정");
    expect(currentStep).toHaveClass("text-gray-600");
  });

  it("완료된 단계가 올바르게 표시되어야 합니다", () => {
    render(<Stepper step={2} labels={labels} />);

    const completedStep = screen.getByText("가게 등록");
    expect(completedStep).toHaveClass("text-gray-600");
  });

  it("아직 도달하지 않은 단계가 올바르게 표시되어야 합니다", () => {
    render(<Stepper step={1} labels={labels} />);

    const futureStep = screen.getByText("픽업 설정");
    expect(futureStep).toHaveClass("text-gray-600");
  });
});
