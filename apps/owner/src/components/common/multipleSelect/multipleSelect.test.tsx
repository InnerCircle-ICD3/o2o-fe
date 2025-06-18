import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { MultiSelect } from ".";

const defaultProps = {
  options: [
    { value: "1", label: "옵션 1" },
    { value: "2", label: "옵션 2" },
    { value: "3", label: "옵션 3" },
  ],
  value: [],
  onChange: vi.fn(),
};

describe("MultiSelect UI 요소 상세 테스트", () => {
  it("MultiSelect의 모든 필수 UI 요소들이 정확하게 렌더링되어야 합니다", () => {
    render(<MultiSelect {...defaultProps} />);

    // 1. 메인 버튼 검증
    const mainButton = screen.getByRole("button");
    expect(mainButton).toBeInTheDocument();
    expect(mainButton).toHaveClass(
      "inline-flex",
      "items-center",
      "whitespace-nowrap",
      "rounded-md",
      "text-sm",
      "font-medium",
    );
    expect(mainButton).toHaveAttribute("aria-expanded", "false");

    // 2. 드롭다운 아이콘 검증
    const chevronIcon = mainButton.querySelector("svg");
    expect(chevronIcon).toBeInTheDocument();
    expect(chevronIcon).toHaveClass("h-4", "w-4", "shrink-0", "opacity-50", "ml-auto");

    // 3. 태그 컨테이너 검증
    const tagContainer = mainButton.querySelector("div.flex.flex-wrap.gap-1.items-center");
    expect(tagContainer).toBeInTheDocument();
  });

  it("선택된 옵션의 태그가 올바른 스타일로 표시되어야 합니다", () => {
    render(<MultiSelect {...defaultProps} value={["1"]} />);

    // 선택된 태그 검증
    const mainButton = screen.getByRole("button");
    const tagContainer = mainButton.querySelector("div.flex.flex-wrap.gap-1.items-center");
    expect(tagContainer).not.toBeNull();
    const selectedTag = Array.from(tagContainer ? tagContainer.querySelectorAll("span") : []).find(
      (el) => el.textContent === "옵션 1",
    );
    expect(selectedTag).toBeInTheDocument();
    expect(selectedTag).toHaveClass(
      "bg-[#35A865]",
      "text-white",
      "text-xs",
      "px-2",
      "py-0.5",
      "rounded-md",
    );
  });

  it("visibleLimit에 따라 태그 표시가 정확하게 제한되어야 합니다", () => {
    render(<MultiSelect {...defaultProps} value={["1", "2", "3"]} visibleLimit={2} />);

    // 1. visibleLimit 개수만큼의 태그가 표시되는지 확인
    const mainButton = screen.getByRole("button");
    const tagContainer = mainButton.querySelector("div.flex.flex-wrap.gap-1.items-center");
    expect(tagContainer).not.toBeNull();
    const tagSpans = tagContainer ? tagContainer.querySelectorAll("span") : [];
    const tagLabels = Array.from(tagSpans).map((el) => el.textContent ?? "");
    // 전체 선택 시 "전체"만 보임, 아니면 visibleLimit만큼 + 숨김 카운트
    expect(tagLabels).toEqual(["전체"]);
  });

  it("전체 선택 시 '전체' 태그가 올바르게 표시되어야 합니다", () => {
    render(<MultiSelect {...defaultProps} value={["1", "2", "3"]} />);

    // 전체 선택 태그 검증
    const mainButton = screen.getByRole("button");
    const tagContainer = mainButton.querySelector("div.flex.flex-wrap.gap-1.items-center");
    expect(tagContainer).not.toBeNull();
    const allTag = Array.from(tagContainer ? tagContainer.querySelectorAll("span") : []).find(
      (el) => el.textContent === "전체",
    );
    expect(allTag).toBeInTheDocument();
    expect(allTag).toHaveClass(
      "bg-[#35A865]",
      "text-white",
      "text-xs",
      "px-2",
      "py-0.5",
      "rounded-md",
    );
  });

  it("Popover가 열렸을 때 모든 옵션이 올바르게 표시되어야 합니다", () => {
    render(<MultiSelect {...defaultProps} />);

    // 1. 버튼 클릭으로 Popover 열기
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // 2. Popover 컨텐츠 검증
    const popoverContent = screen.getByRole("dialog");
    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toHaveClass("w-full", "p-0", "max-h-72", "overflow-auto");

    // 3. 전체 선택 옵션 검증
    const allOption = Array.from(screen.getAllByRole("option")).find((el) =>
      (el.textContent ?? "").includes("전체 선택"),
    );
    expect(allOption).toBeInTheDocument();

    // 4. 각 옵션 아이템 검증
    for (const option of defaultProps.options) {
      const optionElement = Array.from(screen.getAllByRole("option")).find((el) =>
        (el.textContent ?? "").includes(option.label),
      );
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveClass("cursor-pointer");
    }
  });

  it("체크박스 아이콘이 올바른 상태로 표시되어야 합니다", () => {
    render(<MultiSelect {...defaultProps} value={["1"]} />);

    // 1. Popover 열기
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // 2. 선택된 옵션의 체크박스 검증
    const options = screen.getAllByRole("option");
    const option1 = options.find((el) => (el.textContent ?? "").includes("옵션 1"));
    expect(option1).toBeDefined();
    const selectedCheckbox = option1 ? option1.querySelector("div") : null;
    expect(selectedCheckbox).toHaveClass("bg-primary", "text-white");

    // 3. 선택되지 않은 옵션의 체크박스 검증
    const option2 = options.find((el) => (el.textContent ?? "").includes("옵션 2"));
    expect(option2).toBeDefined();
    const unselectedCheckbox = option2 ? option2.querySelector("div") : null;
    expect(unselectedCheckbox).toHaveClass("opacity-50");
  });
});
